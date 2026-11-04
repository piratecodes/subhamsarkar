#!/usr/bin/env node

/**
 * Emergency CLI Firewall & Unban Utility
 * Usage:
 *   node scripts/unban.js <ip>          # Unban a specific IP
 *   node scripts/unban.js --all         # Flush all active bans
 *   node scripts/unban.js --list        # List all active bans
 *   node scripts/unban.js --ban <ip>    # Manually ban an IP
 */

const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

// Simple .env parser to ensure environment variables are present without extra dependencies
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.substring(0, eqIdx).trim();
      let val = trimmed.substring(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║              PERIMETER SHIELD // EMERGENCY CLI               ║
╚══════════════════════════════════════════════════════════════╝
Usage:
  node scripts/unban.js --list               List all currently banned IPs
  node scripts/unban.js <ip-address>         Unban a specific IP address
  node scripts/unban.js --all                Flush and remove ALL active bans
  node scripts/unban.js --ban <ip> [hours]   Manually ban an IP (default 24h)
    `);
    process.exit(0);
  }

  const command = args[0];

  try {
    if (command === "--list") {
      const bans = await prisma.blockedIp.findMany({
        orderBy: { createdAt: "desc" }
      });

      console.log(`\nFound ${bans.length} ban records:\n`);
      if (bans.length === 0) {
        console.log("  No active IP bans found.");
      } else {
        const now = Date.now();
        bans.forEach((b, i) => {
          const isExpired = new Date(b.blockedUntil).getTime() <= now;
          const status = isExpired ? "[EXPIRED]" : "[ACTIVE]";
          const country = b.country ? `[${b.country}]` : "[Global]";
          console.log(`  ${i + 1}. IP: ${b.ipAddress.padEnd(16)} ${country.padEnd(10)} ${status.padEnd(10)} Reason: ${b.reason}`);
          console.log(`     Blocked Until: ${new Date(b.blockedUntil).toLocaleString()} (Attempts: ${b.attemptCount})`);
        });
      }
      console.log("");
    } else if (command === "--all") {
      const result = await prisma.blockedIp.deleteMany({});
      console.log(`\n✔ Successfully flushed ${result.count} IP ban(s). All perimeter locks cleared.\n`);
    } else if (command === "--ban") {
      const ip = args[1];
      const hours = parseInt(args[2] || "24", 10);
      const reason = args[3] || "CLI Emergency Manual Ban";

      if (!ip) {
        console.error("Error: Please provide an IP address to ban. E.g.: node scripts/unban.js --ban 192.168.1.100 24");
        process.exit(1);
      }

      const blockedUntil = new Date(Date.now() + hours * 60 * 60 * 1000);
      await prisma.blockedIp.upsert({
        where: { ipAddress: ip },
        update: { reason, blockedUntil, attemptCount: { increment: 1 } },
        create: { ipAddress: ip, reason, blockedUntil, attemptCount: 1 }
      });

      console.log(`\n✔ IP ${ip} successfully blocked for ${hours} hour(s) until ${blockedUntil.toLocaleString()}.\n`);
    } else {
      // Treat argument as an IP to unban
      const ipToUnban = command.trim();
      const result = await prisma.blockedIp.deleteMany({
        where: { ipAddress: ipToUnban }
      });

      if (result.count > 0) {
        console.log(`\n✔ IP ${ipToUnban} successfully unbanned. Perimeter access restored.\n`);
      } else {
        console.log(`\n⚠ IP ${ipToUnban} was not found in the active bans table.\n`);
      }
    }
  } catch (error) {
    console.error("Error executing CLI command:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();

