'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { Appointment, getAppointments, updateAppointmentStatus } from '@/lib/db';

type Toast = { type: 'success' | 'error'; message: string } | null;

export default function AdminAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'tous' | 'nouveau' | 'traité'>('tous');
    const [toast, setToast] = useState<Toast>(null);

    useEffect(() => {
        getAppointments().then((data) => {
            setAppointments(data);
            setLoading(false);
        });
    }, []);

    const showToast = (type: 'success' | 'error', message: string) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3000);
    };

    const toggleStatus = async (id: string) => {
        const appt = appointments.find((a) => a.id === id);
        if (!appt) return;
        const newStatus = appt.status === 'nouveau' ? 'traité' : 'nouveau';
        try {
            const updated = await updateAppointmentStatus(id, newStatus);
            if (updated) {
                setAppointments((prev) =>
                    prev.map((a) => (a.id === id ? updated : a))
                );
                showToast('success', 'Statut mis à jour ✓');
            }
        } catch (err) {
            showToast('error', 'Erreur de mise à jour.');
        }
    };

    if (loading) {
        return (
            <div className="py-20 text-center text-muted-foreground">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3" />
                <p className="font-bold text-sm">Chargement des rendez-vous...</p>
            </div>
        );
    }

    const filtered = appointments.filter((a) => filter === 'tous' || a.status === filter);
    const nouveaux = appointments.filter((a) => a.status === 'nouveau').length;


    return (
        <div className="space-y-6">
            {/* Toast */}
            {toast && (
                <div
                    className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 font-bold text-sm ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}
                >
                    <Icon name="CheckCircleIcon" size={20} />
                    {toast.message}
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="font-extrabold text-2xl text-foreground">Rendez-vous</h2>
                    <p className="text-sm text-muted-foreground">
                        {nouveaux > 0 ? (
                            <span className="text-orange-600 font-bold">{nouveaux} non traité{nouveaux > 1 ? 's' : ''}</span>
                        ) : (
                            'Tous les rendez-vous sont traités ✓'
                        )}
                    </p>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-2">
                    {(['tous', 'nouveau', 'traité'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${filter === f ? 'bg-primary text-white' : 'bg-white border border-border text-muted-foreground hover:bg-muted'
                                }`}
                        >
                            {f === 'tous' ? 'Tous' : f === 'nouveau' ? 'Nouveaux' : 'Traités'}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                        <Icon name="CalendarDaysIcon" size={40} className="mx-auto mb-3 opacity-30" />
                        <p className="font-medium">Aucun rendez-vous dans cette catégorie.</p>
                    </div>
                )}
                {filtered.map((appt) => (
                    <div
                        key={appt.id}
                        className="bg-white rounded-3xl border border-border p-6 space-y-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h3 className="font-extrabold text-base text-foreground">{appt.name}</h3>
                                    <span
                                        className={`text-xs font-bold px-3 py-1 rounded-full ${appt.status === 'nouveau' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                            }`}
                                    >
                                        {appt.status === 'nouveau' ? '🔵 Nouveau' : '✅ Traité'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 mt-2 flex-wrap">
                                    <a
                                        href={`tel:${appt.phone}`}
                                        className="flex items-center gap-1.5 text-sm text-accent font-bold hover:underline"
                                    >
                                        <Icon name="PhoneIcon" size={13} />
                                        {appt.phone}
                                    </a>
                                    <span className="text-sm text-muted-foreground">
                                        Soumis le {appt.created_at}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => toggleStatus(appt.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all hover:scale-105 ${appt.status === 'nouveau' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-muted text-muted-foreground hover:bg-border'
                                    }`}
                            >
                                <Icon name={appt.status === 'nouveau' ? 'CheckIcon' : 'ArrowUturnLeftIcon'} size={16} />
                                {appt.status === 'nouveau' ? 'Marquer traité' : 'Rouvrir'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border">
                            <div className="bg-muted rounded-2xl p-3">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Service</p>
                                <p className="text-sm font-bold text-foreground">{appt.service}</p>
                            </div>
                            <div className="bg-muted rounded-2xl p-3">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Appareil</p>
                                <p className="text-sm font-bold text-foreground">{appt.device_type}</p>
                            </div>
                            <div className="bg-muted rounded-2xl p-3">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Date souhaitée</p>
                                <p className="text-sm font-bold text-foreground">{appt.requested_date}</p>
                            </div>
                        </div>

                        {appt.message && (
                            <div className="bg-sky-light rounded-2xl p-4">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Message</p>
                                <p className="text-sm text-foreground">{appt.message}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}