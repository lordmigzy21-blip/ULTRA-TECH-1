import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = { title: 'Politique de confidentialité', description: 'Politique de confidentialité du site Ultra Tech Multiservice.' };

const sections = [
  ['Données concernées', 'Lorsque vous utilisez le formulaire de rendez-vous, nous recevons les informations que vous fournissez, comme votre nom, votre numéro de téléphone, votre demande et la date souhaitée.'],
  ['Utilisation des données', 'Ces informations servent uniquement à répondre à votre demande, préparer un rendez-vous ou vous recontacter au sujet du service demandé.'],
  ['Conservation et sécurité', 'Nous limitons l’accès aux données aux personnes qui en ont besoin pour traiter votre demande. Nous ne vendons pas vos données personnelles.'],
  ['WhatsApp et réseaux sociaux', 'Si vous choisissez de nous contacter via WhatsApp ou un réseau social, le traitement de vos messages est aussi soumis à la politique de cette plateforme.'],
  ['Vos droits', 'Vous pouvez demander l’accès, la correction ou la suppression de vos informations en nous contactant à ultra.tech.multiservice@gmail.com.'],
  ['Contact', 'Pour toute question sur cette politique, écrivez-nous à ultra.tech.multiservice@gmail.com ou contactez l’une de nos boutiques.'],
];

export default function PrivacyPage() {
  return <main className="min-h-screen bg-white"><Header /><article className="mx-auto max-w-3xl px-6 pb-20 pt-36"><p className="text-sm font-bold text-primary">Vos données</p><h1 className="mt-3 text-4xl font-extrabold tracking-tight text-accent text-balance">Politique de confidentialité</h1><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Dernière mise à jour : 7 août 2026.</p><div className="mt-12 space-y-8">{sections.map(([title, content]) => <section key={title}><h2 className="text-xl font-extrabold text-accent">{title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{content}</p></section>)}</div></article><Footer /><WhatsAppButton /></main>;
}
