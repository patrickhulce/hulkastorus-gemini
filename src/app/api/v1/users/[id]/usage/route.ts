import {NextResponse} from "next/server";

export async function GET(req: Request, {params}: {params: {id: string}}) {
  // TODO: Fetch real usage data
  const usage = {
    file_counts: {
      total: 123,
      images: 10,
      videos: 5,
      audios: 2,
      models: 1,
      datasets: 1,
      documents: 100,
      other: 4,
    },
    byte_counts: {
      total: 56 * 1024 * 1024 * 1024, // 56 GB
      images: 10 * 1024 * 1024, // 10 MB
      videos: 5 * 1024 * 1024 * 1024, // 5 GB
      audios: 2 * 1024 * 1024, // 2 MB
      models: 1 * 1024 * 1024 * 1024, // 1 GB
      datasets: 1 * 1024 * 1024 * 1024, // 1 GB
      documents: 100 * 1024 * 1024, // 100 MB
      other: 4 * 1024 * 1024, // 4 MB
    },
    quota_bytes: 100 * 1024 * 1024 * 1024, // 100 GB
  };

  return NextResponse.json(usage);
}
