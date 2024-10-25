import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";

export async function POST(request) {
  try {
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Database connected successfully");

    const data = await request.json();
    console.log("Received data:", data);

    const article = await Article.create(data);
    console.log("Article created:", article);

    return NextResponse.json({ success: true, data: article }, { status: 201 });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const articles = await Article.find({}).sort({ publishDate: -1 });
    return NextResponse.json({ success: true, data: articles });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 400 }
    );
  }
}
