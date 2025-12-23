import { useTheme } from '@/contexts/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Componente de ejemplo que demuestra el uso del sistema de temas
 * 
 * @example
 * ```tsx
 * import ThemeExample from '@/components/ThemeExample';
 * 
 * <ThemeExample />
 * ```
 */
export default function ThemeExample() {
  const { colors, isDark, toggleTheme, colorScheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Título */}
      <Text style={[styles.title, { color: colors.text }]}>
        Sistema de Temas
      </Text>

      {/* Información del tema actual */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          Tema Actual:
        </Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {isDark ? 'Oscuro 🌙' : 'Claro ☀️'}
        </Text>
      </View>

      {/* Demostración de colores */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          Color Primario:
        </Text>
        <View style={[styles.colorBox, { backgroundColor: colors.primary }]}>
          <Text style={styles.colorText}>#FFB800</Text>
        </View>
      </View>

      {/* Botón para cambiar tema */}
      <TouchableOpacity
        onPress={toggleTheme}
        style={[styles.button, { backgroundColor: colors.primary }]}
        activeOpacity={0.8}
      >
        <FontAwesome 
          name={isDark ? 'sun-o' : 'moon-o'} 
          size={20} 
          color="#FFFFFF" 
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>
          Cambiar a {isDark ? 'Tema Claro' : 'Tema Oscuro'}
        </Text>
      </TouchableOpacity>

      {/* Ejemplos de colores */}
      <View style={styles.colorsGrid}>
        <View style={[styles.colorItem, { backgroundColor: colors.success }]}>
          <Text style={styles.colorLabel}>Success</Text>
        </View>
        <View style={[styles.colorItem, { backgroundColor: colors.error }]}>
          <Text style={styles.colorLabel}>Error</Text>
        </View>
        <View style={[styles.colorItem, { backgroundColor: colors.warning }]}>
          <Text style={styles.colorLabel}>Warning</Text>
        </View>
        <View style={[styles.colorItem, { backgroundColor: colors.info }]}>
          <Text style={styles.colorLabel}>Info</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
  },
  colorBox: {
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  colorText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  colorItem: {
    width: '48%',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    alignItems: 'center',
  },
  colorLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
