import React from "react";

function Dashboard({ onSelect }) {
  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.hero}>
          <div style={styles.campusMark} aria-hidden="true">
            <span style={styles.markGold} />
            <span style={styles.markTeal} />
            <span style={styles.markMaroon} />
            <span style={styles.markTeal} />
            <span style={styles.markGold} />
          </div>
          <div style={styles.eyebrowRow}>
            <span style={styles.eyebrowText}>Banasthali Vidyapith · Campus Portal</span>
          </div>

          <h1 style={styles.heading}>BUConnect</h1>
          <p style={styles.subheading}>
            One campus, every connection. Attendance, guidance, and placement support in one place.
          </p>
        </header>

        <div style={styles.metricRow}>
          <div style={{ ...styles.metricBox, ...styles.metricMaroon }}>
            <span style={styles.metricValue}>3</span>
            <span style={styles.metricLabel}>Modules</span>
          </div>
          <div style={{ ...styles.metricBox, ...styles.metricTeal }}>
            <span style={styles.metricValue}>24/7</span>
            <span style={styles.metricLabel}>Access</span>
          </div>
          <div style={{ ...styles.metricBox, ...styles.metricGold }}>
            <span style={styles.metricValue}>Live</span>
            <span style={styles.metricLabel}>Campus sync</span>
          </div>
        </div>

        <h2 style={styles.sectionHeading}>Campus services</h2>
        <div style={styles.cards}>
          <button style={{ ...styles.card, ...styles.cardTeal }} onClick={() => onSelect("attendance")}>
            <div style={styles.cardTop}>
              <div style={{ ...styles.iconWrap, ...styles.iconTeal }}>✓</div>
              <span style={styles.cardTag}>Academic</span>
            </div>
            <h2 style={styles.cardTitle}>Attendance Tracker</h2>
            <p style={styles.cardText}>Track classes, monitor attendance health, and stay ahead of alerts.</p>
            <span style={styles.cardAction}>Open module <span aria-hidden="true">→</span></span>
          </button>

          <button style={{ ...styles.card, ...styles.cardGold }} onClick={() => onSelect("fivefold")}>
            <div style={styles.cardTop}>
              <div style={{ ...styles.iconWrap, ...styles.iconGold }}>✦</div>
              <span style={styles.cardTag}>Guidance</span>
            </div>
            <h2 style={styles.cardTitle}>FiveFold</h2>
            <p style={styles.cardText}>Explore Banasthali activities, student support, and campus guidance.</p>
            <span style={styles.cardAction}>Open module <span aria-hidden="true">→</span></span>
          </button>

          <button style={{ ...styles.card, ...styles.cardMaroon }} onClick={() => onSelect("placement")}>
            <div style={styles.cardTop}>
              <div style={{ ...styles.iconWrap, ...styles.iconMaroon }}>▣</div>
              <span style={styles.cardTag}>Career</span>
            </div>
            <h2 style={styles.cardTitle}>Placement Cell</h2>
            <p style={styles.cardText}>Browse companies, filter by branch, and manage placement queries.</p>
            <span style={styles.cardAction}>Open module <span aria-hidden="true">→</span></span>
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "var(--color-ivory)",
    backgroundImage: "radial-gradient(circle at 15% 8%, rgba(122,31,61,0.05), transparent 40%), radial-gradient(circle at 85% 30%, rgba(193,144,46,0.07), transparent 45%)",
    padding: "40px 24px 64px",
    fontFamily: "var(--font-ui)",
    color: "var(--color-ink)",
  },

  shell: {
    maxWidth: "1080px",
    margin: "0 auto",
  },

  hero: {
    padding: "12px 18px 0",
    textAlign: "center",
  },

  campusMark: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    height: "16px",
    marginBottom: "18px",
  },

  markGold: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "var(--color-gold)",
    opacity: 0.65,
  },

  markTeal: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "var(--color-teal)",
    opacity: 0.65,
  },

  markMaroon: {
    width: "11px",
    height: "11px",
    borderRadius: "50%",
    background: "var(--color-maroon)",
  },

  eyebrowRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12px",
  },

  eyebrowText: {
    fontSize: "12px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontWeight: "700",
    color: "var(--color-teal)",
  },

  heading: {
    margin: "0 auto 10px",
    fontFamily: "var(--font-ui)",
    fontSize: "48px",
    lineHeight: 1.12,
    fontWeight: "700",
    color: "var(--color-maroon-deep)",
    maxWidth: "800px",
  },

  subheading: {
    margin: "12px auto 0",
    color: "var(--color-ink-soft)",
    fontSize: "17px",
    lineHeight: 1.65,
    maxWidth: "650px",
  },

  metricRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
    maxWidth: "850px",
    margin: "26px auto 36px",
  },

  metricBox: {
    background: "var(--color-paper-card)",
    border: "1px solid var(--color-line)",
    borderRadius: "var(--radius-card)",
    padding: "16px",
    textAlign: "center",
    boxShadow: "var(--shadow-card)",
  },

  metricMaroon: {
    borderTop: "3px solid var(--color-maroon)",
  },

  metricTeal: {
    borderTop: "3px solid var(--color-teal)",
  },

  metricGold: {
    borderTop: "3px solid var(--color-gold)",
  },

  metricValue: {
    display: "block",
    fontFamily: "var(--font-ui)",
    fontSize: "27px",
    lineHeight: 1.2,
    fontWeight: "600",
    marginBottom: "4px",
    color: "var(--color-ink)",
  },

  metricLabel: {
    display: "block",
    fontSize: "11px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--color-ink-soft)",
    fontWeight: "600",
  },

  sectionHeading: {
    margin: "0",
    textAlign: "center",
    fontFamily: "var(--font-ui)",
    fontSize: "29px",
    fontWeight: "600",
    color: "var(--color-maroon-deep)",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "18px",
    marginTop: "20px",
  },

  card: {
    width: "100%",
    minHeight: "230px",
    padding: "22px 22px 18px",
    background: "linear-gradient(145deg, var(--color-white), var(--color-paper-card))",
    border: "1px solid var(--color-line)",
    borderTop: "3px solid var(--color-line)",
    borderRadius: "var(--radius-card)",
    cursor: "pointer",
    boxShadow: "var(--shadow-card)",
    color: "var(--color-ink)",
    textAlign: "left",
    font: "inherit",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
  },

  cardTeal: {
    borderTopColor: "var(--color-teal)",
  },

  cardGold: {
    borderTopColor: "var(--color-gold)",
  },

  cardMaroon: {
    borderTopColor: "var(--color-maroon)",
  },

  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  iconWrap: {
    width: "48px",
    height: "48px",
    borderRadius: "var(--radius-card)",
    display: "grid",
    placeItems: "center",
    fontSize: "20px",
    fontWeight: "700",
    border: "1px solid var(--color-line)",
    boxShadow: "0 4px 14px rgba(43,27,31,0.07)",
  },

  iconTeal: {
    background: "#EAF5F2",
    color: "var(--color-teal-deep)",
  },

  iconGold: {
    background: "#F4EBD8",
    color: "var(--color-maroon-deep)",
  },

  iconMaroon: {
    background: "#F0DCC7",
    color: "var(--color-maroon)",
  },

  cardTag: {
    display: "inline-flex",
    alignItems: "center",
    color: "var(--color-teal-deep)",
    fontSize: "10px",
    letterSpacing: "0.14em",
    fontWeight: "700",
    textTransform: "uppercase",
  },

  cardTitle: {
    margin: "0 0 12px",
    fontFamily: "var(--font-ui)",
    fontSize: "23px",
    lineHeight: 1.2,
    color: "var(--color-ink)",
    fontWeight: "600",
  },

  cardText: {
    margin: 0,
    color: "var(--color-ink-soft)",
    lineHeight: 1.7,
    fontSize: "14px",
  },

  cardAction: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "18px",
    paddingTop: "12px",
    borderTop: "1px solid var(--color-line)",
    color: "var(--color-maroon)",
    fontSize: "13px",
    fontWeight: "700",
  },
};

export default Dashboard;