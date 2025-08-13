import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/lib/prisma";
import AWS from "aws-sdk";

const s3 = new AWS.S3();

export async function GET(request: Request, {params}: {params: {id: string}}) {
  const session = await getServerSession(authOptions);
  const {id} = params;

  const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
  if (!R2_BUCKET_NAME) {
    return NextResponse.json({message: "R2_BUCKET_NAME is not defined"}, {status: 500});
  }

  try {
    const file = await prisma.file.findUnique({
      where: {id},
    });

    if (!file) {
      return NextResponse.json({message: "File not found"}, {status: 404});
    }

    // Authorization check
    let authorized = false;
    if (file.permissions === "public") {
      authorized = true;
    } else if (session && session.user && session.user.id === file.user_id) {
      authorized = true;
    } else {
      // TODO: Implement API key and token authorization
    }

    if (!authorized) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const presignedUrl = s3.getSignedUrl("getObject", {
      Bucket: R2_BUCKET_NAME,
      Key: file.r2_locator,
      Expires: 60 * 5, // 5 minutes
    });

    return NextResponse.json({downloadUrl: presignedUrl});
  } catch (error) {
    console.error("Error generating download URL:", error);
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
}
