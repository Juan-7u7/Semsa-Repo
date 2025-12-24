import PremiumManualCard from '@/components/PremiumManualCard';
import { MANUALES } from '@/constants/Manuales';
import { useFavoritos } from '@/contexts/FavoritosContext';
import { useTheme } from '@/contexts/ThemeContext';
import type { Manual } from '@/types/manual';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FavoritosScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const { esFavorito } = useFavoritos();

  // Obtener manuales favoritos
  const manualesFavoritos = useMemo(() => {
    return MANUALES.filter((manual) => esFavorito(manual.id));
  }, [esFavorito]);

  const handleManualPress = (manual: Manual) => {
    router.push(`/modal?id=${manual.id}`);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View
        style={[
          styles.emptyIcon,
          { backgroundColor: colors.backgroundSecondary },
        ]}
      >
        <FontAwesome name="star-o" size={48} color={colors.textMuted} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        No hay favoritos
      </Text>
      <Text style={[styles.emptyMessage, { color: colors.textSecondary }]}>
        Toca la estrella en cualquier manual para agregarlo a tus favoritos
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Título y tema */}
      <View style={styles.titleRow}>
        <View style={styles.titleContainer}>
          <View style={styles.titleWithIcon}>
            <FontAwesome name="star" size={24} color={colors.primary} />
            <Text style={[styles.title, { color: colors.text }]}>Favoritos</Text>
          </View>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {manualesFavoritos.length}{' '}
            {manualesFavoritos.length === 1 ? 'manual guardado' : 'manuales guardados'}
          </Text>
        </View>

        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.themeButton, { backgroundColor: colors.backgroundSecondary }]}
          activeOpacity={0.7}
        >
          <FontAwesome
            name={isDark ? 'sun-o' : 'moon-o'}
            size={18}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Estadísticas */}
      {manualesFavoritos.length > 0 && (
        <View style={styles.stats}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.backgroundSecondary },
            ]}
          >
            <FontAwesome name="bolt" size={16} color="#F59E0B" style={{ marginBottom: 8 }} />
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {manualesFavoritos.filter((m) => m.tipo === 'Eléctrico').length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Eléctricos
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.backgroundSecondary },
            ]}
          >
            <FontAwesome name="hand-paper-o" size={16} color="#8B5CF6" style={{ marginBottom: 8 }} />
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {manualesFavoritos.filter((m) => m.tipo === 'Manual').length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Manuales
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={manualesFavoritos}
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
  header: {
    paddingTop: 16,
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 36,
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
