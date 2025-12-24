import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';

import WebDownloadBanner from '@/components/WebDownloadBanner';
import { FavoritosProvider } from '@/contexts/FavoritosContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

import { StatusBar } from 'expo-status-bar';

// Componente intermedio para conectar el tema personalizado con la navegación
function NavigationWrapper() {
  const { colorScheme, colors } = useTheme();

  // Crear temas de navegación personalizados sincronizados con nuestros colores
  const navigationTheme = colorScheme === 'dark' ? {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card || '#1F2937', // Fallback seguro
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  } : {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card || '#FFFFFF',
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };
  
  return (
    <NavigationThemeProvider value={navigationTheme}>
      <StatusBar 
        style={colorScheme === 'dark' ? 'light' : 'dark'} 
        backgroundColor={colors.background}
        translucent={false} // Evita que se superpongas en algunos casos de Android
      />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="help" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
      {/* Banner de descarga solo visible en Web */}
      <WebDownloadBanner />
    </NavigationThemeProvider>
  );
}

function RootLayoutNav() {
  return (
    <ThemeProvider>
      <FavoritosProvider>
        <NavigationWrapper />
      </FavoritosProvider>
    </ThemeProvider>
  );
}
