import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/admin/auth/ResetPasswordForm";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Reset Password",
};


export default async function ResetPasswordPage({ params }) {
  const { token } = await params;

  // Validate the token directly in the server component before rendering the form
  const user = await prisma.user.findUnique({
    where: { resetToken: token }
  });

  // If token is invalid or expired
  if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10 p-8 rounded-[2rem] bg-surface-container-lowest/50 border border-white/5 backdrop-blur-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-error/10 border border-error/30 flex items-center justify-center mb-6 text-error shadow-[0_0_20px_rgba(var(--color-error-rgb),0.2)]">
            <ShieldAlert size={32} />
          </div>
          <h1 className="text-2xl font-display uppercase tracking-widest font-black text-on-surface mb-2">Invalid Protocol</h1>
          <p className="text-on-surface-variant text-sm mb-8">
            This security clearance link is either invalid or has expired. For your protection, reset links expire after 30 minutes.
          </p>
          <Link
            href="/sudo/login"
            className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-sm font-black tracking-widest uppercase text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Terminal
          </Link>
        </div>
      </div>
    );
  }

  // Token is valid, render the actual client form
  return <ResetPasswordForm token={token} />;
}
