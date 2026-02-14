"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    getUser();

    // 🔴 Realtime updates
    const channel = supabase
      .channel("bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        fetchBookmarks
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
    if (data.user) fetchBookmarks();
  };

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const addBookmark = async () => {
  if (!title.trim() || !url.trim()) {
    alert("Please enter both title and URL");
    return;
  }

  const { error } = await supabase.from("bookmarks").insert({
    title,
    url,
    user_id: user.id,
  });

  if (error) {
    console.error("Insert error:", error);
  } else {
    fetchBookmarks(); // refresh list
    setTitle("");
    setUrl("");
  }
};



 const fetchBookmarks = async () => {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch error:", error);
  } else {
    setBookmarks(data);
  }
};


  const deleteBookmark = async (id) => {
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete error:", error);
  } else {
    fetchBookmarks();
  }
};

const copyLink = (link) => {
  const textArea = document.createElement("textarea");
  textArea.value = link;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  alert("Copied!");
};

const channel = supabase
  .channel("bookmarks")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "bookmarks" },
    () => fetchBookmarks()   // ✅ fixed
  )
  .subscribe();

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-200 to-purple-300">
        <button
          onClick={loginWithGoogle}
          className="px-8 py-4 bg-white text-gray-800 rounded-xl shadow-lg hover:scale-105 transition"
        >
          🚀 Sign in with Google
        </button>
      </main>
    );
  }

  return (
    <main
      className={
        darkMode
          ? "bg-gray-900 text-white min-h-screen p-6 transition"
          : "bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen p-6 transition"
      }
    >
      <div
        className={
          darkMode
            ? "max-w-2xl mx-auto bg-gray-800 shadow-2xl rounded-3xl p-8"
            : "max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl p-8"
        }
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            👋 {user.user_metadata?.full_name || user.email.split("@")[0]}
          </h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Add Bookmark */}
        <div className="flex gap-3 mb-8">
          <input
            placeholder="Bookmark Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-3 flex-1 rounded-xl focus:ring-2 focus:ring-indigo-400 text-black"
          />
          <input
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border p-3 flex-1 rounded-xl focus:ring-2 focus:ring-indigo-400 text-black"
          />
          <button
            onClick={addBookmark}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 rounded-xl transition"
          >
            Add
          </button>
        </div>

        {/* Bookmark List */}
        <ul className="space-y-4">
          {bookmarks.map((b) => (
            <li
              key={b.id}
              className={
                darkMode
                  ? "flex items-center justify-between bg-gray-700 border p-4 rounded-xl hover:shadow-lg transition"
                  : "flex items-center justify-between bg-gray-50 border p-4 rounded-xl hover:shadow-lg transition"
              }
            >
              <div className="flex items-center gap-3">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${b.url}`}
                  alt="icon"
                  className="w-6 h-6"
                />
                <a
                  href={b.url}
                  target="_blank"
                  className="text-indigo-600 font-semibold"
                >
                  {b.title}
                </a>
              </div>

              <div className="flex gap-4">
                <div className="flex gap-4">
  <button
    onClick={() => copyLink(b.url)}
    className="text-blue-600 hover:underline"
  >
    Copy
  </button>

  <button
    onClick={() => deleteBookmark(b.id)}
    className="text-red-500 hover:underline"
  >
    Delete
  </button>
</div>

              </div>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-10 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
