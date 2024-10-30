import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://LizAdams:Kcl5nuGBSuEtR96E@cluster0.2rpti.mongodb.net/theatom?retryWrites=true&w=majority";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "super-admin"], default: "admin" },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function listAdmins() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to database");

    const admins = await Admin.find({}, "email role");
    console.log("\nCurrent Admin Users:");
    console.log("------------------");
    admins.forEach((admin, index) => {
      console.log(
        `${index + 1}. Email: ${admin.email}, Role: ${admin.role}, ID: ${
          admin._id
        }`
      );
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
}

listAdmins();
