'use client';

import React, { useEffect, useState } from 'react';
import { getSettings } from '@/lib/db';

export default function WhatsAppButton() {
  const [phone, setPhone] = useState('237676886733');

  useEffect(() => {
    getSettings().then((settings) => {
      if (settings && settings.whatsapp_number_1) {
        setPhone(settings.whatsapp_number_1);
      }
    });
  }, []);

  const message = encodeURIComponent('Bonjour Ultra Tech! 👋 J\'ai visité votre site web et je souhaite obtenir des informations.');
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 active:scale-95 group animate-bounce-subtle"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.734-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.742.002-2.602-1.01-5.05-2.85-6.892-1.84-1.84-4.29-2.853-6.897-2.854-5.442 0-9.866 4.372-9.87 9.745-.001 1.705.452 3.37 1.31 4.83l-.951 3.478 3.568-.936zM17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.466-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347" />
      </svg>
      
      {/* Tooltip */}
      <span className="absolute right-16 scale-0 transition-all rounded-2xl bg-accent text-white px-4 py-2 text-xs font-bold whitespace-nowrap group-hover:scale-100 shadow-md border border-dark-blue-2">
        Besoin d&apos;aide ? WhatsApp
      </span>
    </a>
  );
}
