import React from 'react';
import { useLeaves } from '../context/LeavesContext';

export default function Summary() {
  const { stats, leaveEntries, compOffEntries } = useLeaves();
  return (
    <div className="pb-10 space-y-12">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface headline-font">Yearly Summary</h1>
          <p className="text-on-surface-variant font-medium">Reporting Period: Jan 2024 — Dec 2024</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-low text-on-surface font-semibold hover:bg-surface-container-high transition-all active:scale-95 group">
            <span className="material-symbols-outlined text-[20px] text-primary">description</span>
            <span>Export Excel</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-purple-gradient text-white font-semibold shadow-lg shadow-primary/20 hover:brightness-110 transition-all active:scale-95">
            <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>picture_as_pdf</span>
            <span>Download PDF</span>
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden p-8 rounded-2xl bg-surface-container-lowest shadow-[0_40px_40px_-5px_rgba(0,0,0,0.06)] group transition-all duration-500 hover:-translate-y-1">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[radial-gradient(circle_at_center,rgba(108,159,255,0.15)_0%,transparent_70%)]"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container mb-6">
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>event_busy</span>
              </div>
              <h3 className="text-on-surface-variant font-semibold tracking-wide text-sm uppercase">Total Leaves</h3>
            </div>
            <div className="mt-8">
              <span className="text-5xl font-extrabold text-on-surface tracking-tighter headline-font">{stats.totalLeavesTaken}</span>
              <span className="text-on-surface-variant ml-2 font-medium">Days</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden p-8 rounded-2xl bg-surface-container-lowest shadow-[0_40px_40px_-5px_rgba(0,0,0,0.06)] group transition-all duration-500 hover:-translate-y-1">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[radial-gradient(circle_at_center,rgba(108,159,255,0.15)_0%,transparent_70%)]"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-tertiary-container flex items-center justify-center text-on-tertiary-container mb-6">
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
              </div>
              <h3 className="text-on-surface-variant font-semibold tracking-wide text-sm uppercase">Comp Earned</h3>
            </div>
            <div className="mt-8">
              <span className="text-5xl font-extrabold text-on-surface tracking-tighter headline-font">{stats.compOffEarned}</span>
              <span className="text-on-surface-variant ml-2 font-medium">Days</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden p-8 rounded-2xl bg-blue-purple-gradient shadow-2xl shadow-primary/30 group transition-all duration-500 hover:-translate-y-1">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6">
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
              </div>
              <h3 className="text-white/80 font-semibold tracking-wide text-sm uppercase">Final Balance</h3>
            </div>
            <div className="mt-8">
              <span className="text-6xl font-extrabold text-white tracking-tighter headline-font">{stats.finalBalance}</span>
              <span className="text-white/70 ml-2 font-medium">Days Available</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-2xl font-bold text-on-surface headline-font">Leave Register</h2>
          <button className="text-primary font-bold hover:underline text-sm">View Full History</button>
        </div>
        <div className="space-y-3">
          {[...leaveEntries, ...compOffEntries].map(entry => (
            <div key={entry.id} className="flex items-center justify-between p-6 rounded-2xl bg-surface-container-lowest transition-all hover:bg-white hover:shadow-xl hover:shadow-black/5 group">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">{entry.type ? 'beach_access' : 'work_history'}</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">{entry.reason || (entry.type ? 'Leave Entry' : 'Holiday Work')}</p>
                  <p className="text-xs text-on-surface-variant font-medium">{entry.start ? `${entry.start} to ${entry.end}` : entry.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className={`font-extrabold ${entry.type ? 'text-on-surface' : 'text-tertiary'}`}>
                    {entry.type ? '-' : '+'}{entry.duration}.0
                  </p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">{entry.type ? 'Days' : 'Comp'}</p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${entry.status === 'Approved' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-secondary-container text-on-secondary-container'}`}>{entry.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
