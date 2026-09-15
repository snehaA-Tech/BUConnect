const mongoose = require("mongoose");
const BRANCHES = require("../branches");

// One document in the "companies" collection = one company card on the frontend.
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    ctc: {
      type: String, // kept as a string like "12 LPA" so it's easy to display as-is
      required: true,
    },
    oaDate: {
      type: Date,
      required: true,
    },
    interviewDate: {
      type: Date, // optional - not every company has announced this yet
    },
    // "all" means every branch is eligible. Otherwise it's an array of branch
    // codes from the BRANCHES list, e.g. ["CS-AI", "CS", "IT"]
    eligibleBranches: {
      type: [String],
      required: true,
      validate: {
        validator: function (branches) {
          if (branches.length === 1 && branches[0] === "all") return true;
          return branches.every((b) => BRANCHES.includes(b));
        },
        message: "eligibleBranches must be 'all' or valid branch codes",
      },
    },
    minCGPA: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
