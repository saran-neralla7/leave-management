import React from 'react';
import TopAppBar from './TopAppBar';
import BottomNavBar from './BottomNavBar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <TopAppBar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
      <BottomNavBar />
    </>
  );
}
