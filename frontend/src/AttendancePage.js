import React from "react";

function AttendancePage({ onBack }) {
  return (
    <div style={styles.page}>
      <div className="app-back-row">
        <button type="button" onClick={onBack} className="app-back-button">
          ← Back to Dashboard
        </button>
      </div>

      <iframe
        src="http://localhost:5173"
        title="Attendance Tracker"
        style={styles.frame}
      />
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f4f7f6",
  },

  frame: {
    flex: 1,
    width: "100%",
    border: "none",
  },
};

export default AttendancePage;