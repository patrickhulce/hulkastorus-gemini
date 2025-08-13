import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {nanoid} from "nanoid";

const prisma = new PrismaClient();

const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const limit = searchParams.get("limit") || "10";
  const offset = searchParams.get("offset") || "0";
  const orderBy = searchParams.get("order_by") || "created_at+desc";

  // TODO: Implement actual file listing from database
  const files = [
    {
      id: "file1",
      filename: "model.ckpt",
      size_bytes: 2.1 * 1024 * 1024 * 1024,
      created_at: new Date().toISOString(),
    },
    {
      id: "file2",
      filename: "notes.txt",
      size_bytes: 4 * 1024,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "file3",
      filename: "image.jpg",
      size_bytes: 10 * 1024 * 1024,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return NextResponse.json(files);
}

export async function POST(req: Request) {
  const {filename, mime_type, size_bytes, userId, directoryId} = await req.json();

  if (!filename || !mime_type || !size_bytes || !userId || !directoryId) {
    return NextResponse.json({error: "Missing required fields"}, {status: 400});
  }

  const fileId = nanoid();
  const r2Locator = `uploads/${userId}/${fileId}`;

  try {
    // Create a file record in the database
    const file = await prisma.file.create({
      data: {
        id: fileId,
        user: {connect: {id: userId}},
        directory: {connect: {id: directoryId}},
        status: "reserved",
        r2_locator: r2Locator,
        filename,
        mime_type,
        size_bytes,
        permissions: "private", // Default to private for now
        expiration_policy: "infinite", // Default to infinite for now
        full_path: `/${directoryId}/${filename}`, // Assuming directoryId is the path for now
      },
    });

    // Generate a presigned URL for R2 upload
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: r2Locator,
      ContentType: mime_type,
    });

    const presignedUrl = await getSignedUrl(R2, putObjectCommand, {expiresIn: 3600}); // URL expires in 1 hour

    return NextResponse.json({fileId, presignedUrl});
  } catch (error) {
    console.error("Error creating file record or presigned URL:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
