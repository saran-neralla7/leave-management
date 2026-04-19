import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { collection, onSnapshot, addDoc, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';

const LeavesContext = createContext();

export function LeavesProvider({ children }) {
  const { currentUser, userData } = useAuth();
  const [leaveEntries, setLeaveEntries] = useState([]);
  const [compOffEntries, setCompOffEntries] = useState([]);

  useEffect(() => {
    if (!currentUser) return; // Prevent polling before Auth hydration
    const q = query(collection(db, "entries"), where("uid", "==", currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
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
      uid: currentUser.uid,
      status: 'Pending',
      createdAt: new Date().toISOString()
    });
  };

  const addCompOff = async (entry) => {
    await addDoc(collection(db, "entries"), {
      ...entry,
      uid: currentUser.uid,
      type: 'Holiday Work',
      isCompOff: true,
      status: 'Pending',
      createdAt: new Date().toISOString()
    });
  };

  const stats = useMemo(() => {
    const totalCL = userData?.quotas?.CL ?? 0;
    const totalSL = userData?.quotas?.SL ?? 0;
    const totalEL = userData?.quotas?.EL ?? 0;
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
