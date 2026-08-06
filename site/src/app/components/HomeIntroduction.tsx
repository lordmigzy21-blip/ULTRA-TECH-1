import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function HomeIntroduction() {
  return (
    <section className="overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-5 lg:grid-cols-5">
          <article className="relative isolate min-h-[390px] overflow-hidden rounded-[2rem] bg-accent p-8 text-white md:p-10 lg:col-span-3">
            <div className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle_at_12%_12%,rgba(202,232,232,.65),transparent_26%),radial-gradient(circle_at_82%_88%,rgba(85,165,225,.45),transparent_28%)]" />
            <div className="relative z-10 max-w-sm">
              <p className="text-sm font-bold text-sky-light">Un seul partenaire, plusieurs besoins</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-balance md:text-4xl">Votre prochain outil commence ici.</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/80">Équipez-vous, faites réparer votre matériel et protégez votre activité avec une équipe proche de vous.</p>
              <Link href="/boutique" className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-accent transition-[transform,background-color] hover:bg-sky-light hover:scale-[1.02] active:scale-[.98]">
                Voir les équipements <Icon name="ArrowRightIcon" size={17} aria-hidden="true" />
              </Link>
            </div>
            <AppImage src="/assets/images/laptop_front-1784329995010.png" alt="Ordinateur portable disponible chez Ultra Tech" width={680} height={680} className="absolute -bottom-16 -right-20 h-[360px] w-[360px] object-contain drop-shadow-[0_28px_34px_rgba(0,0,0,.32)] md:-right-8 md:h-[460px] md:w-[460px]" />
          </article>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            <article className="relative overflow-hidden rounded-[2rem] border border-border bg-sky-light p-7">
              <AppImage src="/assets/images/keyboard_gaming-1784329994862.png" alt="Accessoires informatiques" width={260} height={180} className="absolute -right-10 -bottom-9 h-44 w-56 object-contain opacity-95" />
              <div className="relative z-10 max-w-[13rem]">
                <Icon name="WrenchIcon" size={23} className="text-primary" aria-hidden="true" />
                <h3 className="mt-8 text-xl font-extrabold text-accent">Un conseil qui tient compte de votre usage.</h3>
              </div>
            </article>
            <article className="relative overflow-hidden rounded-[2rem] border border-border bg-muted p-7">
              <AppImage src="/assets/images/jbl_speaker-1784331488284.png" alt="Matériel et accessoires" width={250} height={180} className="absolute -right-8 -bottom-8 h-40 w-48 object-contain" />
              <div className="relative z-10 max-w-[13rem]">
                <Icon name="ShieldCheckIcon" size={23} className="text-primary" aria-hidden="true" />
                <h3 className="mt-8 text-xl font-extrabold text-accent">Du matériel et un accompagnement après l’achat.</h3>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
