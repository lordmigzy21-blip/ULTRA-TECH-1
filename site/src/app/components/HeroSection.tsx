'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';

interface FloatingItemType {
  id: string;
  name: string;
  image_url: string;
  left: string;      // Position horizontale de départ
  top: string;       // Position verticale de départ
  scale: number;     // Échelle de l'image
  rotate: number;    // Rotation initiale
  moveX: number;     // Distance de déplacement X sur scroll (px)
  moveY: number;     // Distance de déplacement Y sur scroll (px)
  rotateSpeed: number; // Vitesse de rotation sur scroll
}

// Configuration extensible des équipements flottants du Hero
const FLOATING_ITEMS: FloatingItemType[] = [
  {
    id: 'laptop',
    name: 'Ordinateur portable',
    image_url: '/assets/images/laptop_front-1784329995010.png',
    left: '25%',
    top: '30%',
    scale: 1.1,
    rotate: -15,
    moveX: -150,
    moveY: -100,
    rotateSpeed: -45,
  },
  {
    id: 'keyboard',
    name: 'Clavier Gaming',
    image_url: '/assets/images/keyboard_gaming-1784329994862.png',
    left: '65%',
    top: '25%',
    scale: 0.95,
    rotate: 12,
    moveX: 180,
    moveY: -80,
    rotateSpeed: 30,
  },
  {
    id: 'mouse',
    name: 'Souris Gamer',
    image_url: '/assets/images/mouse-1784329995357.png',
    left: '15%',
    top: '65%',
    scale: 0.8,
    rotate: 25,
    moveX: -200,
    moveY: 150,
    rotateSpeed: 50,
  },
  {
    id: 'stand',
    name: 'Support Laptop',
    image_url: '/assets/images/laptopn_stand-1784329994358.png',
    left: '75%',
    top: '60%',
    scale: 0.85,
    rotate: -20,
    moveX: 150,
    moveY: 120,
    rotateSpeed: -35,
  },
  // Images supplémentaires
  {
    id: 'headphones',
    name: 'Casque Audio',
    image_url: '/assets/images/headphones-1784331487965.png',
    left: '48%',
    top: '72%',
    scale: 0.75,
    rotate: 5,
    moveX: 0,
    moveY: 220,
    rotateSpeed: 15,
  },
  {
    id: 'speaker',
    name: 'Haut-parleur Bluetooth',
    image_url: '/assets/images/jbl_speaker-1784331488284.png',
    left: '80%',
    top: '12%',
    scale: 0.65,
    rotate: 45,
    moveX: 250,
    moveY: -200,
    rotateSpeed: 90,
  },
  {
    id: 'hdd',
    name: 'Disque dur externe',
    image_url: '/assets/images/hdd-1784331487283.png',
    left: '10%',
    top: '15%',
    scale: 0.6,
    rotate: -35,
    moveX: -250,
    moveY: -150,
    rotateSpeed: -60,
  },
];

interface FloatingItemProps {
  item: FloatingItemType;
  index: number;
  scrollYProgress: any;
}

function FloatingItem({ item, index, scrollYProgress }: FloatingItemProps) {
  const [animationState, setAnimationState] = useState<'entrance' | 'idle'>('entrance');

  // Parallax scroll bindings
  const parallaxX = useTransform(scrollYProgress, [0, 1], [0, item.moveX]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, item.moveY]);
  const parallaxRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [item.rotate, item.rotate + item.rotateSpeed]
  );
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Starts offscreen above (-450px)
  const initialY = -450;

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: item.left,
        top: item.top,
      }}
      initial={{ y: initialY, opacity: 0, scale: 0.3 }}
      animate={
        animationState === 'entrance'
          ? { y: 0, opacity: 1, scale: item.scale }
          : { y: [0, -10, 0], rotate: [0, 1.5, -1.5, 0] }
      }
      transition={
        animationState === 'entrance'
          ? {
              type: 'spring',
              stiffness: 85,
              damping: 10, // Underdamped = bounce on land
              delay: index * 0.12, // Staggered entry (cascade)
            }
          : {
              y: {
                duration: 3 + (index % 3) * 0.6,
                repeat: Infinity,
                repeatType: 'reverse' as const,
                ease: 'easeInOut',
              },
              rotate: {
                duration: 4 + (index % 2) * 0.8,
                repeat: Infinity,
                repeatType: 'reverse' as const,
                ease: 'easeInOut',
              }
            }
      }
      onAnimationComplete={() => {
        if (animationState === 'entrance') {
          setAnimationState('idle');
        }
      }}
      className="w-28 h-28 md:w-40 md:h-40 flex items-center justify-center select-none"
    >
      <motion.div
        style={{
          x: parallaxX,
          y: parallaxY,
          rotate: parallaxRotate,
          opacity: parallaxOpacity,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AppImage
          src={item.image_url}
          alt={item.name}
          width={200}
          height={200}
          className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] filter saturate-[1.05]"
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16">
      
      {/* BACKGROUND GRADIENT ANIMÉ (Bug 1 résolu) */}
      <div 
        className="absolute inset-0 z-0 bg-[length:400%_400%] animate-[gradient_15s_ease_infinite]"
        style={{
          backgroundImage: 'linear-gradient(135deg, #CAE8E8, #28469E, #CAE8E8, #28469E)',
        }}
      />
      
      {/* Radial overlay for atmospheric depth */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0%,transparent_65%)] pointer-events-none" />
      
      {/* Styles personnalisés pour le dégradé */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Contenu textuel central */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 select-none">
        
        {/* Surlignage */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/25 text-accent font-extrabold text-xs uppercase tracking-widest shadow-sm"
        >
          🇨🇲 Ultra Tech Multiservice — Douala
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-black text-4xl md:text-6xl text-white tracking-tight leading-[1.1] drop-shadow-md text-balance"
        >
          Votre Univers Technologique <br className="hidden md:block" />
          <span className="text-accent bg-white/10 px-3 py-0.5 rounded-2xl">à Douala</span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-pretty"
        >
          Vente d&apos;ordinateurs, téléphones, sécurité réseau, vidéosurveillance et développement de solutions logicielles sur mesure.
        </motion.p>

        {/* Boutons d'action */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Link
            href="/boutique"
            className="px-8 py-4 bg-white text-accent font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg hover:bg-gray-50 hover:scale-105 active:scale-95 transition-[transform,background-color,box-shadow] duration-200"
          >
            Explorer la boutique
          </Link>
          <Link
            href="/rdv"
            className="px-8 py-4 bg-accent text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg hover:bg-dark-blue-2 hover:scale-105 active:scale-95 transition-[transform,background-color,box-shadow] duration-200 border border-white/10"
          >
            Prendre rendez-vous
          </Link>
        </motion.div>

      </div>

      {/* ÉQUIPEMENTS FLOTTANTS */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {mounted &&
          FLOATING_ITEMS.map((item, index) => (
            <FloatingItem
              key={item.id}
              item={item}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
      </div>

    </section>
  );
}
