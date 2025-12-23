import EmptyState from '@/components/EmptyState';
import PremiumHeader from '@/components/PremiumHeader';
import PremiumManualCard from '@/components/PremiumManualCard';
import {
    buscarManualesPorTitulo,
    obtenerTodosManuales,
    type Manual,
    type MarcaManual,
    type TipoManual,
} from '@/constants/Manuales';
import { useTheme } from '@/contexts/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function CatalogoScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [marcaFiltro, setMarcaFiltro] = useState<MarcaManual | null>(null);
  const [tipoFiltro, setTipoFiltro] = useState<TipoManual | null>(null);

  // Filtrar manuales
  const manualesFiltrados = useMemo(() => {
    let manuales = obtenerTodosManuales();

    if (searchQuery.trim() !== '') {
      manuales = buscarManualesPorTitulo(searchQuery);
    }

    if (marcaFiltro) {
      manuales = manuales.filter((manual) => manual.marca === marcaFiltro);
    }

    if (tipoFiltro) {
      manuales = manuales.filter((manual) => manual.tipo === tipoFiltro);
    }

    return manuales;
  }, [searchQuery, marcaFiltro, tipoFiltro]);

  const handleManualPress = (manual: Manual) => {
    router.push(`/modal?id=${manual.id}`);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setMarcaFiltro(null);
    setTipoFiltro(null);
  };

  const renderEmptyState = () => (
    <EmptyState
      onClearFilters={handleClearFilters}
      showClearButton={searchQuery !== '' || marcaFiltro !== null || tipoFiltro !== null}
    />
  );

  const renderHeader = () => {
    if (manualesFiltrados.length === 0) return null;

    return (
      <View style={styles.statsContainer}>
        {/* Estadística principal */}
        <View
          style={[
            styles.mainStat,
            {
              backgroundColor: colors.backgroundSecondary,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.statContent}>
            <FontAwesome name="file-pdf-o" size={32} color={colors.primary} />
            <View style={styles.statText}>
              <Text style={[styles.statNumber, { color: colors.text }]}>
                {manualesFiltrados.length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {manualesFiltrados.length === 1 ? 'Manual' : 'Manuales'}
              </Text>
            </View>
          </View>
        </View>

        {/* Desglose por tipo */}
        {!tipoFiltro && (
          <View style={styles.breakdown}>
            <View
              style={[
                styles.breakdownItem,
                { backgroundColor: colors.backgroundSecondary },
              ]}
            >
              <FontAwesome name="bolt" size={16} color="#F59E0B" style={{ marginBottom: 8 }} />
              <Text style={[styles.breakdownNumber, { color: colors.text }]}>
                {manualesFiltrados.filter((m) => m.tipo === 'Eléctrico').length}
              </Text>
              <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>
                Eléctricos
              </Text>
            </View>

            <View
              style={[
                styles.breakdownItem,
                { backgroundColor: colors.backgroundSecondary },
              ]}
            >
              <FontAwesome name="hand-paper-o" size={16} color="#8B5CF6" style={{ marginBottom: 8 }} />
              <Text style={[styles.breakdownNumber, { color: colors.text }]}>
                {manualesFiltrados.filter((m) => m.tipo === 'Manual').length}
              </Text>
              <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>
                Manuales
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        onMarcaFilter={setMarcaFiltro}
        onTipoFilter={setTipoFiltro}
        marcaSeleccionada={marcaFiltro}
        tipoSeleccionado={tipoFiltro}
      />

      <FlatList
        data={manualesFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <PremiumManualCard
            manual={item}
            onPress={() => handleManualPress(item)}
            index={index}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  statsContainer: {
    marginBottom: 24,
  },
  mainStat: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statText: {
    flex: 1,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -1,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  breakdown: {
    flexDirection: 'row',
    gap: 12,
  },
  breakdownItem: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  breakdownNumber: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  breakdownLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
});
