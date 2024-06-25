import { client } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

interface RequestBody {
  name: string;
  email: string;
  description: string;
  imageUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body
    const body: RequestBody = await request.json();

    // Destructure the parsed body
    const { name, email, description, imageUrl } = body;

    if (!name || !email || !description || !imageUrl) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    

    const finduserwithEmail = await client.comments.findUnique({
      where: {
        email: email,
      },
    });

    // if (finduserwithEmail) {
    //   return NextResponse.json({
    //     status: 400,
    //     message:
    //       "Comments is Already Present with this Email.you can add noly on time",
    //   });
    // }
    const newcomment = await client.comments.create({
      data: {
        name,
        email,
        description,
        imageUrl,
      },
    });
    return NextResponse.json({
      status: 200,
      data: newcomment,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
