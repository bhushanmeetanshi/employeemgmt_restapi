import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

// CREATE Employee
router.post("/register", async (req, res) => {
  try {
    const { username, email, phone } = req.body;

    // Check for existing email, username, or phone
    const existingEmployee = await Employee.findOne({
      $or: [{ email }, { username }, { phone }],
    });

    if (existingEmployee) {
      let errorMessage = "Duplicate value found: ";
      if (existingEmployee.email === email) errorMessage += "Email ";
      if (existingEmployee.username === username) errorMessage += "Username ";
      if (existingEmployee.phone === phone) errorMessage += "Phone ";
      return res
        .status(400)
        .json({ error: errorMessage.trim() + "already exists" });
    }

    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "username",
      "password",
      "role",
      "status",
      "salary",
      "phone",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({
      status: true,
      message: "Employee registered successfully",
      employee,
    });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

// READ Employee (GET by ID)
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE Employee
router.put("/:id", async (req, res) => {
  try {
    console.log(req.body); // Log for debugging

    // Specific validation for 'first_name'
    if (!req.body.first_name || req.body.first_name.trim() === "") {
      return res
        .status(400)
        .json({ status: false, message: "Firstname cannot be blank" });
    }

    // General validation for all fields
    const fields = Object.keys(req.body);
    for (const field of fields) {
      if (!req.body[field] || req.body[field].toString().trim() === "") {
        return res
          .status(400)
          .json({ status: false, message: `${field} cannot be blank` });
      }
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!employee) {
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Employee updated successfully" });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

// GET All Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE Employee
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
