import { getSecurityOverview, getActiveBans, getRecentSecurityLogs } from "@/actions/security";
import { getAuthUser } from "@/actions/auth";
import { getClientIp, isIpWhitelisted } from "@/lib/security";
import { headers } from "next/headers";
import SecurityHubClient from "@/components/admin/security/SecurityHubClient";
import { redirect, notFound } from "next/navigation";

export const metadata = {
  title: "Perimeter & Security | Secure Sudo",
  description: "Monitor intrusion attempts, manage banned IPs, and view perimeter defense telemetry.",
};

export default async function SecurityPage() {
  const currentUser = await getAuthUser();
  if (!currentUser) redirect("/sudo/login?clear=1");
  if (currentUser.role === "MEMBER") notFound();

  const headerList = await headers();
  const currentIp = getClientIp(headerList);
  const isWhitelisted = isIpWhitelisted(currentIp);

  const [overviewRes, bansRes, logsRes] = await Promise.all([
    getSecurityOverview(),
    getActiveBans(),
    getRecentSecurityLogs(40),
  ]);

  const stats = overviewRes.success ? overviewRes.stats : { activeBans: 0, recentFailures: 0, status: "Nominal" };
  const bans = bansRes.success ? bansRes.bans : [];
  const logs = logsRes.success ? logsRes.logs : [];

  return (
    <div className="container">
      <SecurityHubClient
        initialStats={stats}
        initialBans={bans}
        initialLogs={logs}
        currentUser={currentUser}
        currentClientIp={currentIp}
        isCurrentIpWhitelisted={isWhitelisted}
      />
    </div>
  );
}

