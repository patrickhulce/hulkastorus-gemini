import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import AWS from "aws-sdk";

const s3 = new AWS.S3();

export async function GET(request: Request, {params}: {params: {pseudo_id: string}}) {
  const {pseudo_id} = params;

  const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
  if (!R2_BUCKET_NAME) {
    return NextResponse.json({message: "R2_BUCKET_NAME is not defined"}, {status: 500});
  }

  try {
    const file = await prisma.file.findUnique({
      where: {id: pseudo_id},
    });

    if (!file) {
      return NextResponse.json({message: "File not found"}, {status: 404});
    }

    // Authorization check (only public files are directly downloadable via this route)
    if (file.permissions !== "public") {
      // For private files, redirect to login or a specific unauthorized page
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const presignedUrl = s3.getSignedUrl("getObject", {
      Bucket: R2_BUCKET_NAME,
      Key: file.r2_locator,
      Expires: 60 * 5, // 5 minutes
    });

    return NextResponse.redirect(presignedUrl);
  } catch (error) {
    console.error("Error generating public download URL:", error);
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
}
