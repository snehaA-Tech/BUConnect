const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// GET /api/companies
// Supports: /api/companies?branch=CS&search=flip
router.get("/", async (req, res) => {
  try {
    const { branch, search } = req.query;
    let filter = {};

    if (branch) {
      // A company matches if it's eligible for "all" branches,
      // OR if the requested branch is in its eligibleBranches array.
      filter.$or = [{ eligibleBranches: "all" }, { eligibleBranches: branch }];
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const companies = await Company.find(filter).sort({ oaDate: 1 });
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching companies", error: err.message });
  }
});

// GET /api/companies/:id
router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: "Error fetching company", error: err.message });
  }
});

// POST /api/companies  (admin adds a new company)
router.post("/", async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    const saved = await newCompany.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error creating company", error: err.message });
  }
});

module.exports = router;
