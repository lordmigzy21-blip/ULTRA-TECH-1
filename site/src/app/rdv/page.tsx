import type { Metadata } from 'next';
import RDVContent from './components/RDVContent';

export const metadata: Metadata = {
  title: 'Prendre Rendez-vous — Ultra Tech Multiservice',
  description: 'Planifiez un rendez-vous chez Ultra Tech Multiservice à Douala pour un dépannage informatique, maintenance PC, développement logiciel ou tout autre service tech. Boutique à Akwa.',
  alternates: {
    canonical: '/rdv',
  },
  openGraph: {
    title: 'Prendre Rendez-vous — Ultra Tech Multiservice',
    description: 'Planifiez un rendez-vous chez Ultra Tech Multiservice à Douala pour un dépannage informatique, maintenance PC ou développement logiciel.',
    url: '/rdv',
    type: 'website',
  },
  twitter: {
    title: 'Prendre Rendez-vous — Ultra Tech Multiservice',
    description: 'Planifiez un rendez-vous chez Ultra Tech Multiservice à Douala.',
  },
};

export default function RDVPage() {
  return <RDVContent />;
}
