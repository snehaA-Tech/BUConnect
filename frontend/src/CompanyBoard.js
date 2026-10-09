import React, { useState } from "react";
import BRANCHES from "./branches";
import QueryBoard from "./QueryBoard";

const MOCK_COMPANIES = [
  { _id: "1", name: "Flipkart", eligibleBranches: ["all"] },
  { _id: "2", name: "UBS", eligibleBranches: ["CS-AI", "CS", "IT", "EC"] },
  { _id: "3", name: "Sprinklr", eligibleBranches: ["CS-AI", "CS", "IT"] },
  { _id: "4", name: "Goldman Sachs", eligibleBranches: ["all"] },
  { _id: "5", name: "V-Guard", eligibleBranches: ["all"] },
  { _id: "6", name: "Cisco", eligibleBranches: ["all"] },
  { _id: "7", name: "AlgoUniversity", eligibleBranches: ["all"] },
  { _id: "8", name: "JP Morgan Chase", eligibleBranches: ["all"] },
  { _id: "9", name: "Texas", eligibleBranches: ["CS-AI", "CS", "IT"] },
  { _id: "10", name: "Barclays", eligibleBranches: ["CS-AI", "CS", "IT"] },
];

function CompanyBoard({ onBack, currentRole }) {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");

  const filteredCompanies = MOCK_COMPANIES.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesBranch =
      !branch ||
      company.eligibleBranches.includes("all") ||
      company.eligibleBranches.includes(branch);

    return matchesSearch && matchesBranch;
  });

  const formatBranches = (eligibleBranches) => {
    if (eligibleBranches.includes("all")) return "All Branches";
    return eligibleBranches;
  };

  return (
    <div style={styles.page}>
      <div className="app-back-row">
        <button
          type="button"
          onClick={onBack}
          className="app-back-button"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="company-board-shell" style={styles.shell}>
        <header className="company-board-header" style={styles.headerCard}>
          <p style={styles.eyebrow}>Career hub</p>
          <h1 style={styles.heading}>Placement Cell – Company Board</h1>
          <p style={styles.heroSubtitle}>Placement opportunities and branch eligibility across campus.</p>
        </header>

        <div style={styles.summaryRow}>
          <div style={styles.summaryCard}>
            <span style={styles.summaryValue}>{filteredCompanies.length}</span>
            <span style={styles.summaryLabel}>Companies listed</span>
          </div>
        </div>

        <div style={styles.filterBar}>
          <div style={styles.inputWrap}>
            <span style={styles.inputIcon}>⌕</span>
            <input
              type="text"
              placeholder="Search company name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.selectWrap}>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              style={styles.select}
            >
              <option value="">All Branches</option>

              {BRANCHES.map((b) => (
                <option key={b.code} value={b.code}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredCompanies.length === 0 && (
          <div style={styles.emptyState}>No companies found.</div>
        )}

        <div className="company-board-grid" style={styles.cardGrid}>
          {filteredCompanies.map((company) => (
            <div key={company._id} className="company-board-card" style={styles.card}>
              <div style={styles.cardTopRow}>
                <div style={styles.companyBadge}>Company</div>
                <div style={styles.dot} />
              </div>

              <h2 style={styles.companyName}>{company.name}</h2>

              <div style={styles.badgeGroup}>
                {[].concat(formatBranches(company.eligibleBranches)).map((branchName) => (
                  <span key={`${company._id}-${branchName}`} style={styles.badge}>
                    {branchName === "all" ? "All Branches" : branchName}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.futureSlot} />

        <QueryBoard currentRole={currentRole} />
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    boxSizing: "border-box",
    padding: "0 0 48px",
    background: "var(--color-ivory)",
    backgroundImage: "radial-gradient(circle at 15% 8%, rgba(122,31,61,0.05), transparent 40%), radial-gradient(circle at 85% 30%, rgba(193,144,46,0.07), transparent 45%)",
    fontFamily: "var(--font-ui)",
    color: "var(--color-ink)",
  },

  shell: {
    maxWidth: "1080px",
    margin: "0 auto",
    padding: "0 24px",
    boxSizing: "border-box",
  },

  headerCard: {
    padding: "22px 12px 18px",
    textAlign: "center",
  },

  eyebrow: {
    margin: "0 0 10px",
    color: "var(--color-teal)",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "700",
  },

  heading: {
    margin: "0 auto",
    color: "var(--color-maroon-deep)",
    fontFamily: "var(--font-ui)",
    fontSize: "40px",
    fontWeight: "600",
    lineHeight: 1.18,
  },

  heroSubtitle: {
    margin: "12px auto 0",
    color: "var(--color-ink-soft)",
    fontSize: "16px",
    lineHeight: 1.6,
    maxWidth: "620px",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "center",
    margin: "24px auto 30px",
  },

  summaryCard: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    gap: "10px",
    minWidth: "210px",
    padding: "12px 18px",
    background: "var(--color-paper-card)",
    border: "1px solid var(--color-line)",
    borderRadius: "var(--radius-card)",
    boxShadow: "var(--shadow-card)",
  },

  summaryValue: {
    color: "#16325c",
    fontFamily: "Inter, sans-serif",
    fontSize: "26px",
    fontWeight: "600",
  },

  summaryLabel: {
    color: "var(--color-ink-soft)",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  filterBar: {
    display: "flex",
    gap: "14px",
    marginBottom: "22px",
    flexWrap: "wrap",
  },

  inputWrap: {
    position: "relative",
    flex: 1,
    minWidth: "220px",
  },

  inputIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "18px",
    color: "var(--color-teal-deep)",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px 12px 42px",
    borderRadius: "7px",
    border: "1px solid var(--color-line)",
    background: "var(--color-white)",
    color: "var(--color-ink)",
    fontSize: "14px",
    fontFamily: "inherit",
    boxShadow: "0 4px 12px rgba(43, 27, 31, 0.025)",
  },

  selectWrap: {
    minWidth: "220px",
  },

  select: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "7px",
    border: "1px solid var(--color-line)",
    background: "var(--color-white)",
    color: "var(--color-ink)",
    fontSize: "14px",
    fontFamily: "inherit",
    boxShadow: "0 4px 12px rgba(43, 27, 31, 0.025)",
  },

  emptyState: {
    background: "var(--color-paper-card)",
    border: "1px solid var(--color-line)",
    borderRadius: "var(--radius-card)",
    padding: "18px 20px",
    color: "#5b6269",
    marginBottom: "20px",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "16px",
  },

  card: {
    background: "var(--color-white)",
    borderRadius: "var(--radius-card)",
    padding: "21px 18px 19px",
    minHeight: "150px",
  },

  cardTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
  },

  companyBadge: {
    color: "var(--color-teal-deep)",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },

  dot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "var(--color-gold)",
  },

  companyName: {
    color: "var(--color-maroon-deep)",
    margin: "0 0 15px",
    fontFamily: "var(--font-ui)",
    fontSize: "25px",
    fontWeight: "600",
    lineHeight: 1.2,
  },

  badgeGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },

  badge: {
    padding: "5px 8px",
    borderRadius: "4px",
    background: "var(--color-paper-card)",
    border: "1px solid var(--color-line)",
    color: "var(--color-ink-soft)",
    fontSize: "11px",
    fontWeight: "600",
  },

  futureSlot: {
    height: "18px",
    marginTop: "6px",
    marginBottom: "14px",
  },
};

export default CompanyBoard;