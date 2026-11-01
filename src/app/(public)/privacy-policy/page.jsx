import PrivacyHero from "@/components/privacy/PrivacyHero";
import PrivacyLayout from "@/components/privacy/PrivacyLayout";
import { getSiteSettings } from "@/actions/settings";
import { getLegalPageSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and client data confidentiality standards for Subham Sarkar — Software Architect & Systems Engineer.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    url: "https://subhamsarkar.dev/privacy-policy",
  },
};

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  const schema = getLegalPageSchema({
    title: "Privacy Policy | Subham Sarkar",
    description: "Privacy policy and client data confidentiality standards for Subham Sarkar — Software Architect & Systems Engineer.",
    path: "/privacy-policy",
    type: "PrivacyPolicy",
  });

  return (
    <>
      <JsonLd data={schema} />
      <PrivacyHero settings={settings} />
      <PrivacyLayout settings={settings} />
    </>
  );
}

