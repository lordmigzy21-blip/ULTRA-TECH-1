'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface AppImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
}

export default function AppImage({ src, alt, width, height, className, fill }: AppImageProps) {
  const [error, setError] = useState(false);
  const fallbackSrc = '/assets/images/no_image.png';
  const displaySrc = error || !src ? fallbackSrc : src;

  if (fill) {
    return (
      <Image
        src={displaySrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={className}
        onError={() => setError(true)}
        unoptimized
      />
    );
  }

  return (
    <Image
      src={displaySrc}
      alt={alt}
      width={width || 300}
      height={height || 300}
      className={className}
      onError={() => setError(true)}
      unoptimized
    />
  );
}
