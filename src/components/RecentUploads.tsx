interface File {
  id: string;
  filename: string;
  size_bytes: number;
  created_at: string;
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default async function RecentUploads({userId}: {userId: string}) {
  let files: File[] = [];
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/v1/files?order_by=created_at+desc&limit=5`,
    );
    if (response.ok) {
      files = await response.json();
    } else {
      console.error("Failed to fetch recent uploads:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching recent uploads:", error);
  }

  return (
    <div>
      <h2 className="text-lg font-bold">Recent Uploads</h2>
      {files.length === 0 ? (
        <p>No recent uploads.</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              {file.filename} ({formatBytes(file.size_bytes)}) -{" "}
              {new Date(file.created_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
