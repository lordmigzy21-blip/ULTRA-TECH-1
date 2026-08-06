'use client';

import React, { useEffect, useState, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { getSettings, saveSettings, Settings, AboutVideo, parseAboutVideos, uploadAboutVideo } from '@/lib/db';

type Toast = { type: 'success' | 'error'; message: string } | null;

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>({
    whatsapp_number_1: '',
    whatsapp_number_2: '',
    address_akwa: '',
    address_nkouabang: '',
    admin_password: ''
  });
  const [toast, setToast] = useState<Toast>(null);
  const [loading, setLoading] = useState(true);
  const [aboutVideos, setAboutVideos] = useState<AboutVideo[]>([]);
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoDesc, setNewVideoDesc] = useState('');
  const [videoUploading, setVideoUploading] = useState(false);
  const aboutVideoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getSettings().then((data) => {
      setSettings(data);
      setAboutVideos(parseAboutVideos(data.about_videos));
      setLoading(false);
    });
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveSettings(settings);
      showToast('success', 'Paramètres sauvegardés avec succès ✓');
    } catch (err) {
      showToast('error', 'Erreur lors de la sauvegarde.');
    }
  };

  const saveAboutVideos = async (videos: AboutVideo[]) => {
    const nextSettings = { ...settings, about_videos: JSON.stringify(videos) };
    await saveSettings(nextSettings);
    setSettings(nextSettings);
    setAboutVideos(videos);
  };

  const handleAboutVideoUpload = async (file?: File) => {
    if (!file) return;
    if (!newVideoTitle.trim()) {
      showToast('error', 'Ajoutez un titre avant de choisir la vidéo.');
      return;
    }
    setVideoUploading(true);
    try {
      const url = await uploadAboutVideo(file);
      const video: AboutVideo = {
        id: typeof crypto !== 'undefined' ? crypto.randomUUID() : `${Date.now()}`,
        title: newVideoTitle.trim(),
        description: newVideoDesc.trim() || undefined,
        url,
      };
      await saveAboutVideos([...aboutVideos, video]);
      setNewVideoTitle('');
      setNewVideoDesc('');
      showToast('success', 'Vidéo ajoutée à la page À propos.');
    } catch (error) {
      showToast('error', 'La vidéo n’a pas été envoyée. Vérifiez le bucket Supabase about-videos.');
    } finally {
      setVideoUploading(false);
      if (aboutVideoRef.current) aboutVideoRef.current.value = '';
    }
  };

  const removeAboutVideo = async (id: string) => {
    try {
      await saveAboutVideos(aboutVideos.filter((video) => video.id !== id));
      showToast('success', 'Vidéo supprimée.');
    } catch (error) {
      showToast('error', 'Impossible de supprimer cette vidéo.');
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3" />
        <p className="font-bold text-sm">Chargement des paramètres...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 font-bold text-sm ${
            toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          <Icon name="CheckCircleIcon" size={20} />
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="font-extrabold text-2xl text-foreground">Paramètres de l&apos;Entreprise</h2>
        <p className="text-sm text-muted-foreground">Configurer les adresses, contacts WhatsApp et mot de passe d&apos;accès</p>
      </div>

      {/* Formulaire de configuration */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-border p-6 md:p-8 space-y-6 shadow-sm max-w-2xl">
        
        {/* Section WhatsApp */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-base text-accent border-b border-border pb-2 flex items-center gap-2">
            <Icon name="PhoneIcon" size={18} className="text-primary" />
            Contacts WhatsApp
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-accent">Boutique Akwa *</label>
              <input
                required
                type="text"
                value={settings.whatsapp_number_1}
                onChange={(e) => setSettings({ ...settings, whatsapp_number_1: e.target.value })}
                placeholder="Ex: 237676886733"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-accent">Boutique Nkouabang *</label>
              <input
                required
                type="text"
                value={settings.whatsapp_number_2}
                onChange={(e) => setSettings({ ...settings, whatsapp_number_2: e.target.value })}
                placeholder="Ex: 237657941527"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground">Format : Code pays (sans + ni 00) suivi du numéro (ex: 237676886733).</p>
        </div>

        {/* Section Adresses */}
        <div className="space-y-4 pt-4">
          <h3 className="font-extrabold text-base text-accent border-b border-border pb-2 flex items-center gap-2">
            <Icon name="MapPinIcon" size={18} className="text-primary" />
            Adresses Physiques
          </h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-accent">Adresse Akwa *</label>
              <input
                required
                type="text"
                value={settings.address_akwa}
                onChange={(e) => setSettings({ ...settings, address_akwa: e.target.value })}
                placeholder="Boutique N30, Galeries du Congo, Akwa"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-accent">Adresse Nkouabang *</label>
              <input
                required
                type="text"
                value={settings.address_nkouabang}
                onChange={(e) => setSettings({ ...settings, address_nkouabang: e.target.value })}
                placeholder="Carrefour Nkouabang"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section Sécurité */}
        <div className="space-y-4 pt-4">
          <h3 className="font-extrabold text-base text-accent border-b border-border pb-2 flex items-center gap-2">
            <Icon name="ShieldCheckIcon" size={18} className="text-primary" />
            Accès au Panneau Admin
          </h3>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-accent">Mot de passe d&apos;accès *</label>
            <input
              required
              type="text"
              value={settings.admin_password}
              onChange={(e) => setSettings({ ...settings, admin_password: e.target.value })}
              placeholder="admin"
              className="w-full px-4 py-3 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-wider shadow-lg hover:bg-sky-600 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Sauvegarder les Paramètres
        </button>

      </form>

      <section className="max-w-2xl space-y-5 rounded-3xl border border-border bg-white p-6 shadow-sm md:p-8">
        <div>
          <h3 className="text-xl font-extrabold text-foreground">Vidéos de l’atelier</h3>
          <p className="mt-1 text-sm text-muted-foreground">Ajoutez des vidéos muettes qui seront présentées sur la page À propos.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input value={newVideoTitle} onChange={(event) => setNewVideoTitle(event.target.value)} placeholder="Titre de la vidéo" className="rounded-2xl border border-border bg-muted px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <input value={newVideoDesc} onChange={(event) => setNewVideoDesc(event.target.value)} placeholder="Courte description facultative" className="rounded-2xl border border-border bg-muted px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button type="button" onClick={() => aboutVideoRef.current?.click()} disabled={videoUploading} className="w-full rounded-2xl bg-primary px-5 py-3.5 text-sm font-extrabold text-white transition-[transform,background-color] hover:bg-sky-600 active:scale-[.98] disabled:opacity-60">
          {videoUploading ? 'Envoi de la vidéo…' : 'Ajouter une vidéo à la page À propos'}
        </button>
        <input ref={aboutVideoRef} type="file" accept="video/mp4,video/webm,video/quicktime" className="hidden" onChange={(event) => handleAboutVideoUpload(event.target.files?.[0])} />
        {aboutVideos.length > 0 && <div className="space-y-3">{aboutVideos.map((video) => <article key={video.id} className="flex items-center gap-3 rounded-2xl border border-border p-3"><video src={video.url} muted className="h-14 w-20 rounded-xl bg-black object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-extrabold text-accent">{video.title}</p>{video.description && <p className="truncate text-xs text-muted-foreground">{video.description}</p>}</div><button type="button" onClick={() => removeAboutVideo(video.id)} className="rounded-xl p-2 text-red-600 hover:bg-red-50" aria-label={`Supprimer ${video.title}`}><Icon name="TrashIcon" size={17} /></button></article>)}</div>}
      </section>
    </div>
  );
}
