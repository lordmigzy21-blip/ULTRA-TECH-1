import React from 'react';
import AppImage from './AppImage';

interface AppLogoProps {
  className?: string;
  showText?: boolean;
}

export default function AppLogo({ className, showText = true }: AppLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className || ''}`}>
      <AppImage
        src="/assets/images/logo-removebg-preview-1784329896568.png"
        alt="Ultra Tech Logo"
        width={36}
        height={36}
        className="object-contain"
      />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-heading font-black text-sm tracking-tight text-accent dark:text-white">
            Ultra Tech
          </span>
          <span className="text-[9px] font-bold text-primary tracking-widest uppercase mt-0.5">
            Multiservice
          </span>
        </div>
      )}
    </div>
  );
}
