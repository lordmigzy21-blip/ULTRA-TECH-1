import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = { title: 'Conditions générales', description: 'Conditions générales d’utilisation du site Ultra Tech Multiservice.' };

const sections = [
  ['Objet', 'Ce site présente les produits et services d’Ultra Tech Multiservice et permet de demander des informations ou un rendez-vous.'],
  ['Produits et disponibilités', 'Les caractéristiques, prix et disponibilités affichés sont donnés à titre indicatif. Confirmez toujours la disponibilité et le prix avec notre équipe avant tout achat.'],
  ['Demandes de rendez-vous', 'Une demande en ligne ne vaut pas confirmation. Notre équipe vous contacte pour convenir de la date, du service et des conditions de prise en charge.'],
  ['Utilisation du site', 'Vous vous engagez à utiliser le site de manière légale et à ne pas tenter d’en perturber le fonctionnement.'],
  ['Liens et services tiers', 'Les liens vers WhatsApp et les réseaux sociaux facilitent la prise de contact. Leur utilisation reste soumise aux conditions de ces plateformes.'],
  ['Mises à jour', 'Nous pouvons adapter ces conditions lorsque nos services ou le site évoluent. La version affichée sur cette page est la version applicable.'],
];

export default function TermsPage() {
  return <main className="min-h-screen bg-white"><Header /><article className="mx-auto max-w-3xl px-6 pb-20 pt-36"><p className="text-sm font-bold text-primary">Informations légales</p><h1 className="mt-3 text-4xl font-extrabold tracking-tight text-accent text-balance">Conditions générales d’utilisation</h1><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Dernière mise à jour : 7 août 2026.</p><div className="mt-12 space-y-8">{sections.map(([title, content]) => <section key={title}><h2 className="text-xl font-extrabold text-accent">{title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{content}</p></section>)}</div></article><Footer /><WhatsAppButton /></main>;
}
