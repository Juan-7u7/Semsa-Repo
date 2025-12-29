import { Colors, ColorScheme, ThemeColors } from '@/constants/Colors';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Appearance, Platform, useColorScheme as useDeviceColorScheme } from 'react-native';

/**
 * Tipo para el contexto del tema
 */
interface ThemeContextType {
  colorScheme: ColorScheme;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (scheme: ColorScheme) => void;
  isDark: boolean;
}

/**
 * Context del tema
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Props del ThemeProvider
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Provider del tema que maneja el estado del tema claro/oscuro
 * 
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const deviceColorScheme = useDeviceColorScheme();
  
  // Inicialización síncrona para evitar flash en web
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    // En Web, verificar directamente el media query antes del primer render
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    // En nativo o fallback
    return Appearance.getColorScheme() ?? 'light';
  });

  // Sincronizar con el tema del dispositivo (Nativo)
  useEffect(() => {
    if (deviceColorScheme && Platform.OS !== 'web') {
      setColorScheme(deviceColorScheme);
    }
  }, [deviceColorScheme]);

  // Web: Actualizar el color de fondo del body
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
       const bg = Colors[colorScheme].background;
       document.body.style.backgroundColor = bg;
       // También asegurar que el root tenga altura completa
       if(document.getElementById('root')) {
           document.getElementById('root')!.style.minHeight = '100vh';
           document.getElementById('root')!.style.backgroundColor = bg;
       }
    }
  }, [colorScheme]);

  // Listener explícito para Web para garantizar respuesta inmediata
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
         // handle various browser implementations
         const isDark = e instanceof MediaQueryList ? e.matches : e.matches;
         setColorScheme(isDark ? 'dark' : 'light');
      };

      // Listener inicial por si acaso
      if (mediaQuery.matches !== (colorScheme === 'dark')) {
         setColorScheme(mediaQuery.matches ? 'dark' : 'light');
      }

      // Modern vs Legacy listeners
      try {
        if (mediaQuery.addEventListener) {
          mediaQuery.addEventListener('change', handleChange);
          return () => mediaQuery.removeEventListener('change', handleChange);
        } else if (mediaQuery.addListener) {
          mediaQuery.addListener(handleChange);
          return () => mediaQuery.removeListener(handleChange);
        }
      } catch (e) {
        console.warn('Error adding theme listener:', e);
      }
    }
  }, []);

  // Obtener los colores según el tema actual
  const colors = Colors[colorScheme];

  // Alternar entre tema claro y oscuro
  const toggleTheme = () => {
    setColorScheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Establecer un tema específico
  const setTheme = (scheme: ColorScheme) => {
    setColorScheme(scheme);
  };

  const value: ThemeContextType = {
    colorScheme,
    colors,
    toggleTheme,
    setTheme,
    isDark: colorScheme === 'dark',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook para acceder al contexto del tema
 * 
 * @returns Objeto con el tema actual y funciones para modificarlo
 * 
 * @example
 * ```tsx
 * const { colors, isDark, toggleTheme } = useTheme();
 * 
 * return (
 *   <View style={{ backgroundColor: colors.background }}>
 *     <Text style={{ color: colors.text }}>Hola Mundo</Text>
 *     <Button onPress={toggleTheme} title="Cambiar Tema" />
 *   </View>
 * );
 * ```
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  
  return context;
}

/**
 * Hook para obtener solo los colores del tema actual
 * 
 * @returns Objeto con los colores del tema actual
 * 
 * @example
 * ```tsx
 * const colors = useThemeColors();
 * 
 * return (
 *   <View style={{ backgroundColor: colors.background }}>
 *     <Text style={{ color: colors.text }}>Hola Mundo</Text>
 *   </View>
 * );
 * ```
 */
export function useThemeColors(): ThemeColors {
  const { colors } = useTheme();
  return colors;
}
