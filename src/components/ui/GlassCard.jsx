import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function GlassCard({ children, className, gradient = false, ...props }) {
  const baseStyle = "group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_40px_80px_rgba(0,0,0,0.03)]";
  
  const bgStyle = gradient 
    ? "bg-gradient-to-br from-primary to-secondary text-white rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(106,55,212,0.15)]"
    : "bg-white/40 backdrop-blur-xl rounded-[2rem] p-8";

  return (
    <div className={cn(baseStyle, bgStyle, className)} {...props}>
      {children}
    </div>
  );
}
