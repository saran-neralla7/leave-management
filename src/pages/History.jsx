import React from 'react';
import { useLeaves } from '../context/LeavesContext';

export default function History() {
  const { leaveEntries, compOffEntries } = useLeaves();
  return (
    <div className="pb-10">
      <section className="mb-12 relative">
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <h1 className="text-5xl font-extrabold font-headline tracking-tight text-on-surface mb-2">History</h1>
        <p className="text-on-surface-variant text-lg max-w-xl">Review and track your past leave requests and holiday work logs in one consolidated view.</p>
      </section>

      <section className="flex flex-wrap items-center gap-3 mb-8">
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-container text-on-primary-container font-semibold rounded-full shadow-sm hover:brightness-105 transition-all">
          <span className="material-symbols-outlined text-[18px]">calendar_today</span>
          All Records
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-surface-container-low text-on-surface-variant font-medium rounded-full hover:bg-surface-container-high transition-all">
          <span className="material-symbols-outlined text-[18px]">beach_access</span>
          Leave
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-surface-container-low text-on-surface-variant font-medium rounded-full hover:bg-surface-container-high transition-all">
          <span className="material-symbols-outlined text-[18px]">event_busy</span>
          Holiday Work
        </button>
        <div className="h-6 w-px bg-outline-variant/30 mx-2 hidden sm:block"></div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-surface-container-low text-on-surface-variant font-medium rounded-full hover:bg-surface-container-high transition-all">
          <span className="material-symbols-outlined text-[18px]">filter_list</span>
          Custom Date
        </button>
      </section>

      <div className="glass-panel rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden border border-white/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-5 text-sm font-bold text-on-surface uppercase tracking-wider font-headline">Date Range</th>
                <th className="px-8 py-5 text-sm font-bold text-on-surface uppercase tracking-wider font-headline">Entry Type</th>
                <th className="px-8 py-5 text-sm font-bold text-on-surface uppercase tracking-wider font-headline">Duration</th>
                <th className="px-8 py-5 text-sm font-bold text-on-surface uppercase tracking-wider font-headline text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/30">
              {[...leaveEntries, ...compOffEntries].map(entry => (
                <tr key={entry.id} className="hover:bg-white/40 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-on-surface font-semibold text-base">{entry.start ? `${entry.start} to ${entry.end}` : entry.date}</span>
                      <span className="text-on-surface-variant text-xs">{entry.reason || 'No reason specified'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${entry.type ? 'bg-tertiary/10 text-tertiary' : 'bg-secondary/10 text-secondary'}`}>
                        <span className="material-symbols-outlined">{entry.type ? 'beach_access' : 'event_busy'}</span>
                      </div>
                      <span className="font-medium text-on-surface">{entry.type ? `${entry.type} Leave` : 'Holiday Work'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-headline font-bold text-on-surface text-lg">{entry.duration}.0 <span className="text-sm font-medium text-on-surface-variant uppercase ml-1">Days</span></span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${entry.status === 'Approved' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-secondary-container text-on-secondary-container'}`}>{entry.status}</span>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
        <div className="px-8 py-6 bg-surface-container-low/30 flex justify-between items-center bg-white">
          <span className="text-on-surface-variant text-sm font-medium">Showing 1-2 of 2 records</span>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors material-symbols-outlined text-outline">chevron_left</button>
            <button className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold text-sm">1</button>
            <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors material-symbols-outlined text-outline">chevron_right</button>
          </div>
        </div>
      </div>
    </div>
  );
}
