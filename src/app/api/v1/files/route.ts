import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import AWS from "aws-sdk";
import { nanoid } from "nanoid";

const s3 = new AWS.S3();

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // TODO: Implement quota check
  // TODO: Implement email verification check

  const { filename, mime_type, size_bytes, directory_id } = await request.json();

  if (!filename || !mime_type || !size_bytes) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  const fileId = nanoid();
  const r2Locator = `uploads/${user.id}/${fileId}`;

  try {
    const file = await prisma.file.create({
      data: {
        id: fileId,
        user_id: user.id,
        directory_id: directory_id || user.id, // Default to user's root directory
        status: "reserved",
        r2_locator: r2Locator,
        filename,
        mime_type,
        size_bytes,
        expiration_policy: "infinite", // Default
        permissions: "private", // Default
        full_path: `${directory_id || user.id}/${filename}`, // Placeholder
      },
    });

    const presignedUrl = s3.getSignedUrl("putObject", {
      Bucket: process.env.R2_BUCKET_NAME,
      Key: r2Locator,
      Expires: 60 * 5, // 5 minutes
      ContentType: mime_type,
      ContentLength: size_bytes,
    });

    return NextResponse.json({ fileId: file.id, presignedUrl });
  } catch (error) {
    console.error("Error creating file or presigned URL:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
