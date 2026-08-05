'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AppLogo from './ui/AppLogo';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Boutique', href: '/boutique' },
    { label: 'Services', href: '/services' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Rendez-vous', href: '/rdv' },
    { label: 'Contact', href: '/contact' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  const line1Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 6 },
  };

  const line2Variants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const line3Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -6 },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-border shadow-sm py-3.5'
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
                    : 'text-accent hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/rdv"
            className="px-5 py-2.5 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md hover:bg-sky-600 transition-all hover:scale-105 active:scale-95"
          >
            Prendre RDV
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-50 relative"
          aria-label="Menu"
        >
          <motion.span
            variants={line1Variants}
            animate={isOpen ? 'open' : 'closed'}
            className="w-6 h-0.5 bg-accent rounded-full block"
          />
          <motion.span
            variants={line2Variants}
            animate={isOpen ? 'open' : 'closed'}
            className="w-6 h-0.5 bg-accent rounded-full block"
          />
          <motion.span
            variants={line3Variants}
            animate={isOpen ? 'open' : 'closed'}
            className="w-6 h-0.5 bg-accent rounded-full block"
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-border shadow-lg py-6 px-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <motion.div key={link.label} variants={itemVariants}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-extrabold text-accent hover:text-primary block py-2"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div variants={itemVariants} className="pt-2">
              <Link
                href="/rdv"
                onClick={() => setIsOpen(false)}
                className="w-full text-center block py-3.5 bg-primary text-white font-bold text-sm rounded-2xl shadow-md hover:bg-sky-600"
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
