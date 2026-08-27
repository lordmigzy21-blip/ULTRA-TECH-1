import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import HexPattern from '@/components/ui/HexPattern';

export default function HomeIntroduction() {
  return (
    <section className="overflow-hidden bg-[#0A0E1A] text-white py-20 md:py-28 relative border-b border-white/10">
      <HexPattern opacity={0.04} />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-5">
          
          {/* Main feature banner */}
          <article className="relative isolate min-h-[390px] overflow-hidden rounded-3xl bg-[#101526] p-8 md:p-10 lg:col-span-3 border border-white/15 shadow-2xl flex flex-col justify-between">
            <div className="relative z-10 max-w-sm space-y-4">
              <span className="text-xs font-bold text-[#5B9BF0] uppercase tracking-widest block">Un seul partenaire, plusieurs besoins</span>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-white tracking-tight leading-tight text-balance">
                Votre prochain outil commence ici.
              </h2>
              <p className="text-sm leading-relaxed text-gray-300">
                Équipez-vous, faites réparer votre matériel et protégez votre activité avec une équipe de proximité à Akwa.
              </p>
              <div className="pt-2">
                <Link
                  href="/boutique"
                  className="inline-flex items-center gap-2 rounded-full bg-[#28469E] hover:bg-[#28469E]/90 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[.98]"
                >
                  Voir les équipements <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <AppImage
              src="/assets/images/laptop_front-1784329995010.png"
              alt="Ordinateur portable disponible chez Ultra Tech"
              width={680}
              height={680}
              className="absolute -bottom-16 -right-20 h-[360px] w-[360px] object-contain drop-shadow-[0_28px_34px_rgba(0,0,0,.6)] md:-right-8 md:h-[440px] md:w-[440px]"
            />
          </article>

          {/* Secondary feature cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101526] p-7 shadow-lg">
              <AppImage
                src="/assets/images/keyboard_gaming-1784329994862.png"
                alt="Accessoires informatiques"
                width={260}
                height={180}
                className="absolute -right-10 -bottom-9 h-44 w-56 object-contain opacity-80"
              />
              <div className="relative z-10 max-w-[14rem] space-y-2">
                <span className="text-[10px] font-bold text-[#5B9BF0] uppercase tracking-wider block">Conseil Personnalisé</span>
                <h3 className="font-heading font-bold text-lg text-white leading-snug">
                  Un accompagnement adapté à vos besoins réels.
                </h3>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101526] p-7 shadow-lg">
              <AppImage
                src="/assets/images/jbl_speaker-1784331488284.png"
                alt="Matériel et accessoires"
                width={250}
                height={180}
                className="absolute -right-8 -bottom-8 h-40 w-48 object-contain opacity-80"
              />
              <div className="relative z-10 max-w-[14rem] space-y-2">
                <span className="text-[10px] font-bold text-[#5B9BF0] uppercase tracking-wider block">Service Après-Vente</span>
                <h3 className="font-heading font-bold text-lg text-white leading-snug">
                  Du matériel vérifié avec suivi local à Douala.
                </h3>
              </div>
            </article>
          </div>

        </div>
      </div>
    </section>
  );
}
