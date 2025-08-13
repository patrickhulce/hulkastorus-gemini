import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {Prisma} from "@prisma/client";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {email, password, first_name, last_name, invite_code} = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({error: "Email and password are required"}, {status: 400});
    }

    // Invite code check
    if (invite_code !== "WELCOMETOTHEPARTYPAL") {
      return NextResponse.json({error: "Invalid invite code"}, {status: 403});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user using Prisma
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        invite_code,
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
