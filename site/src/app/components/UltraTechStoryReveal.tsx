'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';

const TRIGGERS: Record<string, { src: string; title: string }> = {
  akwa: {
    src: '/assets/images/story_akwa.jpeg',
    title: 'Notre boutique à Akwa, Douala',
  },
  equipe: {
    src: '/assets/images/story_team.jpg',
    title: "L'équipe Ultra Tech Multiservice",
  },
  ordinateur: {
    src: '/assets/images/story_ordinateur.jpg',
    title: 'Équipements et ordinateurs de qualité',
  },
};

interface Segment {
  text: string;
  trigger?: keyof typeof TRIGGERS;
  emphasis?: boolean;
}

const SEGMENTS: Segment[] = [
  { text: "La technologie ne devrait jamais être un obstacle. Depuis notre boutique " },
  { text: "d'Akwa", trigger: 'akwa' },
  { text: ", vendre un " },
  { text: "ordinateur", trigger: 'ordinateur' },
  { text: " veut dire bien plus qu'un simple encaissement : c'est écouter votre besoin, configurer la machine à votre mesure, puis assurer un suivi régulier. " },
  { text: "Notre équipe", trigger: 'equipe' },
  { text: " rassemble des passionnés engagés dans le " },
  { text: "développement logiciel", emphasis: true },
  { text: ", la " },
  { text: "sécurité réseau", emphasis: true },
  { text: ", la " },
  { text: "vidéosurveillance", emphasis: true },
  { text: " et " },
  { text: "l'infographie", emphasis: true },
  { text: " pour offrir à chaque client un accompagnement complet et sans compromis." },
];

export default function UltraTechStoryReveal() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [imgPos, setImgPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  useLayoutEffect(() => {
    if (!hoveredKey || !containerRef.current) return;
    const triggerEl = triggerRefs.current[hoveredKey];
    if (!triggerEl) return;

    const container = containerRef.current;
    const elRect = triggerEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const calculatedTop = elRect.top - containerRect.top - 180;
    const calculatedLeft = Math.min(
      Math.max(elRect.left - containerRect.left - 40, 16),
      containerRect.width - 240
    );

    setImgPos({
      top: calculatedTop > 10 ? calculatedTop : elRect.bottom - containerRect.top + 10,
      left: calculatedLeft,
    });
  }, [hoveredKey]);

  return (
    <section className="py-16 md:py-24 bg-sky-light/40 dark:bg-ultra-dark-blue-800/80 transition-colors">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div
          ref={containerRef}
          className="relative min-h-[460px] md:min-h-[500px] overflow-hidden rounded-3xl bg-gradient-to-b from-[#141E3C] via-[#0F172A] to-[#081821] p-8 md:p-14 shadow-2xl border border-sky-500/20"
        >
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-300 border border-primary/30 mb-6">
              Notre Histoire & Vision
            </span>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-8 tracking-tight">
              Une relation humaine derrière chaque composant tech.
            </h3>

            <p className="text-lg md:text-xl leading-relaxed text-gray-200 font-normal">
              {SEGMENTS.map((seg, i) => {
                if (!seg.trigger && !seg.emphasis) {
                  return <span key={i}>{seg.text}</span>;
                }

                if (seg.emphasis) {
                  return (
                    <span
                      key={i}
                      className="italic font-semibold text-sky-200 border-b border-dashed border-sky-400/40 px-0.5"
                    >
                      {seg.text}
                    </span>
                  );
                }

                const triggerKey = seg.trigger!;
                const isHovered = hoveredKey === triggerKey;

                return (
                  <span
                    key={i}
                    ref={(el) => {
                      triggerRefs.current[triggerKey] = el;
                    }}
                    onMouseEnter={() => setHoveredKey(triggerKey)}
                    onMouseLeave={() => setHoveredKey(null)}
                    onClick={() => setHoveredKey(hoveredKey === triggerKey ? null : triggerKey)}
                    className={`italic font-semibold cursor-pointer underline underline-offset-4 decoration-2 transition-all duration-300 px-1 py-0.5 rounded ${
                      isHovered
                        ? 'text-sky-300 decoration-sky-300 bg-sky-500/20'
                        : 'text-white decoration-primary/60 hover:text-sky-200 hover:decoration-primary'
                    }`}
                  >
                    {seg.text}
                  </span>
                );
              })}
            </p>

            <p className="mt-8 text-xs text-sky-300/70 font-medium italic">
              💡 Survolez les mots soulignés (<span className="underline decoration-primary">d'Akwa</span>, <span className="underline decoration-primary">ordinateur</span>, <span className="underline decoration-primary">Notre équipe</span>) pour découvrir notre univers en image.
            </p>
          </div>

          {/* Floating Hover Image Preview */}
          {hoveredKey && TRIGGERS[hoveredKey] && (
            <div
              style={{
                top: `${imgPos.top}px`,
                left: `${imgPos.left}px`,
              }}
              className="absolute z-20 pointer-events-none transition-all duration-300 ease-out transform -translate-y-2 animate-fadeIn"
            >
              <div className="relative w-56 h-40 md:w-64 md:h-44 rounded-2xl overflow-hidden border-2 border-sky-400/60 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-slate-900">
                <Image
                  src={TRIGGERS[hoveredKey].src}
                  alt={TRIGGERS[hoveredKey].title}
                  fill
                  sizes="(max-width: 768px) 224px, 256px"
                  className="object-cover transition-transform duration-500 scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 right-3 text-[11px] font-semibold text-white truncate text-center">
                  {TRIGGERS[hoveredKey].title}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
