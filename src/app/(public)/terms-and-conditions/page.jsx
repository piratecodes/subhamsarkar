import TermsHero from "@/components/terms/TermsHero";
import TermsLayout from "@/components/terms/TermsLayout";
import { getSiteSettings } from "@/actions/settings";
import { getLegalPageSchema } from "@/lib/schema/pages";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions governing the use of subhamsarkar.dev, operated by Subham Sarkar, Software Architect.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    url: "https://subhamsarkar.dev/terms-and-conditions",
  },
};

export default async function TermsPage() {
  const settings = await getSiteSettings();
  const schema = getLegalPageSchema({
    title: "Terms and Conditions | Subham Sarkar",
    description: "Terms and conditions governing the use of subhamsarkar.dev, operated by Subham Sarkar, Software Architect.",
    path: "/terms-and-conditions",
    type: "TermsOfService",
  });

  return (
    <>
      <JsonLd data={schema} />
      <TermsHero settings={settings} />
      <TermsLayout settings={settings} />
    </>
  );
}
