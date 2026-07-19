'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-white flex flex-col justify-between">
      <Header />
      
      <section className="py-40 flex flex-col items-center justify-center text-center space-y-6 px-6">
        <h1 className="text-8xl font-black text-primary tracking-tight">404</h1>
        <h2 className="text-2xl font-extrabold text-accent text-balance">Page introuvable</h2>
        <p className="text-sm text-muted-foreground max-w-md leading-relaxed text-pretty">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée. Vous pouvez retourner à la page d&apos;accueil.
        </p>
        <Link
          href="/"
          className="px-6 py-3.5 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md hover:bg-sky-600 transition-[transform,background-color] duration-200 hover:scale-105 active:scale-95"
        >
          Retourner à l&apos;accueil
        </Link>
      </section>

      <Footer />
    </main>
  );
}
