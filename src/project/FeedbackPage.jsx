// ===============================================================
// 🗒️ FeedbackPage.jsx — Student Feedback + Progress Tracker
// ===============================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./student.css";

export default function FeedbackPage() {
  const navigate = useNavigate();
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.role !== "student") {
      navigate("/");
      return;
    }

    const allProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const myFeedbacks = allProjects.filter(
      (p) => p.studentEmail === currentUser.email
    );
    setFeedbackList(myFeedbacks);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  // 📈 Convert marks to progress percentage
  const getProgress = (marks) => {
    if (marks === null || marks === undefined) return 20;
    if (marks >= 90) return 100;
    if (marks >= 75) return 80;
    if (marks >= 60) return 60;
    if (marks >= 40) return 40;
    return 20;
  };

  return (
    <div className="student-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">📘 Menu</h2>
        <nav>
          <button onClick={() => navigate("/student")}>🏠 Home</button>
          <button onClick={() => navigate("/feedback")}>🗒️ Feedback</button>
          <button className="logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Feedback Section */}
      <main className="content">
        <h2>📊 Feedback & Progress Tracker</h2>
        <p>View your project evaluations, remarks, and performance progress.</p>

        {feedbackList.length === 0 ? (
          <div className="card">
            <p>No feedback available yet.</p>
          </div>
        ) : (
          feedbackList.map((item, index) => (
            <div key={index} className="card">
              <h3>📁 {item.title}</h3>
              <p className="desc">{item.description}</p>

              <p>
                <b>👩‍🏫 Madam:</b> {item.assignedAdmin}
              </p>
              <p>
                <b>📌 Status:</b>{" "}
                <span className={`badge ${item.status}`}>{item.status}</span>
              </p>

              <p>
                <b>💬 Remarks:</b>{" "}
                {item.feedback ? item.feedback : "Awaiting feedback..."}
              </p>

              <p>
                <b>🌟 Marks:</b>{" "}
                {item.marks !== null ? `${item.marks}/100` : "Not yet given"}
              </p>

              {/* 📈 Progress Bar */}
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${getProgress(item.marks)}%` }}
                ></div>
              </div>
              <p className="progress-label">
                Progress: {getProgress(item.marks)}%
              </p>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
