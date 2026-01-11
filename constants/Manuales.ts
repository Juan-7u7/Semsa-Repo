/**
 * ============================================================================
 * BASE DE DATOS DE MANUALES
 * ============================================================================
 * Array constante con todos los manuales de equipos industriales disponibles.
 * 
 * ESTADÍSTICAS DEL CATÁLOGO:
 * - Total de manuales: 26
 * - Manuales eléctricos: 18
 * - Manuales manuales: 8
 * - Marcas disponibles: 11 (Yale, Harrington, Accolift, Budgit, CM, 
 *   Cummings, Demag, MIT, R&M, Shawbox, Coffing, Kito)
 * 
 * ESTRUCTURA DE CADA MANUAL:
 * - id: Identificador único
 * - titulo: Nombre completo del manual
 * - marca: Marca del equipo (tipado con enum Marca)
 * - tipo: "Eléctrico" o "Manual"
 * - archivo: Referencia al PDF usando require()
 * - tamano: Tamaño del archivo (ej: "2.1 MB")
 * - paginas: Número de páginas (ej: "24")
 * 
 * UBICACIÓN DE PDFs:
 * - Eléctricos: assets/documents/electricos/
 * - Manuales: assets/documents/manuales/
 * ============================================================================
 */

import { Manual } from '@/types/manual';

/**
 * ARRAY PRINCIPAL DE MANUALES
 * Exportado como constante inmutable
 */
export const MANUALES: Manual[] = [
  // --- ELÉCTRICOS ---
  {
    id: 1,
    titulo: 'Polipasto Eléctrico Accolift CLH (.5-2 T)',
    marca: 'Accolift',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/ACCOLIFT-CLH (.5-2 T).pdf'),
    tamano: '2.1 MB',
    paginas: '24',
  },
  {
    id: 2,
    titulo: 'Polipasto Eléctrico Budgit Manguard (250-3000 kg)',
    marca: 'Budgit',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/BUDGIT_manguard (250-3000 kg).pdf'),
    tamano: '3.5 MB',
    paginas: '42',
  },
  {
    id: 3,
    titulo: 'Polipasto Eléctrico CM ShopAir (113-453 kg)',
    marca: 'CM',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/CM-ShopAir (113-453 kg).pdf'),
    tamano: '1.8 MB',
    paginas: '18',
  },
  {
    id: 4,
    titulo: 'Polipasto Eléctrico CM Shopstar (113-452 kg)',
    marca: 'CM',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/CM-Shopstar (113-452 kg).pdf'),
    tamano: '4.2 MB',
    paginas: '56',
  },
  {
    id: 5,
    titulo: 'Polipasto Eléctrico CM Valustar (0.125-3 T)',
    marca: 'CM',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/CM-Valustar (0.125-3 T).pdf'),
    tamano: '2.9 MB',
    paginas: '32',
  },
  {
    id: 6,
    titulo: 'Polipasto Eléctrico CM Lodestar (0.125-3 T)',
    marca: 'CM',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/CM_Lodestar (0.125-3 T).pdf'),
    tamano: '5.1 MB',
    paginas: '64',
  },
  {
    id: 7,
    titulo: 'Polipasto Eléctrico Cummings TXK',
    marca: 'Cummings',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/CUMMINGS_ TXK.pdf'),
    tamano: '1.5 MB',
    paginas: '16',
  },
  {
    id: 8,
    titulo: 'Polipasto Eléctrico Demag DC-Com (125-2000 kg)',
    marca: 'Demag',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/DEMAG-dc-com (125-2000 kg).pdf'),
    tamano: '3.8 MB',
    paginas: '48',
  },
  {
    id: 9,
    titulo: 'Polipasto Eléctrico Harrington ER/NER (8-20 T)',
    marca: 'Harrington',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/HARRINGTON-ER-NER (8-20 T).pdf'),
    tamano: '4.5 MB',
    paginas: '52',
  },
  {
    id: 10,
    titulo: 'Polipasto Eléctrico Harrington ER2/NER2 (0.125-5 T)',
    marca: 'Harrington',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/HARRINGTON-ER2-NER2 (0.125-5 T).pdf'),
    tamano: '6.2 MB',
    paginas: '78',
  },
  {
    id: 11,
    titulo: 'Polipasto Eléctrico MIT Con Display (15 T)',
    marca: 'MIT',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/MIT CON DISPLAY (15 T).pdf'),
    tamano: '1.9 MB',
    paginas: '20',
  },
  {
    id: 12,
    titulo: 'Polipasto Eléctrico R&M Spacemaster SXe',
    marca: 'R&M',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/R&M_SpacemasterSXe.pdf'),
    tamano: '3.1 MB',
    paginas: '36',
  },
  {
    id: 13,
    titulo: 'Polipasto Eléctrico Shawbox 700 Series (25 T)',
    marca: 'Shawbox',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/SHAWBOX-700 Series (25 T).pdf'),
    tamano: '2.7 MB',
    paginas: '28',
  },
  {
    id: 14,
    titulo: 'Polipasto Eléctrico Shawbox 800 Series (0.5-5 T)',
    marca: 'Shawbox',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/SHAWBOX-800Series (0.5-5 T).pdf'),
    tamano: '2.4 MB',
    paginas: '25',
  },
  {
    id: 15,
    titulo: 'Polipasto Eléctrico Yale Global King (15 T)',
    marca: 'Yale',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/YALE-Global King (15 T).pdf'),
    tamano: '4.8 MB',
    paginas: '58',
  },
  {
    id: 16,
    titulo: 'Polipasto Eléctrico Yale YEL (0.125-2 T)',
    marca: 'Yale',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/YALE-YEL (0.125-2 T).pdf'),
    tamano: '1.6 MB',
    paginas: '14',
  },
  {
    id: 17,
    titulo: 'Polipasto Eléctrico Yale YK Series',
    marca: 'Yale',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/YALE-YK Series.pdf'),
    tamano: '3.9 MB',
    paginas: '44',
  },
  {
    id: 18,
    titulo: 'Polipasto Eléctrico Yale YJL (0.125-2 T)',
    marca: 'Yale',
    tipo: 'Eléctrico',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/electricos/YALE_YJL (0.125-2 T).pdf'),
    tamano: '2.2 MB',
    paginas: '22',
  },

  // --- MANUALES ---
  {
    id: 19,
    titulo: 'Polipasto Manual Budgit USA (0.25-6 T)',
    marca: 'Budgit',
    tipo: 'Manual',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/manuales/BUDGIT-usa (0.25-6 T).pdf'),
    tamano: '1.4 MB',
    paginas: '12',
  },
  {
    id: 20,
    titulo: 'Polipasto Manual Coffing LHH (0.5-5 T)',
    marca: 'Coffing',
    tipo: 'Manual',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/manuales/COFFING-LHH (0.5-5 T).pdf'),
    tamano: '1.7 MB',
    paginas: '15',
  },
  {
    id: 21,
    titulo: 'Polipasto Manual Harrington CB (0.5-100 T)',
    marca: 'Harrington',
    tipo: 'Manual',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/manuales/HARRINGTON-CB (0.5-100 T).pdf'),
    tamano: '3.3 MB',
    paginas: '38',
  },
  {
    id: 22,
    titulo: 'Polipasto Manual Kito CX (0.25-1 T)',
    marca: 'Kito',
    tipo: 'Manual',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/manuales/KITO-CX (0.25-1 T).pdf'),
    tamano: '0.9 MB',
    paginas: '8',
  },
  {
    id: 23,
    titulo: 'Polipasto Manual Shawbox Series 602 (250kg)',
    marca: 'Shawbox',
    tipo: 'Manual',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/manuales/SHAWBOX-SERIES 602 (250kg).pdf'),
    tamano: '1.1 MB',
    paginas: '10',
  },
  {
    id: 24,
    titulo: 'Polipasto Manual Yale Lift 360 (0.25-6 T)',
    marca: 'Yale',
    tipo: 'Manual',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/manuales/YALE-Lift 360 (0.25-6 T).pdf'),
    tamano: '2.8 MB',
    paginas: '30',
  },
  {
    id: 25,
    titulo: 'Polipasto Manual Yale Pul-Lift (0.75-10 T)',
    marca: 'Yale',
    tipo: 'Manual',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/manuales/YALE-PulLift (0.75-10 T).pdf'),
    tamano: '1.6 MB',
    paginas: '14',
  },
  {
    id: 26,
    titulo: 'Polipasto Manual Yale VSIII (0.25-2 T)',
    marca: 'Yale',
    tipo: 'Manual',
    url_falsa_pdf: '',
    archivo: require('../assets/documents/manuales/YALE-VSIII (0.25-2 T).pdf'),
    tamano: '2.0 MB',
    paginas: '18',
  },
];
