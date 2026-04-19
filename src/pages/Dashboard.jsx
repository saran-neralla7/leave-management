import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { useLeaves } from '../context/LeavesContext';

export default function Dashboard() {
  const { stats } = useLeaves();
  return (
    <div className="pb-10">
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-2 headline-font">
          Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Sarah</span>.
        </h1>
        <p className="text-on-surface-variant max-w-lg font-medium">Your leave balance is up to date. You have 3 pending approvals for your team.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Total Leaves Taken */}
        <GlassCard>
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-primary-container/20 rounded-2xl">
              <span className="material-symbols-outlined text-primary text-3xl">event_available</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-50">Year 2024</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-slate-500 text-sm font-semibold mb-1">Total Leaves Taken</h3>
            <div className="text-5xl font-extrabold text-on-surface tracking-tighter headline-font">{stats.totalLeavesTaken}<span className="text-xl text-slate-400 font-medium ml-1">days</span></div>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-[0.03] scale-150 rotate-12 pointer-events-none">
            <span className="material-symbols-outlined text-9xl">event_available</span>
          </div>
        </GlassCard>

        {/* Remaining Leaves */}
        <GlassCard>
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-secondary-container/20 rounded-2xl">
              <span className="material-symbols-outlined text-secondary text-3xl">calendar_today</span>
            </div>
            <div className="w-12 h-12 relative flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle className="text-slate-100" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
                <circle className="text-secondary" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="37.6" strokeWidth="4"></circle>
              </svg>
              <span className="absolute text-[10px] font-bold text-secondary">70%</span>
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="text-slate-500 text-sm font-semibold mb-1">Remaining Leaves</h3>
            <div className="text-5xl font-extrabold text-on-surface tracking-tighter headline-font">{String(stats.remainingLeaves).padStart(2, '0')}<span className="text-xl text-slate-400 font-medium ml-1">days</span></div>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-[0.03] scale-150 -rotate-12 pointer-events-none">
            <span className="material-symbols-outlined text-9xl">calendar_today</span>
          </div>
        </GlassCard>

        {/* Compensation Leaves Earned */}
        <GlassCard gradient>
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
              <span className="material-symbols-outlined text-white text-3xl">military_tech</span>
            </div>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] text-white font-bold uppercase tracking-wider">Overtime</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-white/80 text-sm font-semibold mb-1">Compensation Earned</h3>
            <div className="text-5xl font-extrabold text-white tracking-tighter headline-font">{String(stats.compOffEarned).padStart(2, '0')}<span className="text-xl text-white/60 font-medium ml-1">days</span></div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <div className="w-32 h-32 bg-white rounded-full blur-3xl"></div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-surface-container-low rounded-[2rem] p-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl font-bold headline-font mb-2">Leave Usage Trends</h2>
              <p className="text-on-surface-variant text-sm">Monthly insights on your vacation cycles</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-surface-container-lowest rounded-xl text-sm font-semibold shadow-sm text-primary">Monthly</button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            <div className="flex flex-col items-center gap-4 flex-1 h-full justify-end">
              <div className="w-full bg-primary/10 rounded-t-xl hover:bg-primary/20 transition-all duration-300" style={{height: '40%'}}></div>
              <span className="text-xs font-bold text-on-surface-variant">Jan</span>
            </div>
            <div className="flex flex-col items-center gap-4 flex-1 h-full justify-end">
              <div className="w-full bg-primary/10 rounded-t-xl hover:bg-primary/20 transition-all duration-300" style={{height: '60%'}}></div>
              <span className="text-xs font-bold text-on-surface-variant">Feb</span>
            </div>
            <div className="flex flex-col items-center gap-4 flex-1 h-full justify-end">
              <div className="w-full bg-primary/40 rounded-t-xl hover:bg-primary/50 transition-all duration-300" style={{height: '25%'}}></div>
              <span className="text-xs font-bold text-on-surface-variant">Mar</span>
            </div>
            <div className="flex flex-col items-center gap-4 flex-1 h-full justify-end">
              <div className="w-full bg-primary/10 rounded-t-xl hover:bg-primary/20 transition-all duration-300" style={{height: '45%'}}></div>
              <span className="text-xs font-bold text-on-surface-variant">Apr</span>
            </div>
            <div className="flex flex-col items-center gap-4 flex-1 h-full justify-end">
              <div className="w-full bg-primary-container rounded-t-xl hover:opacity-80 transition-all duration-300 shadow-[0_-8px_20px_rgba(108,159,255,0.3)]" style={{height: '90%'}}></div>
              <span className="text-xs font-bold text-primary">May</span>
            </div>
            <div className="flex flex-col items-center gap-4 flex-1 h-full justify-end">
              <div className="w-full bg-primary/10 rounded-t-xl hover:bg-primary/20 transition-all duration-300" style={{height: '35%'}}></div>
              <span className="text-xs font-bold text-on-surface-variant">Jun</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2 px-2">
            <h2 className="text-lg font-bold headline-font">Recent Activity</h2>
            <button className="text-primary text-sm font-semibold hover:underline">View All</button>
          </div>
          
          <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between shadow-sm group hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-tertiary-container/30 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary">flight_takeoff</span>
              </div>
              <div>
                <h4 className="font-bold text-sm">Summer Vacation</h4>
                <p className="text-xs text-on-surface-variant">Aug 12 - Aug 19</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold rounded-full">Approved</span>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between shadow-sm group hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary-container/30 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary">medical_services</span>
              </div>
              <div>
                <h4 className="font-bold text-sm">Sick Leave</h4>
                <p className="text-xs text-on-surface-variant">Jun 04, 2024</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full">Pending</span>
          </div>
        </div>
      </div>

    </div>
  );
}
