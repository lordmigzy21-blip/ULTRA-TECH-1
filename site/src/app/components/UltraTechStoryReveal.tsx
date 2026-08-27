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
    title: 'Équipements & ordinateurs de qualité',
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

    const calculatedTop = elRect.top - containerRect.top - 190;
    const calculatedLeft = Math.min(
      Math.max(elRect.left - containerRect.left - 50, 16),
      containerRect.width - 280
    );

    setImgPos({
      top: calculatedTop > 10 ? calculatedTop : elRect.bottom - containerRect.top + 15,
      left: calculatedLeft,
    });
  }, [hoveredKey]);

  return (
    <section className="relative overflow-hidden bg-accent dark:bg-ultra-dark-blue-900 text-white py-20 md:py-32 transition-colors border-t border-b border-dark-blue-2/50">
      {/* Subtle Ambient Background Gradients */}
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.25),transparent_40%),radial-gradient(circle_at_85%_80%,rgba(56,189,248,0.15),transparent_45%)]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <div ref={containerRef} className="relative isolate">
          {/* Header Label */}
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400/90">
              VOTRE PARTENAIRE TECH À DOUALA
            </span>
          </div>

          {/* Story Paragraph with Jägerhof-style dimming and hover reveal */}
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-light leading-[1.5] md:leading-[1.4] tracking-tight transition-all duration-300">
              {SEGMENTS.map((seg, i) => {
                const triggerKey = seg.trigger;
                const isThisTriggerHovered = hoveredKey === triggerKey;
                const isAnyHovered = hoveredKey !== null;

                if (!triggerKey && !seg.emphasis) {
                  return (
                    <span
                      key={i}
                      className={`transition-opacity duration-300 ${
                        isAnyHovered ? 'opacity-30 text-gray-300' : 'opacity-100 text-white/95'
                      }`}
                    >
                      {seg.text}
                    </span>
                  );
                }

                if (seg.emphasis) {
                  return (
                    <span
                      key={i}
                      className={`font-normal transition-opacity duration-300 ${
                        isAnyHovered ? 'opacity-30 text-gray-300' : 'opacity-100 text-sky-200'
                      }`}
                    >
                      {seg.text}
                    </span>
                  );
                }

                return (
                  <span
                    key={i}
                    ref={(el) => {
                      triggerRefs.current[triggerKey!] = el;
                    }}
                    onMouseEnter={() => setHoveredKey(triggerKey!)}
                    onMouseLeave={() => setHoveredKey(null)}
                    onClick={() => setHoveredKey(hoveredKey === triggerKey ? null : triggerKey!)}
                    className={`relative inline-block cursor-pointer font-medium transition-all duration-300 px-1.5 py-0.5 rounded ${
                      isThisTriggerHovered
                        ? 'opacity-100 text-white underline underline-offset-[10px] decoration-3 decoration-primary bg-primary/20 scale-[1.03] z-10'
                        : isAnyHovered
                        ? 'opacity-30 text-gray-300 underline underline-offset-[8px] decoration-1 decoration-white/30'
                        : 'opacity-100 text-white underline underline-offset-[8px] decoration-1 decoration-sky-400/60 hover:text-sky-200 hover:decoration-primary'
                    }`}
                  >
                    {seg.text}
                  </span>
                );
              })}
            </p>
          </div>

          {/* Floating Hover Image Preview (Jägerhof Style) */}
          {hoveredKey && TRIGGERS[hoveredKey] && (
            <div
              style={{
                top: `${imgPos.top}px`,
                left: `${imgPos.left}px`,
              }}
              className="absolute z-30 pointer-events-none transition-all duration-300 ease-out transform -translate-y-2"
            >
              <div className="relative w-64 h-44 md:w-72 md:h-48 rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] bg-ultra-dark-blue-900">
                <Image
                  src={TRIGGERS[hoveredKey].src}
                  alt={TRIGGERS[hoveredKey].title}
                  fill
                  sizes="(max-width: 768px) 256px, 288px"
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <span className="absolute bottom-3 left-4 right-4 text-xs font-semibold text-white truncate text-center tracking-wide">
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
