import Link from "next/link";
import { HardHat, Map } from "lucide-react";
import "@/styles/globals.css";
import { Inter, Space_Grotesk } from "next/font/google";

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

export default function NotFound() {
  return (
    <html lang="en" className="dark">
      <head>
        <title>Page Not Found</title>
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary min-h-screen flex flex-col`}>
        <div className="w-full flex-1 relative flex items-center justify-center overflow-hidden">
      {/* Giant Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-display font-black text-surface-container-highest/20 pointer-events-none select-none z-0">
        404
      </div>

      <div className="relative z-10 w-full container px-6 lg:px-12 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-surface-container-high/50 rounded-full flex items-center justify-center mb-8 border border-outline/20 shadow-xl relative animate-[bounce_3s_infinite]">
          <HardHat className="w-12 h-12 text-primary" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-error rounded-full flex items-center justify-center border-4 border-background">
            <span className="text-on-error text-lg font-bold">!</span>
          </div>
        </div>

        <h1 className="text-on-surface font-display text-4xl lg:text-7xl tracking-[-0.03em] font-bold mb-6 text-balance">
          Looks Like We Forgot to <br className="hidden md:block"/> Pour the Concrete Here.
        </h1>
        
        <p className="font-sans text-lg lg:text-[19px] text-secondary mb-10 max-w-2xl leading-relaxed">
          The page you're looking for was either demolished, moved to a new ZIP code, or frankly, never made it past the napkin-sketch phase. 
        </p>

        <Link href="/" className="group relative inline-flex items-center gap-3 px-8 py-5 bg-primary-container hover:bg-primary text-on-primary font-display text-[13px] tracking-[0.1em] font-bold uppercase rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></span>
          <Map className="text-[20px]" />
          <span>Evacuate to the Homepage</span>
        </Link>
      </div>
    </div>
      </body>
    </html>
  );
}
