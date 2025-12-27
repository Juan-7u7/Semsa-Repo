import { useTheme } from '@/contexts/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Pantalla de Ayuda e Instrucciones
 * Guía completa para usar la aplicación
 */
export default function HelpScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();

  const features = [
    {
      icon: 'search',
      title: 'Buscar Manuales',
      description: 'Usa la barra de búsqueda para encontrar manuales por nombre o modelo.',
      color: '#3B82F6',
    },
    {
      icon: 'filter',
      title: 'Filtrar por Marca',
      description: 'Selecciona Yale, Jet o Harrington para ver solo manuales de esa marca.',
      color: '#8B5CF6',
    },
    {
      icon: 'bolt',
      title: 'Filtrar por Tipo',
      description: 'Elige entre Eléctrico o Manual para filtrar por tipo de funcionamiento.',
      color: '#F59E0B',
    },
    {
      icon: 'star',
      title: 'Guardar Favoritos',
      description: 'Toca la estrella en cualquier manual para agregarlo a tus favoritos.',
      color: '#FFB800',
    },
    {
      icon: 'download',
      title: 'Descargar PDF',
      description: 'Toca un manual para ver sus detalles y descargarlo en formato PDF.',
      color: '#10B981',
    },
    {
      icon: 'moon-o',
      title: 'Modo Oscuro',
      description: 'Cambia entre modo claro y oscuro tocando el icono de luna/sol.',
      color: '#6B7280',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.backgroundSecondary }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: colors.background }]}
            activeOpacity={0.7}
          >
            <FontAwesome name="arrow-left" size={18} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
              <FontAwesome name="question-circle" size={32} color="#000000" />
            </View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Guía de Uso
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
              Aprende a usar la aplicación
            </Text>
          </View>
        </View>

        {/* Contenido */}
        <View style={styles.content}>
          {/* Introducción */}
          <View style={[styles.introCard, { backgroundColor: colors.backgroundSecondary }]}>
            <Text style={[styles.introTitle, { color: colors.text }]}>
              ¡Bienvenido! 👋
            </Text>
            <Text style={[styles.introText, { color: colors.textSecondary }]}>
              Esta aplicación te permite acceder a todos los manuales de equipos industriales de forma rápida y sencilla.
            </Text>
          </View>

          {/* Características */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Características Principales
          </Text>

          {features.map((feature, index) => (
            <View
              key={index}
              style={[styles.featureCard, { backgroundColor: colors.backgroundSecondary }]}
            >
              <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                <FontAwesome name={feature.icon as any} size={24} color={feature.color} />
              </View>
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  {feature.title}
                </Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}

          {/* Pasos rápidos */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Inicio Rápido
          </Text>

          <View style={[styles.stepsCard, { backgroundColor: colors.backgroundSecondary }]}>
            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={[styles.stepText, { color: colors.text }]}>
                Busca o filtra los manuales que necesites
              </Text>
            </View>

            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={[styles.stepText, { color: colors.text }]}>
                Toca un manual para ver sus detalles
              </Text>
            </View>

            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={[styles.stepText, { color: colors.text }]}>
                Descarga el PDF o guárdalo en favoritos
              </Text>
            </View>
          </View>

          {/* Consejos */}
          <View style={[styles.tipsCard, { backgroundColor: `${colors.primary}15` }]}>
            <View style={styles.tipsHeader}>
              <FontAwesome name="lightbulb-o" size={20} color={colors.primary} />
              <Text style={[styles.tipsTitle, { color: colors.text }]}>
                Consejos Útiles
              </Text>
            </View>
            <View style={styles.tipsList}>
              <Text style={[styles.tipItem, { color: colors.textSecondary }]}>
                • Usa los favoritos para acceder rápidamente a tus manuales más usados
              </Text>
              <Text style={[styles.tipItem, { color: colors.textSecondary }]}>
                • Combina filtros de marca y tipo para búsquedas más precisas
              </Text>
              <Text style={[styles.tipItem, { color: colors.textSecondary }]}>
                • El modo oscuro es ideal para usar la app en ambientes con poca luz
              </Text>
            </View>
          </View>

          {/* Botón de acción */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>Comenzar a Usar</Text>
            <FontAwesome name="arrow-right" size={16} color="#000000" />
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
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '400',
  },
  content: {
    padding: 20,
  },
  introCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  featureCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 16,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    flex: 1,
    gap: 6,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  stepsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    gap: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  tipsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    fontSize: 14,
    lineHeight: 20,
  },
  downloadCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#3DDC84',
  },
  downloadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  downloadTexts: {
    flex: 1,
  },
  downloadTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  downloadDesc: {
    fontSize: 13,
  },
  downloadButton: {
    backgroundColor: '#3DDC84',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  downloadButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  actionButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
});
