# 📄 Modal de Detalle del Manual - Documentación

## Descripción

Pantalla modal que se abre al tocar un manual, simulando un visor de PDF con:

- **Header** con información del manual
- **Visor simulado** con mensaje de carga
- **Botones** de cerrar y favorito
- **Información adicional** del documento

## 🎨 Diseño Visual

```
┌─────────────────────────────────────┐
│  ✕                            ⭐   │
│                                     │
│  Polipasto Eléctrico Yale CPV       │
│  ┌──────┐ ┌───────────┐            │
│  │ Yale │ │⚡Eléctrico│            │
│  └──────┘ └───────────┘            │
├─────────────────────────────────────┤
│                                     │
│           📄                        │
│      (icono de PDF)                 │
│                                     │
│          ⏳                         │
│    (spinner de carga)               │
│                                     │
│   Cargando Visor de PDF...          │
│   Preparando el documento           │
│                                     │
│  ┌─────────────────────────┐       │
│  │ ℹ️ Información           │       │
│  │ Formato: PDF             │       │
│  │ Tamaño: ~2.5 MB          │       │
│  │ Páginas: ~15 páginas     │       │
│  └─────────────────────────┘       │
│                                     │
│      [Descargar PDF 📥]            │
│                                     │
└─────────────────────────────────────┘
```

## 🎯 Características

✅ **Navegación con Parámetros** - Recibe ID del manual  
✅ **Header Informativo** - Título, marca y tipo  
✅ **Botón de Cerrar** - Vuelve a la pantalla anterior  
✅ **Botón de Favorito** - Toggle de favorito  
✅ **Visor Simulado** - Icono de PDF + spinner  
✅ **Mensaje de Carga** - "Cargando Visor de PDF..."  
✅ **Información del Documento** - Formato, tamaño, páginas  
✅ **Botón de Descarga** - Acción alternativa  
✅ **Tema Dinámico** - Colores adaptativos

## 📁 Archivo

**`app/modal.tsx`** - Pantalla modal de detalle

## 🚀 Navegación

### Desde Catálogo

```tsx
import { useRouter } from "expo-router";

function CatalogoScreen() {
  const router = useRouter();

  const handleManualPress = (manual: Manual) => {
    router.push(`/modal?id=${manual.id}`);
  };

  return (
    <ManualCard manual={manual} onPress={() => handleManualPress(manual)} />
  );
}
```

### Desde Favoritos

```tsx
import { useRouter } from "expo-router";

function FavoritosScreen() {
  const router = useRouter();

  const handleManualPress = (manual: Manual) => {
    router.push(`/modal?id=${manual.id}`);
  };

  return (
    <ManualCard manual={manual} onPress={() => handleManualPress(manual)} />
  );
}
```

## 📋 Parámetros

### URL

```
/modal?id=1
```

### Obtener Parámetros

```tsx
import { useLocalSearchParams } from "expo-router";

const params = useLocalSearchParams();
const manualId = params.id ? parseInt(params.id as string) : null;
```

### Obtener Manual

```tsx
import { obtenerManualPorId } from "@/constants/Manuales";

const manual = manualId ? obtenerManualPorId(manualId) : null;
```

## 🎨 Componentes del Modal

### 1. Header

```tsx
<View style={{ backgroundColor: colors.card }}>
  {/* Botón de cerrar */}
  <TouchableOpacity onPress={() => router.back()}>
    <FontAwesome name="times" />
  </TouchableOpacity>

  {/* Botón de favorito */}
  <TouchableOpacity onPress={() => toggleFavorito(manual.id)}>
    <FontAwesome name={isFavorito ? "star" : "star-o"} />
  </TouchableOpacity>

  {/* Información del manual */}
  <Text>{manual.titulo}</Text>

  {/* Badges */}
  <View>{/* Marca y Tipo */}</View>
</View>
```

### 2. Visor Simulado

```tsx
<View className="flex-1 items-center justify-center">
  {/* Icono de PDF */}
  <View>
    <FontAwesome name="file-pdf-o" size={48} color={colors.primary} />
  </View>

  {/* Spinner de carga */}
  <ActivityIndicator size="large" color={colors.primary} />

  {/* Mensaje */}
  <Text>Cargando Visor de PDF...</Text>
  <Text>Preparando el documento para visualización</Text>
</View>
```

### 3. Información del Documento

```tsx
<View style={{ backgroundColor: colors.backgroundSecondary }}>
  <View className="flex-row items-center">
    <FontAwesome name="info-circle" />
    <Text>Información del Documento</Text>
  </View>

  <View>
    <Text>Formato: PDF</Text>
    <Text>Tamaño: ~2.5 MB</Text>
    <Text>Páginas: ~15 páginas</Text>
  </View>
</View>
```

### 4. Botón de Descarga

```tsx
<TouchableOpacity style={{ backgroundColor: colors.primary }}>
  <FontAwesome name="download" />
  <Text>Descargar PDF</Text>
</TouchableOpacity>
```

## 💡 Estados

### Manual Encontrado

- Muestra header con información
- Muestra visor simulado
- Muestra botones de acción

### Manual No Encontrado

- Muestra icono de error
- Muestra mensaje "Manual no encontrado"
- No muestra botón de favorito

## 🎨 Colores por Marca

```typescript
const getMarcaColor = (marca: string) => {
  const colores: Record<string, string> = {
    Yale: "#DC2626", // Rojo
    Jet: "#2563EB", // Azul
    Harrington: "#059669", // Verde
  };
  return colores[marca] || colors.primary;
};
```

## 🔄 Integración con Favoritos

```tsx
import { useFavoritos } from "@/contexts/FavoritosContext";

const { toggleFavorito, esFavorito } = useFavoritos();
const isFavorito = manualId ? esFavorito(manualId) : false;

// Botón de favorito
<TouchableOpacity onPress={() => toggleFavorito(manual.id)}>
  <FontAwesome
    name={isFavorito ? "star" : "star-o"}
    color={isFavorito ? "#FFFFFF" : colors.primary}
  />
</TouchableOpacity>;
```

## 📱 Navegación

### Abrir Modal

```tsx
// Desde cualquier pantalla
router.push(`/modal?id=${manual.id}`);
```

### Cerrar Modal

```tsx
// Botón de cerrar
router.back();

// O programáticamente
router.dismiss();
```

## 🎯 Ejemplo Completo

```tsx
import { useRouter } from "expo-router";
import { obtenerTodosManuales } from "@/constants/Manuales";

function MiPantalla() {
  const router = useRouter();
  const manuales = obtenerTodosManuales();

  return (
    <FlatList
      data={manuales}
      renderItem={({ item }) => (
        <ManualCard
          manual={item}
          onPress={() => router.push(`/modal?id=${item.id}`)}
        />
      )}
    />
  );
}
```

## 🔧 Personalización

### Cambiar Mensaje de Carga

```tsx
// En modal.tsx
<Text>Cargando Visor de PDF...</Text>
// Cambiar a:
<Text>Abriendo documento...</Text>
```

### Cambiar Información del Documento

```tsx
// Agregar más campos
<View>
  <Text>Formato: PDF</Text>
  <Text>Tamaño: ~2.5 MB</Text>
  <Text>Páginas: ~15 páginas</Text>
  <Text>Idioma: Español</Text>
  <Text>Versión: 1.0</Text>
</View>
```

### Agregar Visor Real de PDF

```tsx
// Instalar: expo install react-native-pdf
import Pdf from "react-native-pdf";

<Pdf
  source={{ uri: manual.url_falsa_pdf }}
  style={{ flex: 1 }}
  onLoadComplete={(numberOfPages) => {
    console.log(`Páginas: ${numberOfPages}`);
  }}
/>;
```

## 🎨 Animaciones (Opcional)

### Fade In del Contenido

```tsx
import { Animated } from "react-native";

const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  }).start();
}, []);

<Animated.View style={{ opacity: fadeAnim }}>{/* Contenido */}</Animated.View>;
```

### Spinner Rotatorio

```tsx
// ActivityIndicator ya tiene animación por defecto
<ActivityIndicator size="large" color={colors.primary} animating={true} />
```

## 📊 Flujo de Usuario

```
1. Usuario toca tarjeta de manual
   ↓
2. Navega a /modal?id=X
   ↓
3. Modal obtiene ID de parámetros
   ↓
4. Busca manual por ID
   ↓
5. Muestra información y visor simulado
   ↓
6. Usuario puede:
   - Cerrar modal (volver)
   - Agregar/quitar favorito
   - Descargar PDF
```

## 🎯 Mejores Prácticas

1. **Validar ID** - Verificar que el ID existe
2. **Manejar errores** - Mostrar mensaje si no se encuentra
3. **Botón de cerrar** - Siempre visible y accesible
4. **Estado de carga** - Indicar que algo está pasando
5. **Información útil** - Mostrar detalles relevantes

## 🐛 Manejo de Errores

### ID Inválido

```tsx
if (!manualId) {
  return (
    <View>
      <Text>ID de manual inválido</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Manual No Encontrado

```tsx
if (!manual) {
  return (
    <View>
      <FontAwesome name="exclamation-circle" size={64} />
      <Text>Manual no encontrado</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
```

---

## 🎯 Resumen

✅ **Modal Funcional** - Se abre al tocar manual  
✅ **Navegación con Parámetros** - Pasa ID del manual  
✅ **Header Informativo** - Título, marca, tipo  
✅ **Botones de Acción** - Cerrar y favorito  
✅ **Visor Simulado** - Icono + spinner + mensaje  
✅ **Información del Documento** - Formato, tamaño, páginas  
✅ **Tema Dinámico** - Colores adaptativos  
✅ **Manejo de Errores** - Manual no encontrado

¡El modal de detalle está completamente implementado! 📄✨
