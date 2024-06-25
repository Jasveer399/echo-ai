import { client } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  try {
    const allcomment = await client.comments.findMany();
    if (!allcomment) {
        return NextResponse.json({
          status: 404,
          message: "No Feedback found",
        });
    }
    return NextResponse.json({
      status: 200,
      data: allcomment,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
