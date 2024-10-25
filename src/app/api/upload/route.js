import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
    const path = join(process.cwd(), "public/uploads", filename);

    await writeFile(path, buffer);

    return NextResponse.json({
      success: true,
      imageUrl: `/uploads/${filename}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
