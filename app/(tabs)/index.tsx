import EmptyState from '@/components/EmptyState';
import PremiumHeader from '@/components/PremiumHeader';
import PremiumManualCard from '@/components/PremiumManualCard';
import { useTheme } from '@/contexts/ThemeContext';
import { useManuales } from '@/hooks/useManuales';
import { type Manual } from '@/types/manual';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function CatalogoScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  
  // Usar hook personalizado para lógica de negocio
  const {
    manuales: manualesFiltrados,
    searchQuery,
    setSearchQuery,
    selectedMarca,
    setSelectedMarca,
    selectedTipo,
    setSelectedTipo,
    estadisticas
  } = useManuales();

  const handleManualPress = (manual: Manual) => {
    router.push(`/modal?id=${manual.id}`);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedMarca(null);
    setSelectedTipo(null);
  };

  const renderEmptyState = () => (
    <EmptyState
      onClearFilters={handleClearFilters}
      showClearButton={searchQuery !== '' || selectedMarca !== null || selectedTipo !== null}
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
                {estadisticas.filtrados}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {estadisticas.filtrados === 1 ? 'Manual' : 'Manuales'}
              </Text>
            </View>
          </View>
        </View>

        {/* Desglose por tipo (solo si no estamos filtrando por tipo) */}
        {!selectedTipo && (
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
        onMarcaFilter={setSelectedMarca}
        onTipoFilter={setSelectedTipo}
        marcaSeleccionada={selectedMarca}
        tipoSeleccionado={selectedTipo}
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
