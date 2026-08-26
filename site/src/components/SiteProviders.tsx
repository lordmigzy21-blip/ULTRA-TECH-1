'use client';

import React from 'react';
import LoadingScreen from './LoadingScreen';
import OfflineOverlay from './OfflineOverlay';
import ThemeProvider from './ThemeProvider';

export default function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <OfflineOverlay />
      {children}
    </ThemeProvider>
  );
}