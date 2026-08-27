'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import HexPattern from '@/components/ui/HexPattern';
import { getSettings } from '@/lib/db';

interface ServiceItem {
  id: string;
  name: string;
  short: string;
  icon: string;
  description: string;
  features: string[];
  featured?: boolean;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'electronics',
    name: 'Vente & Équipements Informatiques',
    short: 'Laptops professionnels, téléphones & accessoires',
    icon: 'LaptopIcon',
    description: 'Une sélection rigoureusement testée en atelier : PC portables (Dell Latitude, HP EliteBook, Lenovo ThinkPad), écrans, claviers et accessoires certifiés avec garantie locale à Douala.',
    features: ['Machines reconditionnées testées', 'Marques pro : Dell, HP, Lenovo', 'Accessoires & câbles d\'origine', 'Garantie après-vente locale'],
    featured: true,
  },
  {
    id: 'maintenance',
    name: 'Maintenance & Réparation Express',
    short: 'Dépannage matériel, systèmes & logiciels',
    icon: 'WrenchIcon',
    description: 'Diagnostiquez et faites réparer votre ordinateur ou téléphone directement dans notre atelier d\'Akwa. Remplacement d\'écran, pâte thermique, réinstallation OS.',
    features: ['Dépannage express en atelier', 'Changement d\'écran & batterie', 'Nettoyage & pâte thermique', 'Sauvegarde & récupération'],
  },
  {
    id: 'surveillance',
    name: 'Vidéosurveillance & Sécurité',
    short: 'Caméras IP, enregistreurs NVR & installation',
    icon: 'VideoIcon',
    description: 'Installation complète de systèmes de vidéosurveillance pour habitations et locaux professionnels à Douala. Contrôle à distance en direct sur votre smartphone.',
    features: ['Caméras IP Haute Définition', 'Enregistrement continu NVR', 'Vision en direct sur mobile', 'Maintenance & assistance'],
  },
  {
    id: 'security',
    name: 'Sécurité Réseau & Infrastructures',
    short: 'Réseaux locaux, pare-feu & VPN entreprise',
    icon: 'ShieldCheckIcon',
    description: 'Câblage structuré, configuration de routeurs d\'entreprise, pare-feu et VPN sécurisés pour protéger la connexion de votre entreprise.',
    features: ['Câblage & baies de brassage', 'Firewall & sécurité réseau', 'VPN sécurisé inter-sites', 'Audit informatique'],
  },
  {
    id: 'software',
    name: 'Développement Logiciel & Web',
    short: 'Applications sur mesure, sites web & outils',
    icon: 'CodeBracketIcon',
    description: 'Conception d\'applications de gestion d\'activité, sites vitrines professionnels et solutions logicielles adaptées à vos processus métier.',
    features: ['Sites web professionnels', 'Logiciels de gestion', 'Applications mobiles', 'Maintenance logicielle'],
  },
  {
    id: 'design',
    name: 'Infographie & Identité Visuelle',
    short: 'Logos, charte graphique & supports print',
    icon: 'PencilIcon',
    description: 'Création d\'identités visuelles marquant l\'esprit de vos clients : design de logos, cartes de visite, kakémonos et flyers publicitaires.',
    features: ['Design de logo & identité', 'Cartes de visite & flyers', 'Bannières réseau sociaux', 'Impression haute qualité'],
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
    <section id="services" className="py-24 bg-[#0A0E1A] text-white relative overflow-hidden">
      <HexPattern opacity={0.04} />

      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        
        {/* En-tête de section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[#5B9BF0] text-xs font-bold uppercase tracking-widest block">Notre savoir-faire</span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white tracking-tight text-balance">
            Des Services Tech Concrets à Douala
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed text-pretty">
            De l&apos;achat d&apos;ordinateurs à la sécurisation de vos locaux, découvrez des prestations assurées par des techniciens qualifiés.
          </p>
        </div>

        {/* Grille asymétrique des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {SERVICES_DATA.map((service) => {
            const isFeatured = service.featured;

            return (
              <div
                key={service.id}
                className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  isFeatured
                    ? 'md:col-span-2 lg:col-span-2 bg-[#101526] border-[#5B9BF0]/40 p-8 md:p-10 shadow-2xl'
                    : 'bg-[#101526]/70 border-white/10 p-7 hover:border-white/25 hover:bg-[#101526] shadow-lg'
                }`}
              >
                {/* Visual motif for featured card */}
                {isFeatured && (
                  <div className="absolute top-0 right-0 bg-[#28469E] text-white font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-bl-xl border-l border-b border-white/20">
                    Spécialité Principale
                  </div>
                )}

                <div>
                  {/* Category icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${
                    isFeatured
                      ? 'bg-[#28469E]/30 text-[#5B9BF0] border-[#5B9BF0]/40'
                      : 'bg-white/5 text-[#5B9BF0] border-white/10 group-hover:bg-[#28469E]/20'
                  }`}>
                    <Icon name={service.icon} size={24} aria-hidden="true" />
                  </div>

                  <h3 className={`font-heading font-extrabold text-white text-pretty ${
                    isFeatured ? 'text-2xl sm:text-3xl' : 'text-xl'
                  }`}>
                    {service.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#5B9BF0] mt-1 mb-4 uppercase tracking-wider">
                    {service.short}
                  </p>

                  <p className={`text-gray-300 leading-relaxed text-pretty ${
                    isFeatured ? 'text-base' : 'text-sm'
                  }`}>
                    {service.description}
                  </p>

                  {/* Points clés */}
                  <ul className={`mt-6 pt-5 border-t border-white/10 grid gap-2.5 ${
                    isFeatured ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
                  }`}>
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-200 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5B9BF0]" aria-hidden="true" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  <Link
                    href={`/rdv?service=${encodeURIComponent(service.name)}`}
                    className="py-3 px-4 border border-white/20 text-center rounded-full font-bold text-xs text-white hover:bg-white/10 transition-colors"
                  >
                    Réserver RDV
                  </Link>
                  <a
                    href={getWhatsAppServiceLink(service.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 bg-[#25D366] text-white text-center rounded-full font-bold text-xs hover:bg-green-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Icon name="PhoneIcon" size={14} className="fill-current" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
