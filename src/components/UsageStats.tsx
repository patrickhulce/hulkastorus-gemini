interface CountByType {
  total: number;
  images: number;
  videos: number;
  audios: number;
  models: number;
  datasets: number;
  documents: number;
  other: number;
}

interface Usage {
  file_counts: CountByType;
  byte_counts: CountByType;
  quota_bytes: number;
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default function UsageStats({usage}: {usage: Usage}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 className="text-lg font-bold">Usage Stats</h2>
        <p>
          Total Used: {formatBytes(usage.byte_counts.total)} / {formatBytes(usage.quota_bytes)}
        </p>
      </div>
      <div>
        <h2 className="text-lg font-bold">Top Types</h2>
        <ul>
          {Object.entries(usage.byte_counts)
            .filter(([key]) => key !== "total")
            .sort(([, a], [, b]) => b - a)
            .map(([type, bytes]) => (
              <li key={type}>
                {type}: {formatBytes(bytes as number)}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
