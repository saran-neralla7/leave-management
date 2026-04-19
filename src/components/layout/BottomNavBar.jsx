import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function BottomNavBar() {
  const { userData } = useAuth();
  const links = [
    { name: 'Dashboard', icon: 'dashboard', path: '/' },
    { name: 'Entry', icon: 'add_circle', path: '/entry' },
    { name: 'History', icon: 'history', path: '/history' },
    { name: 'Summary', icon: 'analytics', path: '/summary' },
  ];

  if (userData?.role === 'admin') return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-[2rem]">
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center transition-all duration-300 ease-out active:scale-95 px-4 py-2 rounded-2xl ${
              isActive 
                ? "text-blue-600 bg-blue-50/50" 
                : "text-slate-400 hover:text-blue-500"
            }`
          }
        >
          <span className="material-symbols-outlined">{link.icon}</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold">{link.name}</span>
        </NavLink>
      ))}
    </nav>
  );
}
