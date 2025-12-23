import { obtenerManualPorId } from '@/constants/Manuales';
import { useFavoritos } from '@/contexts/FavoritosContext';
import { useTheme } from '@/contexts/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Modal Premium de Detalle del Manual
 * Diseño limpio y profesional con glassmorphism
 */
export default function PremiumModalScreen() {
  const { colors, isDark } = useTheme();
  const { toggleFavorito, esFavorito } = useFavoritos();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const manualId = params.id ? parseInt(params.id as string) : null;
  const manual = manualId ? obtenerManualPorId(manualId) : null;
  const isFavorito = manualId ? esFavorito(manualId) : false;

  const getMarcaColor = (marca: string) => {
    const colores: Record<string, string> = {
      Yale: '#DC2626',
      Jet: '#2563EB',
      Harrington: '#059669',
    };
    return colores[marca] || colors.primary;
  };

  const marcaColor = manual ? getMarcaColor(manual.marca) : colors.primary;

  if (!manual) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <View style={[styles.errorIcon, { backgroundColor: colors.backgroundSecondary }]}>
            <FontAwesome name="exclamation-circle" size={48} color={colors.textMuted} />
          </View>
          <Text style={[styles.errorTitle, { color: colors.text }]}>
            Manual no encontrado
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.button, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header con glassmorphism */}
        <View style={[styles.header, { backgroundColor: colors.backgroundSecondary }]}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={[styles.iconButton, { backgroundColor: colors.background }]}
              activeOpacity={0.7}
            >
              <FontAwesome name="arrow-left" size={18} color={colors.text} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleFavorito(manual.id)}
              style={[
                styles.iconButton,
                {
                  backgroundColor: isFavorito ? colors.primary : colors.background,
                },
              ]}
              activeOpacity={0.7}
            >
              <FontAwesome
                name={isFavorito ? 'star' : 'star-o'}
                size={18}
                color={isFavorito ? '#000000' : colors.text}
              />
            </TouchableOpacity>
          </View>

          {/* Información del manual */}
          <View style={styles.manualInfo}>
            <Text style={[styles.manualTitle, { color: colors.text }]}>
              {manual.titulo}
            </Text>

            <View style={styles.badges}>
              <View style={[styles.badge, { backgroundColor: `${marcaColor}20` }]}>
                <Text style={[styles.badgeText, { color: marcaColor }]}>
                  {manual.marca}
                </Text>
              </View>

              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: manual.tipo === 'Eléctrico' ? '#FCD34D20' : '#A78BFA20',
                  },
                ]}
              >
                <FontAwesome
                  name={manual.tipo === 'Eléctrico' ? 'bolt' : 'hand-paper-o'}
                  size={12}
                  color={manual.tipo === 'Eléctrico' ? '#F59E0B' : '#8B5CF6'}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.badgeText,
                    { color: manual.tipo === 'Eléctrico' ? '#F59E0B' : '#8B5CF6' },
                  ]}
                >
                  {manual.tipo}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contenido principal */}
        <View style={styles.content}>
          {/* Visor de PDF simulado */}
          <View style={[styles.pdfViewer, { backgroundColor: colors.backgroundSecondary }]}>
            <View style={styles.pdfIcon}>
              <FontAwesome name="file-pdf-o" size={64} color={colors.primary} />
            </View>

            <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />

            <Text style={[styles.loadingTitle, { color: colors.text }]}>
              Cargando Visor de PDF
            </Text>
            <Text style={[styles.loadingSubtitle, { color: colors.textSecondary }]}>
              Preparando el documento para visualización
            </Text>
          </View>

          {/* Información del documento */}
          <View style={[styles.infoCard, { backgroundColor: colors.backgroundSecondary }]}>
            <View style={styles.infoHeader}>
              <FontAwesome name="info-circle" size={20} color={colors.primary} />
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                Información del Documento
              </Text>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                  Formato
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>PDF</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                  Tamaño
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>~2.5 MB</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                  Páginas
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>~15 páginas</Text>
              </View>
            </View>
          </View>

          {/* Botón de descarga */}
          <TouchableOpacity
            style={[styles.downloadButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
          >
            <FontAwesome name="download" size={20} color="#000000" />
            <Text style={styles.downloadText}>Descargar PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar style={isDark ? 'light' : 'dark'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manualInfo: {
    gap: 16,
  },
  manualTitle: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  pdfViewer: {
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    minHeight: 300,
    justifyContent: 'center',
  },
  pdfIcon: {
    marginBottom: 24,
  },
  loader: {
    marginBottom: 20,
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    borderRadius: 12,
  },
  downloadText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  errorIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 32,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
});
