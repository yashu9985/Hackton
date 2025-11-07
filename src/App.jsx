// ============================================================
// 🚀 App.jsx — React Router Connection Between All Pages
// ============================================================
// 🌟 This file connects all your main pages together:
//   - Login & Signup (AuthPage.jsx)
//   - Student Dashboard (student.jsx)
//   - Admin Dashboard (admin.jsx)
//   - Feedback Page (FeedbackPage.jsx)
// ============================================================

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages
import AuthPage from "./project/Authpage";
import StudentDashboard from "./project/student";
import AdminDashboard from "./project/admin";
import FeedbackPage from "./project/feedbackpage"; // ✅ Added feedback page

function App() {
  return (
    <Router>
      <Routes>
        {/* 🌐 Default route → Login + Signup page */}
        <Route path="/" element={<AuthPage />} />

        {/* 👩‍🎓 Student Dashboard route */}
        <Route path="/student" element={<StudentDashboard />} />

        {/* 🗒️ Feedback Page route */}
        <Route path="/feedback" element={<FeedbackPage />} />

        {/* 👩‍🏫 Admin Dashboard route */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
