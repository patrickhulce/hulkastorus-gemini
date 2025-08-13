import S3rver from "s3rver";
import AWS from "aws-sdk";

let s3Server: S3rver | null = null;

export const startS3MockServer = async () => {
  s3Server = new S3rver({
    port: 4569,
    silent: true,
    directory: "/tmp/s3rver_test_directory", // Use a temporary directory
  });

  await s3Server.run();

  AWS.config.update({
    accessKeyId: "S3RVER",
    secretAccessKey: "S3RVER",
    signatureVersion: "v4",
  });

  // Create a new S3 instance with the updated config and endpoint
  return new AWS.S3({
    endpoint: "http://localhost:4569",
    s3ForcePathStyle: true,
  });
};

export const stopS3MockServer = async () => {
  if (s3Server) {
    await s3Server.close();
    s3Server = null;
  }
};
