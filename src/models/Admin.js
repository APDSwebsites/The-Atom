import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

AdminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const Admin = mongoose.models?.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
