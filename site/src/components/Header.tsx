'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import AppLogo from './ui/AppLogo';
import { useTheme } from './ThemeProvider';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { theme, toggleTheme } = useTheme();

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 20));
  useEffect(() => setIsOpen(false), [pathname]);

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Catalogue', href: '/boutique' },
    { label: 'Services', href: '/services' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Rendez-vous', href: '/rdv' },
    { label: 'Contact', href: '/contact' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  const line1Variants = { closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6 } };
  const line2Variants = { closed: { opacity: 1 }, open: { opacity: 0 } };
  const line3Variants = { closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } };

  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? isDark
            ? 'bg-ultra-dark-blue-800/90 backdrop-blur-md border-b border-ultra-dark-blue-600 shadow-sm py-3.5'
            : 'bg-white/85 backdrop-blur-md border-b border-border shadow-sm py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <AppLogo showText={true} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-bold tracking-wide transition-colors ${
                  isActive
                    ? 'text-primary'
                    : isDark
                    ? 'text-blue-200 hover:text-primary'
                    : 'text-accent hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 ${
              isDark
                ? 'bg-ultra-dark-blue-600/60 text-yellow-300 hover:bg-ultra-dark-blue-600'
                : 'bg-sky-light text-accent hover:bg-primary/10'
            }`}
          >
            {isDark ? (
              /* Sun */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            ) : (
              /* Moon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <Link
            href="/rdv"
            className="px-5 py-2.5 bg-btn-primary text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md hover:bg-btn-primary/90 transition-[transform,background-color] hover:scale-105 active:scale-95"
          >
            Prendre RDV
          </Link>
        </nav>

        {/* Mobile: dark toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 ${
              isDark ? 'bg-ultra-dark-blue-600/60 text-yellow-300' : 'bg-sky-light text-accent'
            }`}
          >
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 z-50 relative"
            aria-label="Menu"
          >
            <motion.span variants={line1Variants} animate={isOpen ? 'open' : 'closed'} className={`w-6 h-0.5 rounded-full block ${isDark ? 'bg-blue-100' : 'bg-accent'}`} />
            <motion.span variants={line2Variants} animate={isOpen ? 'open' : 'closed'} className={`w-6 h-0.5 rounded-full block ${isDark ? 'bg-blue-100' : 'bg-accent'}`} />
            <motion.span variants={line3Variants} animate={isOpen ? 'open' : 'closed'} className={`w-6 h-0.5 rounded-full block ${isDark ? 'bg-blue-100' : 'bg-accent'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className={`absolute top-full left-0 right-0 backdrop-blur-md border-b shadow-lg py-6 px-6 md:hidden flex flex-col gap-4 ${
              isDark
                ? 'bg-ultra-dark-blue-700/95 border-ultra-dark-blue-600'
                : 'bg-white/95 border-border'
            }`}
          >
            {navLinks.map((link) => (
              <motion.div key={link.label} variants={itemVariants}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-extrabold block py-2 ${
                    isDark ? 'text-blue-100 hover:text-primary' : 'text-accent hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div variants={itemVariants} className="pt-2">
              <Link
                href="/rdv"
                onClick={() => setIsOpen(false)}
                className="w-full text-center block py-3.5 bg-btn-primary text-white font-bold text-sm rounded-full shadow-md hover:bg-btn-primary/90"
              >
                Prendre Rendez-vous
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
