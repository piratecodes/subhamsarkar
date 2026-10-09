"use client";

import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { LogOut, User, Key, ShieldCheck, ChevronDown, Menu as MenuIcon } from 'lucide-react'
import Image from 'next/image'

import MyAccountModal from '../account/MyAccountModal';
import ChangePasswordModal from '../account/ChangePasswordModal';
import ActiveSessionsModal from '../account/ActiveSessionsModal';
import { useSidebar } from './SidebarContext';

export default function SudoTopNav({ user, handleLogout }) {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isActiveSessionsOpen, setIsActiveSessionsOpen] = useState(false);
  
  const { setIsOpen } = useSidebar();

  const profilePicUrl = user?.profileImage || null;

  return (
    <header className="h-20 mt-2 sm:mt-4 mx-4 sm:mx-8 mb-2 bg-surface-container-lowest/50 backdrop-blur-3xl border border-outline/10 flex items-center justify-between px-4 sm:px-8 z-30 sticky top-2 sm:top-4 rounded-3xl sm:rounded-[2rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]">
      
      {/* Inner glass highlight */}
      <div className="absolute inset-0 rounded-3xl sm:rounded-4xl border-[0.5px] border-white/5 pointer-events-none" />

      {/* Dynamic Title / Status Area */}
      <div className="flex items-center gap-3 sm:gap-4 relative z-10">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 -ml-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline/10 text-on-surface lg:hidden transition-colors"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-high border border-outline/10 shadow-inner hidden sm:flex">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
        </div>
        <div>
          <h2 className="font-display text-xs sm:text-sm font-black text-on-surface uppercase tracking-[0.2em] truncate">Terminal Output</h2>
          <p className="text-[8px] sm:text-[9px] text-primary font-bold uppercase tracking-widest mt-0.5 opacity-80 truncate hidden sm:block">All Systems Nominal</p>
        </div>
      </div>
      
      {/* User Actions */}
      <div className="flex items-center space-x-4 relative z-10">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full items-center justify-center gap-2 sm:gap-3 rounded-full bg-surface-container-high/50 hover:bg-surface-container-high px-1.5 sm:px-2 py-1.5 text-sm font-medium text-on-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 transition-all duration-300 border border-outline/10 shadow-sm hover:shadow-md group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                {profilePicUrl ? (
                  <Image src={profilePicUrl} alt="Profile" width={36} height={36} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-primary text-sm font-bold font-display">{user?.firstName?.charAt(0).toUpperCase() || 'A'}</span>
                )}
              </div>
              <div className="flex flex-col items-start pr-2 hidden md:flex">
                <span className="text-[11px] font-black font-display uppercase tracking-widest leading-tight group-hover:text-primary transition-colors">{user?.firstName || 'Admin'}</span>
                <span className="text-[8px] uppercase tracking-[0.2em] text-secondary font-bold">{user?.role?.replace('_', ' ') || 'STAFF'}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-on-surface-variant group-hover:text-primary transition-colors mr-1 sm:mr-2" aria-hidden="true" />
            </MenuButton>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95 -translate-y-2"
            enterTo="transform opacity-100 scale-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100 translate-y-0"
            leaveTo="transform opacity-0 scale-95 -translate-y-2"
          >
            <MenuItems className="absolute right-0 mt-3 w-56 sm:w-64 origin-top-right divide-y divide-outline/10 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-2xl border border-outline/20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] ring-1 ring-black/5 focus:outline-none overflow-hidden">
              <div className="px-2 py-2">
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => setIsAccountModalOpen(true)}
                      className={`${
                        active ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface hover:bg-surface-container-high'
                      } group flex w-full items-center rounded-xl px-4 py-3 text-xs font-display font-bold tracking-[0.1em] uppercase transition-all duration-300`}
                    >
                      <User className={`mr-4 h-4 w-4 ${active ? 'text-on-primary' : 'text-primary'}`} aria-hidden="true" />
                      My Account
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => setIsChangePasswordOpen(true)}
                      className={`${
                        active ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface hover:bg-surface-container-high'
                      } group flex w-full items-center rounded-xl px-4 py-3 text-xs font-display font-bold tracking-[0.1em] uppercase transition-all duration-300 mt-1`}
                    >
                      <Key className={`mr-4 h-4 w-4 ${active ? 'text-on-primary' : 'text-primary'}`} aria-hidden="true" />
                      Change Password
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => setIsActiveSessionsOpen(true)}
                      className={`${
                        active ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface hover:bg-surface-container-high'
                      } group flex w-full items-center rounded-xl px-4 py-3 text-xs font-display font-bold tracking-[0.1em] uppercase transition-all duration-300 mt-1`}
                    >
                      <ShieldCheck className={`mr-4 h-4 w-4 ${active ? 'text-on-primary' : 'text-primary'}`} aria-hidden="true" />
                      Active Sessions
                    </button>
                  )}
                </MenuItem>
              </div>
              
              <div className="px-2 py-2 bg-error/5">
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => handleLogout()}
                      className={`${
                        active ? 'bg-error text-on-error shadow-md' : 'text-error hover:bg-error/10'
                      } group flex w-full items-center rounded-xl px-4 py-3 text-xs font-display font-black tracking-[0.1em] uppercase transition-all duration-300`}
                    >
                      <LogOut className={`mr-4 h-4 w-4 ${active ? 'text-on-error' : 'text-error'}`} aria-hidden="true" />
                      Sign Out
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>

      <MyAccountModal isOpen={isAccountModalOpen} setIsOpen={setIsAccountModalOpen} user={user} />
      <ChangePasswordModal isOpen={isChangePasswordOpen} setIsOpen={setIsChangePasswordOpen} />
      <ActiveSessionsModal isOpen={isActiveSessionsOpen} setIsOpen={setIsActiveSessionsOpen} />
    </header>
  )
}
