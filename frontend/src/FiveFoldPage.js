import React from "react";

function FiveFoldPage({ onBack }) {
  return (
    <div style={styles.page}>
      <div className="app-back-row">
        <button type="button" onClick={onBack} className="app-back-button">
          ← Back to Dashboard
        </button>
      </div>

      <iframe
        src="http://127.0.0.1:5500/"
        title="FiveFold"
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

export default FiveFoldPage;