import "@/styles/globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space",
  display: 'swap',
});

export const metadata = {
  title: {
    template: "%s | Secure Terminal",
    default: "Secure Sudo Terminal | Level 4 Administrative Access",
  },
  description: "Level 4 Administrative Access for Subham Sarkar.",
  manifest: '/manifest.webmanifest',
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
    statusBarStyle: "black-translucent",
    title: "Sudo Terminal",
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
};

export default function SudoRootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans text-foreground antialiased selection:bg-primary/30 selection:text-primary`}>
        <CustomCursor />
        {children}
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: 'rgba(20, 20, 20, 0.9)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }
          }}
        />
      </body>
    </html>
  );
}
