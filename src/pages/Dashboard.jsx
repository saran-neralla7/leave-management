import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { useLeaves } from '../context/LeavesContext';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { stats, leaveEntries, compOffEntries } = useLeaves();
  const { userData } = useAuth();

  const allActivity = [...leaveEntries, ...compOffEntries]
   .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
   .slice(0, 3);

  const getIconData = (item) => {
    if (item.isCompOff) return { icon: 'military_tech', bg: 'bg-primary-container/30', text: 'text-primary', label: 'Overtime' };
    if (item.type === 'SL') return { icon: 'medical_services', bg: 'bg-secondary-container/30', text: 'text-secondary', label: 'Sick Leave' };
    if (item.type === 'EL') return { icon: 'star', bg: 'bg-primary-container/30', text: 'text-primary', label: 'Earned Leave' };
    return { icon: 'flight_takeoff', bg: 'bg-tertiary-container/30', text: 'text-tertiary', label: 'Casual Leave' };
  };

  const currentMonth = new Date().getMonth();
  const last6Months = Array.from({length: 6}, (_, i) => {
     const d = new Date();
     d.setMonth(currentMonth - 5 + i);
     return { month: d.getMonth(), label: d.toLocaleString('default', { month: 'short' }) };
  });

  const chartData = last6Months.map(m => {
     let monthlyTotal = 0;
     leaveEntries.forEach(entry => {
        if (!entry.startDate) return;
        const d = new Date(entry.startDate);
        if (d.getMonth() === m.month) {
           monthlyTotal += Number(entry.duration || 0);
        }
     });
     return { ...m, total: monthlyTotal };
  });
  
  const maxTotal = Math.max(...chartData.map(d => d.total), 3);

  return (
    <div className="pb-10">
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-2 headline-font">
          Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{userData?.name || 'Staff'}</span>.
        </h1>
        {userData?.designation && <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest rounded-lg mb-4 border border-primary/20">{userData.designation}</div>}
        <p className="text-on-surface-variant max-w-lg font-medium">Your leave balance is up to date.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Total Leaves Taken */}
        <GlassCard>
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-primary-container/20 rounded-2xl">
              <span className="material-symbols-outlined text-primary text-3xl">event_available</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-50">Year {new Date().getFullYear()}</span>
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
                <circle className="text-secondary" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset={`${125.6 - (125.6 * (stats.remainingLeaves / (stats.initialQuota || 1)))}`} strokeWidth="4"></circle>
              </svg>
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
              <button className="px-4 py-2 bg-surface-container-lowest rounded-xl text-sm font-semibold shadow-sm text-primary">6 Months</button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {chartData.map((data, i) => {
              const height = Math.max((data.total / maxTotal) * 100, 5);
              const isActive = i === 5; // The current month
              return (
                <div key={data.label} className="flex flex-col items-center gap-4 flex-1 h-full justify-end group">
                  <div 
                    className={`w-full rounded-t-xl transition-all duration-300 relative ${isActive ? 'bg-primary shadow-[0_-8px_20px_rgba(108,159,255,0.3)] hover:opacity-80' : 'bg-primary/10 hover:bg-primary/20'}`} 
                    style={{height: `${height}%`}}
                  >
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-highest text-on-surface text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                       {data.total}d
                     </div>
                  </div>
                  <span className={`text-xs font-bold ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>{data.label}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2 px-2">
            <h2 className="text-lg font-bold headline-font">Recent Activity</h2>
            <button className="text-primary text-sm font-semibold hover:underline">View All</button>
          </div>
          
          {allActivity.length === 0 ? (
             <div className="p-8 text-center text-on-surface-variant font-medium bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant/30">No recent activity detected.</div>
          ) : (
            allActivity.map((activity, i) => {
              const display = getIconData(activity);
              return (
                <div key={i} className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between shadow-sm group hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${display.bg} rounded-xl flex items-center justify-center`}>
                      <span className={`material-symbols-outlined ${display.text}`}>{display.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{display.label}</h4>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                         {activity.isCompOff ? activity.date : `${activity.startDate} to ${activity.endDate}`}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                    activity.status === 'Approved' ? 'bg-tertiary-container text-on-tertiary-container' : 
                    activity.status === 'Declined' ? 'bg-error-container text-error' : 
                    'bg-secondary-container text-on-secondary-container'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
