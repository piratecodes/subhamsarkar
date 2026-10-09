"use client";

import { useState, useMemo, Fragment } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  subDays, subMonths, subYears, isAfter, isBefore, format, 
  eachDayOfInterval, eachMonthOfInterval, eachWeekOfInterval, 
  startOfDay, endOfDay, isSameDay, isSameMonth, isSameWeek 
} from 'date-fns';
import { Popover, Transition } from '@headlessui/react';
import { Calendar, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-container-highest/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-outline/10 z-50">
        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">{label}</p>
        <p className="text-primary font-display font-black text-xl">{payload[0].value} Leads</p>
      </div>
    );
  }
  return null;
};

export default function DashboardTrendsClient({ leads }) {
  const [timeRange, setTimeRange] = useState('1m'); // '7d', '1m', '3m', '6m', '1y', 'custom'
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const chartData = useMemo(() => {
    const now = new Date();
    let startDate = now;
    let intervalFn = eachDayOfInterval;
    let formatStr = 'MMM dd';
    let isSameFn = isSameDay;

    if (timeRange === '7d') {
      startDate = subDays(now, 7);
    } else if (timeRange === '1m') {
      startDate = subMonths(now, 1);
    } else if (timeRange === '3m') {
      startDate = subMonths(now, 3);
      intervalFn = eachWeekOfInterval;
      formatStr = "'Week of' MMM dd";
      isSameFn = isSameWeek;
    } else if (timeRange === '6m') {
      startDate = subMonths(now, 6);
      intervalFn = eachMonthOfInterval;
      formatStr = 'MMM yyyy';
      isSameFn = isSameMonth;
    } else if (timeRange === '1y') {
      startDate = subYears(now, 1);
      intervalFn = eachMonthOfInterval;
      formatStr = 'MMM yyyy';
      isSameFn = isSameMonth;
    } else if (timeRange === 'custom' && customStart && customEnd) {
      startDate = new Date(customStart);
      const endDate = new Date(customEnd);
      const diffDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
      
      if (diffDays > 90) {
        intervalFn = eachMonthOfInterval;
        formatStr = 'MMM yyyy';
        isSameFn = isSameMonth;
      } else if (diffDays > 30) {
        intervalFn = eachWeekOfInterval;
        formatStr = "'Week of' MMM dd";
        isSameFn = isSameWeek;
      }
    }

    const endDateToUse = (timeRange === 'custom' && customEnd) ? new Date(customEnd) : now;
    const startDateToUse = (timeRange === 'custom' && customStart) ? new Date(customStart) : startDate;

    if (isNaN(startDateToUse) || isNaN(endDateToUse) || startDateToUse > endDateToUse) {
      return [];
    }

    // Generate all intervals (days/weeks/months)
    const intervals = intervalFn({
      start: startOfDay(startDateToUse),
      end: endOfDay(endDateToUse)
    });

    // Count leads per interval
    return intervals.map(intervalDate => {
      const count = leads.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        return isSameFn(leadDate, intervalDate);
      }).length;

      return {
        date: format(intervalDate, formatStr),
        fullDate: intervalDate, // For sorting if needed
        leads: count
      };
    });
  }, [leads, timeRange, customStart, customEnd]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
      className="bg-surface-container-lowest/50 backdrop-blur-3xl border border-outline/10 rounded-[2rem] p-6 lg:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden group"
    >
      {/* Inner glass highlight */}
      <div className="absolute inset-0 rounded-[2rem] border-[0.5px] border-white/5 pointer-events-none" />

      {/* Subtle Glows */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 relative z-20">
        <div>
          <h2 className="text-xl font-display font-black tracking-tight text-on-surface">Lead Trajectory</h2>
          <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Incoming Transmission Volume</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-surface-container-highest/30 p-1.5 rounded-2xl border border-outline/10 shadow-inner">
          {[
            { id: '7d', label: '7D' },
            { id: '1m', label: '1M' },
            { id: '3m', label: '3M' },
            { id: '6m', label: '6M' },
            { id: '1y', label: '1Y' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeRange(tab.id)}
              className={`px-4 py-2 rounded-xl text-[10px] font-display font-black tracking-[0.15em] transition-all duration-300 ${
                timeRange === tab.id
                  ? 'bg-primary text-on-primary shadow-[0_5px_15px_-5px_rgba(var(--color-primary),0.5)] scale-[0.98]'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {tab.label}
            </button>
          ))}

          {/* Custom Date Range Popover */}
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  onClick={() => setTimeRange('custom')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-display font-black tracking-[0.15em] transition-all duration-300 outline-none ${
                    timeRange === 'custom'
                      ? 'bg-primary text-on-primary shadow-[0_5px_15px_-5px_rgba(var(--color-primary),0.5)] scale-[0.98]'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  CUSTOM
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1 scale-95"
                  enterTo="opacity-100 translate-y-0 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0 scale-100"
                  leaveTo="opacity-0 translate-y-1 scale-95"
                >
                  <Popover.Panel className="absolute right-0 z-50 mt-3 w-72 bg-surface-container-lowest/90 backdrop-blur-3xl border border-outline/20 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] p-6">
                    <div className="space-y-5">
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2">Start Date</label>
                        <input 
                          type="date" 
                          value={customStart}
                          onChange={(e) => setCustomStart(e.target.value)}
                          className="w-full bg-surface-container-highest border border-outline/20 rounded-xl px-4 py-3 text-xs font-bold text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2">End Date</label>
                        <input 
                          type="date"
                          value={customEnd}
                          onChange={(e) => setCustomEnd(e.target.value)}
                          className="w-full bg-surface-container-highest border border-outline/20 rounded-xl px-4 py-3 text-xs font-bold text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                        />
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>

      {/* Chart Area */}
      <div className="w-full h-[350px] relative z-10">
        {chartData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center border border-dashed border-outline/20 rounded-3xl bg-surface-container/20">
            <p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-[0.2em]">No data available for this range.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="var(--color-outline)" strokeOpacity={0.15} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'var(--color-on-surface-variant)', fontWeight: 700 }} 
                dy={15} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'var(--color-on-surface-variant)', fontWeight: 700 }} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-primary)', strokeWidth: 2, strokeDasharray: '4 4', opacity: 0.3 }} />
              <Area 
                type="monotone" 
                dataKey="leads" 
                stroke="var(--color-primary)" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorLeads)" 
                activeDot={{ r: 7, fill: 'var(--color-surface)', stroke: 'var(--color-primary)', strokeWidth: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
