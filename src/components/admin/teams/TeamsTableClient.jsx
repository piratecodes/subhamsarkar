"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Edit3, Trash2, Shield, User, Star, MonitorSmartphone, Loader2, Plus } from "lucide-react";
import { deleteTeamMember } from "@/actions/team";
import toast from "react-hot-toast";
import AddStaffModal from "./AddStaffModal";
import StaffSessionsModal from "./StaffSessionsModal";
import SudoPageHero from "../layout/SudoPageHero";

export default function TeamsTableClient({ initialTeam, currentUser }) {
  const [team, setTeam] = useState(initialTeam);
  const [isDeleting, setIsDeleting] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSessionsModalOpen, setIsSessionsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleOpenNew = () => {
    setSelectedStaff(null);
    setIsModalOpen(true);
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const handleViewSessions = (staff) => {
    setSelectedStaff(staff);
    setIsSessionsModalOpen(true);
  };

  const handleDelete = async (staffId) => {
    if (!window.confirm("CRITICAL WARNING: Are you sure you want to permanently delete this user? This action cannot be undone.")) return;
    
    setIsDeleting(staffId);
    const result = await deleteTeamMember(staffId);
    
    if (result.success) {
      toast.success(result.message);
      setTeam(prev => prev.filter(t => t.id !== staffId));
    } else {
      toast.error(result.error);
    }
    setIsDeleting(null);
  };

  const roleStyles = {
    'SUPER_ADMIN': { color: 'bg-primary/10 text-primary border-primary/20', icon: Star, label: 'Super Admin' },
    'MANAGER': { color: 'bg-secondary/10 text-secondary border-secondary/20', icon: Shield, label: 'Manager' },
    'STAFF': { color: 'bg-tertiary/10 text-tertiary border-tertiary/20', icon: User, label: 'Staff' }
  };

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container space-y-8"
    >
      <SudoPageHero 
        title="Staff & Roles"
        description="Manage system access, roles, and security permissions."
        iconNode={<User className="w-6 h-6 text-primary" />}
        stats={[
          { label: 'Total Personnel', value: team.length.toString(), solidDot: true, dotColorClass: 'bg-primary' },
          { label: 'Super Admins', value: team.filter(t => t.role === 'SUPER_ADMIN').length.toString(), solidDot: true, dotColorClass: 'bg-secondary' }
        ]}
        actions={
          isSuperAdmin ? (
            <motion.button 
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenNew}
              className="group overflow-hidden flex items-center justify-center gap-3 bg-primary text-on-primary px-6 py-3 md:px-8 md:py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:shadow-2xl"
            >
              <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12 pointer-events-none"></div>
              <UserPlus className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 relative z-10" /> 
              <span className="relative z-10 hidden sm:inline">Enlist Personnel</span>
              <span className="relative z-10 sm:hidden">Add User</span>
            </motion.button>
          ) : null
        }
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="group/tablebox relative bg-surface-container-lowest/50 backdrop-blur-2xl rounded-[2rem] border border-outline/10 overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-xl hover:border-primary/20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/tablebox:opacity-100 rounded-[2rem] transition-opacity duration-1000 pointer-events-none"></div>
        <div className="overflow-x-auto relative z-10">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline/10 bg-surface-container/30">
                <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Operative</th>
                <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Clearance Level</th>
                <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Comms Link</th>
                <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Status</th>
                <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] text-right">Directives</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5 relative">
              <AnimatePresence>
                {team.map((member, idx) => {
                  const RoleIcon = roleStyles[member.role]?.icon || User;
                  const isSelf = member.id === currentUser?.id;
                  
                  return (
                    <motion.tr 
                      key={member.id} 
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30, delay: idx * 0.05 }}
                      className="hover:bg-surface-container/30 transition-colors group relative z-10"
                    >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline/10 flex items-center justify-center font-display font-black text-primary uppercase shrink-0 overflow-hidden">
                          {member.profileImage ? (
                            <img src={member.profileImage} alt={member.username} className="w-full h-full object-cover" />
                          ) : (
                            member.firstName.charAt(0) + member.lastName.charAt(0)
                          )}
                        </div>
                        <div>
                          <p className="font-extrabold text-on-surface flex items-center gap-2">
                            {member.firstName} {member.lastName}
                            {isSelf && <span className="text-[9px] uppercase tracking-widest bg-primary/20 text-primary px-2 py-0.5 rounded-full border border-primary/20">You</span>}
                          </p>
                          <p className="text-xs text-on-surface-variant/70 font-mono mt-0.5 font-bold">@{member.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-black uppercase tracking-wider ${roleStyles[member.role]?.color}`}>
                        <RoleIcon size={14} strokeWidth={2.5} /> {roleStyles[member.role]?.label}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-on-surface-variant">
                      <p>{member.email}</p>
                      {member.alternateEmail && (
                        <p className="text-[10px] text-on-surface-variant/50 uppercase tracking-wider mt-1 border border-outline/10 inline-block px-2 py-0.5 rounded bg-surface-container">Alt: {member.alternateEmail}</p>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border ${member.isActive ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-error/10 text-error border-error/20'}`}>
                        {member.isActive ? 'Active' : 'Revoked'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2 transition-opacity">
                        {isSuperAdmin && (
                          <button 
                            onClick={() => handleViewSessions(member)} 
                            className="p-2 bg-surface-container hover:bg-secondary hover:text-on-secondary rounded-xl text-secondary transition-all border border-outline/10 shadow-sm hover:scale-110 active:scale-95" 
                            title="Audit Active Terminals"
                          >
                            <MonitorSmartphone size={16} strokeWidth={2.5} />
                          </button>
                        )}
                        {(isSuperAdmin || isSelf) && (
                          <button 
                            onClick={() => handleEdit(member)} 
                            className="p-2 bg-surface-container hover:bg-primary hover:text-on-primary rounded-xl text-primary transition-all border border-outline/10 shadow-sm hover:scale-110 active:scale-95" 
                            title="Modify Directives"
                          >
                            <Edit3 size={16} strokeWidth={2.5} />
                          </button>
                        )}
                        {isSuperAdmin && !isSelf && (
                          <button 
                            onClick={() => handleDelete(member.id)} 
                            disabled={isDeleting === member.id}
                            className="p-2 bg-surface-container hover:bg-error hover:text-on-error rounded-xl text-error transition-all border border-outline/10 shadow-sm disabled:opacity-50 hover:scale-110 active:scale-95" 
                            title="Terminate Operative"
                          >
                            {isDeleting === member.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} strokeWidth={2.5} />}
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      <AddStaffModal 
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        staffData={selectedStaff}
        currentUser={currentUser}
        onSuccess={(updatedUser) => {
          if (selectedStaff) {
            setTeam(prev => prev.map(t => t.id === updatedUser.id ? updatedUser : t));
          } else {
            // Force reload for new user to avoid complex state management
            window.location.reload(); 
          }
        }}
      />

      <StaffSessionsModal
        isOpen={isSessionsModalOpen}
        setIsOpen={setIsSessionsModalOpen}
        targetStaff={selectedStaff}
        currentUser={currentUser}
      />
    </motion.div>
  );
}
