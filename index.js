import express from "express";
import connectDB from "./config/connect.js"; // Database connection
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000; // Use dynamic port for Vercel

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes); // Mount employee routes

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Employee API!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app; // Required for Vercel deployment
