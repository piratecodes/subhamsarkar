import { Inter, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FloatingContact from "@/components/FloatingContact";
import PushNotificationManager from "@/components/PushNotificationManager";
import { Toaster } from 'react-hot-toast';
import { Partytown } from "@qwik.dev/partytown/react";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-space-grotesk" });

export const metadata = {
  title: {
    template: "%s | Subham Sarkar | Software Architect & Systems Engineer",
    default: "Subham Sarkar | Software Architect & Systems Engineer",
  },
  description: "Portfolio of Subham Sarkar, Software Architect & Systems Engineer building robust, scalable applications.",
  manifest: '/manifest.webmanifest',
  metadataBase: new URL('https://subhamsarkar.dev'),
  alternates: {
    canonical: '/',
  },
  keywords: ["Software Architect", "Systems Engineer", "Subham Sarkar", "Portfolio"],
  openGraph: {
    url: 'https://subhamsarkar.dev',
    title: "Subham Sarkar | Software Architect",
    type: 'website',
    siteName: "Subham Sarkar Portfolio",
    description: "Portfolio of Subham Sarkar, Software Architect & Systems Engineer.",
    images: [
      { url: "/icons/icon-512x512.png", alt: "Subham Sarkar Logo", type: 'image/png', sizes: "512x512" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subham Sarkar | Software Architect",
    creator: "@subham",
    description: "Portfolio of Subham Sarkar, Software Architect & Systems Engineer.",
    images: ["/icons/icon-512x512.png"],
  },
  icons: {
    icon: [
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-180x180.png', sizes: '180x180', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-180x180.png' },
    ],
    shortcut: ['/icons/icon-192x192.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SubhamSarkar.Dev",
    startupImage: [
      { url: '/splash/splash-750x1334.png', media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)' },
      { url: '/splash/splash-1179x2556.png', media: '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/splash/splash-1290x2796.png', media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/splash/splash-1334x750.png', media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)' },
      { url: '/splash/splash-1536x2048.png', media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)' },
      { url: '/splash/splash-1640x2360.png', media: '(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2)' },
      { url: '/splash/splash-1668x2388.png', media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)' },
      { url: '/splash/splash-2048x1536.png', media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)' },
      { url: '/splash/splash-2048x2732.png', media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)' },
      { url: '/splash/splash-2360x1640.png', media: '(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)' },
      { url: '/splash/splash-2388x1668.png', media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)' },
      { url: '/splash/splash-2556x1179.png', media: '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)' },
      { url: '/splash/splash-2732x2048.png', media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)' },
      { url: '/splash/splash-2796x1290.png', media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)' },
    ],
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  userScalable: true,
  themeColor: '#953918',
}

// ==========================================
// SERVER ACTIONS IMPORTS
// These functions communicate directly with the database
// via Prisma. We fetch site settings globally here.
// ==========================================
import { getSiteSettings } from "@/actions/settings";

export default async function RootLayout({ children }) {
  const settings = await getSiteSettings();
  
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Partytown Intigrations */}
        <Partytown debug={false} forward={["dataLayer.push"]} lib="/~subhamsarkar.dev/" />
        {/* <!-- Google Tag Manager (noscript) --> */}
        <Script id="tag_manager_index" async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MeasurementId_ga}`} type="text/partytown" />
        <Script id="tag_manager" strategy="afterInteractive" type="text/partytown" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTMId}');` }} />

        {/* Browser Update */}
        <Script id="browser-update" type="text/partytown" dangerouslySetInnerHTML={{ __html: `var $buoop = {required:{e:-4,f:-3,o:-3,s:-1,c:-3},insecure:true,api:2025.06 }; function $buo_f(){ var e = document.createElement("script"); e.src = "https://browser-update.org/update.min.js"; document.body.appendChild(e); }; try {document.addEventListener("DOMContentLoaded", $buo_f,false)} catch(e){window.attachEvent("onload", $buo_f)}` }} />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-surface/95 text-on-surface font-sans text-[15px] leading-[24px] tracking-[-0.005em] font-normal antialiased selection:bg-primary-container selection:text-on-primary-container min-h-full flex flex-col`}>
        
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe loading="lazy" src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTMId}`} className='hidden invisible' height="0" width="0"></iframe></noscript>

        {/* Google Analitics */}
        <Script strategy='afterInteractive' type="text/partytown" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MeasurementId_ga}`} />
        
        <CustomCursor />
        <PushNotificationManager />
        <FloatingContact settings={settings} />
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: 'var(--color-surface-container-lowest)',
              color: 'var(--color-on-surface)',
              border: '1px solid var(--color-surface-container-highest)',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
            },
            success: {
              iconTheme: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-on-primary)',
              },
            },
            error: {
              iconTheme: {
                primary: 'var(--color-error)',
                secondary: 'var(--color-on-error)',
              },
            },
          }}
        />
        <NextTopLoader color="#953918" height={3} showSpinner={false} />
        <Navbar settings={settings} />
        <main className="w-full flex-1 pt-20  min-h-screen">
          <div className="flex flex-col w-full">
            {children}
          </div>
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
