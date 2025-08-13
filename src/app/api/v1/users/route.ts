import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {Prisma} from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {email, password, first_name, last_name, invite_code} = body;

    // Basic validation (as per requirement, no extensive validation)
    if (!email || !password) {
      return NextResponse.json({error: "Email and password are required"}, {status: 400});
    }

    // Create user using Prisma
    const user = await prisma.user.create({
      data: {
        email,
        password, // In a real app, hash this password!
        first_name,
        last_name,
        invite_code,
        // is_email_verified defaults to false
      },
    });

    return NextResponse.json({id: user.id, email: user.email}, {status: 201});
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Unique constraint failed
        return NextResponse.json({error: "Email already exists"}, {status: 409});
      }
    }
    console.error("Error creating user:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
