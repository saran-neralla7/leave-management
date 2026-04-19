import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function TopAppBar() {
  const { userData, performLogout } = useAuth();
  return (
    <header className="flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50 bg-white/70 backdrop-blur-xl rounded-b-2xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className="text-xl font-extrabold tracking-tighter text-blue-700 headline-font">GVPCDPGC(A)</div>
        <nav className="hidden md:flex gap-6 ml-12">
          {userData?.role === 'admin' ? (
            <NavLink
              to="/"
              className={({ isActive }) => 
                isActive 
                  ? "text-blue-700 font-bold headline-font text-sm"
                  : "text-slate-500 hover:bg-slate-100/50 transition-colors px-3 py-1 rounded-lg text-sm headline-font"
              }
            >
              Management Console
            </NavLink>
          ) : (
            <>
              {['Dashboard', 'Entry', 'History', 'Summary'].map((item) => (
                <NavLink
                  key={item}
                  to={item === 'Dashboard' ? '/' : `/${item.toLowerCase()}`}
                  className={({ isActive }) => 
                    isActive 
                      ? "text-blue-700 font-bold headline-font text-sm"
                      : "text-slate-500 hover:bg-slate-100/50 transition-colors px-3 py-1 rounded-lg text-sm headline-font"
                  }
                >
                  {item}
                </NavLink>
              ))}
            </>
          )}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={performLogout} title="Sign Out" className="material-symbols-outlined text-error hover:bg-error-container/20 p-2 rounded-full transition-colors">
          logout
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
          <img 
            alt="User avatar" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuChyA30ecBlgFcBi0mp654oVHYhqEiVYJOG33uww8m8nQAoWxPQnRRHppLhkA95cCOJlwk_nxUGq6jkEeZNdp5A-YD-uIC3t8qz_hn7KYRRcOHh5C-hpe4pc_WQPZ76tuFUMjUwbrNl_B9A-fNhADs8LiF5h9vz3BgL_7Gwqmuf3WcBY4kd8Y0bAXZFnKHnamsCyHl2hQnQu7Hz89Sv5iQmwkJsq1BoSf54EHWY7bSFtrMPranRbg4OTak1D7-u0nXwHg78kcKDyXBB" 
          />
        </div>
      </div>
    </header>
  );
}
