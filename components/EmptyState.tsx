import { useTheme } from '@/contexts/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface EmptyStateProps {
  onClearFilters?: () => void;
  showClearButton?: boolean;
  title?: string;
  message?: string;
  icon?: React.ComponentProps<typeof FontAwesome>['name'];
}

/**
 * Componente de estado vacío para cuando no hay resultados
 * Muestra un icono triste, mensaje y botón para limpiar filtros
 * 
 * @param onClearFilters - Callback para limpiar filtros
 * @param showClearButton - Mostrar botón de limpiar filtros
 * @param title - Título personalizado
 * @param message - Mensaje personalizado
 * @param icon - Icono personalizado
 * 
 * @example
 * ```tsx
 * <EmptyState
 *   onClearFilters={() => {
 *     setSearchQuery('');
 *     setMarcaFiltro(null);
 *     setTipoFiltro(null);
 *   }}
 *   showClearButton={true}
 * />
 * ```
 */
export default function EmptyState({
  onClearFilters,
  showClearButton = true,
  title = 'No se encontraron resultados',
  message = 'Intenta ajustar los filtros o la búsqueda para encontrar lo que necesitas',
  icon = 'frown-o',
}: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View className="items-center justify-center py-20 px-8">
      {/* Icono triste */}
      <View
        style={{ backgroundColor: colors.backgroundSecondary }}
        className="w-32 h-32 rounded-full items-center justify-center mb-6"
      >
        <FontAwesome name={icon} size={64} color={colors.textMuted} />
      </View>

      {/* Título */}
      <Text
        style={{ color: colors.text }}
        className="text-2xl font-bold mb-3 text-center"
      >
        {title}
      </Text>

      {/* Mensaje */}
      <Text
        style={{ color: colors.textSecondary }}
        className="text-base text-center mb-6 px-4 leading-6"
      >
        {message}
      </Text>

      {/* Sugerencias */}
      <View
        style={{
          backgroundColor: colors.primary + '15',
          borderColor: colors.primary + '30',
        }}
        className="p-4 rounded-xl border mb-6 w-full max-w-sm"
      >
        <View className="flex-row items-center mb-3">
          <FontAwesome
            name="lightbulb-o"
            size={20}
            color={colors.primary}
            style={{ marginRight: 8 }}
          />
          <Text style={{ color: colors.text }} className="font-bold">
            Sugerencias:
          </Text>
        </View>

        <View className="space-y-2">
          <View className="flex-row items-start mb-2">
            <Text style={{ color: colors.primary }} className="mr-2">
              •
            </Text>
            <Text style={{ color: colors.textSecondary }} className="flex-1 text-sm">
              Verifica la ortografía de tu búsqueda
            </Text>
          </View>

          <View className="flex-row items-start mb-2">
            <Text style={{ color: colors.primary }} className="mr-2">
              •
            </Text>
            <Text style={{ color: colors.textSecondary }} className="flex-1 text-sm">
              Intenta con términos más generales
            </Text>
          </View>

          <View className="flex-row items-start mb-2">
            <Text style={{ color: colors.primary }} className="mr-2">
              •
            </Text>
            <Text style={{ color: colors.textSecondary }} className="flex-1 text-sm">
              Prueba con diferentes filtros
            </Text>
          </View>

          <View className="flex-row items-start">
            <Text style={{ color: colors.primary }} className="mr-2">
              •
            </Text>
            <Text style={{ color: colors.textSecondary }} className="flex-1 text-sm">
              Limpia los filtros para ver todos los manuales
            </Text>
          </View>
        </View>
      </View>

      {/* Botón para limpiar filtros */}
      {showClearButton && onClearFilters && (
        <TouchableOpacity
          onPress={onClearFilters}
          style={{ backgroundColor: colors.primary }}
          className="flex-row items-center px-8 py-4 rounded-full shadow-lg"
          activeOpacity={0.8}
        >
          <FontAwesome name="refresh" size={18} color="#FFFFFF" style={{ marginRight: 10 }} />
          <Text className="text-white text-base font-bold">Limpiar Filtros</Text>
        </TouchableOpacity>
      )}

      {/* Mensaje adicional */}
      {showClearButton && onClearFilters && (
        <Text
          style={{ color: colors.textMuted }}
          className="text-xs text-center mt-4"
        >
          Esto eliminará todos los filtros y búsquedas activas
        </Text>
      )}
    </View>
  );
}
