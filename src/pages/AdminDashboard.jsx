import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { userData } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [email, setEmail] = useState('');
  const [cl, setCl] = useState(12);
  const [sl, setSl] = useState(10);
  const [el, setEl] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const snap = await getDocs(collection(db, 'users'));
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEmployees(list.filter(u => u.role !== 'admin'));
    };
    if (userData?.role === 'admin') {
      fetchUsers();
    }
  }, [userData]);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    
    // Binding the email automatically into db waiting for native authentication claim
    await setDoc(doc(db, 'users', email.toLowerCase()), {
       email: email.toLowerCase(),
       role: 'employee',
       quotas: { CL: parseInt(cl), SL: parseInt(sl), EL: parseInt(el) },
       uid: null // Unclaimed
    });
    
    setEmail('');
    const snap = await getDocs(collection(db, 'users'));
    const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEmployees(list.filter(u => u.role !== 'admin'));
    setIsLoading(false);
  };

  if (userData?.role !== 'admin') {
    return (
      <div className="flex h-64 items-center justify-center">
         <span className="p-8 bg-error-container text-error rounded-3xl font-bold border border-error-container/50">
           RESTRICTED BOUNDARY: Administrator privileges required to access this pane.
         </span>
      </div>
    );
  }

  return (
    <div className="pb-10 space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface headline-font">Team Directory</h1>
        <p className="text-on-surface-variant font-medium text-lg">Provision new employees and audit custom leave availability structures before they claim their accounts.</p>
      </section>

      <section className="grid md:grid-cols-[350px_1fr] gap-8 items-start">
         <form onSubmit={handleInvite} className="glass-panel p-8 rounded-[2rem] shadow-xl shadow-black/5 border border-white/40 space-y-6 sticky top-28">
            <h2 className="text-xl font-bold headline-font text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person_add</span> Provision Access
            </h2>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Employee Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium text-on-surface" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-on-surface-variant text-center block">CL</label>
                <input type="number" required value={cl} onChange={e => setCl(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center font-bold text-primary" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-on-surface-variant text-center block">SL</label>
                <input type="number" required value={sl} onChange={e => setSl(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center font-bold text-tertiary" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-on-surface-variant text-center block">EL</label>
                <input type="number" required value={el} onChange={e => setEl(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center font-bold text-secondary" />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full py-4 rounded-xl font-bold bg-primary text-on-primary hover:brightness-110 transition-all flex justify-center items-center gap-2 shadow-lg shadow-primary/20">
              {isLoading ? 'Processing...' : 'Authorize Account'}
            </button>
         </form>

         <div className="space-y-4">
           {employees.length === 0 ? (
             <div className="h-48 flex items-center justify-center p-12 bg-white/40 rounded-3xl border border-dashed border-outline-variant/50">
                <span className="text-on-surface-variant font-medium">No active employees authorized yet.</span>
             </div>
           ) : (
             employees.map(emp => (
               <div key={emp.id} className="flex items-center justify-between p-6 rounded-2xl bg-surface-container-lowest transition-all shadow-sm group border border-outline-variant/10">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container font-headline font-bold uppercase">
                     {emp.email.substring(0,2)}
                   </div>
                   <div>
                     <p className="font-bold text-on-surface">{emp.email}</p>
                     <p className="text-xs font-semibold text-on-surface-variant mt-0.5">
                        {emp.uid ? <span className="text-primary mr-1">● Active Claim</span> : <span className="text-error mr-1">○ Pending Claim</span>}
                     </p>
                   </div>
                 </div>

                 <div className="flex gap-4 items-center">
                    <div className="text-center px-4 py-2 bg-surface-container-low rounded-xl">
                       <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Casual</span>
                       <span className="font-bold text-primary">{emp.quotas?.CL || 0}</span>
                    </div>
                    <div className="text-center px-4 py-2 bg-surface-container-low rounded-xl">
                       <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Sick</span>
                       <span className="font-bold text-tertiary">{emp.quotas?.SL || 0}</span>
                    </div>
                    <div className="text-center px-4 py-2 bg-surface-container-low rounded-xl">
                       <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Earned</span>
                       <span className="font-bold text-secondary">{emp.quotas?.EL || 0}</span>
                    </div>
                 </div>
               </div>
             ))
           )}
         </div>
      </section>
    </div>
  );
}
