import { useTheme } from '@/contexts/ThemeContext';
import React, { useState } from 'react';
import { Platform, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { FadeIn, FadeOutUp } from 'react-native-reanimated';

/**
 * Banner de descarga para Web
 * Solo se muestra si la plataforma es WEB
 */
export default function WebDownloadBanner() {
  const { colors, isDark } = useTheme();
  const [visible, setVisible] = useState(true);
  const { width } = useWindowDimensions();

  // Si no es web o el usuario lo cerró, no renderizar nada
  if (Platform.OS !== 'web' || !visible) return null;

  const isSmallScreen = width < 768;

  const handleDownload = () => {
    // Link de Dropbox proporcionado
    const apkUrl = 'https://www.dropbox.com/scl/fi/9ljscp5e983b9cu2mx9y0/app-release.apk?rlkey=uq23q418dy1h275x018hn3els&st=csvwozw0&dl=1';
    window.location.href = apkUrl; 
  };

  return (
    <Animated.View 
      entering={FadeIn.delay(500).springify()}
      exiting={FadeOutUp.springify()}
      style={[
        styles.container, 
        { position: Platform.OS === 'web' ? 'fixed' : 'absolute' } as any,
        isSmallScreen ? styles.containerSmall : styles.containerLarge,
      ]}
    >
// ... existing jsx ...
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLarge: {
    top: 32,
    paddingHorizontal: 24,
  },
  containerSmall: {
    top: 24,
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    maxWidth: 800,
    borderRadius: 24,
    borderWidth: 1,
    padding: 12,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
    // @ts-ignore
    backdropFilter: 'blur(12px)', // Funciona en web para dar efecto frosted glass
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  contentSmall: {
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  textContainerSmall: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionsSmall: {
    gap: 8,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  downloadButtonSmall: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  downloadText: {
    fontWeight: '700',
    color: '#000000',
    fontSize: 14,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
