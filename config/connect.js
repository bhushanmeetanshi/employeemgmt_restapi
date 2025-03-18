import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // ⏱️ Reduce timeout to 5 seconds
      socketTimeoutMS: 45000, // ⚙️ Adjust socket timeout for stability
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit process on connection error
  }
};

export default connectDB;
