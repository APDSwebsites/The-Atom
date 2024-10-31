import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Ad from "@/models/Ad";
import { auth } from "@/auth";

export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user?.role) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    await Ad.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Ad deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user?.role) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    await dbConnect();
    const ad = await Ad.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(ad);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
