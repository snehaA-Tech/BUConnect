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
  { _id: "9", name: "Texas ", eligibleBranches: ["CS-AI", "CS", "IT"] },
  { _id: "10", name: "Barclays", eligibleBranches: ["CS-AI", "CS", "IT"] },
];

function App() {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  

  const filteredCompanies = MOCK_COMPANIES.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase());
    const matchesBranch =
      !branch || company.eligibleBranches.includes("all") || company.eligibleBranches.includes(branch);
      
    return matchesSearch && matchesBranch;
  });

  const formatBranches = (eligibleBranches) => {
    if (eligibleBranches.includes("all")) return "All Branches";
    return eligibleBranches.join(", ");
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Placement Cell — Company Board</h1>

      <div style={styles.filterBar}>
        <input
          type="text"
          placeholder="Search company name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <select value={branch} onChange={(e) => setBranch(e.target.value)} style={styles.select}>
          <option value="">All Branches</option>
          {BRANCHES.map((b) => (
            <option key={b.code} value={b.code}>
              {b.label}
            </option>
          ))}
        </select>
      </div>

      {filteredCompanies.length === 0 && <p>No companies found.</p>}

      <div style={styles.cardGrid}>
        {filteredCompanies.map((company) => (
          <div key={company._id} style={styles.card}>
            <h2 style={styles.companyName}>{company.name}</h2>
            <p><b>Eligible:</b> {formatBranches(company.eligibleBranches)}</p>
          </div>
        ))}

      </div>
      <QueryBoard />
    </div>
  );
}

const styles = {
  page: { fontFamily: "Arial, sans-serif", padding: "24px", maxWidth: "1000px", margin: "0 auto" },
  heading: { color: "#16325c" },
  filterBar: { display: "flex", gap: "12px", marginBottom: "20px" },
  input: { padding: "8px 12px", flex: 1, borderRadius: "6px", border: "1px solid #ccc" },
  select: { padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" },
  card: { border: "1px solid #ddd", borderRadius: "10px", padding: "16px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" },
  companyName: { color: "#0f4d2e", marginTop: 0 },
};

export default App;