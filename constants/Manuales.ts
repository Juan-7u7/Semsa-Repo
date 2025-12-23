/**
 * Tipos de datos para los manuales
 */
export type MarcaManual = 'Yale' | 'Jet' | 'Harrington';
export type TipoManual = 'Eléctrico' | 'Manual';

export interface Manual {
  id: number;
  titulo: string;
  marca: MarcaManual;
  tipo: TipoManual;
  url_falsa_pdf: string;
}

/**
 * Lista de manuales disponibles
 * Incluye 30 manuales de diferentes marcas (Yale, Jet, Harrington)
 * y tipos (Eléctrico, Manual)
 */
export const MANUALES: Manual[] = [
  // Yale - Eléctricos
  {
    id: 1,
    titulo: 'Polipasto Eléctrico Yale CPV 1 Ton',
    marca: 'Yale',
    tipo: 'Eléctrico',
    url_falsa_pdf: 'https://example.com/manuales/yale-cpv-1ton.pdf',
  },
  {
    id: 2,
    titulo: 'Grúa Eléctrica Yale YK 2 Ton',
    marca: 'Yale',
    tipo: 'Eléctrico',
    url_falsa_pdf: 'https://example.com/manuales/yale-yk-2ton.pdf',
  },
  {
    id: 3,
    titulo: 'Montacargas Eléctrico Yale ERP030',
    marca: 'Yale',
    tipo: 'Eléctrico',
    url_falsa_pdf: 'https://example.com/manuales/yale-erp030.pdf',
  },
  {
    id: 4,
    titulo: 'Polipasto Eléctrico Yale CPE 5 Ton',
    marca: 'Yale',
    tipo: 'Eléctrico',
    url_falsa_pdf: 'https://example.com/manuales/yale-cpe-5ton.pdf',
  },
  {
    id: 5,
    titulo: 'Winche Eléctrico Yale RPE 3 Ton',
    marca: 'Yale',
    tipo: 'Eléctrico',
    url_falsa_pdf: 'https://example.com/manuales/yale-rpe-3ton.pdf',
  },

  // Yale - Manuales
  {
    id: 6,
    titulo: 'Polipasto Manual Yale Yalelift 360',
    marca: 'Yale',
    tipo: 'Manual',
    url_falsa_pdf: 'https://example.com/manuales/yale-yalelift-360.pdf',
  },
  {
    id: 7,
    titulo: 'Tecle Manual Yale VS III 1 Ton',
    marca: 'Yale',
    tipo: 'Manual',
    url_falsa_pdf: 'https://example.com/manuales/yale-vs3-1ton.pdf',
  },
  {
    id: 8,
    titulo: 'Diferencial Manual Yale LX 2 Ton',
    marca: 'Yale',
    tipo: 'Manual',
    url_falsa_pdf: 'https://example.com/manuales/yale-lx-2ton.pdf',
  },
  {
    id: 9,
    titulo: 'Polipasto Manual Yale Mini 360 500kg',
    marca: 'Yale',
    tipo: 'Manual',
    url_falsa_pdf: 'https://example.com/manuales/yale-mini360-500kg.pdf',
  },
  {
    id: 10,
    titulo: 'Tirfor Manual Yale TU 1.6 Ton',
    marca: 'Yale',
    tipo: 'Manual',
    url_falsa_pdf: 'https://example.com/manuales/yale-tu-1.6ton.pdf',
  },

  // Jet - Eléctricos
  {
    id: 11,
    titulo: 'Polipasto Eléctrico Jet JSH 1 Ton',
    marca: 'Jet',
    tipo: 'Eléctrico',
    url_falsa_pdf: 'https://example.com/manuales/jet-jsh-1ton.pdf',
  },
  {
    id: 12,
    titulo: 'Grúa Eléctrica Jet VOLT 2 Ton',
    marca: 'Jet',
    tipo: 'Eléctrico',
    url_falsa_pdf: 'https://example.com/manuales/jet-volt-2ton.pdf',
  },
  {
    id: 13,
    titulo: 'Polipasto Eléctrico Jet TS 3 Ton',
    marca: 'Jet',
    tipo: 'Eléctrico',
    url_falsa_pdf: 'https://example.com/manuales/jet-ts-3ton.pdf',
  },
  {
    id: 14,
    titulo: 'Winche Eléctrico Jet ESH 5 Ton',
    marca: 'Jet',
    tipo: 'Eléctrico',
    url_falsa_pdf: 'https://example.com/manuales/jet-esh-5ton.pdf',
  },
  {
    id: 15,
    titulo: 'Polipasto Eléctrico Jet FESH 10 Ton',
    marca: 'Jet',
    tipo: 'Eléctrico',
    url_falsa_pdf: 'https://example.com/manuales/jet-fesh-10ton.pdf',
  },

  // Jet - Manuales
  {
    id: 16,
    titulo: 'Polipasto Manual Jet JLH 1 Ton',
    marca: 'Jet',
    tipo: 'Manual',
    url_falsa_pdf: 'https://example.com/manuales/jet-jlh-1ton.pdf',
  },
  {
    id: 17,
    titulo: 'Diferencial Manual Jet L100 2 Ton',
    marca: 'Jet',
    tipo: 'Manual',
    url_falsa_pdf: 'https://example.com/manuales/jet-l100-2ton.pdf',
  },
  {
    id: 18,
    titulo: 'Tecle Manual Jet S90 3 Ton',
    marca: 'Jet',
    tipo: 'Manual',
    url_falsa_pdf: 'https://example.com/manuales/jet-s90-3ton.pdf',
  },
  {
    id: 19,
    titulo: 'Polipasto Manual Jet JG 500kg',
    marca: 'Jet',
    tipo: 'Manual',
    url_falsa_pdf: 'https://example.com/manuales/jet-jg-500kg.pdf',
  },
  {
    id: 20,
    titulo: 'Tirfor Manual Jet JGP 1.5 Ton',
    marca: 'Jet',
    tipo: 'Manual',
    url_falsa_pdf: 'https://example.com/manuales/jet-jgp-1.5ton.pdf',
  },

  // Harrington - Eléctricos
  {
    id: 21,
    titulo: 'Polipasto Eléctrico Harrington NER 1 Ton',
    marca: 'Harrington',
    tipo: 'Eléctrico',
    url_falsa_pdf: 'https://example.com/manuales/harrington-ner-1ton.pdf',
  },
  {
    id: 22,
    titulo: 'Grúa Eléctrica Harrington SNER 2 Ton',
    marca: 'Harrington',
    tipo: 'Eléctrico',
    url_falsa_pdf: 'https://example.com/manuales/harrington-sner-2ton.pdf',
  },
  {
    id: 23,
    titulo: 'Polipasto Eléctrico Harrington SEQ 3 Ton',
    marca: 'Harrington',
    tipo: 'Eléctrico',
    url_falsa_pdf: 'https://example.com/manuales/harrington-seq-3ton.pdf',
  },
  {
    id: 24,
    titulo: 'Winche Eléctrico Harrington ER2 5 Ton',
    marca: 'Harrington',
    tipo: 'Eléctrico',
    url_falsa_pdf: 'https://example.com/manuales/harrington-er2-5ton.pdf',
  },
  {
    id: 25,
    titulo: 'Polipasto Eléctrico Harrington NERP 10 Ton',
    marca: 'Harrington',
    tipo: 'Eléctrico',
    url_falsa_pdf: 'https://example.com/manuales/harrington-nerp-10ton.pdf',
  },

  // Harrington - Manuales
  {
    id: 26,
    titulo: 'Polipasto Manual Harrington CB 1 Ton',
    marca: 'Harrington',
    tipo: 'Manual',
    url_falsa_pdf: 'https://example.com/manuales/harrington-cb-1ton.pdf',
  },
  {
    id: 27,
    titulo: 'Diferencial Manual Harrington CF 2 Ton',
    marca: 'Harrington',
    tipo: 'Manual',
    url_falsa_pdf: 'https://example.com/manuales/harrington-cf-2ton.pdf',
  },
  {
    id: 28,
    titulo: 'Tecle Manual Harrington LX 3 Ton',
    marca: 'Harrington',
    tipo: 'Manual',
    url_falsa_pdf: 'https://example.com/manuales/harrington-lx-3ton.pdf',
  },
  {
    id: 29,
    titulo: 'Polipasto Manual Harrington Mini Cat 500kg',
    marca: 'Harrington',
    tipo: 'Manual',
    url_falsa_pdf: 'https://example.com/manuales/harrington-minicat-500kg.pdf',
  },
  {
    id: 30,
    titulo: 'Tirfor Manual Harrington LB 1.6 Ton',
    marca: 'Harrington',
    tipo: 'Manual',
    url_falsa_pdf: 'https://example.com/manuales/harrington-lb-1.6ton.pdf',
  },
];

/**
 * Funciones de utilidad para trabajar con los manuales
 */

/**
 * Obtener todos los manuales
 */
export const obtenerTodosManuales = (): Manual[] => {
  return MANUALES;
};

/**
 * Obtener manuales por marca
 */
export const obtenerManualesPorMarca = (marca: MarcaManual): Manual[] => {
  return MANUALES.filter((manual) => manual.marca === marca);
};

/**
 * Obtener manuales por tipo
 */
export const obtenerManualesPorTipo = (tipo: TipoManual): Manual[] => {
  return MANUALES.filter((manual) => manual.tipo === tipo);
};

/**
 * Obtener manual por ID
 */
export const obtenerManualPorId = (id: number): Manual | undefined => {
  return MANUALES.find((manual) => manual.id === id);
};

/**
 * Buscar manuales por título
 */
export const buscarManualesPorTitulo = (query: string): Manual[] => {
  const queryLower = query.toLowerCase();
  return MANUALES.filter((manual) =>
    manual.titulo.toLowerCase().includes(queryLower)
  );
};

/**
 * Obtener todas las marcas disponibles
 */
export const obtenerMarcas = (): MarcaManual[] => {
  return ['Yale', 'Jet', 'Harrington'];
};

/**
 * Obtener todos los tipos disponibles
 */
export const obtenerTipos = (): TipoManual[] => {
  return ['Eléctrico', 'Manual'];
};

/**
 * Obtener estadísticas de los manuales
 */
export const obtenerEstadisticas = () => {
  const totalManuales = MANUALES.length;
  const porMarca = {
    Yale: obtenerManualesPorMarca('Yale').length,
    Jet: obtenerManualesPorMarca('Jet').length,
    Harrington: obtenerManualesPorMarca('Harrington').length,
  };
  const porTipo = {
    Eléctrico: obtenerManualesPorTipo('Eléctrico').length,
    Manual: obtenerManualesPorTipo('Manual').length,
  };

  return {
    total: totalManuales,
    porMarca,
    porTipo,
  };
};
