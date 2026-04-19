import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const LeavesContext = createContext();

export function LeavesProvider({ children }) {
  const [leaveEntries, setLeaveEntries] = useState([]);
  const [compOffEntries, setCompOffEntries] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "entries"), (snapshot) => {
      const leaves = [];
      const compOffs = [];
      
      snapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        if (data.type === 'Holiday Work' || data.isCompOff) {
          compOffs.push(data);
        } else {
          leaves.push(data);
        }
      });
      
      setLeaveEntries(leaves.sort((a,b) => (b.createdAt || '').localeCompare(a.createdAt || '')));
      setCompOffEntries(compOffs.sort((a,b) => (b.createdAt || '').localeCompare(a.createdAt || '')));
    });

    return () => unsubscribe();
  }, []);

  const addLeave = async (entry) => {
    await addDoc(collection(db, "entries"), {
      ...entry,
      status: 'Pending',
      createdAt: new Date().toISOString()
    });
  };

  const addCompOff = async (entry) => {
    await addDoc(collection(db, "entries"), {
      ...entry,
      type: 'Holiday Work',
      isCompOff: true,
      status: 'Pending',
      createdAt: new Date().toISOString()
    });
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
