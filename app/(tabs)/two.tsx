import PremiumManualCard from '@/components/PremiumManualCard';
import { MANUALES } from '@/constants/Manuales';
import { useFavoritos } from '@/contexts/FavoritosContext';
import { useTheme } from '@/contexts/ThemeContext';
import type { Manual } from '@/types/manual';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FavoritosScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const { esFavorito } = useFavoritos();
  const insets = useSafeAreaInsets();

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

  const renderStats = () => {
    if (manualesFavoritos.length === 0) return null;
    
    return (
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
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
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Blue Header Header */}
      <View style={[styles.blueHeader, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerContent}>
          <View style={styles.titleSection}>
            <View style={styles.titleRow}>
               <FontAwesome name="star" size={24} color="#FFCC00" style={{ marginRight: 10 }} />
               <Text style={styles.headerTitle}>Favoritos</Text>
            </View>
            <Text style={styles.headerSubtitle}>
              {manualesFavoritos.length}{' '}
              {manualesFavoritos.length === 1 ? 'manual guardado' : 'manuales guardados'}
            </Text>
          </View>


        </View>
      </View>

      {/* Content List */}
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
        ListHeaderComponent={renderStats}
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
  blueHeader: {
    backgroundColor: '#00335F',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 20,
    paddingBottom: 24,
    // Shadows
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  titleSection: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 34, // Indent to align with text start (icon width + margin)
  },
  // Switch Styles
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
  thumbLeft: { left: 4 },
  thumbRight: { right: 4 },
  
  // List Styles
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra padding for TabBar
    paddingTop: 20, // Space between header and list content
  },
  // Stats
  statsContainer: {
    marginBottom: 20,
  },
  statsRow: {
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
  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
