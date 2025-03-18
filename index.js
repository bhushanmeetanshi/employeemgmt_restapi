import express from "express";
import connectDB from "./config/connect.js"; // Database connection
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Employee Management API 🚀");
});

// Employee Routes
app.use("/api/employees", employeeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
