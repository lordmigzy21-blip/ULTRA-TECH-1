'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Icon from '@/components/ui/AppIcon';
import { saveAppointment, getSettings } from '@/lib/db';

const SERVICES_OPTIONS = [
  'Vente Électronique',
  'Développement Logiciel',
  'Prestation de Services (Maintenance PC)',
  'Sécurité Réseau',
  'Vidéosurveillance',
  'Infographie & Design',
];

const LOCATIONS_OPTIONS = [
  { value: 'akwa', label: 'Boutique Akwa (Galeries du Congo)' },
  { value: 'nkouabang', label: 'Boutique Nkouabang (Carrefour)' },
];

function BookingForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || '';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService);
  const [deviceType, setDeviceType] = useState('');
  const [requestedDate, setRequestedDate] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('akwa');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [adminPhone, setAdminPhone] = useState('237676886733');

  useEffect(() => {
    getSettings().then((settings) => {
      if (settings) {
        const activePhone =
          location === 'nkouabang' && settings.whatsapp_number_2
            ? settings.whatsapp_number_2
            : settings.whatsapp_number_1;
        setAdminPhone(activePhone || '237676886733');
      }
    });
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !service || !requestedDate) return;

    setIsSubmitting(true);

    try {
      await saveAppointment({
        name,
        phone,
        service,
        device_type: deviceType || 'Non spécifié',
        requested_date: requestedDate,
        message,
      });

      const locationText =
        location === 'nkouabang'
          ? 'Boutique Nkouabang (Carrefour)'
          : 'Boutique Akwa (Galeries du Congo)';
      
      const whatsappText = `Bonjour Ultra Tech! 👋\n\nJe souhaite prendre rendez-vous :\n\n• *Nom* : ${name}\n• *Téléphone* : ${phone}\n• *Service* : ${service}\n• *Appareil* : ${deviceType || 'Non spécifié'}\n• *Date souhaitée* : ${requestedDate}\n• *Lieu de retrait/rdv* : ${locationText}\n${
        message ? `• *Description du problème* : ${message}` : ''
      }`;

      const whatsappURL = `https://wa.me/${adminPhone}?text=${encodeURIComponent(whatsappText)}`;
      
      setIsSubmitting(false);
      setSuccess(true);

      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        setName('');
        setPhone('');
        setService('');
        setDeviceType('');
        setRequestedDate('');
        setMessage('');
        setSuccess(false);
      }, 1500);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 rounded-3xl border border-green-100 p-8 text-center space-y-4 animate-[fadeIn_0.5s_ease]">
        <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto shadow-md">
          <Icon name="CheckIcon" size={32} aria-hidden="true" />
        </div>
        <h2 className="font-extrabold text-2xl text-green-800 text-balance">Rendez-vous enregistré !</h2>
        <p className="text-sm text-green-700 max-w-md mx-auto text-pretty">
          Votre demande a été sauvegardée. Vous allez être redirigé vers WhatsApp pour finaliser la confirmation avec notre conseiller.
        </p>
        <div className="animate-pulse text-xs text-green-600 font-bold">
          Ouverture de WhatsApp en cours…
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] border border-border p-8 md:p-12 space-y-6 shadow-sm">
      <div className="space-y-1.5">
        <label htmlFor="name-input" className="text-sm font-bold text-accent">Nom & Prénom *</label>
        <input
          id="name-input"
          required
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Christian Mbarga"
          className="w-full px-4 py-3.5 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-[box-shadow,border-color] duration-200"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="tel-input" className="text-sm font-bold text-accent">Numéro de téléphone WhatsApp *</label>
        <input
          id="tel-input"
          required
          type="tel"
          name="tel"
          autoComplete="tel"
          spellCheck={false}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Ex: +237 676 886 733"
          className="w-full px-4 py-3.5 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-[box-shadow,border-color] duration-200"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="service-select" className="text-sm font-bold text-accent">Service requis *</label>
          <select
            id="service-select"
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-[box-shadow,border-color] duration-200"
          >
            <option value="">Sélectionner un service</option>
            {SERVICES_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="device-input" className="text-sm font-bold text-accent">Type d&apos;appareil / Projet</label>
          <input
            id="device-input"
            type="text"
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            placeholder="Ex: Laptop Dell Latitude, Site web…"
            className="w-full px-4 py-3.5 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-[box-shadow,border-color] duration-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="date-input" className="text-sm font-bold text-accent">Date souhaitée *</label>
          <input
            id="date-input"
            required
            type="date"
            spellCheck={false}
            value={requestedDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setRequestedDate(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-[box-shadow,border-color] duration-200"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="location-select" className="text-sm font-bold text-accent">Lieu du Rendez-vous *</label>
          <select
            id="location-select"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-[box-shadow,border-color] duration-200"
          >
            {LOCATIONS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="details-input" className="text-sm font-bold text-accent">Détails ou description du problème</label>
        <textarea
          id="details-input"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Décrivez brièvement le problème rencontré (ex: écran cassé, démarrage impossible, devis site e-commerce…"
          className="w-full px-4 py-3.5 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-[box-shadow,border-color] duration-200 resize-none"
        />
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className={`w-full py-4 rounded-full font-black text-sm uppercase tracking-wider text-white shadow-lg transition-[transform,background-color] duration-200 flex items-center justify-center gap-2 ${
          isSubmitting
            ? 'bg-btn-primary/70 cursor-not-allowed'
            : 'bg-btn-primary hover:bg-btn-primary/90 hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            Traitement en cours…
          </>
        ) : (
          <>
            <Icon name="PhoneIcon" size={16} className="fill-current" aria-hidden="true" />
            Valider et Envoyer sur WhatsApp
          </>
        )}
      </button>
    </form>
  );
}

export default function RDVContent() {
  return (
    <main className="relative min-h-screen bg-white">
      <Header />

      {/* Hero Rendez-vous */}
      <section className="bg-muted pt-32 pb-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <span className="text-primary text-xs font-bold uppercase tracking-widest block">Planification</span>
          <h1 className="font-extrabold text-3xl md:text-5xl text-accent tracking-tight text-balance">
            Prendre un Rendez-vous
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed text-pretty">
            Remplissez ce formulaire pour fixer un rendez-vous pour un dépannage matériel, logiciel ou pour discuter d&apos;un projet.
          </p>
        </div>
      </section>

      {/* Formulaire de réservation dans un Suspense boundary */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <Suspense fallback={
          <div className="py-20 text-center text-muted-foreground">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3" />
            <p className="font-bold text-sm">Chargement du formulaire…</p>
          </div>
        }>
          <BookingForm />
        </Suspense>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
