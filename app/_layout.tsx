import { Roboto_500Medium_Italic, Roboto_700Bold } from '@expo-google-fonts/roboto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';

import { FavoritosProvider } from '@/contexts/FavoritosContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

// ... (existing code)

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Roboto_700Bold,
    Roboto_500Medium_Italic,
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
        style="light" 
        backgroundColor="#00335F"
        translucent={false} // Evita que se superpongas en algunos casos de Android
      />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="help" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="reader" options={{ headerShown: false }} />
      </Stack>
      {/* Banner de descarga solo visible en Web (REMOVIDO por solicitud) */}
      {/* <WebDownloadBanner /> */}
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
