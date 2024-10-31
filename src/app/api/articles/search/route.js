import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  try {
    await dbConnect();

    let articles;
    if (query) {
      articles = await Article.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { author: { $regex: query, $options: "i" } },
          { "content.text": { $regex: query, $options: "i" } },
          { tags: { $regex: query, $options: "i" } },
        ],
      }).sort({ publishDate: -1 });
    } else {
      articles = await Article.find({}).sort({ publishDate: -1 });
    }

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
