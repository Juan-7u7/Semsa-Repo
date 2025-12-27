import { useFavoritos } from '@/contexts/FavoritosContext';
import { useTheme } from '@/contexts/ThemeContext';
import { type Manual } from '@/types/manual';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

interface PremiumManualCardProps {
  manual: Manual;
  onPress?: () => void;
  index?: number;
}

/**
 * Tarjeta Premium Minimalista
 * Diseño industrial de alta gama con glassmorphism sutil
 */
export default function PremiumManualCard({
  manual,
  onPress,
  index = 0,
}: PremiumManualCardProps) {
  const { colors, isDark } = useTheme();
  const { toggleFavorito, esFavorito } = useFavoritos();

  const isFavorito = esFavorito(manual.id);

  // Valores animados
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const scale = useSharedValue(1);
  const favoritoScale = useSharedValue(1);

  // Animación de entrada
  useEffect(() => {
    const delay = index * 80;
    
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 400 });
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 120,
      });
    }, delay);
  }, []);

  const animatedCardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const animatedFavoritoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: favoritoScale.value }],
  }));

  // Colores de marca premium
  const getMarcaColor = (marca: string) => {
    const colores: Record<string, string> = {
      Yale: '#DC2626',
      Jet: '#2563EB',
      Harrington: '#059669',
      Accolift: '#E11D48',
      Budgit: '#D97706',
      CM: '#EA580C',
      Cummings: '#65A30D',
      Demag: '#0284C7',
      MIT: '#7C3AED',
      'R&M': '#DB2777',
      Shawbox: '#0D9488',
      Coffing: '#CA8A04',
      Kito: '#EF4444',
    };
    return colores[marca] || colors.primary;
  };

  const marcaColor = getMarcaColor(manual.marca);

  const handlePress = () => {
    scale.value = withSpring(0.97, { duration: 100 });
    setTimeout(() => {
      scale.value = withSpring(1, { duration: 150 });
    }, 100);
    onPress?.();
  };

  const handleFavoritoPress = (e: any) => {
    e?.stopPropagation?.();
    favoritoScale.value = withSpring(1.4, { duration: 150 });
    setTimeout(() => {
      favoritoScale.value = withSpring(1, { duration: 200 });
    }, 150);
    toggleFavorito(manual.id);
  };

  return (
    <Animated.View style={[animatedCardStyle, { marginBottom: 20 }]}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.95}
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            shadowColor: colors.shadow,
          },
        ]}
      >
        {/* Botón de favorito minimalista */}
        <Animated.View style={[styles.favoritoContainer, animatedFavoritoStyle]}>
          <TouchableOpacity
            onPress={handleFavoritoPress}
            style={[
              styles.favoritoButton,
              {
                backgroundColor: isFavorito ? colors.primary : 'transparent',
              },
            ]}
            activeOpacity={0.7}
          >
            <FontAwesome
              name={isFavorito ? 'star' : 'star-o'}
              size={16}
              color={isFavorito ? '#000000' : colors.textMuted}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* Contenedor principal */}
        <View style={styles.content}>
          {/* Logo de marca premium */}
          <View
            style={[
              styles.logoContainer,
              {
                backgroundColor: isDark ? '#1A1A1A' : '#F9FAFB',
              },
            ]}
          >
            <View
              style={[
                styles.logoBadge,
                { backgroundColor: `${marcaColor}15` },
              ]}
            >
              <Text style={[styles.logoText, { color: marcaColor }]}>
                {manual.marca.substring(0, 1)}
              </Text>
            </View>
          </View>

          {/* Información del manual */}
          <View style={styles.info}>
            <Text
              style={[styles.title, { color: colors.text }]}
              numberOfLines={2}
            >
              {manual.titulo}
            </Text>

            {/* Metadata minimalista */}
            <View style={styles.metadata}>
              <View style={[styles.badge, { backgroundColor: isDark ? '#1A1A1A' : '#F9FAFB' }]}>
                <Text style={[styles.badgeText, { color: colors.textSecondary }]}>
                  {manual.marca}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.typeIndicator}>
                <FontAwesome
                  name={manual.tipo === 'Eléctrico' ? 'bolt' : 'hand-paper-o'}
                  size={10}
                  color={colors.textMuted}
                  style={{ marginRight: 4 }}
                />
                <Text style={[styles.typeText, { color: colors.textMuted }]}>
                  {manual.tipo}
                </Text>
              </View>
            </View>
          </View>

          {/* Indicador de acción */}
          <View style={styles.actionIndicator}>
            <FontAwesome
              name="chevron-right"
              size={14}
              color={colors.textMuted}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  favoritoContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  favoritoButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  info: {
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: -0.3,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: '#E5E7EB',
  },
  typeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  actionIndicator: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 2,
  },
});
