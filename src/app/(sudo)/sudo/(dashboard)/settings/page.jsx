import { getSiteSettings } from "@/actions/settings";
import SettingsForm from "./SettingsForm";
import { getAuthUser } from "@/actions/auth";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Settings",
};


export default async function SettingsPage() {
  const user = await getAuthUser();
  if (!user || user.role === 'MEMBER') notFound();

  const settings = await getSiteSettings();

  return (
    <div className="space-y-8 container">
      <div>
        <h1 className="text-3xl font-display font-black tracking-tight text-on-surface">Company Settings</h1>
        <p className="text-on-surface-variant mt-2">Manage your global company information, contact details, and social links.</p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}
