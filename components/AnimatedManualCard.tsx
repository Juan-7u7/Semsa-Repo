import { useFavoritos } from '@/contexts/FavoritosContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Manual } from '@/types/manual';
import { ANIMATION_CONFIG } from '@/utils/responsive';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';

interface AnimatedManualCardProps {
  manual: Manual;
  onPress?: () => void;
  index?: number;
}

/**
 * Tarjeta de manual con animaciones fluidas
 * - Animación de entrada (fade + slide)
 * - Animación al presionar (scale)
 * - Animación del botón de favorito
 */
export default function AnimatedManualCard({
  manual,
  onPress,
  index = 0,
}: AnimatedManualCardProps) {
  const { colors } = useTheme();
  const { toggleFavorito, esFavorito } = useFavoritos();

  const isFavorito = esFavorito(manual.id);

  // Valores animados
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const scale = useSharedValue(1);
  const favoritoScale = useSharedValue(1);

  // Animación de entrada
  useEffect(() => {
    const delay = index * 100; // Stagger animation
    
    setTimeout(() => {
      opacity.value = withTiming(1, {
        duration: ANIMATION_CONFIG.duration.normal,
      });
      
      translateY.value = withSpring(0, ANIMATION_CONFIG.spring);
    }, delay);
  }, []);

  // Estilo animado de la tarjeta
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  // Estilo animado del botón de favorito
  const animatedFavoritoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: favoritoScale.value }],
    };
  });

  // Obtener el logo según la marca
  const getMarcaLogo = (marca: string) => {
    const logos: Record<string, string> = {
      Yale: '🏭',
      Jet: '✈️',
      Harrington: '⚙️',
    };
    return logos[marca] || '📦';
  };

  // Obtener color de marca
  const getMarcaColor = (marca: string) => {
    const colores: Record<string, string> = {
      Yale: '#DC2626',
      Jet: '#2563EB',
      Harrington: '#059669',
    };
    return colores[marca] || colors.primary;
  };

  const marcaColor = getMarcaColor(manual.marca);

  const handlePress = () => {
    // Animación de press
    scale.value = withSpring(0.98, { duration: 100 });
    setTimeout(() => {
      scale.value = withSpring(1, { duration: 100 });
    }, 100);
    
    onPress?.();
  };

  const handleFavoritoPress = (e: any) => {
    e?.stopPropagation?.();
    
    // Animación del botón de favorito
    favoritoScale.value = withSpring(1.3, { duration: 150 });
    setTimeout(() => {
      favoritoScale.value = withSpring(1, { duration: 150 });
    }, 150);
    
    toggleFavorito(manual.id);
  };

  return (
    <Animated.View style={[animatedCardStyle]}>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
          shadowColor: colors.shadow,
        }}
        className="mb-3 rounded-2xl border shadow-md overflow-hidden"
        activeOpacity={0.9}
      >
        {/* Botón de favorito - Esquina superior derecha */}
        <Animated.View style={[{ position: 'absolute', top: 8, right: 8, zIndex: 10 }, animatedFavoritoStyle]}>
          <TouchableOpacity
            onPress={handleFavoritoPress}
            style={{
              backgroundColor: isFavorito ? colors.primary : colors.card,
              borderColor: colors.primary,
            }}
            className="w-10 h-10 rounded-full items-center justify-center border-2 shadow-sm"
            activeOpacity={0.7}
          >
            <FontAwesome
              name={isFavorito ? 'star' : 'star-o'}
              size={18}
              color={isFavorito ? '#FFFFFF' : colors.primary}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* Contenedor principal */}
        <View className="flex-row items-center p-4">
          {/* Logo de la marca - Izquierda */}
          <View
            style={{ backgroundColor: `${marcaColor}15` }}
            className="w-16 h-16 rounded-xl items-center justify-center mr-4"
          >
            <Text className="text-3xl">{getMarcaLogo(manual.marca)}</Text>
          </View>

          {/* Información del manual - Centro */}
          <View className="flex-1 mr-3">
            {/* Nombre del manual */}
            <Text
              style={{ color: colors.text }}
              className="text-base font-bold mb-1 pr-8"
              numberOfLines={2}
            >
              {manual.titulo}
            </Text>

            {/* Badge de marca */}
            <View className="flex-row items-center mt-1">
              <View
                style={{ backgroundColor: marcaColor }}
                className="px-3 py-1 rounded-full"
              >
                <Text className="text-white text-xs font-bold">
                  {manual.marca}
                </Text>
              </View>
            </View>
          </View>

          {/* Icono de tipo - Derecha */}
          <View
            style={{
              backgroundColor: manual.tipo === 'Eléctrico' ? '#FCD34D20' : '#A78BFA20',
            }}
            className="w-12 h-12 rounded-full items-center justify-center"
          >
            <FontAwesome
              name={manual.tipo === 'Eléctrico' ? 'bolt' : 'hand-paper-o'}
              size={20}
              color={manual.tipo === 'Eléctrico' ? '#F59E0B' : '#8B5CF6'}
            />
          </View>
        </View>

        {/* Barra inferior con botón de descarga */}
        <View
          style={{ backgroundColor: colors.backgroundSecondary }}
          className="px-4 py-3 flex-row items-center justify-between"
        >
          <View className="flex-row items-center">
            <FontAwesome
              name={manual.tipo === 'Eléctrico' ? 'bolt' : 'hand-paper-o'}
              size={12}
              color={colors.textSecondary}
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: colors.textSecondary }} className="text-xs font-semibold">
              {manual.tipo}
            </Text>
          </View>

          <TouchableOpacity
            style={{ backgroundColor: colors.primary }}
            className="flex-row items-center px-4 py-2 rounded-full"
            activeOpacity={0.8}
          >
            <FontAwesome name="download" size={12} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text className="text-white text-xs font-bold">Descargar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
