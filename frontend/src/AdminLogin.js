import React, { useState } from "react";

const ADMIN_EMAIL = "admin@banasthali.in";
const ADMIN_PASSWORD = "admin123";

function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      onLoginSuccess();
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Admin Sign In</h1>
        <p style={styles.subtext}>Placement Cell Admin Access</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>

        <p style={styles.hint}>
          Demo credentials — email: {ADMIN_EMAIL} / password: {ADMIN_PASSWORD}
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
  },
  card: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "32px",
    width: "320px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  heading: { color: "#16325c", margin: "0 0 4px" },
  subtext: { color: "#888", fontSize: "13px", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px 12px", borderRadius: "6px", border: "1px solid #ccc" },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#16325c",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: { color: "#c62828", fontSize: "13px", margin: 0 },
  hint: { fontSize: "11px", color: "#aaa", marginTop: "16px" },
};

export default AdminLogin;