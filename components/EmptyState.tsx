import { useTheme } from '@/contexts/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface EmptyStateProps {
  onClearFilters?: () => void;
  showClearButton?: boolean;
  title?: string;
  message?: string;
  icon?: React.ComponentProps<typeof FontAwesome>['name'];
}

export default function EmptyState({
  onClearFilters,
  showClearButton = true,
  title = 'No se encontraron resultados',
  message = 'Intenta ajustar tu búsqueda para encontrar lo que necesitas',
  icon = 'search',
}: EmptyStateProps) {
  const { colors, isDark } = useTheme();

  return (
    <Animated.View 
      entering={FadeInUp.springify()}
      style={styles.container}
    >
      {/* Icono Principal */}
      <View style={[styles.iconWrapper, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}>
        <FontAwesome name={icon} size={40} color={colors.textMuted} />
        {icon === 'search' && (
          <View style={[styles.badge, { backgroundColor: colors.background, borderColor: colors.backgroundSecondary }]}>
            <FontAwesome name="times" size={10} color={colors.textSecondary} />
          </View>
        )}
      </View>

      {/* Textos */}
      <Text style={[styles.title, { color: colors.text }]}>
        {title}
      </Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>
        {message}
      </Text>

      {/* Sugerencias (Diseño Integrado) */}
      <View style={[
        styles.suggestionsCard, 
        { 
          borderColor: colors.border,
          backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
        }
      ]}>
        <View style={styles.suggestionHeader}>
          <FontAwesome name="lightbulb-o" size={14} color={colors.primary} />
          <Text style={[styles.suggestionTitle, { color: colors.text }]}>Tips de búsqueda:</Text>
        </View>
        
        <View style={styles.suggestionItem}>
          <FontAwesome name="check" size={10} color={colors.primary} style={styles.checkIcon} />
          <Text style={[styles.suggestionText, { color: colors.textSecondary }]}>Revisa la ortografía</Text>
        </View>
        <View style={styles.suggestionItem}>
          <FontAwesome name="check" size={10} color={colors.primary} style={styles.checkIcon} />
          <Text style={[styles.suggestionText, { color: colors.textSecondary }]}>Usa términos más generales</Text>
        </View>
        <View style={styles.suggestionItem}>
          <FontAwesome name="check" size={10} color={colors.primary} style={styles.checkIcon} />
          <Text style={[styles.suggestionText, { color: colors.textSecondary }]}>Prueba eliminando algunos filtros</Text>
        </View>
      </View>

      {/* Botón de Acción */}
      {showClearButton && onClearFilters && (
        <TouchableOpacity
          onPress={onClearFilters}
          style={[styles.button, { backgroundColor: colors.primary }]}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Limpiar filtros</Text>
          <FontAwesome name="refresh" size={12} color="#000000" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
    width: '100%',
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  badge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: 28,
    lineHeight: 22,
  },
  suggestionsCard: {
    width: '100%',
    maxWidth: 300,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 28,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  suggestionTitle: {
    fontWeight: '600',
    fontSize: 13,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkIcon: {
    marginRight: 10,
    opacity: 0.8,
  },
  suggestionText: {
    fontSize: 13,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
