import nodemailer from "nodemailer";

export const getTransporter = () => {
  const host = process.env.EMAIL_HOST || "localhost";
  const port = Number(process.env.EMAIL_PORT) || 25;
  const secure = port === 465;

  const authOptions =
    process.env.EMAIL_USER && process.env.EMAIL_PASS
      ? {
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        }
      : {};

  return nodemailer.createTransport({
    host,
    port,
    secure,
    ...authOptions,
    tls: {
      rejectUnauthorized: false, // Prevents blocking due to self-signed certs
    },
  });
};

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = getTransporter();
    const fromName = process.env.EMAIL_FROM_NAME || "SUBHAMSARKAR.DEV";
    const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER || "no-reply@subhamsarkar.dev";

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[MAIL] Email sent successfully to ${to}: ${info.response}`);
    return { success: true, info };
  } catch (error) {
    console.error(`[MAIL ERROR] Failed to send email to ${to}:`, error.message);
    throw error;
  }
};

// ==========================================
// BEAUTIFUL PREMIUM HTML TEMPLATES
// ==========================================

export const sendPasswordResetEmail = async (email, resetToken, hostUrl) => {
  const resetLink = `${hostUrl}/sudo/reset-password/${resetToken}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Reset Your Password — subhamsarkar.dev</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&amp;family=Inter:wght@400;500;600&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet"/>
<style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #F4F1EA;
      color: #1C1C18;
    }
    .font-mono-tech {
      font-family: 'JetBrains Mono', monospace;
    }
    .font-display {
      font-family: 'Space Grotesk', sans-serif;
    }
  </style>
</head>
<body class="py-10 px-4 sm:px-6 antialiased selection:bg-[#B5502E] selection:text-white">
<!-- Outer Email Container -->
<div class="max-w-xl mx-auto">
<!-- Card Container -->
<div class="bg-white border border-[#E5E2DB] rounded-lg shadow-sm overflow-hidden">
<!-- Minimal Header -->
<div class="px-8 py-6 border-b border-[#F1EEE7] flex items-center justify-between bg-[#FCFBF9]">
<div class="flex items-center">
<img alt="Subham Sarkar // subhamsarkar.dev" class="h-8 sm:h-9 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Ugvx2qvH3OQrIJhcsRzPkRSI5Yrkr77eiqKwXkYCLfG97UMZsNUlkEMXXPRrmZaXTBh_iUtaQALy1gNARO2qMJv3sjxhIcX_6ApZQHD6TQcFEDkaSjKjFqXkvUGIy7YRsqEjZLbF3J8GkuUMKG_Q1ApgB8yaoc2Oy0uxVr2wvMEinjnOl3lFWRp49l1awfsvs544OZLKPf0InQG_JD6_dJ7-N2iWd5a4F_t66IaXEv6RDDH7nKkUgvLXnc"/>
</div>
<div class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F1EEE7] rounded text-xs font-mono-tech text-[#516169]">
<span class="w-1.5 h-1.5 rounded-full bg-[#B5502E]"></span>
<span>Security Notification</span>
</div>
</div>
<!-- Focused Body Content -->
<div class="px-8 py-8 sm:py-10">
<!-- Headline & Summary -->
<h1 class="font-display text-2xl sm:text-[28px] font-semibold text-[#1C1C18] tracking-tight leading-snug mb-3">
          Reset Your Password
        </h1>
<p class="text-[#585653] text-[15px] leading-relaxed mb-8">
          We received a request to reset the password for your <span class="font-medium text-[#1C1C18]">subhamsarkar.dev</span> workspace account. Click the button below to choose a new password.
        </p>
<!-- Account & Validity Summary -->
<div class="bg-[#F8F7F3] border border-[#EBE8E1] rounded-md p-4 mb-8">
<div class="space-y-2.5 text-xs sm:text-sm">
<div class="flex items-center justify-between pb-2 border-b border-[#ECE8E0]">
<span class="text-[#706E6B]">Registered Email</span>
<span class="font-mono-tech font-medium text-[#1C1C18]">${email}</span>
</div>
<div class="flex items-center justify-between pt-0.5">
<span class="text-[#706E6B]">Link Validity</span>
<span class="font-medium text-[#953918]">Expires in 30 minutes</span>
</div>
</div>
</div>
<!-- Prominent Reset Action Button -->
<div class="mb-8">
<a class="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 bg-[#B5502E] hover:bg-[#953918] text-white font-display font-medium text-[15px] rounded transition-colors shadow-sm" href="${resetLink}" target="_blank" style="text-decoration: none; color: white;">
<span>Reset Password</span>
</a>
</div>
<!-- Plain Verification Fallback Link -->
<div class="pt-6 border-t border-[#F1EEE7] mb-6">
<p class="text-xs text-[#706E6B] mb-2">
            If the button doesn't work, copy and paste this link into your browser:
          </p>
<div class="p-3 bg-[#F8F7F3] border border-[#E5E2DB] rounded font-mono-tech text-xs text-[#B5502E] break-all select-all">
            ${resetLink}
          </div>
</div>
<!-- Minimal Advisory -->
<p class="text-xs text-[#706E6B] leading-relaxed">
          If you didn't request this reset, you can safely ignore this email. Your credentials remain secure.
        </p>
</div>
<!-- Minimal Clean Footer -->
<div class="bg-[#F8F7F3] border-t border-[#EBE8E1] px-8 py-6 text-xs text-[#706E6B]">
<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
<div>
<span class="font-medium text-[#1C1C18]">Subham Sarkar</span>
<span class="text-[#8A726B] mx-1.5">—</span>
<span>Software Architect &amp; ERP/CRM Specialist</span>
</div>
<div>
<a class="hover:text-[#B5502E] underline underline-offset-2" href="mailto:architect@subhamsarkar.dev">architect@subhamsarkar.dev</a>
</div>
</div>
<div class="mt-3 pt-3 border-t border-[#EBE8E1]/80 text-[11px] text-[#8A726B]">
          © ${new Date().getFullYear()} subhamsarkar.dev. All rights reserved.
        </div>
</div>
</div>
</div>
</body></html>
  `;

  return sendEmail({
    to: email,
    subject: "Reset Your Password - subhamsarkar.dev",
    text: `Reset your password by clicking here: ${resetLink}`,
    html,
  });
};

export const sendClientConfirmationEmail = async (contactData) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>Subham Sarkar — Software Architect & Systems Engineer</title>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #fcf9f2;
      color: #1c1c18;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 640px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border: 1px solid #e5e2db;
    }
    .accent-ribbon {
      width: 100%;
      height: 6px;
      background-color: #b5502e;
    }
    .content {
      padding: 40px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e5e2db;
      padding-bottom: 24px;
      margin-bottom: 24px;
    }
    .logo-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      object-fit: contain;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background-color: #f1eee7;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.12em;
      color: #56423c;
      text-transform: uppercase;
    }
    .title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 600;
      color: #1c1c18;
      margin: 16px 0;
    }
    .text-body {
      font-size: 15px;
      line-height: 1.6;
      color: #516169;
      margin-bottom: 24px;
    }
    .details-box {
      background-color: #f6f3ec;
      border: 1px solid #e5e2db;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .details-header {
      font-size: 11px;
      font-weight: 600;
      color: #953918;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      border-bottom: 1px solid #e5e2db;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }
    .grid-item {
      flex: 1 1 45%;
    }
    .label {
      font-size: 12px;
      color: #516169;
      text-transform: uppercase;
      margin-bottom: 4px;
      display: block;
    }
    .value {
      font-size: 15px;
      font-weight: 500;
      color: #1c1c18;
    }
    .btn {
      display: block;
      width: 100%;
      text-align: center;
      padding: 14px 24px;
      background-color: #b5502e;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      border-radius: 8px;
      margin-bottom: 16px;
      box-sizing: border-box;
    }
    .footer {
      background-color: #f6f3ec;
      border-top: 1px solid #e5e2db;
      padding: 24px;
      text-align: center;
    }
    .footer-text {
      font-size: 11px;
      color: #516169;
      margin: 4px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="accent-ribbon"></div>
    <div class="content">
      <div class="header">
        <div class="logo-section">
          <img src="https://lh3.googleusercontent.com/aida/AEtjO1Ugvx2qvH3OQrIJhcsRzPkRSI5Yrkr77eiqKwXkYCLfG97UMZsNUlkEMXXPRrmZaXTBh_iUtaQALy1gNARO2qMJv3sjxhIcX_6ApZQHD6TQcFEDkaSjKjFqXkvUGIy7YRsqEjZLbF3J8GkuUMKG_Q1ApgB8yaoc2Oy0uxVr2wvMEinjnOl3lFWRp49l1awfsvs544OZLKPf0InQG_JD6_dJ7-N2iWd5a4F_t66IaXEv6RDDH7nKkUgvLXnc" alt="Subham Sarkar" class="logo" />
          <div>
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 600; text-transform: uppercase;">Subham Sarkar</div>
            <div style="font-size: 12px; color: #516169;">subhamsarkar.dev // studio</div>
          </div>
        </div>
        <div class="badge">Inquiry Received</div>
      </div>

      <div style="font-size: 12px; color: #953918; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; font-weight: 600;">
        TRANSMISSION CONFIRMED
      </div>
      <h1 class="title">We've Received Your Inquiry.</h1>
      <p class="text-body">
        Thank you for reaching out, ${contactData.firstName}. Your project specifications have been received directly in my triage register under strict confidentiality. I will review your details and respond <strong>within 12 hours</strong>.
      </p>

      <div class="details-box">
        <div class="details-header">Submission Snapshot</div>
        <div class="grid">
          <div class="grid-item">
            <span class="label">Reference ID</span>
            <span class="value" style="font-family: 'JetBrains Mono', monospace;">#REQ-${Math.floor(Math.random() * 9000) + 1000}</span>
          </div>
          <div class="grid-item">
            <span class="label">Expected Response</span>
            <span class="value">Within 12 Hours</span>
          </div>
          <div class="grid-item">
            <span class="label">Contact Person</span>
            <span class="value">${contactData.firstName} ${contactData.lastName}</span>
          </div>
          <div class="grid-item">
            <span class="label">Project Scope</span>
            <span class="value">${contactData.service || 'General Inquiry'}</span>
          </div>
        </div>
      </div>

    </div>

    <div class="footer">
      <p style="font-family: 'Space Grotesk', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: #1c1c18; margin: 0 0 8px 0;">
        Subham Sarkar — Software Architect & ERP/CRM Specialist
      </p>
      <p class="footer-text">
        Direct: <a href="mailto:subham@subhamsarkar.dev" style="color: #953918; text-decoration: none;">subham@subhamsarkar.dev</a> • <a href="https://subhamsarkar.dev" style="color: #953918; text-decoration: none;">subhamsarkar.dev</a>
      </p>
      <p class="footer-text" style="color: #585653; margin-top: 12px;">
        © ${new Date().getFullYear()} subhamsarkar.dev. All architectural inquiries handled under bilateral confidentiality.
      </p>
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail({
    to: contactData.email,
    subject: "Inquiry Received — subhamsarkar.dev",
    text: `Thank you for reaching out, ${contactData.firstName}. Your inquiry has been received. I will respond within 12 hours.`,
    html,
  });
};
