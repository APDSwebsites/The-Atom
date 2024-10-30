import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const envPath = join(__dirname, "../.env.local");
console.log("Looking for .env.local at:", envPath);
dotenv.config({ path: envPath });

// Verify MONGODB_URI is loaded
console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);

// If MONGODB_URI is not found, use a direct connection string
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://LizAdams:Kcl5nuGBSuEtR96E@cluster0.2rpti.mongodb.net/theatom?retryWrites=true&w=majority";

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  role: {
    type: String,
    enum: ["admin", "super-admin"],
    default: "admin",
  },
});

// Hash password before saving
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function createAdmin() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to database");

    const adminData = {
      email: "sethshuey1@gmail.com", // Change this to your email
      password: "Fr@nkF0rd", // Change this to your desired password
      role: "admin",
    };

    console.log("Creating admin user...");
    const admin = await Admin.create(adminData);

    console.log("Admin user created successfully:", admin.email);
  } catch (error) {
    console.error("Detailed error:", error);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
}

createAdmin();
