import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Ad from "@/models/Ad";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.role) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get("title");
    const externalLink = formData.get("externalLink");
    const image = formData.get("image");

    let imageData = null;
    if (image) {
      const buffer = await image.arrayBuffer();
      const base64Data = Buffer.from(buffer).toString("base64");
      imageData = {
        contentType: image.type,
        base64Data,
      };
    }

    await dbConnect();
    const ad = await Ad.create({
      title,
      externalLink,
      imageData,
      isActive: true,
    });

    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    console.error("Error creating ad:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const ads = await Ad.find({}).sort({ createdAt: -1 });
    return NextResponse.json(ads);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
