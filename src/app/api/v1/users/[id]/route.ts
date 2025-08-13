import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {Prisma} from "@prisma/client";

export async function DELETE(request: Request, context: {params: Promise<{id: string}>}) {
  try {
    const {id} = await context.params;

    if (!id) {
      return NextResponse.json({error: "User ID is required"}, {status: 400});
    }

    // Delete user using Prisma
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      {message: `User with ID ${user.id} deleted successfully`},
      {status: 200},
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // Record to delete does not exist
        return NextResponse.json({error: "User not found"}, {status: 404});
      }
    }
    console.error("Error deleting user:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
