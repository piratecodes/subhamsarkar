"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Ban, 
  Plus, 
  RotateCcw, 
  Clock, 
  UserX, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  Laptop, 
  KeyRound, 
  Loader2,
  Search,
  Unlock,
  Trash2,
  Globe,
  Mail,
  Zap,
  Download,
  RefreshCw,
  ShieldOff,
  Radio
} from "lucide-react";
import SudoPageHero from "../layout/SudoPageHero";
import AddBanModal from "./AddBanModal";
import { 
  unbanIpAction, 
  purgeSecurityLogsAction, 
  flushAllBansAction, 
  quickBanIpAction, 
  refreshSecurityDataAction 
} from "@/actions/security";
import { format } from "date-fns";
import toast from "react-hot-toast";

export default function SecurityHubClient({ 
  initialStats, 
  initialBans, 
  initialLogs, 
  currentUser,
  currentClientIp = "127.0.0.1",
  isCurrentIpWhitelisted = false
}) {
  const [stats, setStats] = useState(initialStats);
  const [bans, setBans] = useState(initialBans || []);
  const [logs, setLogs] = useState(initialLogs || []);
  const [activeTab, setActiveTab] = useState("bans");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [unbanningIp, setUnbanningIp] = useState(null);
  const [quickBanningIp, setQuickBanningIp] = useState(null);
  const [isPurging, setIsPurging] = useState(false);
  const [isFlushing, setIsFlushing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [autoSync, setAutoSync] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  // Live Auto-Sync effect
  useEffect(() => {
    if (!autoSync) return;

    const interval = setInterval(async () => {
      const res = await refreshSecurityDataAction();
      if (res.success) {
        if (res.stats) setStats(res.stats);
        setBans(res.bans);
        setLogs(res.logs);
      }
    }, 20000); // Poll every 20 seconds

    return () => clearInterval(interval);
  }, [autoSync]);

  const handleManualRefresh = async () => {
    setIsSyncing(true);
    try {
      const res = await refreshSecurityDataAction();
      if (res.success) {
        if (res.stats) setStats(res.stats);
        setBans(res.bans);
        setLogs(res.logs);
        toast.success("Security telemetry refreshed.");
      } else {
        toast.error(res.error || "Failed to refresh telemetry.");
      }
    } catch {
      toast.error("Telemetry refresh failed.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUnban = async (ipAddress) => {
    if (!window.confirm(`Are you sure you want to lift the perimeter quarantine for IP ${ipAddress}?`)) {
      return;
    }

    setUnbanningIp(ipAddress);
    try {
      const result = await unbanIpAction(ipAddress);
      if (result.success) {
        toast.success(result.message);
        setBans((prev) => prev.filter((b) => b.ipAddress !== ipAddress));
        setStats((prev) => ({
          ...prev,
          activeBans: Math.max(0, prev.activeBans - 1),
          status: prev.activeBans - 1 > 0 ? "Threat Contained" : "Nominal"
        }));
      } else {
        toast.error(result.error || "Failed to unban IP");
      }
    } catch (err) {
      toast.error("An unexpected error occurred while unbanning.");
    } finally {
      setUnbanningIp(null);
    }
  };

  const handleQuickBan = async (ipAddress) => {
    if (!window.confirm(`Quarantine IP address ${ipAddress} for 24 hours?`)) {
      return;
    }

    setQuickBanningIp(ipAddress);
    try {
      const result = await quickBanIpAction(ipAddress, "1-Click Quick Ban via Intrusion Audit Feed", 24);
      if (result.success) {
        toast.success(result.message);
        setBans((prev) => [
          {
            id: `quick-${Date.now()}`,
            ipAddress,
            reason: "1-Click Quick Ban via Intrusion Audit Feed",
            attemptCount: 1,
            blockedUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString()
          },
          ...prev
        ]);
        setStats((prev) => ({
          ...prev,
          activeBans: prev.activeBans + 1,
          status: "Threat Contained"
        }));
      } else {
        toast.error(result.error || "Failed to ban IP.");
      }
    } catch {
      toast.error("An error occurred during quick-ban.");
    } finally {
      setQuickBanningIp(null);
    }
  };

  const handleFlushAllBans = async () => {
    if (!window.confirm("EMERGENCY OVERRIDE: Are you sure you want to flush all active quarantines and unban every IP?")) {
      return;
    }

    setIsFlushing(true);
    try {
      const result = await flushAllBansAction();
      if (result.success) {
        toast.success(result.message);
        setBans([]);
        setStats((prev) => ({
          ...prev,
          activeBans: 0,
          status: "Nominal"
        }));
      } else {
        toast.error(result.error || "Failed to flush bans.");
      }
    } catch {
      toast.error("An error occurred while flushing bans.");
    } finally {
      setIsFlushing(false);
    }
  };

  const handlePurgeLogs = async () => {
    if (!window.confirm("Are you sure you want to purge audit logs older than 30 days and clean up expired IP bans?")) {
      return;
    }

    setIsPurging(true);
    try {
      const result = await purgeSecurityLogsAction(30);
      if (result.success) {
        toast.success(result.message);
        window.location.reload();
      } else {
        toast.error(result.error || "Failed to purge logs.");
      }
    } catch {
      toast.error("Error purging old security logs.");
    } finally {
      setIsPurging(false);
    }
  };

  const handleExportCsv = () => {
    if (filteredLogs.length === 0) {
      toast.error("No logs to export.");
      return;
    }

    const headers = ["Timestamp", "Event Type", "Result", "Client IP", "Country", "Target Handle", "Reason", "User Agent"];
    const rows = filteredLogs.map((log) => [
      `"${format(new Date(log.createdAt), "yyyy-MM-dd HH:mm:ss")}"`,
      `"${log.type || "LOGIN"}"`,
      `"${log.success ? "GRANTED" : "BLOCKED"}"`,
      `"${log.ipAddress || ""}"`,
      `"${log.country || "Global"}"`,
      `"${(log.identifier || "").replace(/"/g, '""')}"`,
      `"${(log.reason || "").replace(/"/g, '""')}"`,
      `"${(log.userAgent || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `security-audit-${format(new Date(), "yyyy-MM-dd-HHmm")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${filteredLogs.length} audit records to CSV.`);
  };

  const filteredBans = bans.filter((b) =>
    b.ipAddress.toLowerCase().includes(searchFilter.toLowerCase()) ||
    b.reason?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    b.country?.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredLogs = logs.filter((l) =>
    l.ipAddress.toLowerCase().includes(searchFilter.toLowerCase()) ||
    l.identifier?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    l.reason?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    l.country?.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const formatRemaining = (blockedUntil) => {
    const diffMs = new Date(blockedUntil).getTime() - Date.now();
    if (diffMs <= 0) return "Expired (Pending Flush)";
    const mins = Math.ceil(diffMs / (1000 * 60));
    if (mins < 60) return `${mins} min(s) remaining`;
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hours}h ${remMins}m remaining`;
  };

  const bannedIpSet = new Set(bans.map((b) => b.ipAddress));

  return (
    <div className="space-y-8 pb-12">
      {/* Page Hero with Live Telemetry */}
      <SudoPageHero
        title="Perimeter & Security"
        description="Intrusion detection, active threat mitigation & IP firewall."
        iconNode={<ShieldAlert className="w-6 h-6 text-primary" />}
        stats={[
          {
            label: "Firewall Status",
            value: stats?.status || "Nominal",
            pulsingDot: true,
            dotColorClass: stats?.activeBans > 0 ? "bg-amber-500" : "bg-emerald-500",
            valueColorClass: stats?.activeBans > 0 ? "text-amber-400" : "text-emerald-400"
          },
          {
            label: "Active IP Bans",
            value: stats?.activeBans || 0,
            colorClass: stats?.activeBans > 0 ? "bg-error/10 border-error/20" : "bg-surface-container border-outline/10",
            valueColorClass: stats?.activeBans > 0 ? "text-error" : "text-on-surface"
          },
          {
            label: "24h Blocked Probes",
            value: stats?.recentFailures || 0
          }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            {/* Connected IP pill */}
            <div className="px-3.5 py-2 rounded-xl bg-surface-container border border-outline/10 flex items-center gap-2 text-xs font-mono">
              <span className="text-secondary font-bold text-[10px] uppercase">My IP:</span>
              <span className="font-bold text-on-surface text-[11px]">{currentClientIp}</span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${isCurrentIpWhitelisted ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-surface-container-high text-on-surface-variant'}`}>
                {isCurrentIpWhitelisted ? "Whitelisted" : "Monitored"}
              </span>
            </div>

            {/* Emergency Flush All Button (Visible when bans exist) */}
            {bans.length > 0 && (
              <button
                onClick={handleFlushAllBans}
                disabled={isFlushing}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-error/15 hover:bg-error/25 border border-error/30 text-error font-display font-black text-xs uppercase tracking-widest transition-all disabled:opacity-50"
              >
                {isFlushing ? <Loader2 size={14} className="animate-spin" /> : <ShieldOff size={14} />}
                <span>Flush All Bans</span>
              </button>
            )}

            {/* Add Manual Ban Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-display font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Ban size={15} />
              <span>Enforce IP Ban</span>
            </button>
          </div>
        }
      />

      {/* Tabs Control Navigation & Real-Time Actions Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-outline/10 pb-4">
        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-1.5 bg-surface-container rounded-2xl border border-outline/10 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("bans")}
            className={`px-5 py-2.5 rounded-xl text-xs font-display font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 shrink-0 ${
              activeTab === "bans"
                ? "bg-primary text-on-primary shadow-md"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <Ban size={14} />
            <span>Threat Containment</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === "bans" ? "bg-black/20 text-white" : "bg-surface-container-highest text-on-surface"}`}>
              {bans.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("logs")}
            className={`px-5 py-2.5 rounded-xl text-xs font-display font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 shrink-0 ${
              activeTab === "logs"
                ? "bg-primary text-on-primary shadow-md"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <Clock size={14} />
            <span>Intrusion Audit Feed</span>
          </button>

          <button
            onClick={() => setActiveTab("policy")}
            className={`px-5 py-2.5 rounded-xl text-xs font-display font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 shrink-0 ${
              activeTab === "policy"
                ? "bg-primary text-on-primary shadow-md"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <ShieldCheck size={14} />
            <span>Defense Policy</span>
          </button>
        </div>

        {/* Right side controls: Auto-Sync, Refresh, Export CSV, Search */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Live Auto-Sync Toggle */}
          <button
            onClick={() => {
              setAutoSync(!autoSync);
              toast.success(autoSync ? "Auto-sync disabled." : "Live auto-sync enabled (20s).");
            }}
            className={`px-3 py-2 rounded-xl text-[11px] font-display font-bold uppercase tracking-wider flex items-center gap-2 border transition-all ${
              autoSync
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                : "bg-surface-container/60 border-outline/10 text-on-surface-variant hover:text-on-surface"
            }`}
            title="Auto-refresh telemetry every 20 seconds"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${autoSync ? "bg-emerald-400 animate-pulse" : "bg-on-surface-variant/40"}`}></span>
            <span>Live Sync</span>
          </button>

          {/* Manual Refresh Button */}
          <button
            onClick={handleManualRefresh}
            disabled={isSyncing}
            className="p-2 rounded-xl bg-surface-container/60 border border-outline/10 hover:border-outline/25 text-on-surface-variant hover:text-on-surface transition-all disabled:opacity-50"
            title="Refresh security telemetry"
          >
            <RefreshCw size={14} className={isSyncing ? "animate-spin text-primary" : ""} />
          </button>

          {/* Export CSV (Visible on logs tab) */}
          {activeTab === "logs" && (
            <button
              onClick={handleExportCsv}
              className="px-3 py-2 rounded-xl bg-surface-container/60 border border-outline/10 hover:border-primary/30 text-on-surface-variant hover:text-primary text-[11px] font-display font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
              title="Download audit feed as CSV"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          )}

          {/* Purge Logs Button (Visible on logs tab) */}
          {activeTab === "logs" && (
            <button
              onClick={handlePurgeLogs}
              disabled={isPurging}
              className="px-3 py-2 rounded-xl border border-outline/10 hover:border-error/40 hover:bg-error/10 text-on-surface-variant hover:text-error text-[11px] font-display font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 disabled:opacity-50"
              title="Prune audit logs older than 30 days"
            >
              {isPurging ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
              <span className="hidden sm:inline">Purge &gt;30d</span>
            </button>
          )}

          {/* Search Filter */}
          {activeTab !== "policy" && (
            <div className="relative w-full sm:w-56">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
              <input
                type="text"
                placeholder="Filter IP, country..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-surface-container/60 border border-outline/10 rounded-xl text-xs font-mono text-on-surface focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          )}
        </div>
      </div>

      {/* Tab 1: Threat Containment (Banned IPs Table) */}
      {activeTab === "bans" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {filteredBans.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-lowest/50 border border-outline/10 rounded-3xl flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="text-lg font-display font-black tracking-wide text-on-surface">Perimeter Clear</h3>
                <p className="text-xs text-on-surface-variant mt-1">No IP addresses are currently in active quarantine.</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-3xl border border-outline/10 bg-surface-container-lowest/50 backdrop-blur-xl shadow-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container/60 border-b border-outline/10 text-on-surface-variant uppercase font-mono tracking-widest text-[10px]">
                  <tr>
                    <th className="px-6 py-4">IP Address</th>
                    <th className="px-6 py-4">Country</th>
                    <th className="px-6 py-4">Quarantine Reason</th>
                    <th className="px-6 py-4">Attempts</th>
                    <th className="px-6 py-4">Cooldown Window</th>
                    <th className="px-6 py-4">Engaged At</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline/10 font-medium">
                  {filteredBans.map((ban) => (
                    <tr key={ban.id} className="hover:bg-surface-container/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-error bg-error/10 px-2.5 py-1 rounded-lg border border-error/20">
                          {ban.ipAddress}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono">
                        {ban.country ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-surface-container border border-outline/15 text-primary text-[11px] font-bold">
                            <Globe size={11} />
                            {ban.country}
                          </span>
                        ) : (
                          <span className="text-on-surface-variant/50 text-[11px]">Global</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-on-surface max-w-xs truncate">
                        {ban.reason}
                      </td>
                      <td className="px-6 py-4 font-mono text-on-surface-variant">
                        {ban.attemptCount}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-amber-400">
                          <Clock size={12} />
                          {formatRemaining(ban.blockedUntil)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant text-[11px] font-mono">
                        {format(new Date(ban.createdAt), "MMM d, yyyy HH:mm:ss")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleUnban(ban.ipAddress)}
                          disabled={unbanningIp === ban.ipAddress}
                          className="px-3.5 py-1.5 rounded-xl border border-primary/30 hover:bg-primary/20 text-primary font-display font-black text-[10px] uppercase tracking-widest inline-flex items-center gap-1.5 transition-all disabled:opacity-50"
                        >
                          {unbanningIp === ban.ipAddress ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <Unlock size={12} />
                          )}
                          Unban IP
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}

      {/* Tab 2: Intrusion Audit Feed (Recent Attempts) */}
      {activeTab === "logs" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-x-auto rounded-3xl border border-outline/10 bg-surface-container-lowest/50 backdrop-blur-xl shadow-lg"
        >
          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-on-surface-variant">
              No recent security logs recorded.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container/60 border-b border-outline/10 text-on-surface-variant uppercase font-mono tracking-widest text-[10px]">
                <tr>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Event Type</th>
                  <th className="px-6 py-4">Result</th>
                  <th className="px-6 py-4">Client IP</th>
                  <th className="px-6 py-4">Country</th>
                  <th className="px-6 py-4">Target Handle</th>
                  <th className="px-6 py-4">Reason / Payload</th>
                  <th className="px-6 py-4">User Agent</th>
                  <th className="px-6 py-4 text-right">Perimeter Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/10 font-medium">
                {filteredLogs.map((log) => {
                  const isAlreadyBanned = bannedIpSet.has(log.ipAddress);
                  const isCurrentClient = log.ipAddress === currentClientIp;

                  return (
                    <tr key={log.id} className="hover:bg-surface-container/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-[11px] text-on-surface-variant whitespace-nowrap">
                        {format(new Date(log.createdAt), "MMM d, HH:mm:ss")}
                      </td>
                      <td className="px-6 py-4 font-mono text-[11px]">
                        <span className="px-2 py-0.5 rounded-md bg-surface-container border border-outline/10 text-on-surface">
                          {log.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {log.success ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                            <CheckCircle2 size={11} />
                            GRANTED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-error bg-error/10 px-2 py-0.5 rounded-md border border-error/20">
                            <AlertTriangle size={11} />
                            BLOCKED
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono text-on-surface">
                        <span className="font-semibold">{log.ipAddress}</span>
                        {isCurrentClient && (
                          <span className="ml-1.5 px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[9px] font-bold">YOU</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono">
                        {log.country ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container border border-outline/15 text-primary text-[10px] font-bold">
                            <Globe size={10} />
                            {log.country}
                          </span>
                        ) : (
                          <span className="text-on-surface-variant/40 text-[10px]">--</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-on-surface">
                        {log.identifier}
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant max-w-xs truncate">
                        {log.reason}
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant/70 max-w-xs truncate text-[11px]">
                        {log.userAgent || "Unknown"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {isAlreadyBanned ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-error/15 text-error text-[10px] font-mono font-bold">
                            <ShieldAlert size={11} />
                            Quarantined
                          </span>
                        ) : (
                          <button
                            onClick={() => handleQuickBan(log.ipAddress)}
                            disabled={quickBanningIp === log.ipAddress || isCurrentClient}
                            className="px-2.5 py-1 rounded-lg border border-error/30 hover:bg-error/20 text-error font-display font-black text-[10px] uppercase tracking-wider inline-flex items-center gap-1 transition-all disabled:opacity-40"
                            title="1-Click Quick Ban this IP for 24 hours"
                          >
                            {quickBanningIp === log.ipAddress ? (
                              <Loader2 size={11} className="animate-spin" />
                            ) : (
                              <Ban size={11} />
                            )}
                            Quick Ban
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </motion.div>
      )}

      {/* Tab 3: Defense Policy & Whitelist */}
      {activeTab === "policy" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Defense Rules */}
          <div className="bg-surface-container-lowest/50 border border-outline/10 rounded-3xl p-8 space-y-6">
            <h3 className="font-display font-black text-lg tracking-wide uppercase text-on-surface flex items-center gap-3">
              <ShieldCheck className="text-primary" size={20} />
              Active Quarantine Rules
            </h3>

            <div className="space-y-4 text-xs leading-relaxed text-on-surface-variant">
              <div className="p-4 rounded-2xl bg-surface-container/40 border border-outline/10 flex gap-3">
                <div className="font-mono text-primary font-black">01</div>
                <div>
                  <h4 className="font-bold text-on-surface mb-1">Tier 1 Soft Cooldown</h4>
                  <p>5 consecutive failed attempts from an IP within 15 minutes triggers an automatic 15-minute temporary lockout.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container/40 border border-outline/10 flex gap-3">
                <div className="font-mono text-error font-black">02</div>
                <div>
                  <h4 className="font-bold text-on-surface mb-1">Tier 2 Hard Perimeter Ban</h4>
                  <p>10 failed attempts from an IP activates an immediate 24-hour perimeter quarantine blocking all `/sudo` routes and sensitive `/api/*` endpoints.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container/40 border border-outline/10 flex gap-3">
                <div className="font-mono text-amber-400 font-black">03</div>
                <div>
                  <h4 className="font-bold text-on-surface mb-1">Automated Scanner Honeypots (2-Strike Protection)</h4>
                  <p>Requests targeting `/wp-login.php`, `/.env`, `/phpmyadmin`, etc. receive a standard 404 on Strike 1 (preventing accidental visitor lockouts). Repeated probes within 5 minutes trigger a 24-hour perimeter quarantine with instant email notification.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container/40 border border-outline/10 flex gap-3">
                <div className="font-mono text-secondary font-black">04</div>
                <div>
                  <h4 className="font-bold text-on-surface mb-1">Contact Form Silent Honeypot</h4>
                  <p>Invisible form traps catch automated spambots and silently deflect them without polluting the database or dispatching notification emails.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container/40 border border-outline/10 flex gap-3">
                <div className="font-mono text-primary font-black">05</div>
                <div>
                  <h4 className="font-bold text-on-surface mb-1">Constant-Time Timing Defense</h4>
                  <p>Invalid usernames execute a dummy bcrypt hash computation to ensure uniform latency ($\sim$120ms), neutralizing side-channel timing attacks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Protocols & Alerts */}
          <div className="bg-surface-container-lowest/50 border border-outline/10 rounded-3xl p-8 space-y-6">
            <h3 className="font-display font-black text-lg tracking-wide uppercase text-on-surface flex items-center gap-3">
              <Terminal className="text-primary" size={20} />
              Emergency Recovery & Alerts
            </h3>

            <div className="space-y-4 text-xs leading-relaxed text-on-surface-variant">
              <div className="p-4 rounded-2xl bg-surface-container/40 border border-outline/10 flex items-start gap-3">
                <Mail className="text-primary shrink-0 mt-0.5" size={16} />
                <div>
                  <h4 className="font-bold text-on-surface mb-1">Real-Time Security Email Alerts</h4>
                  <p>Whenever an IP triggers a 24-hour quarantine or scanner trap, an automated dispatch is emailed to the primary administrator address.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-outline/10 font-mono text-[11px] space-y-2">
                <div className="text-secondary font-bold uppercase tracking-wider text-[10px]">Terminal Emergency Override:</div>
                <div className="text-emerald-400"># Unban specific IP via SSH</div>
                <div className="text-on-surface">npm run unban 192.168.1.100</div>
                <div className="text-emerald-400 pt-1"># Flush ALL active perimeter locks</div>
                <div className="text-on-surface">npm run unban -- --all</div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container/40 border border-outline/10">
                <h4 className="font-bold text-on-surface mb-1">Self-Healing Password Reset</h4>
                <p>Successfully completing a password reset via the emailed token will automatically unban the requesting IP address upon completion.</p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container/40 border border-outline/10">
                <h4 className="font-bold text-on-surface mb-1">Environment Whitelist</h4>
                <p>Loopback IPs (`127.0.0.1`, `::1`) in development and any IP listed in `ADMIN_WHITELIST_IPS` in `.env` bypass all rate-limiting.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Manual Ban Modal */}
      <AddBanModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        onSuccess={() => {
          handleManualRefresh();
        }}
      />
    </div>
  );
}
