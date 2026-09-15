// This script inserts the companies you gave me into the database in one go.
// Run it with: npm run seed
// It's safe to run again later - it clears old companies first, then re-inserts.

require("dotenv").config();
const mongoose = require("mongoose");
const Company = require("./models/Company");

// Shorthand branch groups so we don't repeat ourselves below
const AI_CS_IT_EC = ["CS-AI", "CS", "IT", "EC"];
const AI_CS_IT = ["CS-AI", "CS", "IT"];
const ALL = ["all"];

// NOTE: oaDate is currently a placeholder (TBA) for every company, since you
// mentioned you only have company names + eligible branches for now.
// Update each oaDate below once your placement cell shares real dates -
// that's the only thing you'll need to change per company later.
const companies = [
  {
    name: "Flipkart",
    role: "Software Engineer",
    ctc: "TBA",
    oaDate: new Date("2026-12-31"), // placeholder
    eligibleBranches: ALL,
    minCGPA: 0,
  },
  {
    name: "UBS",
    role: "Software Engineer",
    ctc: "TBA",
    oaDate: new Date("2026-12-31"),
    eligibleBranches: AI_CS_IT_EC,
    minCGPA: 0,
  },
  {
    name: "Sprinklr",
    role: "Software Engineer",
    ctc: "TBA",
    oaDate: new Date("2026-12-31"),
    eligibleBranches: AI_CS_IT,
    minCGPA: 0,
  },
  {
    name: "Goldman Sachs",
    role: "Analyst",
    ctc: "TBA",
    oaDate: new Date("2026-12-31"),
    eligibleBranches: ALL,
    minCGPA: 0,
  },
  {
    name: "V-Guard",
    role: "Management Trainee",
    ctc: "TBA",
    oaDate: new Date("2026-12-31"),
    eligibleBranches: ALL,
    minCGPA: 0,
  },
  {
    name: "Cisco",
    role: "Software Engineer",
    ctc: "TBA",
    oaDate: new Date("2026-12-31"),
    eligibleBranches: ALL,
    minCGPA: 0,
  },
  {
    name: "AlgoUniversity",
    role: "Software Engineer",
    ctc: "TBA",
    oaDate: new Date("2026-12-31"),
    eligibleBranches: ALL,
    minCGPA: 0,
  },
  {
    name: "JP Morgan Chase",
    role: "Analyst",
    ctc: "TBA",
    oaDate: new Date("2026-12-31"),
    eligibleBranches: ALL,
    minCGPA: 0,
  },
  {
    name: "Texas Instruments",
    role: "Software Engineer",
    ctc: "TBA",
    oaDate: new Date("2026-12-31"),
    eligibleBranches: AI_CS_IT,
    minCGPA: 0,
  },
  {
    name: "Barclays",
    role: "Analyst",
    ctc: "TBA",
    oaDate: new Date("2026-12-31"),
    eligibleBranches: AI_CS_IT,
    minCGPA: 0,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Company.deleteMany({}); // clear old data so re-running doesn't duplicate
    await Company.insertMany(companies);

    console.log(`Inserted ${companies.length} companies successfully.`);
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
