export type MarcaManual = 'Yale' | 'Jet' | 'Harrington';
export type TipoManual = 'Eléctrico' | 'Manual';

export interface Manual {
  id: number;
  titulo: string;
  marca: MarcaManual;
  tipo: TipoManual;
  url_falsa_pdf: string;
}

export interface EstadisticasManuales {
  total: number;
  porMarca: Record<MarcaManual, number>;
  porTipo: Record<TipoManual, number>;
}
