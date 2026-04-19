import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import AddEntry from './pages/AddEntry';
import History from './pages/History';
import Summary from './pages/Summary';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { currentUser, userData } = useAuth();
  
  if (!currentUser) {
    return <Login />;
  }

  if (userData?.role === 'admin') {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="entry" element={<AddEntry />} />
        <Route path="history" element={<History />} />
        <Route path="summary" element={<Summary />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
