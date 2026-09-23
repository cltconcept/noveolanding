import type { Locale, ServiceId } from './site';

export interface Service {
  id: ServiceId;
  name: string;
  short: string;
  title: string;
  description: string;
  tags: string[];
  features: { title: string; description: string }[];
}
const make = (
  id: ServiceId,
  name: string,
  short: string,
  title: string,
  description: string,
  tags: string[],
  features: string[][],
): Service => ({
  id,
  name,
  short,
  title,
  description,
  tags,
  features: features.map(([title, description]) => ({ title, description })),
});
export const services: Record<Locale, Service[]> = {
  fr: [
    make(
      'brand',
      'Image de marque',
      'Une identité qui vous ressemble. Une présence qui se remarque.',
      'Votre marque mérite d’être vue. Et reconnue.',
      'Du premier regard à la dernière impression, nous créons une identité cohérente qui raconte votre entreprise, sur tous vos supports.',
      ['Identité visuelle', 'Web design', 'Print & signalétique'],
      [
        [
          'Identité & direction artistique',
          'Logo, univers graphique, couleurs et typographies : une identité reconnaissable qui pose les bases de votre communication.',
        ],
        [
          'Site web & e-commerce',
          'Une expérience soignée, du design au développement, pour présenter votre activité et transformer l’intérêt en prise de contact.',
        ],
        [
          'Print, signalétique & flocage',
          'Cartes de visite, panneaux, bâches et véhicules : votre marque reste cohérente partout où elle rencontre vos clients.',
        ],
        [
          'Contenu, vidéo & supports connectés',
          'Des contenus pour montrer votre savoir-faire, et des solutions QR code ou NFC pour relier vos supports physiques à votre univers digital.',
        ],
      ],
    ),
    make(
      'web',
      'Web & solutions métiers',
      'Des outils bien pensés pour un quotidien plus simple.',
      'Vos outils s’adaptent à vous. Pas l’inverse.',
      'Sites web, CRM, ERP et applications sur mesure : nous concevons les outils qui connectent vos équipes et simplifient vos processus.',
      ['Sites & e-commerce', 'CRM / ERP', 'Automatisation'],
      [
        [
          'Sites web & boutiques en ligne',
          'Une présence rapide, responsive et facile à utiliser, avec un parcours pensé pour vos visiteurs et votre activité.',
        ],
        [
          'CRM & ERP sur mesure',
          'Centralisez vos contacts, vos ventes et vos opérations dans une interface construite autour de vos méthodes de travail.',
        ],
        [
          'Intégrations & automatisation',
          'Connectez facturation, e-commerce, e-mails et téléphonie. Moins de doubles saisies, plus de fluidité entre vos outils.',
        ],
        [
          'Migration, formation & suivi',
          'Nous préparons vos données, accompagnons la prise en main et faisons évoluer votre solution avec les retours de votre équipe.',
        ],
      ],
    ),
    make(
      'telecom',
      'Télécom & collaboration',
      'Des conversations fluides. Des équipes connectées.',
      'Votre bureau est là où vous êtes.',
      'Au bureau, en déplacement ou à la maison, gardez le lien avec votre équipe et vos clients grâce à une téléphonie professionnelle qui vous suit.',
      ['Téléphonie VoIP', 'Cloud', 'Communication unifiée'],
      [
        [
          'Téléphonie VoIP dans le cloud',
          'Passez et recevez vos appels sur smartphone, ordinateur ou téléphone IP, avec vos numéros professionnels.',
        ],
        [
          'Communication unifiée',
          'Chat, visioconférence, annuaire partagé et statut de présence : vos échanges réunis dans un même environnement.',
        ],
        [
          'Connexion à vos outils',
          'Reliez votre téléphonie à votre CRM et à vos outils Microsoft ou Google pour retrouver les informations utiles au bon moment.',
        ],
        [
          'Installation & accompagnement',
          'Nous étudions vos usages, préparons la portabilité de vos numéros et accompagnons vos collaborateurs dans la transition.',
        ],
      ],
    ),
    make(
      'it',
      'IT & cybersécurité',
      'Un environnement fiable. L’esprit plus tranquille.',
      'Votre activité avance. Votre IT suit.',
      'Du matériel aux sauvegardes, nous prenons soin de votre environnement informatique pour que vous puissiez vous concentrer sur votre métier.',
      ['Infrastructure', 'Cybersécurité', 'Support & cloud'],
      [
        [
          'Matériel & infrastructure',
          'Ordinateurs, serveurs, NAS et Wi-Fi : un environnement dimensionné pour vos usages, configuré et prêt à travailler.',
        ],
        [
          'Protection & sauvegardes',
          'Pare-feu, protection des postes, gestion des accès et sauvegardes : plusieurs niveaux de protection pour vos données.',
        ],
        [
          'Cloud & outils collaboratifs',
          'Configuration et migration de Microsoft 365 ou Google Workspace, partage documentaire et synchronisation des agendas.',
        ],
        [
          'Maintenance & assistance',
          'Mises à jour, suivi de votre parc, assistance à distance et interventions sur place selon les besoins de votre entreprise.',
        ],
      ],
    ),
    make(
      'print',
      'Impression & archivage',
      'Le bon équipement. Les bons documents, au bon endroit.',
      'Vos documents circulent. Votre activité aussi.',
      'Imprimantes, multifonctions et gestion documentaire : nous simplifions vos flux papier et numériques avec des solutions adaptées à vos usages.',
      ['Multifonctions', 'Archivage & GED', 'Maintenance'],
      [
        [
          'Imprimantes & multifonctions',
          'Impression, copie et numérisation avec du matériel adapté à vos volumes, disponible à l’achat ou en location.',
        ],
        [
          'Archivage numérique',
          'Numérisation, OCR et classement des documents pour retrouver, partager et sécuriser vos informations.',
        ],
        [
          'Grand format',
          'Impression et numérisation de plans, affiches et supports techniques, intégrées à vos flux de travail.',
        ],
        [
          'Installation & maintenance',
          'Paramétrage réseau, formation, suivi des consommations et assistance pour garder votre parc opérationnel.',
        ],
      ],
    ),
  ],
  en: [
    make(
      'brand',
      'Brand identity',
      'An identity that feels like you. A presence that stands out.',
      'Your brand deserves to be seen. And remembered.',
      'From first glance to lasting impression, we create a consistent identity that tells your business story across every touchpoint.',
      ['Visual identity', 'Web design', 'Print & signage'],
      [
        [
          'Identity & art direction',
          'Logo, visual language, colours and typography: a recognisable identity that lays the foundations for your communication.',
        ],
        [
          'Websites & e-commerce',
          'A thoughtful experience from design to development, presenting your business and turning interest into enquiries.',
        ],
        [
          'Print, signage & vehicle graphics',
          'Business cards, signs, banners and vehicles: a consistent brand wherever your customers encounter it.',
        ],
        [
          'Content, video & connected materials',
          'Content that showcases your expertise, with QR and NFC solutions connecting physical materials to your digital presence.',
        ],
      ],
    ),
    make(
      'web',
      'Web & business solutions',
      'Thoughtful tools for a simpler working day.',
      'Tools that adapt to you. Not the other way around.',
      'Websites, CRM, ERP and custom applications: tools that connect your teams and simplify your processes.',
      ['Web & e-commerce', 'CRM / ERP', 'Automation'],
      [
        [
          'Websites & online shops',
          'A fast, responsive and easy-to-use presence with a journey designed for your visitors and your business.',
        ],
        [
          'Custom CRM & ERP',
          'Bring contacts, sales and operations together in an interface built around the way you work.',
        ],
        [
          'Integrations & automation',
          'Connect invoicing, e-commerce, email and telephony. Less duplicate data entry, smoother workflows.',
        ],
        [
          'Migration, training & support',
          'We prepare your data, help your team get started and improve the solution with their feedback.',
        ],
      ],
    ),
    make(
      'telecom',
      'Telecom & collaboration',
      'Clear conversations. Connected teams.',
      'Your office is wherever you are.',
      'In the office, on the move or at home, stay connected to your team and clients with professional telephony that follows you.',
      ['VoIP telephony', 'Cloud', 'Unified communications'],
      [
        [
          'Cloud VoIP telephony',
          'Make and receive calls on your smartphone, computer or IP phone using your business numbers.',
        ],
        [
          'Unified communications',
          'Chat, video meetings, shared directory and presence status, all in one environment.',
        ],
        [
          'Connected to your tools',
          'Link telephony to your CRM and Microsoft or Google tools to find the information you need at the right time.',
        ],
        [
          'Setup & support',
          'We review your needs, prepare number portability and guide your team through the transition.',
        ],
      ],
    ),
    make(
      'it',
      'IT & cybersecurity',
      'Reliable systems. Greater peace of mind.',
      'Your business moves forward. Your IT keeps up.',
      'From hardware to backups, we look after your IT environment so you can focus on your business.',
      ['Infrastructure', 'Cybersecurity', 'Support & cloud'],
      [
        [
          'Hardware & infrastructure',
          'Computers, servers, NAS and Wi-Fi, sized for your needs and configured ready to work.',
        ],
        [
          'Protection & backups',
          'Firewalls, endpoint protection, access controls and backups provide multiple layers of protection for your data.',
        ],
        [
          'Cloud & collaboration',
          'Microsoft 365 or Google Workspace setup and migration, shared documents and calendar synchronisation.',
        ],
        [
          'Maintenance & assistance',
          'Updates, equipment monitoring, remote support and on-site assistance based on your business needs.',
        ],
      ],
    ),
    make(
      'print',
      'Printing & archiving',
      'The right equipment. Documents where you need them.',
      'Keep your documents moving. And your business too.',
      'Printers, multifunction devices and document management: practical solutions for your paper and digital workflows.',
      ['Multifunction devices', 'Document management', 'Maintenance'],
      [
        [
          'Printers & multifunction devices',
          'Printing, copying and scanning equipment suited to your volumes, available to buy or lease.',
        ],
        [
          'Digital archiving',
          'Scanning, OCR and document classification to find, share and protect your information.',
        ],
        [
          'Large format',
          'Print and scan plans, posters and technical documents as part of your existing workflows.',
        ],
        [
          'Setup & maintenance',
          'Network configuration, training, usage monitoring and assistance to keep your equipment running.',
        ],
      ],
    ),
  ],
  nl: [
    make(
      'brand',
      'Merkidentiteit',
      'Een identiteit die bij u past. Een uitstraling die opvalt.',
      'Uw merk verdient het om gezien te worden.',
      'Van de eerste blik tot een blijvende indruk: we creëren een samenhangende identiteit die uw verhaal vertelt op al uw dragers.',
      ['Visuele identiteit', 'Webdesign', 'Print & signalisatie'],
      [
        [
          'Identiteit & artdirection',
          'Logo, grafische stijl, kleuren en typografie: een herkenbare identiteit als basis voor uw communicatie.',
        ],
        [
          'Websites & e-commerce',
          'Een doordachte ervaring van ontwerp tot ontwikkeling, die uw activiteit toont en interesse omzet in contact.',
        ],
        [
          'Print, signalisatie & voertuigbelettering',
          'Visitekaartjes, borden, banners en voertuigen: een consistent merk op elk contactpunt met uw klanten.',
        ],
        [
          'Content, video & verbonden dragers',
          'Content die uw vakkennis toont, met QR- en NFC-oplossingen die fysieke dragers aan uw digitale wereld koppelen.',
        ],
      ],
    ),
    make(
      'web',
      'Web & bedrijfsoplossingen',
      'Slimme tools voor een eenvoudiger werkdag.',
      'Uw tools passen zich aan u aan. Niet andersom.',
      'Websites, CRM, ERP en maatwerkapplicaties: tools die uw teams verbinden en uw processen vereenvoudigen.',
      ['Web & e-commerce', 'CRM / ERP', 'Automatisering'],
      [
        [
          'Websites & webshops',
          'Een snelle, responsive en gebruiksvriendelijke aanwezigheid met een traject afgestemd op uw bezoekers en uw activiteit.',
        ],
        [
          'CRM & ERP op maat',
          'Centraliseer contacten, verkoop en processen in een interface die aansluit bij uw manier van werken.',
        ],
        [
          'Integraties & automatisering',
          'Verbind facturatie, e-commerce, e-mail en telefonie. Minder dubbele invoer, vlottere processen.',
        ],
        [
          'Migratie, opleiding & opvolging',
          'We bereiden uw gegevens voor, begeleiden uw team en verbeteren de oplossing op basis van hun feedback.',
        ],
      ],
    ),
    make(
      'telecom',
      'Telecom & samenwerking',
      'Vlotte gesprekken. Verbonden teams.',
      'Uw kantoor is waar u bent.',
      'Op kantoor, onderweg of thuis: blijf verbonden met uw team en klanten dankzij professionele telefonie die u volgt.',
      ['VoIP-telefonie', 'Cloud', 'Geïntegreerde communicatie'],
      [
        [
          'VoIP-telefonie in de cloud',
          'Bellen en gebeld worden op smartphone, computer of IP-telefoon met uw zakelijke nummers.',
        ],
        [
          'Geïntegreerde communicatie',
          'Chat, videobellen, gedeeld adresboek en aanwezigheidsstatus in één omgeving.',
        ],
        [
          'Verbonden met uw tools',
          'Koppel telefonie aan uw CRM en Microsoft- of Google-tools, zodat u op het juiste moment de juiste informatie vindt.',
        ],
        [
          'Installatie & begeleiding',
          'We analyseren uw gebruik, bereiden de nummeroverdracht voor en begeleiden uw medewerkers bij de overstap.',
        ],
      ],
    ),
    make(
      'it',
      'IT & cybersecurity',
      'Een betrouwbare omgeving. Meer gemoedsrust.',
      'Uw onderneming gaat vooruit. Uw IT volgt.',
      'Van apparatuur tot back-ups: we zorgen voor uw IT-omgeving, zodat u zich op uw vak kunt concentreren.',
      ['Infrastructuur', 'Cybersecurity', 'Support & cloud'],
      [
        [
          'Apparatuur & infrastructuur',
          'Computers, servers, NAS en wifi op maat van uw behoeften, geconfigureerd en klaar voor gebruik.',
        ],
        [
          'Bescherming & back-ups',
          'Firewalls, endpointbeveiliging, toegangsbeheer en back-ups bieden meerdere beschermingslagen voor uw gegevens.',
        ],
        [
          'Cloud & samenwerking',
          'Configuratie en migratie van Microsoft 365 of Google Workspace, gedeelde documenten en agendasynchronisatie.',
        ],
        [
          'Onderhoud & ondersteuning',
          'Updates, opvolging van uw apparatuur, hulp op afstand en interventies ter plaatse volgens uw behoeften.',
        ],
      ],
    ),
    make(
      'print',
      'Printen & archivering',
      'De juiste apparatuur. Documenten op de juiste plaats.',
      'Uw documenten bewegen. Uw bedrijf ook.',
      'Printers, multifunctionals en documentbeheer: we vereenvoudigen uw papieren en digitale processen met aangepaste oplossingen.',
      ['Multifunctionals', 'Documentbeheer', 'Onderhoud'],
      [
        [
          'Printers & multifunctionals',
          'Printen, kopiëren en scannen met apparatuur voor uw volumes, beschikbaar in aankoop of huur.',
        ],
        [
          'Digitale archivering',
          'Scannen, OCR en documentclassificatie om informatie terug te vinden, te delen en te beveiligen.',
        ],
        [
          'Groot formaat',
          'Print en scan plannen, affiches en technische documenten binnen uw bestaande workflows.',
        ],
        [
          'Installatie & onderhoud',
          'Netwerkconfiguratie, opleiding, verbruiksopvolging en ondersteuning om uw apparatuur operationeel te houden.',
        ],
      ],
    ),
  ],
};
