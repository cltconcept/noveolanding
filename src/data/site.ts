export const locales = ['fr', 'nl', 'en'] as const;
export type Locale = (typeof locales)[number];
export type ServiceId = 'brand' | 'web' | 'telecom' | 'it' | 'print';
export type PageId = 'home' | 'contact' | 'legal' | ServiceId;

export const slugs: Record<PageId, string> = {
  home: '',
  brand: 'image-de-marque',
  web: 'web-erp',
  telecom: 'telecom',
  it: 'it-cybersecurite',
  print: 'impression',
  contact: 'contact',
  legal: 'mentions-legales',
};
export const pageUrl = (locale: Locale, page: PageId = 'home') =>
  `/${locale === 'fr' ? '' : `${locale}/`}${slugs[page]}${slugs[page] ? '/' : ''}`;
export const company = {
  name: 'Noveo Digital SRL',
  email: 'info@noveodigital.be',
  phone: '+32 2 808 67 22',
  phoneHref: 'tel:+3228086722',
  address: 'Chaussée de Louvain 435, 1380 Lasne, Belgique',
  vat: 'BE1026.000.078',
};
export const projects = [
  {
    name: 'Clinique Omicron',
    image: 'omicron',
    category: 'Web design · Développement',
    href: 'https://cliniqueomicron.ca/',
    color: '#e4eae9',
  },
  {
    name: 'Bykahomes',
    image: 'byka',
    category: 'UX/UI · Plateforme digitale',
    href: 'https://www.behance.net/gallery/202888025/SAAS-UXUI-Booking-and-management-by-Brice',
    color: '#deebe5',
  },
  {
    name: 'Nöje',
    image: 'noje',
    category: 'Identité digitale · Web design',
    href: 'https://www.behance.net/gallery/202888841/Web-Design-for-Noje-a-Swedish-coffee-shop-by-Brice',
    color: '#f1e9dc',
  },
  {
    name: 'Champsprès',
    image: 'champs',
    category: 'UX/UI · Web design',
    href: 'https://www.behance.net/gallery/202882267/Design-UXUI-Wine-investment-by-Brice',
    color: '#e9e2dc',
  },
  {
    name: 'Period',
    image: 'period',
    category: 'Direction artistique · Web design',
    href: 'https://www.behance.net/gallery/140018865/PERIOD-Web-Design',
    color: '#ebe1e7',
  },
  {
    name: 'AC Avocats',
    image: 'ac',
    category: 'Identité digitale · Web design',
    href: 'https://www.behance.net/gallery/136904571/Ac-Avocats-Web-design',
    color: '#e0e5e9',
  },
  {
    name: 'Mackin',
    image: 'mackin',
    category: 'Direction artistique · Web design',
    href: 'https://www.behance.net/gallery/138308179/MACKIN-Web-Design',
    color: '#e1e5e6',
  },
  {
    name: 'ICI Friperie',
    image: 'ici',
    category: 'Identité digitale · Web design',
    href: 'https://www.behance.net/gallery/202889751/Thrift-Store-Web-design-for-Ici-Friperie-by-Brice',
    color: '#e8e2f0',
  },
];
export const team = [
  { name: 'Arnaud', image: 'arnaud' },
  { name: 'Andy', image: 'andy' },
  { name: 'Olivier', image: 'olivier' },
  { name: 'Nicolas', image: 'nicolas' },
  { name: 'Brice', image: 'brice' },
];
