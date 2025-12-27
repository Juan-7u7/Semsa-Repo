export type MarcaManual = 
  | 'Yale' 
  | 'Jet' 
  | 'Harrington' 
  | 'Accolift' 
  | 'Budgit' 
  | 'CM' 
  | 'Cummings' 
  | 'Demag' 
  | 'MIT' 
  | 'R&M' 
  | 'Shawbox' 
  | 'Coffing' 
  | 'Kito';

export type TipoManual = 'Eléctrico' | 'Manual';

export interface Manual {
  id: number;
  titulo: string;
  marca: MarcaManual;
  tipo: TipoManual;
  /** @deprecated Usar 'archivo' en su lugar */
  url_falsa_pdf: string;
  /** Referencia al archivo PDF local usando require() */
  archivo?: any;
  tamano?: string;
  paginas?: string;
}

export interface EstadisticasManuales {
  total: number;
  porMarca: Record<MarcaManual, number>;
  porTipo: Record<TipoManual, number>;
}
