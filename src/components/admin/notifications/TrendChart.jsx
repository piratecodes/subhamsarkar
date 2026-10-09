"use client";
import React, { useEffect, useState, Fragment } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Popover, Transition } from '@headlessui/react';
import { Calendar, ChevronDown } from 'lucide-react';

export default function TrendChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('1m'); // '7d', '1m', '3m', '6m', '1y', 'custom'
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  useEffect(() => {
    setLoading(true);
    let url = `/api/subscribers/trend?range=${timeRange}`;
    
    if (timeRange === 'custom') {
       if (customStart && customEnd) {
         url += `&start=${new Date(customStart).toISOString()}&end=${new Date(customEnd).toISOString()}`;
       } else {
         // If custom is selected but no dates yet, just don't fetch or fetch default.
         setLoading(false);
         return;
       }
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.trend) {
          setData(data.trend);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch trend", err);
        setLoading(false);
      });
  }, [timeRange, customStart, customEnd]);

  return (
    <div className="flex flex-col h-[350px] w-full space-y-4">
      <div className="flex items-center justify-end px-2 z-20">
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

      <div className="flex-1 relative min-h-0">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface-container-lowest/50 backdrop-blur-sm animate-pulse text-secondary text-xs uppercase font-bold tracking-widest">
            Loading Chart Data...
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
              tickFormatter={(val) => {
                const d = new Date(val);
                return `${d.getMonth()+1}/${d.getDate()}`;
              }}
            />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} allowDecimals={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px' }}
              labelStyle={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" name="Warm Leads" dataKey="warm_lead" stroke="#EF4444" strokeWidth={2} dot={false} />
            <Line type="monotone" name="Followers" dataKey="content_follower" stroke="#10B981" strokeWidth={2} dot={false} />
            <Line type="monotone" name="Casual" dataKey="casual" stroke="#EAB308" strokeWidth={2} dot={false} />
            <Line type="monotone" name="Removed" dataKey="removed" stroke="#6B7280" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
