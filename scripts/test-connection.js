// Save this as scripts/test-connection.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function testConnection() {
  try {
    console.log("Testing MongoDB connection...");
    console.log("URI:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection successful!");

    await mongoose.connection.close();
    console.log("Connection closed.");
  } catch (error) {
    console.error("Connection test failed:", error);
  } finally {
    process.exit();
  }
}

testConnection();
