import { useFavoritos } from '@/contexts/FavoritosContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Manual } from '@/types/manual';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, TouchableOpacity, View } from 'react-native';

interface ManualCardProps {
  manual: Manual;
  onPress?: () => void;
}

/**
 * Tarjeta de manual con diseño atractivo y funcionalidad de favoritos
 * - Logo de marca a la izquierda
 * - Nombre en negrita al centro
 * - Icono de rayo (eléctrico) o mano (manual) a la derecha
 * - Botón de favorito (estrella) en la esquina superior derecha
 * 
 * @param manual - Objeto con los datos del manual
 * @param onPress - Callback al tocar la tarjeta
 * 
 * @example
 * ```tsx
 * <ManualCard 
 *   manual={manual}
 *   onPress={() => console.log('Manual seleccionado')}
 * />
 * ```
 */
export default function ManualCard({ manual, onPress }: ManualCardProps) {
  const { colors } = useTheme();
  const { toggleFavorito, esFavorito } = useFavoritos();

  const isFavorito = esFavorito(manual.id);

  // Obtener el logo según la marca
  const getMarcaLogo = (marca: string) => {
    const logos: Record<string, string> = {
      Yale: '🏭',
      Jet: '✈️',
      Harrington: '⚙️',
      Accolift: '🏗️',
      Budgit: '🦾',
      CM: '⛓️',
      Cummings: '⚡',
      Demag: '🏗️',
      MIT: '📟',
      'R&M': '🏗️',
      Shawbox: '📦',
      Coffing: '🏗️',
      Kito: '🇯🇵',
    };
    return logos[marca] || '📦';
  };

  // Obtener color de marca
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

  const handleFavoritoPress = (e: any) => {
    // Prevenir que se active el onPress de la tarjeta
    e?.stopPropagation?.();
    toggleFavorito(manual.id);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.card,
        borderColor: colors.cardBorder,
        shadowColor: colors.shadow,
      }}
      className="mb-3 rounded-2xl border shadow-md overflow-hidden"
      activeOpacity={0.7}
    >
      {/* Botón de favorito - Esquina superior derecha */}
      <TouchableOpacity
        onPress={handleFavoritoPress}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 10,
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
  );
}
