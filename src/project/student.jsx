// ===============================================================
// 👨‍🎓 StudentDashboard.jsx — Dashboard with Sidebar Navigation
// ===============================================================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./student.css";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [file, setFile] = useState(null);
  const [assignedAdmin, setAssignedAdmin] = useState("");
  const [admins, setAdmins] = useState([]);
  const [myProjects, setMyProjects] = useState([]);

  // ✅ Load user + admins + projects
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.role !== "student") {
      navigate("/");
      return;
    }

    // ✅ Fetch admins from MongoDB
    axios
      .get("http://localhost:5000/api/admins")
      .then((response) => setAdmins(response.data))
      .catch((error) => console.error("❌ Failed to fetch admins:", error));

    // Load projects from localStorage
    const allProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const myData = allProjects.filter(
      (p) => p.studentEmail === currentUser.email
    );
    setMyProjects(myData);
  }, [navigate]);

  // ✅ Submit project
  const handleSubmit = () => {
    if (!projectTitle || !projectDesc || !file || !assignedAdmin) {
      alert("⚠ Please fill all fields and select a madam!");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const allProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const fileURL = URL.createObjectURL(file);

    const newProject = {
      title: projectTitle,
      description: projectDesc,
      studentName: currentUser.username,
      studentEmail: currentUser.email,
      assignedAdmin,
      fileName: file.name,
      fileURL,
      status: "pending",
      feedback: "",
      marks: null,
    };

    allProjects.push(newProject);
    localStorage.setItem("projects", JSON.stringify(allProjects));

    setProjectTitle("");
    setProjectDesc("");
    setFile(null);
    setAssignedAdmin("");
    setMyProjects([...myProjects, newProject]);
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="student-layout">
      {/* ================= SIDEBAR ================= */}
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

      {/* ================= MAIN CONTENT ================= */}
      <main className="content">
        <h2>Welcome Student 👩‍🎓</h2>
        <p>Upload your project and track feedback from your madam.</p>

        <div className="card">
          <h3>📤 Upload Project</h3>

          <label>Project Title</label>
          <input
            type="text"
            value={projectTitle}
            placeholder="Enter project title"
            onChange={(e) => setProjectTitle(e.target.value)}
          />

          <label>Description</label>
          <textarea
            value={projectDesc}
            placeholder="Enter project description"
            onChange={(e) => setProjectDesc(e.target.value)}
          />

          <label>Upload File</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <label>Select Madam (Admin)</label>
          <select
            value={assignedAdmin}
            onChange={(e) => setAssignedAdmin(e.target.value)}
          >
            <option value="">Select Madam</option>
            {admins.map((a, i) => (
              <option key={i} value={a.email}>
                {a.username}
              </option>
            ))}
          </select>

          <button onClick={handleSubmit}>Submit Project</button>
        </div>

        <div className="card">
          <h3>📊 My Submissions</h3>

          {myProjects.length === 0 ? (
            <p>No projects submitted yet.</p>
          ) : (
            myProjects.map((p, i) => (
              <div key={i} className="submission">
                <h4>
                  {p.title}{" "}
                  <span className={`badge ${p.status}`}>{p.status}</span>
                </h4>
                <p>{p.description}</p>
                <p>
                  <b>Assigned Madam:</b> {p.assignedAdmin}
                </p>
                <a href={p.fileURL} target="_blank" className="btn-outline">
                  Open Project
                </a>

                {p.feedback ? (
                  <>
                    <p>
                      <b>Feedback:</b> {p.feedback}
                    </p>
                    <p>
                      <b>Marks:</b> {p.marks}/100
                    </p>
                  </>
                ) : (
                  <p>
                    <i>Waiting for feedback...</i>
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
