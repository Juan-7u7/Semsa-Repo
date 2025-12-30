import { useTheme } from '@/contexts/ThemeContext';
import { type MarcaManual, type TipoManual } from '@/types/manual';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface PremiumHeaderProps {
  onSearch: (query: string) => void;
  searchQuery?: string;
  onMarcaFilter?: (marca: MarcaManual | null) => void;
  onTipoFilter?: (tipo: TipoManual | null) => void;
  marcaSeleccionada?: MarcaManual | null;
  tipoSeleccionado?: TipoManual | null;
}

/**
 * Header Premium con diseño limpio y familiar
 * Barra de búsqueda minimalista y filtros elegantes
 */
export default function PremiumHeader({
  onSearch,
  searchQuery = '',
  onMarcaFilter,
  onTipoFilter,
  marcaSeleccionada,
  tipoSeleccionado,
}: PremiumHeaderProps) {
  const router = useRouter();
  const { colors, isDark, toggleTheme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const marcas: MarcaManual[] = [
    'Yale', 'Jet', 'Harrington', 'Accolift', 'Budgit', 'CM',
    'Cummings', 'Demag', 'MIT', 'R&M', 'Shawbox', 'Coffing', 'Kito',
  ];
  const tipos = [
    { value: null, label: 'Todos', icon: 'th-large' },
    { value: 'Eléctrico' as TipoManual, label: 'Eléctrico', icon: 'bolt' },
    { value: 'Manual' as TipoManual, label: 'Manual', icon: 'hand-paper-o' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Título y Acciones */}
      <View style={styles.titleRow}>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleMain, { color: colors.text }]}>SEMSA</Text>
          <Text style={[styles.titleSub, { color: colors.text }]}>Repositorio de Manuales</Text>
        </View>

        <View style={styles.headerActions}>
           <TouchableOpacity
              onPress={toggleTheme}
              style={[styles.iconButton, { backgroundColor: colors.backgroundSecondary }]}
              activeOpacity={0.7}
            >
              <FontAwesome name={isDark ? 'sun-o' : 'moon-o'} size={20} color={colors.text} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/help')}
              style={[styles.iconButton, { backgroundColor: colors.backgroundSecondary }]}
              activeOpacity={0.7}
            >
              <FontAwesome name="info-circle" size={20} color={colors.text} />
            </TouchableOpacity>
        </View>
      </View>

      {/* Barra de búsqueda premium */}
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: colors.backgroundSecondary,
            borderColor: isFocused ? colors.primary : 'transparent',
          },
        ]}
      >
        <FontAwesome name="search" size={16} color={colors.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Buscar manuales..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={onSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onSearch('')} activeOpacity={0.7}>
            <FontAwesome name="times-circle" size={16} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filtros por marca */}
      <View style={styles.filterSection}>
        <Text style={[styles.filterLabel, { color: colors.textSecondary }]}>Marca</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {marcas.map((marca) => {
            const isSelected = marcaSeleccionada === marca;
            return (
              <TouchableOpacity
                key={marca}
                onPress={() => onMarcaFilter?.(isSelected ? null : marca)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.backgroundSecondary,
                    borderColor: isSelected ? colors.primary : 'transparent',
                  },
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: isSelected ? '#000000' : colors.text },
                  ]}
                >
                  {marca}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Filtros por tipo */}
      <View style={styles.filterSection}>
        <Text style={[styles.filterLabel, { color: colors.textSecondary }]}>Tipo</Text>
        <View style={styles.typeFilters}>
          {tipos.map((tipo) => {
            const isSelected = tipoSeleccionado === tipo.value;
            return (
              <TouchableOpacity
                key={tipo.label}
                onPress={() => onTipoFilter?.(isSelected ? null : tipo.value)}
                style={[
                  styles.typeChip,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.backgroundSecondary,
                    borderColor: isSelected ? colors.primary : 'transparent',
                  },
                ]}
                activeOpacity={0.7}
              >
                <FontAwesome
                  name={tipo.icon as any}
                  size={14}
                  color={isSelected ? '#000000' : colors.textMuted}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.chipText,
                    { color: isSelected ? '#000000' : colors.text },
                  ]}
                >
                  {tipo.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    marginTop: 8,
  },
  titleContainer: {
    flex: 1,
  },
  titleMain: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  titleSub: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 20,
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '400',
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  filterScroll: {
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  typeFilters: {
    flexDirection: 'row',
    gap: 8,
  },
  typeChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
  },
});
