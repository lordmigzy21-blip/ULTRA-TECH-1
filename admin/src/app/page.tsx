'use client';

import React, { useState, useEffect } from 'react';
import AdminLogin from '@/components/AdminLogin';
import AdminPanelContent from '@/components/AdminPanelContent';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Charger le statut de connexion au démarrage
  useEffect(() => {
    const session = sessionStorage.getItem('ut_admin_logged_in');
    if (session === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('ut_admin_logged_in', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('ut_admin_logged_in');
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminPanelContent onLogout={handleLogout} />;
}
