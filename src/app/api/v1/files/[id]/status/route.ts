import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, {params}: {params: {id: string}}) {
  const fileId = params.id;
  const {status} = await req.json();

  if (!status) {
    return NextResponse.json({error: "Missing status field"}, {status: 400});
  }

  try {
    const updatedFile = await prisma.file.update({
      where: {id: fileId},
      data: {status},
    });
    return NextResponse.json(updatedFile);
  } catch (error) {
    console.error("Error updating file status:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
