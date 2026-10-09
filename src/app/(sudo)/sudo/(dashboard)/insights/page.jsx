import { getInsights } from "@/actions/insights";
import InsightsTableClientV2 from "@/components/admin/insights/InsightsTableClientV2";

export const metadata = {
  title: "Manage Insights",
};


export default async function InsightsPage() {
  const result = await getInsights();
  const insights = result.success ? result.insights : [];

  return <InsightsTableClientV2 initialInsights={insights} />;
}
