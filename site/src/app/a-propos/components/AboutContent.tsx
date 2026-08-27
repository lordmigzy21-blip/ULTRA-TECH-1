'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSettings, parseAboutVideos, AboutVideo } from '@/lib/db';
import Icon from '@/components/ui/AppIcon';
import WhyChooseUs from '../../components/WhyChooseUs';

export default function AboutVideosSection() {
  const [videos, setVideos] = useState<AboutVideo[]>([]);
  const [activeVideo, setActiveVideo] = useState<AboutVideo | null>(null);

  useEffect(() => {
    getSettings().then((settings) => {
      const parsed = parseAboutVideos(settings.about_videos);
      setVideos(parsed);
      if (parsed.length > 0) setActiveVideo(parsed[0]);
    });
  }, []);

  return (
    <>
      {/* ─── Static shop showcase video ─── */}
      <section className="py-20 bg-white dark:bg-ultra-dark-blue-800">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-primary text-xs font-bold uppercase tracking-widest block">
              Notre boutique
            </span>
            <h2 className="font-extrabold text-3xl md:text-4xl text-accent dark:text-blue-100 tracking-tight text-balance">
              Voyez Notre Boutique en Action
            </h2>
            <p className="text-sm text-muted-foreground dark:text-blue-300/70 leading-relaxed text-pretty">
              Une visite authentique de notre espace — là où nos techniciens organisent, préparent et testent chaque équipement avant la vente.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border border-border dark:border-ultra-dark-blue-600 bg-black"
          >
            {/* Gradient overlay on edges for premium look */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-[2rem] z-10 pointer-events-none" />

            <video
              src="/assets/videos/boutique_shop.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Vidéo de la boutique Ultra Tech Douala"
              className="w-full aspect-video object-cover"
            />

            {/* Bottom caption bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
              <p className="text-white font-extrabold text-sm">Ultra Tech Multiservice — Douala</p>
              <p className="text-white/60 text-xs mt-0.5">Boutique Akwa · Galeries du Congo</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Admin-managed videos gallery ─── */}
      <section className="py-24 bg-muted/40 dark:bg-ultra-dark-blue-800">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-primary text-xs font-bold uppercase tracking-widest block">Derrière les coulisses</span>
            <h2 className="font-extrabold text-3xl md:text-4xl text-accent dark:text-blue-100 tracking-tight text-balance">
              Découvrez Notre Atelier en Vidéo
            </h2>
            <p className="text-sm text-muted-foreground dark:text-blue-300/70 leading-relaxed text-pretty">
              Voyez comment nos techniciens préparent, testent et organisent les machines avant la vente. Une transparence totale pour gagner votre confiance.
            </p>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border dark:border-ultra-dark-blue-600 rounded-[2rem] bg-white dark:bg-ultra-dark-blue-700">
              <Icon name="VideoIcon" size={48} className="mx-auto opacity-30 text-primary mb-4" />
              <p className="font-bold text-accent dark:text-blue-100">Vidéos de l&apos;atelier bientôt disponibles</p>
              <p className="text-xs text-muted-foreground dark:text-blue-300/70 mt-2">Revenez prochainement pour voir notre équipe en action.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 bg-white dark:bg-ultra-dark-blue-700 rounded-3xl border border-border dark:border-ultra-dark-blue-600 overflow-hidden shadow-lg"
              >
                {activeVideo && (
                  <>
                    <video
                      key={activeVideo.id}
                      src={activeVideo.url}
                      controls
                      muted
                      className="w-full aspect-video bg-black"
                      preload="metadata"
                    />
                    <div className="p-6 space-y-2">
                      <h3 className="font-extrabold text-lg text-accent dark:text-blue-100">{activeVideo.title}</h3>
                      {activeVideo.description && (
                        <p className="text-sm text-muted-foreground dark:text-blue-300/70 leading-relaxed">{activeVideo.description}</p>
                      )}
                    </div>
                  </>
                )}
              </motion.div>

              <div className="space-y-3">
                {videos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      activeVideo?.id === video.id
                        ? 'border-primary bg-sky-light/30 dark:bg-primary/10 shadow-sm'
                        : 'border-border dark:border-ultra-dark-blue-600 bg-white dark:bg-ultra-dark-blue-700 hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <Icon name="VideoIcon" size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-accent dark:text-blue-100 line-clamp-2">{video.title}</p>
                        {video.description && (
                          <p className="text-[10px] text-muted-foreground dark:text-blue-300/70 line-clamp-1 mt-0.5">{video.description}</p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <WhyChooseUs />
    </>
  );
}
