import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();
    const article = await Article.create(data);

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const articles = await Article.find({}).sort({ publishDate: -1 });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
