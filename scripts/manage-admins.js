import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import readline from "readline";

const MONGODB_URI =
  "mongodb+srv://LizAdams:Kcl5nuGBSuEtR96E@cluster0.2rpti.mongodb.net/theatom?retryWrites=true&w=majority";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "super-admin"], default: "admin" },
});

AdminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function manageAdmins() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to database");

    while (true) {
      console.log("\nAdmin Management Menu:");
      console.log("1. List all admins");
      console.log("2. Add new admin");
      console.log("3. Delete admin");
      console.log("4. Exit");

      const choice = await question("\nEnter your choice (1-4): ");

      switch (choice) {
        case "1":
          const admins = await Admin.find({}, "email role");
          console.log("\nCurrent Admin Users:");
          console.log("------------------");
          admins.forEach((admin, index) => {
            console.log(
              `${index + 1}. Email: ${admin.email}, Role: ${admin.role}`
            );
          });
          break;

        case "2":
          const email = await question("Enter email for new admin: ");
          const password = await question("Enter password for new admin: ");
          const role = await question("Enter role (admin/super-admin): ");

          try {
            const newAdmin = await Admin.create({ email, password, role });
            console.log(`Admin created successfully: ${newAdmin.email}`);
          } catch (error) {
            console.error("Error creating admin:", error.message);
          }
          break;

        case "3":
          const adminsToDelete = await Admin.find({}, "email");
          console.log("\nSelect admin to delete:");
          adminsToDelete.forEach((admin, index) => {
            console.log(`${index + 1}. ${admin.email}`);
          });

          const deleteChoice = await question(
            "\nEnter number of admin to delete: "
          );
          const adminToDelete = adminsToDelete[parseInt(deleteChoice) - 1];

          if (adminToDelete) {
            await Admin.deleteOne({ _id: adminToDelete._id });
            console.log(`Deleted admin: ${adminToDelete.email}`);
          } else {
            console.log("Invalid selection");
          }
          break;

        case "4":
          console.log("Exiting...");
          rl.close();
          await mongoose.connection.close();
          process.exit();
          break;

        default:
          console.log("Invalid choice");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    rl.close();
    await mongoose.connection.close();
    process.exit(1);
  }
}

manageAdmins();
