'use client';

import React, { useState } from 'react';
import AppLogo from './ui/AppLogo';
import Icon from './ui/AppIcon';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminAppointments from './AdminAppointments';
import AdminSales from './AdminSales';
import AdminSettings from './AdminSettings';

interface AdminPanelContentProps {
  onLogout: () => void;
}

type TabType = 'dashboard' | 'products' | 'appointments' | 'sales' | 'settings';

export default function AdminPanelContent({ onLogout }: AdminPanelContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: 'HomeIcon' },
    { id: 'products', label: 'Produits', icon: 'PackageIcon' },
    { id: 'appointments', label: 'Rendez-vous', icon: 'CalendarIcon' },
    { id: 'sales', label: 'Ventes & Reçus', icon: 'FileTextIcon' },
    { id: 'settings', label: 'Paramètres', icon: 'SettingsIcon' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'products':
        return <AdminProducts />;
      case 'appointments':
        return <AdminAppointments />;
      case 'sales':
        return <AdminSales />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col md:flex-row">
      
      {/* Sidebar de navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-border flex flex-col justify-between p-6 flex-shrink-0 print:hidden">
        <div className="space-y-8">
          
          {/* Logo */}
          <div className="px-2">
            <AppLogo showText={true} />
          </div>

          {/* Liens de navigation */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`w-full flex items-center gap-3.5 px-4.5 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-accent hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Déconnexion */}
        <div className="pt-6 border-t border-border mt-8">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3.5 px-4.5 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
          >
            <Icon name="LogoutIcon" size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full print:p-0">
        {renderContent()}
      </main>

    </div>
  );
}
