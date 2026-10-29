import TermsHero from "@/components/terms/TermsHero";
import TermsLayout from "@/components/terms/TermsLayout";
import { getSiteSettings } from "@/actions/settings";

export const metadata = {
  title: "Terms and Conditions | Subham Sarkar",
  description: "Terms and conditions governing the use of subhamsarkar.dev, operated by Subham Sarkar, Software Architect.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    url: "https://subhamsarkar.dev/terms",
  },
};

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <TermsHero settings={settings} />
      <TermsLayout settings={settings} />
    </>
  );
}
