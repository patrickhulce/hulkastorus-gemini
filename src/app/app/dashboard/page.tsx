import FileUpload from "@/components/FileUpload";
import UsageStats from "@/components/UsageStats";
import RecentUploads from "@/components/RecentUploads";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return <p>Please log in to view your dashboard.</p>;
  }

  const userId = session.user.id; // Assuming user.id is available in session

  let usage = null;
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/v1/users/${userId}/usage`);
    if (response.ok) {
      usage = await response.json();
    } else {
      console.error("Failed to fetch usage data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching usage data:", error);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <FileUpload userId={userId} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {usage && <UsageStats usage={usage} />}
        <RecentUploads userId={userId} />
      </div>
    </div>
  );
}
