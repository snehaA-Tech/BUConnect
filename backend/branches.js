// This is the single list of valid branches used across the whole app.
// Company.eligibleBranches values must come from this list.
// If a new branch is ever added at Banasthali, add it here ONLY -
// both backend validation and frontend dropdown will pick it up automatically
// (frontend has its own copy in frontend/src/branches.js - keep both in sync).

const BRANCHES = [
  "CS-AI", // Computer Science - Artificial Intelligence
  "CS",    // Computer Science
  "IT",    // Information Technology
  "EC",    // Electronics and Communication
  "VLSI",  // VLSI Design
  "MT",    // Mechatronics
  "CE",    // Chemical Engineering
  "EE",    // Electrical and Electronics Engineering
  "EI",    // Electronics & Instrumentation
  "BT",    // Biotechnology
];

module.exports = BRANCHES;
