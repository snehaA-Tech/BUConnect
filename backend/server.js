require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const companyRoutes = require("./routes/companyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/companies", companyRoutes);

app.get("/", (req, res) => {
  res.send("Company Board backend is running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
