import Icon from '@/components/ui/AppIcon';

const commitments = [
  { title: 'Un conseil avant l’achat', text: 'Choisissez un équipement adapté à votre usage, à votre budget et à vos besoins réels.', icon: 'ChatBubbleLeftRightIcon' },
  { title: 'Une équipe pour la suite', text: 'Confiez-nous le dépannage, l’installation ou la protection de vos outils numériques.', icon: 'WrenchIcon' },
];

export default function HomeIntroduction() {
  return (
    <section className="bg-muted/40 py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-5">
        <div className="rounded-3xl bg-accent p-8 text-white md:p-10 lg:col-span-3">
          <p className="text-sm font-bold text-sky-light">Votre partenaire technologique</p>
          <h2 className="mt-4 max-w-xl text-3xl font-extrabold tracking-tight text-balance md:text-4xl">Équiper, réparer et sécuriser vos outils au même endroit.</h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">Ultra Tech Multiservice accompagne les particuliers et les entreprises avec des équipements, des services informatiques et un suivi accessible à Douala.</p>
        </div>
        <div className="space-y-3 lg:col-span-2">
          {commitments.map((commitment) => (
            <article key={commitment.title} className="rounded-3xl border border-border bg-white p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-light text-primary"><Icon name={commitment.icon} size={21} aria-hidden="true" /></div>
                <div><h3 className="font-extrabold text-accent">{commitment.title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{commitment.text}</p></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
