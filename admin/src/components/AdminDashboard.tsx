'use client';

import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { getProducts, getAppointments, getSales, Product, Appointment, Sale } from '@/lib/db';

interface DashboardStats {
  totalSales: number;
  salesCount: number;
  totalProducts: number;
  outOfStockProducts: number;
  totalAppointments: number;
  newAppointments: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    salesCount: 0,
    totalProducts: 0,
    outOfStockProducts: 0,
    totalAppointments: 0,
    newAppointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getAppointments(), getSales()]).then(
      ([products, appointments, sales]) => {
        const totalSales = sales.reduce((acc, curr) => acc + curr.total, 0);
        const outOfStockProducts = products.filter((p) => p.stock_quantity === 0).length;
        const newAppointments = appointments.filter((a) => a.status === 'nouveau').length;

        setStats({
          totalSales,
          salesCount: sales.length,
          totalProducts: products.length,
          outOfStockProducts,
          totalAppointments: appointments.length,
          newAppointments
        });
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3" />
        <p className="font-bold text-sm">Chargement des statistiques...</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Ventes Totales',
      value: `${stats.totalSales.toLocaleString('fr-CM')} FCFA`,
      desc: `${stats.salesCount} ventes enregistrées`,
      icon: 'DollarSignIcon',
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Rendez-vous',
      value: stats.totalAppointments.toString(),
      desc: `${stats.newAppointments} non traités`,
      icon: 'CalendarIcon',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Produits',
      value: stats.totalProducts.toString(),
      desc: `${stats.outOfStockProducts} en rupture de stock`,
      icon: 'PackageIcon',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-extrabold text-2xl text-foreground">Tableau de bord</h2>
        <p className="text-sm text-muted-foreground">Aperçu rapide des activités d&apos;Ultra Tech Multiservice</p>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-border p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${card.color}`}>
              <Icon name={card.icon} size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{card.title}</p>
              <h3 className="text-xl font-extrabold text-foreground mt-1">{card.value}</h3>
              <p className={`text-xs font-bold mt-1 ${card.desc.includes('non') || card.desc.includes('rupture') ? 'text-orange-600' : 'text-muted-foreground'}`}>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Raccourcis rapides */}
      <div className="bg-muted rounded-3xl p-8 border border-border space-y-4">
        <h3 className="font-extrabold text-lg text-foreground">Actions rapides</h3>
        <p className="text-sm text-muted-foreground">Sélectionnez une action pour gérer le magasin :</p>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-border text-sm font-bold text-accent shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            Stock automatiquement mis à jour lors des ventes
          </div>
          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-border text-sm font-bold text-accent shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            Validation WhatsApp directe pour les rendez-vous
          </div>
        </div>
      </div>
    </div>
  );
}
