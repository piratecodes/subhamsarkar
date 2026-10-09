import { getAllTeamMembers } from "@/actions/team";
import { getAuthUser } from "@/actions/auth";
import TeamsTableClient from "@/components/admin/teams/TeamsTableClient";
import SudoPageHero from "@/components/admin/layout/SudoPageHero";
import { Users } from "lucide-react";
import { redirect, notFound } from "next/navigation";

export const metadata = {
  title: 'Staff & Roles | Secure Sudo',
  description: 'Manage system access, passwords, and permissions for your team members.',
};

export default async function TeamsPage() {
  const currentUser = await getAuthUser();
  if (!currentUser) redirect('/sudo/login?clear=1');
  if (currentUser.role === 'MEMBER') notFound();

  const { success, team, error } = await getAllTeamMembers();

  if (!success) {
    return (
      <div className="p-8 text-center bg-surface-container rounded-3xl border border-error/20">
        <h2 className="text-xl font-bold text-error">Access Denied or Error</h2>
        <p className="text-on-surface-variant mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <TeamsTableClient initialTeam={team} currentUser={currentUser} />
    </div>
  );
}
