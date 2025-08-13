import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/lib/prisma";
import AWS from "aws-sdk";

const s3 = new AWS.S3();

export async function PUT(request: Request, {params}: {params: {id: string}}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({message: "Unauthorized"}, {status: 401});
  }

  const {id} = params;
  const {status} = await request.json();

  if (!status) {
    return NextResponse.json({message: "Missing status field"}, {status: 400});
  }

  const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
  if (!R2_BUCKET_NAME) {
    return NextResponse.json({message: "R2_BUCKET_NAME is not defined"}, {status: 500});
  }

  try {
    const file = await prisma.file.findUnique({
      where: {id},
    });

    if (!file || file.user_id !== session.user.id) {
      return NextResponse.json({message: "File not found or unauthorized"}, {status: 404});
    }

    // Verify file in S3 (optional, but good for integrity)
    try {
      await s3
        .headObject({
          Bucket: R2_BUCKET_NAME,
          Key: file.r2_locator,
        })
        .promise();
    } catch (s3Error: unknown) {
      if (s3Error instanceof Error) {
        console.error("S3 headObject error:", s3Error.message);
      } else {
        console.error("S3 headObject error:", s3Error);
      }
      await prisma.file.update({
        where: {id},
        data: {status: "failed"},
      });
      return NextResponse.json({message: "File verification failed"}, {status: 400});
    }

    const updatedFile = await prisma.file.update({
      where: {id},
      data: {status: status === "uploaded" ? "uploaded" : "validated"}, // Can be 'uploaded' or 'validated'
    });

    return NextResponse.json(updatedFile);
  } catch (error) {
    console.error("Error updating file status:", error);
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
}
