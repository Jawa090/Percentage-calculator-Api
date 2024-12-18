const express = require("express");
const cors = require("cors");
const calculationController = require("./api/calculationController");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", calculationController);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
