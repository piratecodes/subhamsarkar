import { getLeads } from "@/actions/leads";
import LeadsTableClient from "@/components/admin/leads/LeadsTableClient";

export const metadata = {
  title: "Manage Leads",
};


export default async function LeadsPage() {
  const result = await getLeads();
  const leads = result.success ? result.leads : [];

  return <LeadsTableClient initialLeads={leads} />;
}
