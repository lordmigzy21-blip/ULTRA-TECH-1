'use client';

import React from 'react';
import LoadingScreen from './LoadingScreen';
import OfflineOverlay from './OfflineOverlay';

export default function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <OfflineOverlay />
      {children}
    </>
  );
}