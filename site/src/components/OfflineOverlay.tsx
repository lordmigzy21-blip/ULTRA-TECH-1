'use client';

import React, { useEffect, useState } from 'react';
import LottieAnimation from './LottieAnimation';

export default function OfflineOverlay() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    setOffline(!navigator.onLine);

    const goOffline = () => setOffline(true);
    const goOnline = () => setOffline(false);

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white px-6 text-center">
      <LottieAnimation src="/animations/offline.json" className="w-72 h-48 md:w-96 md:h-56" />
      <h2 className="mt-6 font-extrabold text-2xl text-accent">Vous êtes hors ligne</h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm leading-relaxed">
        Vérifiez votre connexion internet. Ultra Tech reviendra dès que vous serez reconnecté.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-8 px-6 py-3 bg-primary text-white font-bold text-sm rounded-2xl hover:bg-dark-blue-2 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
}
