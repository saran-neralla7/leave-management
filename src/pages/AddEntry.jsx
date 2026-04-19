import React, { useState } from 'react';
import { useLeaves } from '../context/LeavesContext';

export default function AddEntry() {
  const [entryType, setEntryType] = useState('leave'); // 'leave' or 'compoff'
  const { stats, addLeave, addCompOff } = useLeaves();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    if (entryType === 'leave') {
      const d1 = new Date(data.start_date);
      const d2 = new Date(data.end_date);
      const duration = ((d2 - d1) / (1000 * 60 * 60 * 24)) + 1;
      addLeave({ start: data.start_date, end: data.end_date, type: data.leave_type, duration, reason: data.reason });
    } else {
      addCompOff({ date: data.date, duration: 1, reason: data.reason });
    }
    
    e.target.reset();
  };

  return (
    <div className="max-w-2xl mx-auto pb-10">
      <div className="mb-10">
        <h1 className="font-extrabold text-4xl tracking-tight text-on-surface mb-2 headline-font">New Request</h1>
        <p className="text-on-surface-variant font-medium">Log your leave or overtime hours with precision.</p>
      </div>

      <div className="bg-surface-container-low p-1.5 rounded-[1.25rem] mb-8 flex items-center">
        <button 
          onClick={() => setEntryType('leave')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl shadow-sm transition-all duration-300 ${entryType === 'leave' ? 'bg-surface-container-lowest text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Leave Entry
        </button>
        <button 
          onClick={() => setEntryType('compoff')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl shadow-sm transition-all duration-300 ${entryType === 'compoff' ? 'bg-surface-container-lowest text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Holiday Work Entry
        </button>
      </div>

      <div className="glass-panel p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/40">
        <form className="space-y-10" onSubmit={handleSubmit}>
          
          {entryType === 'leave' ? (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div className="relative group">
                  <input type="date" required id="start_date" name="start_date" placeholder=" " className="peer w-full h-14 bg-surface-container-highest border-none rounded-xl px-4 pt-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" />
                  <label htmlFor="start_date" className="absolute left-4 top-4 text-on-surface-variant pointer-events-none transition-all duration-200 origin-left">Start Date</label>
                </div>
                <div className="relative group">
                  <input type="date" required id="end_date" name="end_date" placeholder=" " className="peer w-full h-14 bg-surface-container-highest border-none rounded-xl px-4 pt-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" />
                  <label htmlFor="end_date" className="absolute left-4 top-4 text-on-surface-variant pointer-events-none transition-all duration-200 origin-left">End Date</label>
                </div>
              </div>

              <div className="relative group">
                <select id="leave_type" name="leave_type" required className="peer w-full h-14 bg-surface-container-highest border-none rounded-xl px-4 pt-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all appearance-none">
                  <option value="" disabled selected></option>
                  <option value="CL">Casual Leave (CL)</option>
                  <option value="SL">Sick Leave (SL)</option>
                  <option value="EL">Earned Leave (EL)</option>
                </select>
                <label htmlFor="leave_type" className="absolute left-4 top-4 text-on-surface-variant pointer-events-none transition-all duration-200 origin-left">Leave Category</label>
                <span className="material-symbols-outlined absolute right-4 top-4 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>

              <div className="bg-surface-container-low/50 rounded-[1.25rem] p-5 flex items-center justify-between border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-tertiary-container">info</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-on-surface-variant uppercase tracking-wider">Quota Remaining</p>
                    <p className="text-lg font-extrabold text-on-surface">{stats.remainingLeaves} Days</p>
                  </div>
                </div>
                <div className="h-8 w-[1px] bg-outline-variant/20"></div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-on-surface-variant">+2</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="relative group">
                <input type="date" required id="date" name="date" placeholder=" " className="peer w-full h-14 bg-surface-container-highest border-none rounded-xl px-4 pt-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" />
                <label htmlFor="date" className="absolute left-4 top-4 text-on-surface-variant pointer-events-none transition-all duration-200 origin-left">Date Worked</label>
              </div>
            </>
          )}

          <div className="relative group">
            <textarea id="reason" name="reason" rows="3" placeholder=" " className="peer w-full bg-surface-container-highest border-none rounded-xl px-4 pt-8 text-on-surface font-medium focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"></textarea>
            <label htmlFor="reason" className="absolute left-4 top-4 text-on-surface-variant pointer-events-none transition-all duration-200 origin-left">Reason for {entryType === 'leave'? 'Leave': 'Overtime'} (Optional)</label>
          </div>

          <button type="submit" className="w-full bg-blue-purple-gradient text-on-primary py-5 rounded-[1.5rem] font-bold text-lg shadow-xl shadow-blue-500/20 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>send</span>
            Submit Entry
          </button>
        </form>
      </div>
    </div>
  );
}
