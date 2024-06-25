import { UploadImage } from "@/lib/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (res: NextRequest) => {
  try {
    const formData = await res.formData();
    const image = formData.get("image") as unknown as File;

    const data = await UploadImage(image, "next-images");

    return NextResponse.json({ data: data, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, status: 400 });
  }
};
