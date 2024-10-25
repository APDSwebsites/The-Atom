import { NextResponse } from "next/server";

export const config = {
  runtime: "nodejs",
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Convert file to base64 for storing in MongoDB
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = buffer.toString("base64");

    // Generate a unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;

    // Instead of saving to filesystem, return the base64 data
    // You would typically save this to MongoDB along with the article
    return NextResponse.json({
      success: true,
      imageData: {
        filename,
        contentType: file.type,
        base64Data: base64String,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
