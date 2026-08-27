import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import SiteProviders from '@/components/SiteProviders';
import '../styles/tailwind.css';

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    variable: '--font-plus-jakarta-sans',
    display: 'swap',
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ultra-tech-1.vercel.app';

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: 'Ultra Tech Multiservice — Votre Univers Tech à Douala',
        template: '%s | Ultra Tech Multiservice',
    },
    description: 'Ultra Tech Multiservice à Douala : vente d\'électronique, ordinateurs reconditionnés, développement logiciel, maintenance informatique, vidéosurveillance et infographie. Boutique à Akwa.',
    keywords: [
        'ordinateurs Douala',
        'vente informatique Cameroun',
        'Ultra Tech Multiservice',
        'développement logiciel Douala',
        'maintenance informatique Douala',
        'vidéosurveillance Cameroun',
        'téléphones reconditionnés Douala',
        'Galeries du Congo Akwa',
    ],
    authors: [{ name: 'Ultra Tech Multiservice', url: BASE_URL }],
    creator: 'Ultra Tech Multiservice',
    publisher: 'Ultra Tech Multiservice',
    icons: {
        icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    },
    openGraph: {
        type: 'website',
        locale: 'fr_CM',
        url: BASE_URL,
        siteName: 'Ultra Tech Multiservice',
        title: 'Ultra Tech Multiservice — Votre Univers Tech à Douala',
        description: 'Vente d\'ordinateurs reconditionnés, téléphones, accessoires & services informatiques à Douala, Cameroun. Boutique à Akwa.',
        images: [
            {
                url: '/assets/images/og-banner.png',
                width: 1200,
                height: 630,
                alt: 'Ultra Tech Multiservice — Votre Univers Technologique à Douala',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ultra Tech Multiservice — Votre Univers Tech à Douala',
        description: 'Vente d\'ordinateurs reconditionnés, téléphones, accessoires & services informatiques à Douala, Cameroun.',
        images: ['/assets/images/og-banner.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: BASE_URL,
    },
};

// Schema.org LocalBusiness / ElectronicsStore structured data for both branches
const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': ['ElectronicsStore', 'LocalBusiness'],
            '@id': `${BASE_URL}/#store-akwa`,
            name: 'Ultra Tech Multiservice — Akwa',
            alternateName: 'Ultra Tech Akwa',
            url: BASE_URL,
            logo: `${BASE_URL}/assets/images/logo-removebg-preview-1784329896568.png`,
            image: `${BASE_URL}/assets/images/og-banner.png`,
            telephone: '+237676886733',
            email: 'ultra.tech.multiservice@gmail.com',
            priceRange: '$$',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Boutique N30, Galeries du Congo, Akwa',
                addressLocality: 'Douala',
                addressRegion: 'Littoral',
                addressCountry: 'CM',
            },
            openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '08:00',
                closes: '18:30',
            },
            sameAs: [
                'https://facebook.com/Ultra-tech multiservice',
                'https://instagram.com/Ultra-tech multiservice',
            ],
            makesOffer: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vente Électronique' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Développement Logiciel' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Prestation de Services Informatiques' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sécurité Réseau' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vidéosurveillance' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Infographie & Design' } },
            ],
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="fr" className={plusJakartaSans.variable}>
            <body className={plusJakartaSans.className}>
                {/* Schema.org LocalBusiness structured data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
                />
                <SiteProviders>{children}</SiteProviders>

                <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fultratech7890back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.19" />
                <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
        </html>
    );
}