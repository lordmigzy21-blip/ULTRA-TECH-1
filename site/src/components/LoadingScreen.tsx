'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LottieAnimation from './LottieAnimation';

export default function LoadingScreen() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setRouteLoading(true);
    const timer = setTimeout(() => setRouteLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!visible && !routeLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-300 ${
        visible || routeLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!visible && !routeLoading}
    >
      <LottieAnimation src="/animations/loading.json" className="w-48 h-44 md:w-56 md:h-52" />
      <p className="mt-4 text-sm font-bold text-accent tracking-wide">Ultra Tech Multiservice</p>
      <p className="text-xs text-muted-foreground mt-1">Chargement en cours…</p>
    </div>
  );
}
