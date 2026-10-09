"use client";

import { BarChart2, MousePointerClick, Send, XCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteCompletedCampaign } from "@/actions/push";
import { toast } from "react-hot-toast";

export default function BroadcastAnalytics({ campaigns: initialCampaigns = [] }) {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setCampaigns(initialCampaigns);
  }, [initialCampaigns]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this broadcast log?")) {
      setIsDeleting(true);
      const res = await deleteCompletedCampaign(id);
      if (res.success) {
        toast.success("Broadcast log deleted");
        setCampaigns(campaigns.filter(c => c.id !== id));
        router.refresh();
      } else {
        toast.error(res.error || "Failed to delete");
      }
      setIsDeleting(false);
    }
  };
  if (campaigns.length === 0) return null;

  return (
    <div className="bg-surface-container-lowest/50 backdrop-blur-2xl border border-outline/10 rounded-4xl p-6 lg:p-8 shadow-lg relative overflow-hidden h-full">
      <div className="absolute inset-0 rounded-4xl border-[0.5px] border-white/5 pointer-events-none" />
      
      <div className="mb-8 relative z-10">
        <h2 className="text-xl font-display font-black tracking-tight text-on-surface flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(var(--color-primary),0.8)]" />
          Broadcast Analytics
        </h2>
        <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
          Recent Transmission Telemetry
        </p>
      </div>

      <div className="space-y-4 relative z-10 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40">
        {campaigns.map((campaign, idx) => {
          const sent = campaign.sentCount || 0;
          const failed = campaign.failedCount || 0;
          const clicks = campaign.queueItems?.length || 0;
          const total = sent + failed;
          
          const deliveryRate = total > 0 ? ((sent / total) * 100).toFixed(1) : 0;
          const ctr = sent > 0 ? ((clicks / sent) * 100).toFixed(1) : 0;

          return (
            <motion.div 
              key={campaign.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-5 bg-surface-container/30 border border-outline/5 rounded-3xl"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-sm font-bold text-on-surface">{campaign.title}</h4>
                    <button 
                      onClick={() => handleDelete(campaign.id)}
                      disabled={isDeleting}
                      className="text-on-surface-variant hover:text-error transition-colors disabled:opacity-50"
                      title="Delete Log"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-secondary mt-1">
                    {new Date(campaign.updatedAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-[10px] uppercase font-black tracking-widest text-secondary mb-1 flex items-center gap-1 justify-center">
                      <Send className="w-3 h-3 text-emerald-500" /> Sent
                    </div>
                    <div className="font-mono text-sm font-bold">{sent}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] uppercase font-black tracking-widest text-secondary mb-1 flex items-center gap-1 justify-center">
                      <XCircle className="w-3 h-3 text-error" /> Failed
                    </div>
                    <div className="font-mono text-sm font-bold">{failed}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] uppercase font-black tracking-widest text-secondary mb-1 flex items-center gap-1 justify-center">
                      <MousePointerClick className="w-3 h-3 text-primary" /> CTR
                    </div>
                    <div className="font-mono text-sm font-bold text-primary">{ctr}%</div>
                  </div>
                </div>
              </div>

              {/* Progress bars */}
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[9px] uppercase font-black tracking-widest mb-1">
                    <span className="text-emerald-500">Delivery Rate</span>
                    <span className="text-emerald-500">{deliveryRate}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${deliveryRate}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-[9px] uppercase font-black tracking-widest mb-1">
                    <span className="text-primary">Engagement (CTR)</span>
                    <span className="text-primary">{ctr}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(ctr * 2, 100)}%` }} // Visual boost for CTR since it's usually low
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
