
import { useTheme } from '@/contexts/ThemeContext';
import { type Marca, type TipoManual } from '@/types/manual';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PremiumHeaderProps {
  onSearch: (query: string) => void;
  searchQuery?: string;
  onMarcaFilter?: (marca: Marca | null) => void;
  onTipoFilter?: (tipo: TipoManual | null) => void;
  marcaSeleccionada?: Marca | null;
  tipoSeleccionado?: TipoManual | null;
}

/**
 * Header Premium con diseño Split-Level
 * Parte superior azul con branding, parte inferior adaptativa con filtros.
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
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);

  const MARCAS = [
    'Yale', 'Harrington', 'Accolift', 'Budgit', 'CM',
    'Cummings', 'Demag', 'MIT', 'R&M', 'Shawbox', 'Coffing', 'Kito'
  ] as const;
  const tipos = [
    { value: null, label: 'Todos', icon: 'th-large' },
    { value: 'Eléctrico' as TipoManual, label: 'Eléctrico', icon: 'bolt' },
    { value: 'Manual' as TipoManual, label: 'Manual', icon: 'hand-paper-o' },
  ];

  return (
    <View style={styles.container}>
      {/* SECCIÓN AZUL: Branding y Acciones */}
      <View style={[
        styles.blueHeader, 
        { paddingTop: insets.top + 10 }
      ]}>
        <View style={styles.titleRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleMain}>SEMSA</Text>
            <Text style={styles.titleSub}>Repositorio de Manuales</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={toggleTheme}
              style={styles.themeSwitch}
              activeOpacity={0.9}
            >
               {/* Iconos de fondo (Track) */}
               <View style={styles.switchTrackIcons}>
                  <FontAwesome name="sun-o" size={14} color="rgba(255,255,255,0.4)" />
                  <FontAwesome name="moon-o" size={14} color="rgba(255,255,255,0.4)" />
               </View>

               {/* Thumb animado (Círculo blanco) */}
               <View style={[
                 styles.switchThumb,
                 isDark ? styles.thumbRight : styles.thumbLeft
               ]}>
                 <FontAwesome 
                    name={isDark ? "moon-o" : "sun-o"} 
                    size={14} 
                    color={isDark ? "#00335F" : "#FFB800"} 
                 />
               </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/help')}
              style={styles.headerButton}
              activeOpacity={0.7}
            >
              <FontAwesome name="info-circle" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* SECCIÓN DE CONTENIDO: Búsqueda y Filtros */}
      <View style={styles.contentContainer}>
        {/* Barra de Búsqueda */}
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

        {/* Filtros de Marca */}
        <View style={styles.filterSection}>
          <Text style={[styles.filterLabel, { color: colors.textSecondary }]}>Marca</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {MARCAS.map((marca: Marca) => {
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
                      { color: isSelected ? '#00335F' : colors.text }, // Texto oscuro en chip seleccionado (amarillo)
                    ]}
                  >
                    {marca}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Filtros de Tipo */}
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
                    color={isSelected ? '#00335F' : colors.textMuted}
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    style={[
                      styles.chipText,
                      { color: isSelected ? '#00335F' : colors.text },
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // No background here, lets parent handle it
  },
  blueHeader: {
    backgroundColor: '#00335F',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 20,
    paddingBottom: 24,
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  titleContainer: {
    flex: 1,
  },
  titleMain: {
    fontFamily: 'Roboto_500Medium_Italic',
    fontSize: 22,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  titleSub: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 18,
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  themeSwitch: {
    width: 68,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  switchTrackIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    width: '100%',
  },
  switchThumb: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  thumbLeft: {
    left: 4,
  },
  thumbRight: {
    left: 36,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16, // More rounded
    borderWidth: 2,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '400',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  filterScroll: {
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  typeFilters: {
    flexDirection: 'row',
    gap: 10,
  },
  typeChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
  },
});
