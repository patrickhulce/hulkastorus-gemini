import {stopS3MockServer} from "./e2e/utils";

export default async function globalTeardown() {
  console.log("Stopping S3 mock server...");
  await stopS3MockServer();
  console.log("S3 mock server stopped.");
}
