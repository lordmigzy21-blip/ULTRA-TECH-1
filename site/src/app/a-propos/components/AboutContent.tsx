'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSettings, parseAboutVideos, AboutVideo } from '@/lib/db';
import Icon from '@/components/ui/AppIcon';
import WhyChooseUs from '../components/WhyChooseUs';

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
      <section className="py-24 bg-muted/40">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-primary text-xs font-bold uppercase tracking-widest block">Derrière les coulisses</span>
            <h2 className="font-extrabold text-3xl md:text-4xl text-accent tracking-tight text-balance">
              Découvrez Notre Atelier en Vidéo
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
              Voyez comment nos techniciens préparent, testent et organisent les machines avant la vente. Une transparence totale pour gagner votre confiance.
            </p>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-[2rem] bg-white">
              <Icon name="VideoIcon" size={48} className="mx-auto opacity-30 text-primary mb-4" />
              <p className="font-bold text-accent">Vidéos de la boutique bientôt disponibles</p>
              <p className="text-xs text-muted-foreground mt-2">Revenez prochainement pour voir notre équipe en action.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 bg-white rounded-3xl border border-border overflow-hidden shadow-lg"
              >
                {activeVideo && (
                  <>
                    <video
                      key={activeVideo.id}
                      src={activeVideo.url}
                      controls
                      className="w-full aspect-video bg-black"
                      preload="metadata"
                    />
                    <div className="p-6 space-y-2">
                      <h3 className="font-extrabold text-lg text-accent">{activeVideo.title}</h3>
                      {activeVideo.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">{activeVideo.description}</p>
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
                        ? 'border-primary bg-sky-light/30 shadow-sm'
                        : 'border-border bg-white hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <Icon name="VideoIcon" size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-accent line-clamp-2">{video.title}</p>
                        {video.description && (
                          <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{video.description}</p>
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
