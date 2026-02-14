# 🔖 Smart Bookmark Manager

A modern bookmark management web application built using **Next.js** and **Supabase**.  
This app allows users to securely save, manage, and access their bookmarks with Google login and realtime updates.

---

## 🚀 Features

- 🔐 Google OAuth Authentication
- 📌 Add and manage multiple bookmarks
- 🔒 Private bookmarks per user (Row Level Security)
- ⚡ Realtime updates across tabs
- ❌ Delete bookmarks
- 🌙 Dark mode toggle
- 📱 Responsive and modern UI

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS  
- **Backend:** Supabase (Auth, Database, Realtime)  
- **Authentication:** Google OAuth  
- **Deployment:** Vercel  

---

## 📂 Project Structure

smart-bookmark-app/
│
├── app/ # Next.js App Router pages
├── lib/
│ └── supabaseClient.js
├── .env.local # Environment variables
└── README.md


---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and add:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_publishable_key


---

## 🧪 How It Works

1. User logs in with Google.
2. Supabase authenticates and creates a session.
3. Bookmarks are stored with the user's ID.
4. Row Level Security ensures users see only their own bookmarks.
5. Realtime subscriptions update the UI instantly.

---

## 🌐 Live Demo

🔗 Vercel Deployment: https://smart-book-marker-app-nywy.vercel.app/

---

## 📌Features

✔ Google login using OAuth  
✔ Add and manage bookmarks  
✔ Private user data using RLS  
✔ Realtime updates  
✔ Delete functionality  
✔ Deployed on Vercel  

---
## 🧠 Approach

The application was designed using a full-stack architecture with Next.js as the frontend and Supabase as the backend.

### 🔹 Authentication
Google OAuth was implemented using Supabase Auth to provide secure and seamless login. This eliminates the need for manual credential handling.

### 🔹 Database Design
A `bookmarks` table was created in Supabase with fields for title, URL, user ID, and timestamp. Row Level Security (RLS) policies ensure that each user can only access their own bookmarks.

### 🔹 Realtime Updates
Supabase Realtime subscriptions were used to listen for database changes. This ensures that bookmarks update instantly across multiple tabs without refreshing.

### 🔹 UI/UX Design
The interface was built using Tailwind CSS with a focus on simplicity and usability. Features such as dark mode, responsive layout, and clean typography enhance the user experience.

### 🔹 Deployment Strategy
The application is deployed on Vercel, providing a fast and scalable hosting environment with automatic builds from GitHub.


## 👩‍💻 Author

**Jahnavi Polisetty**
