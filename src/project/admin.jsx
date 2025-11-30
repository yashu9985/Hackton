// ============================================================
// 🧑‍🏫 admin.jsx — Admin (Madam) Dashboard Page
// ============================================================

import React, { useState, useEffect } from "react";
import "./style.css";

export default function AdminDashboard() {
  const [myProjects, setMyProjects] = useState([]);

  // ✅ Load projects for this admin
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.role !== "admin") {
      window.location.href = "/";
      return;
    }

    const allProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const assignedToMe = allProjects.filter(
      (p) => p.assignedAdmin === currentUser.email
    );
    setMyProjects(assignedToMe);
  }, []);

  // ✅ Update marks & feedback
  const handleUpdate = (index, status) => {
    const updatedProjects = [...myProjects];
    const project = updatedProjects[index];

    const marks = document.getElementById(`marks_${index}`).value;
    const feedback = document.getElementById(`feedback_${index}`).value;

    const allProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const projectIndex = allProjects.findIndex(
      (p) =>
        p.title === project.title && p.studentEmail === project.studentEmail
    );

    if (projectIndex !== -1) {
      allProjects[projectIndex].status = status;
      allProjects[projectIndex].marks = marks;
      allProjects[projectIndex].feedback = feedback;
    }

    localStorage.setItem("projects", JSON.stringify(allProjects));
    alert("✅ Project updated successfully!");

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const assignedToMe = allProjects.filter(
      (p) => p.assignedAdmin === currentUser.email
    );
    setMyProjects(assignedToMe);
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  return (
    <div className="student-layout">
      {/* ====================== */}
      {/* Main Content */}
      {/* ====================== */}
      <div className="content">
        <h2>Welcome Madam 👩‍🏫</h2>
        <p>Review and provide feedback for your assigned student projects.</p>

        <div className="card">
          <h3>📁 Assigned Projects</h3>

          {myProjects.length === 0 ? (
            <p>No projects assigned yet.</p>
          ) : (
            myProjects.map((p, i) => (
              <div key={i} className="submission">
                <h4>
                  {p.title}{" "}
                  <span className={`badge ${p.status}`}>{p.status}</span>
                </h4>

                <p>
                  <b>Student:</b> {p.studentName} ({p.studentEmail})
                </p>
                <p>{p.description}</p>

                <a
                  href={p.fileURL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  Open Project
                </a>

                <label>Marks (0–100)</label>
                <input
                  id={`marks_${i}`}
                  type="number"
                  placeholder="Enter marks"
                  defaultValue={p.marks || ""}
                  min="0"
                  max="100"
                />

                <label>Feedback</label>
                <textarea
                  id={`feedback_${i}`}
                  placeholder="Write feedback..."
                  defaultValue={p.feedback || ""}
                ></textarea>

                <div className="button-row">
                  <button
                    className="approve"
                    onClick={() => handleUpdate(i, "approved")}
                  >
                    Approve ✅
                  </button>
                  <button
                    className="reject"
                    onClick={() => handleUpdate(i, "rejected")}
                  >
                    Reject ❌
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ====================== */}
      {/* Sidebar (At the End) */}
      {/* ====================== */}
      <div className="sidebar">
        <h2 className="sidebar-title">📘 Menu</h2>
        <nav>
          <button onClick={() => (window.location.href = "/admin")}>🏠 Home</button>
          <button className="logout" onClick={handleLogout}>
            📤 Logout
          </button>
        </nav>
      </div>
    </div>
  );
}
