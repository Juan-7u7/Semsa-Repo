import { MANUALES } from '@/constants/Manuales';
import { useFavoritos } from '@/contexts/FavoritosContext';
import { useTheme } from '@/contexts/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { shareAsync } from 'expo-sharing';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Modal Premium de Detalle del Manual
 * Diseño limpio y profesional con glassmorphism
 */
export default function ModalScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { toggleFavorito, esFavorito } = useFavoritos();
  const [loading, setLoading] = useState(false);
  
  const manual = MANUALES.find((m) => m.id === Number(id));
  const params = useLocalSearchParams();
  
  const manualId = params.id ? parseInt(params.id as string) : null;
  const isFavorito = manualId ? esFavorito(manualId) : false;

  const getMarcaColor = (marca: string) => {
    const colores: Record<string, string> = {
      Yale: '#DC2626',
      Jet: '#2563EB',
      Harrington: '#059669',
      Accolift: '#E11D48',
      Budgit: '#D97706',
      CM: '#EA580C',
      Cummings: '#65A30D',
      Demag: '#0284C7',
      MIT: '#7C3AED',
      'R&M': '#DB2777',
      Shawbox: '#0D9488',
      Coffing: '#CA8A04',
      Kito: '#EF4444',
    };
    return colores[marca] || colors.primary;
  };

  const marcaColor = manual ? getMarcaColor(manual.marca) : colors.primary;

  const getPdfUri = async () => {
    if (!manual?.archivo) return null;
    try {
      const asset = Asset.fromModule(manual.archivo);
      await asset.downloadAsync();
      return asset.localUri || asset.uri;
    } catch (error) {
      console.error('Error loading PDF asset:', error);
      return null;
    }
  };

  const handleViewPdf = async () => {
    setLoading(true);
    try {
      const uri = await getPdfUri();
      if (uri) {
        // Navegar al visor interno
        router.push({
          pathname: '/reader',
          params: { uri, title: manual?.titulo, id: manual?.id }
        });
      } else {
        Alert.alert('Error', 'No se pudo cargar el archivo PDF.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al intentar abrir el PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleSharePdf = async () => {
    setLoading(true);
    try {
      const uri = await getPdfUri();
      if (uri) {
        // Nombre del archivo: Mantener nombre original pero remover caracteres ilegales del sistema de archivos
        const validName = manual?.titulo.replace(/[\/\\?%*:|"<>]/g, '-') || 'documento';
        const fileName = `${validName}.pdf`;

        if (Platform.OS === 'web') {
           // En web, "compartir" suele ser descargar el archivo
           const link = document.createElement('a');
           link.href = uri;
           link.download = fileName;
           document.body.appendChild(link);
           link.click();
           document.body.removeChild(link);
        } else {
            // Nativo: Copiar a cache con nombre legible y compartir
            const newPath = `${FileSystem.cacheDirectory}${fileName}`;
            
            await FileSystem.copyAsync({
                from: uri,
                to: newPath
            });
    
            await shareAsync(newPath, { 
                dialogTitle: `Compartir: ${manual?.titulo}`,
                mimeType: 'application/pdf',
                UTI: 'com.adobe.pdf'
            });
        }
      } else {
        Alert.alert('Error', 'No se pudo preparar el archivo.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al compartir.');
    } finally {
      setLoading(false);
    }
  };

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
          {/* Portada del Manual (Simulación Visual) */}
          <TouchableOpacity 
            style={[styles.pdfCoverContainer, { borderColor: colors.border }]}
            onPress={handleViewPdf}
            activeOpacity={0.9}
            disabled={loading}
          >
            {/* Hoja de papel simulada */}
            <View style={styles.paperSheet}>
              {/* Encabezado de la hoja */}
              <View style={styles.paperHeader}>
                <Text style={[styles.brandText, { color: marcaColor }]}>
                  {manual.marca.toUpperCase()}
                </Text>
                <View style={[styles.brandLine, { backgroundColor: marcaColor }]} />
              </View>

              {/* Contenido de la portada */}
              <View style={styles.paperContent}>
                <Text style={styles.manualType}>MANUAL DE USUARIO</Text>
                <Text style={styles.coverTitle} numberOfLines={3}>
                  {manual.titulo}
                </Text>
                
                <View style={styles.decorationLines}>
                   <View style={styles.lineLong} />
                   <View style={styles.lineLong} />
                   <View style={styles.lineShort} />
                </View>

                {/* Icono decorativo de PDF abajo */}
                <View style={styles.bottomIcon}>
                   <FontAwesome name="file-pdf-o" size={24} color={colors.textMuted} />
                   <Text style={styles.clickToView}>Tocar para leer</Text>
                </View>
              </View>

              {/* Efecto de brillo/gradiente simple visual */}
              <View style={styles.paperShine} />
            </View>

            {/* Overlay de carga si es necesario */}
            {loading && (
              <View style={styles.loadingOverlay}>
                 <ActivityIndicator size="large" color={colors.primary} />
                 <Text style={[styles.loadingText, { color: colors.primary }]}>Abriendo...</Text>
              </View>
            )}
          </TouchableOpacity>

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
                <Text style={[styles.infoValue, { color: colors.text }]}>{manual.tamano || 'Desconocido'}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                  Páginas
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{manual.paginas ? `${manual.paginas} páginas` : 'Desconocido'}</Text>
              </View>
            </View>
          </View>

          {/* Botón de compartir */}
          <TouchableOpacity
            style={[styles.downloadButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
            onPress={handleSharePdf}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <FontAwesome name="share-alt" size={20} color="#000000" />
            )}
            <Text style={styles.downloadText}>Compartir PDF</Text>
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
  // Estilos de la Portada Simulada
  pdfCoverContainer: {
    width: '100%',
    aspectRatio: 0.75, // Proporción similar a carta/A4
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 10,
  },
  paperSheet: {
    width: '85%',
    height: '95%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
  },
  paperHeader: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  brandText: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 4,
  },
  brandLine: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  paperContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  manualType: {
    fontSize: 10,
    color: '#666',
    letterSpacing: 2,
    marginBottom: 12,
    fontWeight: '600',
  },
  coverTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  decorationLines: {
    width: '100%',
    alignItems: 'center',
    gap: 6,
    marginBottom: 40,
  },
  lineLong: {
    width: '60%',
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  lineShort: {
    width: '30%',
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  bottomIcon: {
    alignItems: 'center',
    gap: 4,
    marginTop: 'auto',
  },
  clickToView: {
    fontSize: 10,
    color: '#999',
    fontWeight: '500',
  },
  paperShine: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 60,
    backgroundColor: '#F9FAFB',
    borderBottomLeftRadius: 60,
    zIndex: -1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    borderRadius: 12,
  },
  loadingText: {
    marginTop: 10,
    fontWeight: '600',
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
