import { Dimensions, PixelRatio, Platform } from 'react-native';

/**
 * Obtener dimensiones de la pantalla
 */
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Verificar si es un dispositivo pequeño (< 375px de ancho)
 */
export const isSmallDevice = SCREEN_WIDTH < 375;

/**
 * Verificar si es un dispositivo mediano (375px - 414px)
 */
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;

/**
 * Verificar si es un dispositivo grande (>= 414px)
 */
export const isLargeDevice = SCREEN_WIDTH >= 414;

/**
 * Escalar tamaño basado en el ancho de la pantalla
 * Diseñado para pantalla base de 375px
 */
export const scale = (size: number): number => {
  const baseWidth = 375;
  return (SCREEN_WIDTH / baseWidth) * size;
};

/**
 * Escalar verticalmente basado en la altura de la pantalla
 * Diseñado para pantalla base de 812px (iPhone X)
 */
export const verticalScale = (size: number): number => {
  const baseHeight = 812;
  return (SCREEN_HEIGHT / baseHeight) * size;
};

/**
 * Escalar moderadamente (útil para fuentes y padding)
 * Factor de 0.5 para un escalado más sutil
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

/**
 * Normalizar tamaño de fuente para diferentes densidades de píxeles
 */
export const normalize = (size: number): number => {
  const newSize = size * scale(1);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

/**
 * Obtener padding responsivo
 */
export const getResponsivePadding = () => {
  if (isSmallDevice) return 12;
  if (isMediumDevice) return 16;
  return 20;
};

/**
 * Obtener tamaño de fuente responsivo
 */
export const getResponsiveFontSize = (baseSize: number) => {
  return normalize(baseSize);
};

/**
 * Obtener altura de header responsiva
 */
export const getHeaderHeight = () => {
  if (isSmallDevice) return 56;
  if (isMediumDevice) return 60;
  return 64;
};

/**
 * Obtener tamaño de icono responsivo
 */
export const getIconSize = (baseSize: number) => {
  if (isSmallDevice) return baseSize * 0.85;
  if (isMediumDevice) return baseSize;
  return baseSize * 1.1;
};

/**
 * Verificar si es modo landscape
 */
export const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;

/**
 * Obtener número de columnas para grid responsivo
 */
export const getGridColumns = () => {
  if (isSmallDevice) return 1;
  if (isMediumDevice) return 2;
  return 2;
};

/**
 * Configuraciones de animación predefinidas
 */
export const ANIMATION_CONFIG = {
  // Duración de animaciones
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  
  // Configuración de spring
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  
  // Configuración de timing
  timing: {
    easing: 'ease-in-out' as const,
  },
};

/**
 * Breakpoints para responsive design
 */
export const BREAKPOINTS = {
  small: 320,
  medium: 375,
  large: 414,
  xlarge: 480,
};

/**
 * Verificar si el ancho cumple con un breakpoint
 */
export const isBreakpoint = (breakpoint: keyof typeof BREAKPOINTS) => {
  return SCREEN_WIDTH >= BREAKPOINTS[breakpoint];
};
