import { startS3MockServer } from "./e2e/utils";

export default async function globalSetup() {
  console.log("Starting S3 mock server...");
  const s3 = await startS3MockServer();
  // Store the S3 instance globally if needed by tests
  (global as any).__S3_INSTANCE__ = s3;
  console.log("S3 mock server started.");
}
