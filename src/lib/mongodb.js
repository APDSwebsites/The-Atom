import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Validate the URI format
function validateMongoDBUri(uri) {
  console.log("Validating MongoDB URI format...");

  try {
    const url = new URL(uri);
    if (!url.protocol.includes("mongodb")) {
      throw new Error(
        "Invalid protocol - must be mongodb:// or mongodb+srv://"
      );
    }
    if (!url.hostname) {
      throw new Error("Invalid hostname");
    }
    if (!url.pathname || url.pathname === "/") {
      throw new Error("Database name not specified in URI");
    }
    console.log("URI format validation passed");
    return true;
  } catch (error) {
    console.error("URI validation error:", error.message);
    throw new Error(`Invalid MongoDB URI: ${error.message}`);
  }
}

const MONGODB_URI = process.env.MONGODB_URI;

// Validate URI before attempting connection
validateMongoDBUri(MONGODB_URI);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  try {
    if (cached.conn) {
      console.log("Using cached connection");
      return cached.conn;
    }

    if (!cached.promise) {
      console.log("Creating new MongoDB connection...");

      cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
        console.log("MongoDB connected successfully");
        return mongoose;
      });
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("MongoDB connection error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });
    throw error;
  }
}

// Connection event listeners
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

export default dbConnect;
