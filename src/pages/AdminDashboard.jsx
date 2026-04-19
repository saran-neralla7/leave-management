import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { userData } = useAuth();
  const [employees, setEmployees] = useState([]);
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [cl, setCl] = useState(12);
  const [sl, setSl] = useState(10);
  const [el, setEl] = useState(10);
  
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    const snap = await getDocs(collection(db, 'users'));
    const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEmployees(list.filter(u => u.role !== 'admin'));
  };

  useEffect(() => {
    if (userData?.role === 'admin') {
      fetchUsers();
    }
  }, [userData]);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    
    if (editId) {
      await updateDoc(doc(db, 'users', editId), {
         email: email.toLowerCase(),
         name,
         designation,
         quotas: { CL: parseInt(cl), SL: parseInt(sl), EL: parseInt(el) }
      });
      setEditId(null);
    } else {
      await setDoc(doc(db, 'users', email.toLowerCase()), {
         email: email.toLowerCase(),
         name,
         designation,
         role: 'employee',
         quotas: { CL: parseInt(cl), SL: parseInt(sl), EL: parseInt(el) },
         uid: null // Unclaimed
      });
    }
    
    resetForm();
    await fetchUsers();
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee's access permanently?")) {
      setIsLoading(true);
      await deleteDoc(doc(db, 'users', id));
      await fetchUsers();
      setIsLoading(false);
    }
  };

  const handleEdit = (emp) => {
     setEditId(emp.id);
     setEmail(emp.email);
     setName(emp.name || '');
     setDesignation(emp.designation || '');
     setCl(emp.quotas?.CL || 0);
     setSl(emp.quotas?.SL || 0);
     setEl(emp.quotas?.EL || 0);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const resetForm = () => {
     setEditId(null);
     setEmail('');
     setName('');
     setDesignation('');
     setCl(12);
     setSl(10);
     setEl(10);
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
        <p className="text-on-surface-variant font-medium text-lg">Provision new employees, edit roles, and assign strict leave limits directly to their profiles.</p>
      </section>

      <section className="grid md:grid-cols-[380px_1fr] gap-8 items-start">
         <form onSubmit={handleInvite} className="glass-panel p-8 rounded-[2rem] shadow-xl shadow-black/5 border border-white/40 space-y-6 sticky top-28 z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold headline-font text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">{editId ? 'edit' : 'person_add'}</span> 
                {editId ? 'Edit Profile' : 'Provision Access'}
              </h2>
              {editId && (
                <button type="button" onClick={resetForm} className="text-xs font-bold text-error uppercase tracking-wider hover:underline">Cancel</button>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Email Address</label>
                <input type="email" required disabled={editId !== null} value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium text-on-surface disabled:opacity-50" />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Full Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium text-on-surface" placeholder="John Doe" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Designation / Title</label>
                <input type="text" required value={designation} onChange={e => setDesignation(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium text-on-surface" placeholder="e.g. Senior Developer" />
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface-variant text-center block uppercase tracking-wider">CL</label>
                  <input type="number" required value={cl} onChange={e => setCl(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center font-bold text-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface-variant text-center block uppercase tracking-wider">SL</label>
                  <input type="number" required value={sl} onChange={e => setSl(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center font-bold text-tertiary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface-variant text-center block uppercase tracking-wider">EL</label>
                  <input type="number" required value={el} onChange={e => setEl(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center font-bold text-secondary" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full py-4 rounded-xl font-bold bg-primary text-white hover:brightness-110 transition-all flex justify-center items-center gap-2 shadow-lg shadow-primary/20">
              {isLoading ? 'Processing...' : (editId ? 'Save Changes' : 'Authorize Account')}
            </button>
         </form>

         <div className="space-y-4">
           {employees.length === 0 ? (
             <div className="h-48 flex items-center justify-center p-12 bg-white/40 rounded-3xl border border-dashed border-outline-variant/50">
                <span className="text-on-surface-variant font-medium">No active employees authorized yet.</span>
             </div>
           ) : (
             employees.map(emp => (
               <div key={emp.id} className="flex flex-col xl:flex-row xl:items-center justify-between p-6 rounded-2xl bg-surface-container-lowest transition-all shadow-sm group border border-outline-variant/10 gap-6">
                 
                 <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container font-headline font-bold uppercase text-xl shrink-0">
                     {emp.name ? emp.name.substring(0,1) : emp.email.substring(0,1)}
                   </div>
                   <div className="min-w-0">
                     <p className="font-bold text-on-surface text-lg truncate">{emp.name || 'Unnamed Employee'}</p>
                     <p className="text-sm font-semibold text-on-surface-variant/80 truncate mb-1">{emp.designation || emp.email}</p>
                     <p className="text-xs font-semibold">
                        {emp.uid ? <span className="text-primary tracking-wide">● CLAIMED</span> : <span className="text-error tracking-wide">○ UNCLAIMED PENDING</span>}
                     </p>
                   </div>
                 </div>

                 <div className="flex gap-4 items-center self-start xl:self-center">
                    <div className="flex gap-2 mr-2">
                       <button onClick={() => handleEdit(emp)} className="w-10 h-10 rounded-full bg-secondary-container/30 text-secondary hover:bg-secondary-container transition flex items-center justify-center" title="Edit">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                       </button>
                       <button onClick={() => handleDelete(emp.id)} className="w-10 h-10 rounded-full bg-error-container/30 text-error hover:bg-error-container transition flex items-center justify-center" title="Delete">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                       </button>
                    </div>

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
