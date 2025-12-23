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
    background: '#FFFFFF',           // Blanco puro
    backgroundSecondary: '#F9FAFB',  // Gris muy claro
    backgroundTertiary: '#F3F4F6',   // Gris ultra claro
    
    // Tarjetas y Superficies
    card: '#FFFFFF',                 // Blanco puro
    cardBorder: '#E5E7EB',          // Borde muy sutil
    cardHover: '#FAFAFA',           // Hover state
    
    // Textos
    text: '#111827',                 // Negro profundo
    textSecondary: '#6B7280',        // Gris medio
    textMuted: '#9CA3AF',           // Gris claro
    textInverted: '#FFFFFF',        // Blanco
    
    // Acento Industrial (Amarillo)
    primary: '#FFB800',             // Amarillo industrial
    primaryLight: '#FFC933',        // Amarillo claro
    primaryDark: '#E6A600',         // Amarillo oscuro
    primarySubtle: '#FFF8E6',       // Amarillo muy sutil
    
    // Estados
    success: '#10B981',             // Verde
    warning: '#F59E0B',             // Naranja
    error: '#EF4444',               // Rojo
    info: '#3B82F6',                // Azul
    
    // Bordes y Separadores
    border: '#E5E7EB',              // Borde sutil
    borderLight: '#F3F4F6',         // Borde muy sutil
    divider: '#F3F4F6',             // Divisor
    
    // Sombras
    shadow: 'rgba(0, 0, 0, 0.04)',  // Sombra muy sutil
    shadowMedium: 'rgba(0, 0, 0, 0.08)',
    shadowStrong: 'rgba(0, 0, 0, 0.12)',
    
    // Overlays
    overlay: 'rgba(0, 0, 0, 0.4)',
    overlayLight: 'rgba(0, 0, 0, 0.2)',
    
    // Glassmorphism
    glass: 'rgba(255, 255, 255, 0.8)',
    glassBlur: 'rgba(255, 255, 255, 0.95)',
  },
  
  dark: {
    // Fondos Premium
    background: '#000000',           // Negro puro
    backgroundSecondary: '#121212',  // Negro profundo
    backgroundTertiary: '#1A1A1A',   // Gris muy oscuro
    
    // Tarjetas y Superficies
    card: '#121212',                 // Negro profundo
    cardBorder: '#2A2A2A',          // Borde sutil
    cardHover: '#1A1A1A',           // Hover state
    
    // Textos
    text: '#FFFFFF',                 // Blanco puro
    textSecondary: '#9CA3AF',        // Gris medio
    textMuted: '#6B7280',           // Gris oscuro
    textInverted: '#000000',        // Negro
    
    // Acento Industrial (Amarillo)
    primary: '#FFB800',             // Amarillo industrial
    primaryLight: '#FFC933',        // Amarillo claro
    primaryDark: '#E6A600',         // Amarillo oscuro
    primarySubtle: '#2A2410',       // Amarillo muy sutil
    
    // Estados
    success: '#10B981',             // Verde
    warning: '#F59E0B',             // Naranja
    error: '#EF4444',               // Rojo
    info: '#3B82F6',                // Azul
    
    // Bordes y Separadores
    border: '#2A2A2A',              // Borde sutil
    borderLight: '#1A1A1A',         // Borde muy sutil
    divider: '#1A1A1A',             // Divisor
    
    // Sombras
    shadow: 'rgba(0, 0, 0, 0.5)',   // Sombra profunda
    shadowMedium: 'rgba(0, 0, 0, 0.6)',
    shadowStrong: 'rgba(0, 0, 0, 0.8)',
    
    // Overlays
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(0, 0, 0, 0.5)',
    
    // Glassmorphism
    glass: 'rgba(18, 18, 18, 0.8)',
    glassBlur: 'rgba(18, 18, 18, 0.95)',
  },
};

export { Colors };
export default Colors;
