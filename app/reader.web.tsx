import { useTheme } from '@/contexts/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ReaderScreenWeb() {
  const { uri, title } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useTheme();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    // Si la URI es un recurso local (require), necesitamos resolverla o usarla directamente si es URL
    // En web, si es un asset local servido por webpack, uri suele ser la URL relativa/absoluta
    if (uri) {
        setPdfUrl(uri as string);
    }
  }, [uri]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header flotante simple */}
      <View style={[styles.header, { backgroundColor: colors.backgroundSecondary, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
          {title || 'Visor de Manual'}
        </Text>
        <View style={{ width: 40 }} /> 
      </View>

      <View style={styles.pdfContainer}>
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title="PDF Viewer"
          />
        ) : (
             <Text style={{color: colors.text}}>Cargando documento...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100vh', 
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  pdfContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});
