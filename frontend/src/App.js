import React, { useState } from "react";

function App() {
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [form, setForm] = useState({ email: "", adminId: "", department: "", password: "" });

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSignedIn(true);
  };

  if (signedIn) {
    return (
      <main style={styles.successPage}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✓</div>
          <p style={styles.eyebrow}>BU CONNECT</p>
          <h1 style={styles.successTitle}>You are signed in.</h1>
          <p style={styles.successText}>Welcome to the Banasthali community portal.</p>
          <button style={styles.outlineButton} onClick={() => setSignedIn(false)}>Sign out</button>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.brandPanel}>
        <div style={styles.logo}><span style={styles.logoMark}>BU</span> BU CONNECT</div>
        <div style={styles.hero}>
          <p style={styles.eyebrow}>BANASTHALI VIDYAPITH</p>
          <h1 style={styles.heroTitle}>One campus.<br />Every connection.</h1>
          <p style={styles.heroText}>A simple space for students, faculty and administrators to stay connected with the Banasthali community.</p>
        </div>
        <p style={styles.quote}>“Knowledge is the true companion—connecting us to a better tomorrow.”</p>
      </section>

      <section style={styles.loginPanel}>
        <div style={styles.card}>
          <p style={styles.eyebrow}>WELCOME BACK</p>
          <h2 style={styles.title}>Sign in to BU Connect</h2>
          <p style={styles.subtitle}>Choose your access type to continue.</p>

          <div style={styles.tabs}>
            <button type="button" onClick={() => setRole("user")} style={{ ...styles.tab, ...(role === "user" ? styles.activeTab : {}) }}>User</button>
            <button type="button" onClick={() => setRole("admin")} style={{ ...styles.tab, ...(role === "admin" ? styles.activeTab : {}) }}>Admin</button>
          </div>

          <form onSubmit={handleSubmit}>
            {role === "user" ? (
              <label style={styles.label}>Banasthali email ID
                <input style={styles.input} type="email" name="email" placeholder="name@banasthali.in" value={form.email} onChange={updateField} required />
              </label>
            ) : (
              <>
                <label style={styles.label}>Admin unique ID
                  <input style={styles.input} type="text" name="adminId" placeholder="Enter your unique ID" value={form.adminId} onChange={updateField} required />
                </label>
                <label style={styles.label}>Department
                  <select style={styles.input} name="department" value={form.department} onChange={updateField} required>
                    <option value="">Select your department</option>
                    <option>Academic Administration</option>
                    <option>Student Welfare</option>
                    <option>Information Technology</option>
                    <option>Examinations</option>
                  </select>
                </label>
              </>
            )}
            <label style={styles.label}>Password
              <div style={styles.passwordWrap}>
                <input style={{ ...styles.input, marginBottom: 0, paddingRight: 64 }} type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" value={form.password} onChange={updateField} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.showButton}>{showPassword ? "Hide" : "Show"}</button>
              </div>
            </label>
            <div style={styles.options}>
              <label style={styles.remember}><input type="checkbox" /> Remember me</label>
              <a href="#support" style={styles.link}>Forgot password?</a>
            </div>
            <button type="submit" style={styles.submit}>Sign in <span>→</span></button>
          </form>
          <p id="support" style={styles.support}>Need help? <a href="mailto:support@banasthali.in" style={styles.link}>Contact BU Connect support</a></p>
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: { minHeight: "100vh", display: "grid", gridTemplateColumns: "minmax(360px, 48%) 1fr", fontFamily: "Arial, sans-serif", background: "#fffdf8", color: "#16293b" },
  brandPanel: { background: "#102940", color: "white", padding: "48px clamp(36px, 7vw, 105px)", display: "flex", flexDirection: "column", minHeight: "100vh" },
  logo: { fontSize: 13, letterSpacing: 2, fontWeight: 700, display: "flex", alignItems: "center", gap: 11 },
  logoMark: { width: 37, height: 37, border: "1px solid #e8b64b", color: "#e8b64b", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, letterSpacing: 0 },
  hero: { margin: "auto 0", maxWidth: 500 },
  eyebrow: { color: "#c99328", fontSize: 11, letterSpacing: 2, fontWeight: 700, margin: "0 0 15px" },
  heroTitle: { fontFamily: "Georgia, serif", fontSize: "clamp(42px, 5vw, 72px)", lineHeight: 1.08, letterSpacing: -2, margin: "0 0 23px" },
  heroText: { color: "#c4d0d7", maxWidth: 400, fontSize: 16, lineHeight: 1.7 },
  quote: { borderLeft: "2px solid #e8b64b", paddingLeft: 17, color: "#d3dde2", maxWidth: 390, fontSize: 14, lineHeight: 1.65 },
  loginPanel: { display: "grid", placeItems: "center", padding: "45px 28px", background: "#fffdf9" },
  card: { width: "min(100%, 430px)" },
  title: { fontFamily: "Georgia, serif", fontSize: 35, margin: "0", letterSpacing: -1.2, color: "#102940" },
  subtitle: { color: "#71808c", margin: "10px 0 29px" },
  tabs: { display: "grid", gridTemplateColumns: "1fr 1fr", padding: 4, borderRadius: 10, background: "#e9eeec", marginBottom: 26 },
  tab: { border: 0, borderRadius: 7, padding: "11px", background: "transparent", color: "#71808c", fontWeight: 700, cursor: "pointer" },
  activeTab: { background: "#fff", color: "#102940", boxShadow: "0 2px 7px rgba(16,41,64,.12)" },
  label: { display: "block", color: "#314351", fontSize: 13, fontWeight: 700, marginBottom: 17 },
  input: { display: "block", width: "100%", marginTop: 8, padding: "14px 13px", border: "1px solid #d7dfdf", borderRadius: 8, boxSizing: "border-box", fontSize: 14, background: "white", color: "#16293b" },
  passwordWrap: { position: "relative" },
  showButton: { position: "absolute", right: 7, top: 13, border: 0, background: "transparent", color: "#936b15", fontWeight: 700, cursor: "pointer" },
  options: { display: "flex", alignItems: "center", justifyContent: "space-between", margin: "3px 0 24px", fontSize: 13 },
  remember: { color: "#71808c", fontWeight: 400 },
  link: { color: "#936b15", fontWeight: 700, textDecoration: "none" },
  submit: { width: "100%", padding: 15, border: 0, borderRadius: 8, color: "white", background: "#102940", fontSize: 15, fontWeight: 700, cursor: "pointer" },
  support: { textAlign: "center", fontSize: 12, color: "#71808c", marginTop: 27 },
  successPage: { minHeight: "100vh", display: "grid", placeItems: "center", background: "#f4f7f6", fontFamily: "Arial, sans-serif" },
  successCard: { background: "white", padding: 44, borderRadius: 16, textAlign: "center", boxShadow: "0 10px 35px rgba(16,41,64,.12)", maxWidth: 390 },
  successIcon: { margin: "0 auto 16px", width: 52, height: 52, borderRadius: "50%", display: "grid", placeItems: "center", background: "#e3f0e7", color: "#21703b", fontSize: 28 },
  successTitle: { color: "#102940", fontFamily: "Georgia, serif", fontSize: 32, margin: "0 0 10px" },
  successText: { color: "#71808c", lineHeight: 1.6 },
  outlineButton: { marginTop: 15, border: "1px solid #102940", borderRadius: 7, background: "white", color: "#102940", padding: "10px 18px", cursor: "pointer", fontWeight: 700 }
};

export default App;
