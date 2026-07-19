'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { getSettings } from '@/lib/db';

interface ServiceItem {
  id: string;
  name: string;
  short: string;
  icon: string;
  description: string;
  features: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'electronics',
    name: 'Vente Électronique',
    short: 'Ordinateurs, téléphones, accessoires',
    icon: 'LaptopIcon',
    description: 'Une sélection premium d\'ordinateurs portables (Dell, HP, Microsoft), claviers gaming, souris sans fil et accessoires informatiques avec garantie locale.',
    features: ['Ordinateurs de marque', 'Claviers & Souris', 'Support laptop & câbles', 'Matériel garanti'],
  },
  {
    id: 'software',
    name: 'Développement Logiciel',
    short: 'Applications web, mobile, desktop',
    icon: 'WrenchIcon', // maps to Wrench
    description: 'Conception d\'applications métiers adaptées à vos besoins (gestion de stock, site vitrine, applications mobiles Android/iOS).',
    features: ['Applications Web', 'Applications Mobiles', 'Logiciels Desktop', 'Suivi et maintenance'],
  },
  {
    id: 'maintenance',
    name: 'Prestation de Services',
    short: 'Maintenance, dépannage, installation',
    icon: 'CheckCircleIcon',
    description: 'Maintenance de parcs informatiques, installation de systèmes d\'exploitation (Windows, Linux), dépannage matériel et optimisation logicielle.',
    features: ['Dépannage matériel', 'Installation OS', 'Nettoyage & Pâte thermique', 'Récupération de données'],
  },
  {
    id: 'security',
    name: 'Sécurité Réseau',
    short: 'Firewall, VPN, audit de sécurité',
    icon: 'ShieldCheckIcon',
    description: 'Sécurisation de vos données et connexions d\'entreprise : mise en place de réseaux locaux, firewall, VPN sécurisés et audits de sécurité.',
    features: ['Réseau d\'entreprise', 'Firewall & Pare-feu', 'Connexion VPN', 'Audit de vulnérabilité'],
  },
  {
    id: 'surveillance',
    name: 'Vidéosurveillance',
    short: 'Caméras IP, NVR, installation physique',
    icon: 'CalendarDaysIcon', // maps to Camera/Calendar
    description: 'Installation complète de caméras IP haut de gamme pour vos domiciles et locaux professionnels. Visualisation à distance sur smartphone.',
    features: ['Caméras IP / Analogiques', 'Enregistreurs NVR / DVR', 'Accès distant smartphone', 'Maintenance caméras'],
  },
  {
    id: 'design',
    name: 'Infographie & Design',
    short: 'Création de logos, flyers, cartes',
    icon: 'PencilIcon',
    description: 'Création d\'identités visuelles percutantes pour vos projets : logos professionnels, flyers publicitaires, cartes de visite de haute qualité.',
    features: ['Design de logo', 'Flyers & Affiches', 'Cartes de visite', 'Charte graphique'],
  },
];

export default function ServicesStrip() {
  const [phone, setPhone] = useState('237676886733');

  useEffect(() => {
    getSettings().then((settings) => {
      if (settings && settings.whatsapp_number_1) {
        setPhone(settings.whatsapp_number_1);
      }
    });
  }, []);

  const getWhatsAppServiceLink = (serviceName: string) => {
    const text = `Bonjour Ultra Tech! 👋 Je souhaite obtenir des informations ou un devis concernant votre service : *${serviceName}*.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-primary text-xs font-bold uppercase tracking-widest block">Notre expertise</span>
          <h2 className="font-extrabold text-3xl md:text-4xl text-accent tracking-tight">
            Des Services Tech Complets
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Chez Ultra Tech Multiservice, nous vous accompagnons dans toutes vos démarches technologiques à Douala, de l&apos;achat d&apos;équipements à la sécurisation de vos locaux.
          </p>
        </div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-border p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col group relative overflow-hidden"
            >
              {/* Cercle décoratif en arrière-plan */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
              
              {/* Icône */}
              <div className="w-14 h-14 rounded-2xl bg-sky-light text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Icon name={service.id === 'surveillance' ? 'VideoIcon' : service.id === 'security' ? 'ShieldCheckIcon' : service.icon} size={28} />
              </div>

              {/* Titres */}
              <h3 className="font-extrabold text-xl text-accent group-hover:text-primary transition-colors duration-200">
                {service.name}
              </h3>
              <p className="text-xs font-bold text-primary mt-1 mb-4 uppercase tracking-wider">
                {service.short}
              </p>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {service.description}
              </p>

              {/* Points clés */}
              <ul className="mt-6 pt-5 border-t border-border space-y-2">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-accent font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <Link
                  href={`/rdv?service=${encodeURIComponent(service.name)}`}
                  className="py-3 px-4 border border-border text-center rounded-2xl font-bold text-xs text-accent hover:bg-muted transition-colors"
                >
                  Réserver RDV
                </Link>
                <a
                  href={getWhatsAppServiceLink(service.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-green-500 text-white text-center rounded-2xl font-bold text-xs hover:bg-green-600 transition-colors"
                >
                  WhatsApp
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
