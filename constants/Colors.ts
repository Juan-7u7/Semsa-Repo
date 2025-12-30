/**
 * Paleta de colores Premium Industrial
 * Diseño minimalista y moderno inspirado en Apple y herramientas industriales de alta gama
 */

export type ColorScheme = 'light' | 'dark';

export interface ThemeColors {
  // Fondos Premium
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  
  // Tarjetas y Superficies
  card: string;
  cardBorder: string;
  cardHover: string;
  
  // Textos
  text: string;
  textSecondary: string;
  textMuted: string;
  textInverted: string;
  
  // Acento Industrial (Amarillo)
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primarySubtle: string;
  tint: string; 
  
  // Estados
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Bordes y Separadores
  border: string;
  borderLight: string;
  divider: string;
  
  // Sombras
  shadow: string;
  shadowMedium: string;
  shadowStrong: string;
  
  // Overlays
  overlay: string;
  overlayLight: string;
  
  // Glassmorphism
  glass: string;
  glassBlur: string;
}

const Colors: Record<ColorScheme, ThemeColors> = {
  light: {
    // Fondos Premium
    background: '#FFFFFF',           // 4 (Blanco)
    backgroundSecondary: '#F8F9FA',  // Gris muy claro para contraste
    backgroundTertiary: '#F0F4F8',   // Tinte azulado muy sutil
    
    // Tarjetas y Superficies
    card: '#FFFFFF',                 // 4 (Blanco)
    cardBorder: '#E1E4E8',          
    cardHover: '#FAFBFC',           
    
    // Textos
    text: '#00335F',                 // 1 (Azul Oscuro) - Color principal de texto
    textSecondary: '#005596',        // 5 (Azul Medio) - Texto secundario
    textMuted: '#64748B',           
    textInverted: '#FFFFFF',        // 4 (Blanco)
    
    // Acento Industrial (Amarillo)
    primary: '#FFCC00',             // 2 (Amarillo)
    primaryLight: '#FFD700',        
    primaryDark: '#E6B800',         
    primarySubtle: '#FFFBE6',       
    tint: '#00335F',                // 1 (Azul Oscuro) - Tint para tabs activas en light mode
    
    // Estados
    success: '#10B981',             
    warning: '#F16532',             // 7 (Naranja)
    error: '#D11F26',               // 3 (Rojo)
    info: '#0E5296',                // 6 (Azul Brillante)
    
    // Bordes y Separadores
    border: '#E2E8F0',              
    borderLight: '#F1F5F9',         
    divider: '#F1F5F9',             
    
    // Sombras
    shadow: 'rgba(0, 51, 95, 0.08)',  // Sombra con tinte azul oscuro
    shadowMedium: 'rgba(0, 51, 95, 0.12)',
    shadowStrong: 'rgba(0, 51, 95, 0.16)',
    
    // Overlays
    overlay: 'rgba(0, 51, 95, 0.4)', // Overlay azul oscuro
    overlayLight: 'rgba(0, 51, 95, 0.1)',
    
    // Glassmorphism
    glass: 'rgba(255, 255, 255, 0.8)',
    glassBlur: 'rgba(255, 255, 255, 0.95)',
  },
  
  dark: {
    // Fondos Premium
    background: '#000000',           // Negro puro (Moderno)
    backgroundSecondary: '#0D1117',  // Azul muy oscuro/casi negro
    backgroundTertiary: '#161B22',   
    
    // Tarjetas y Superficies
    card: '#0D1117',                 // Azul muy oscuro
    cardBorder: '#30363D',          
    cardHover: '#161B22',           
    
    // Textos
    text: '#FFFFFF',                 // 4 (Blanco)
    textSecondary: '#A0AEC0',        
    textMuted: '#6E7681',           
    textInverted: '#00335F',        // 1 (Azul Oscuro)
    
    // Acento Industrial (Amarillo)
    primary: '#FFCC00',             // 2 (Amarillo)
    primaryLight: '#FFD700',        
    primaryDark: '#B38F00',         
    primarySubtle: '#332900',       
    tint: '#FFCC00',                // 2 (Amarillo) - Tint para tabs activas en dark mode
    
    // Estados
    success: '#10B981',             
    warning: '#F16532',             // 7 (Naranja)
    error: '#EF4444',               // Rojo ajustado para dark mode (más vibrante)
    info: '#3B82F6',                
    
    // Bordes y Separadores
    border: '#30363D',              
    borderLight: '#21262D',         
    divider: '#21262D',             
    
    // Sombras
    shadow: 'rgba(0, 0, 0, 0.5)',   
    shadowMedium: 'rgba(0, 0, 0, 0.7)',
    shadowStrong: 'rgba(0, 0, 0, 0.9)',
    
    // Overlays
    overlay: 'rgba(0, 0, 0, 0.8)',
    overlayLight: 'rgba(0, 0, 0, 0.6)',
    
    // Glassmorphism
    glass: 'rgba(13, 17, 23, 0.8)',
    glassBlur: 'rgba(13, 17, 23, 0.95)',
  },
};

export { Colors };
export default Colors;
