import React, { createContext, useContext, useState, useMemo } from 'react';

const LeavesContext = createContext();

export function LeavesProvider({ children }) {
  // Initial Mock State 
  const [leaveEntries, setLeaveEntries] = useState([
    { id: '1', start: '2024-01-10', end: '2024-01-14', duration: 4, type: 'CL', status: 'Approved', reason: 'Winter Vacation' }
  ]);
  const [compOffEntries, setCompOffEntries] = useState([
    { id: '2', date: '2024-02-18', duration: 1, status: 'Approved', reason: 'Weekend Launch' }
  ]);

  const addLeave = (entry) => {
    setLeaveEntries(prev => [{ id: Date.now().toString(), status: 'Pending', ...entry }, ...prev]);
  };

  const addCompOff = (entry) => {
    setCompOffEntries(prev => [{ id: Date.now().toString(), status: 'Pending', ...entry }, ...prev]);
  };

  const stats = useMemo(() => {
    const totalCL = 12;
    const totalSL = 10;
    const totalEL = 10;
    const initialQuota = totalCL + totalSL + totalEL;

    const totalLeavesTaken = leaveEntries.reduce((total, entry) => total + entry.duration, 0);
    const compOffEarned = compOffEntries.reduce((total, entry) => total + entry.duration, 0);
    const compOffUsed = 0; // Can be enhanced later

    const remainingLeaves = initialQuota - totalLeavesTaken;
    const finalBalance = remainingLeaves + compOffEarned - compOffUsed;

    return {
      totalLeavesTaken,
      remainingLeaves,
      compOffEarned,
      finalBalance,
      initialQuota
    };
  }, [leaveEntries, compOffEntries]);

  return (
    <LeavesContext.Provider value={{ leaveEntries, compOffEntries, stats, addLeave, addCompOff }}>
      {children}
    </LeavesContext.Provider>
  );
}

export const useLeaves = () => useContext(LeavesContext);
