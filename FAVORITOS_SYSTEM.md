# ⭐ Sistema de Favoritos - Documentación

## Descripción

Sistema completo de favoritos que permite a los usuarios guardar y gestionar sus manuales preferidos. Los favoritos se comparten entre las pestañas de **Catálogo** y **Favoritos** usando React Context.

## 🎯 Características

✅ **Botón de Estrella** - En cada tarjeta de manual  
✅ **Estado Compartido** - Context API para sincronización  
✅ **Toggle Rápido** - Agregar/eliminar con un toque  
✅ **Badge en Tab** - Muestra cantidad de favoritos  
✅ **Estadísticas** - Desglose por tipo y marca  
✅ **Estado Vacío** - Mensaje cuando no hay favoritos  
✅ **Persistencia** - Los favoritos se mantienen en la sesión

## 📁 Archivos Creados/Actualizados

### 1. **`contexts/FavoritosContext.tsx`** ✨ NUEVO

Context de React para gestionar favoritos:

- `FavoritosProvider` - Provider del contexto
- `useFavoritos()` - Hook para acceder al estado
- Funciones: `agregarFavorito`, `eliminarFavorito`, `toggleFavorito`, `esFavorito`

### 2. **`app/_layout.tsx`** 🔄 ACTUALIZADO

- Agregado `FavoritosProvider` al árbol de providers
- Envuelve toda la aplicación para compartir estado

### 3. **`components/ManualCard.tsx`** 🔄 ACTUALIZADO

- Botón de estrella en esquina superior derecha
- Usa `useFavoritos()` para estado
- Estrella llena (⭐) cuando es favorito
- Estrella vacía (☆) cuando no es favorito

### 4. **`app/(tabs)/index.tsx`** - Catálogo

- Usa ManualCard con funcionalidad de favoritos
- Los favoritos se sincronizan automáticamente

### 5. **`app/(tabs)/two.tsx`** 🔄 ACTUALIZADO

- Usa `useFavoritos()` para obtener lista
- Muestra solo manuales favoritos
- Estado vacío mejorado con instrucciones

### 6. **`app/(tabs)/_layout.tsx`** 🔄 ACTUALIZADO

- Badge con cantidad de favoritos en la pestaña
- Icono cambiado a estrella (⭐)

## 🎨 Diseño Visual

### Botón de Favorito en Tarjeta

```
┌─────────────────────────────────────┐
│                              ⭐     │
│  🏭  Polipasto Eléctrico      ⚡   │
│      Yale CPV 1 Ton                │
│      ┌──────┐                      │
│      │ Yale │                      │
│      └──────┘                      │
├─────────────────────────────────────┤
│  ⚡ Eléctrico    [Descargar 📥]    │
└─────────────────────────────────────┘
```

### Badge en Pestaña

```
┌──────────┬──────────┐
│ Catálogo │ ⭐ (3)   │
└──────────┴──────────┘
```

## 🚀 Uso del Context

### Importar el Hook

```tsx
import { useFavoritos } from "@/contexts/FavoritosContext";
```

### Ejemplo Básico

```tsx
function MiComponente() {
  const {
    favoritos, // Array de IDs favoritos
    toggleFavorito, // Función para agregar/eliminar
    esFavorito, // Función para verificar
    cantidadFavoritos, // Número total de favoritos
  } = useFavoritos();

  return (
    <View>
      <Text>Total de favoritos: {cantidadFavoritos}</Text>
    </View>
  );
}
```

## 📋 API del Context

### Estado

```typescript
interface FavoritosContextType {
  favoritos: number[]; // Array de IDs de manuales favoritos
  agregarFavorito: (id: number) => void;
  eliminarFavorito: (id: number) => void;
  toggleFavorito: (id: number) => void;
  esFavorito: (id: number) => boolean;
  cantidadFavoritos: number; // Cantidad total de favoritos
}
```

### Funciones

#### `agregarFavorito(id: number)`

Agrega un manual a favoritos.

```tsx
const { agregarFavorito } = useFavoritos();

// Agregar manual con ID 1
agregarFavorito(1);
```

#### `eliminarFavorito(id: number)`

Elimina un manual de favoritos.

```tsx
const { eliminarFavorito } = useFavoritos();

// Eliminar manual con ID 1
eliminarFavorito(1);
```

#### `toggleFavorito(id: number)`

Alterna el estado de favorito (agrega si no existe, elimina si existe).

```tsx
const { toggleFavorito } = useFavoritos();

// Toggle favorito del manual con ID 1
toggleFavorito(1);
```

#### `esFavorito(id: number): boolean`

Verifica si un manual es favorito.

```tsx
const { esFavorito } = useFavoritos();

// Verificar si el manual 1 es favorito
const isFav = esFavorito(1); // true o false
```

## 💡 Ejemplos de Uso

### Ejemplo 1: Botón de Favorito Simple

```tsx
import { useFavoritos } from "@/contexts/FavoritosContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function FavoritoButton({ manualId }: { manualId: number }) {
  const { toggleFavorito, esFavorito } = useFavoritos();
  const isFavorito = esFavorito(manualId);

  return (
    <TouchableOpacity onPress={() => toggleFavorito(manualId)}>
      <FontAwesome
        name={isFavorito ? "star" : "star-o"}
        size={24}
        color="#FFB800"
      />
    </TouchableOpacity>
  );
}
```

### Ejemplo 2: Lista de Favoritos

```tsx
import { useFavoritos } from "@/contexts/FavoritosContext";
import { obtenerTodosManuales } from "@/constants/Manuales";

function ListaFavoritos() {
  const { favoritos } = useFavoritos();
  const todosManuales = obtenerTodosManuales();

  // Filtrar solo los favoritos
  const manualesFavoritos = todosManuales.filter((manual) =>
    favoritos.includes(manual.id)
  );

  return (
    <FlatList
      data={manualesFavoritos}
      renderItem={({ item }) => <ManualCard manual={item} />}
    />
  );
}
```

### Ejemplo 3: Contador de Favoritos

```tsx
import { useFavoritos } from "@/contexts/FavoritosContext";

function ContadorFavoritos() {
  const { cantidadFavoritos } = useFavoritos();

  return (
    <View>
      <Text>Tienes {cantidadFavoritos} favoritos</Text>
    </View>
  );
}
```

### Ejemplo 4: Estadísticas de Favoritos

```tsx
import { useFavoritos } from "@/contexts/FavoritosContext";
import { obtenerTodosManuales } from "@/constants/Manuales";

function EstadisticasFavoritos() {
  const { favoritos } = useFavoritos();
  const todosManuales = obtenerTodosManuales();

  const manualesFavoritos = todosManuales.filter((m) =>
    favoritos.includes(m.id)
  );

  const stats = {
    total: manualesFavoritos.length,
    electricos: manualesFavoritos.filter((m) => m.tipo === "Eléctrico").length,
    manuales: manualesFavoritos.filter((m) => m.tipo === "Manual").length,
  };

  return (
    <View>
      <Text>Total: {stats.total}</Text>
      <Text>Eléctricos: {stats.electricos}</Text>
      <Text>Manuales: {stats.manuales}</Text>
    </View>
  );
}
```

## 🎨 Diseño del Botón de Favorito

### Estados Visuales

#### No Favorito

```tsx
{
  backgroundColor: colors.card,      // Fondo blanco/gris
  borderColor: colors.primary,       // Borde amarillo
  borderWidth: 2,
}
// Icono: 'star-o' (estrella vacía)
// Color icono: colors.primary (#FFB800)
```

#### Favorito

```tsx
{
  backgroundColor: colors.primary,   // Fondo amarillo
  borderColor: colors.primary,       // Borde amarillo
  borderWidth: 2,
}
// Icono: 'star' (estrella llena)
// Color icono: '#FFFFFF' (blanco)
```

### Posición

```tsx
{
  position: 'absolute',
  top: 8,
  right: 8,
  zIndex: 10,
}
```

## 🔄 Flujo de Datos

```
Usuario toca estrella
    ↓
toggleFavorito(id)
    ↓
FavoritosContext actualiza estado
    ↓
Todos los componentes que usan useFavoritos() se re-renderizan
    ↓
- ManualCard muestra estrella llena/vacía
- Badge en tab se actualiza
- Lista de favoritos se actualiza
```

## 📊 Integración con Tabs

### Badge Automático

```tsx
<Tabs.Screen
  name="two"
  options={{
    title: "Favoritos",
    tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
    tabBarBadge: cantidadFavoritos > 0 ? cantidadFavoritos : undefined,
  }}
/>
```

- **Muestra**: Número de favoritos
- **Oculta**: Cuando `cantidadFavoritos === 0`
- **Color**: Automático según el tema de navegación

## 🎯 Mejores Prácticas

1. **Usar useMemo** - Para filtrar listas de favoritos
2. **Prevenir propagación** - `e.stopPropagation()` en el botón de estrella
3. **Feedback visual** - Cambiar icono inmediatamente
4. **Estado vacío** - Mostrar mensaje cuando no hay favoritos
5. **Estadísticas** - Mostrar desglose por tipo/marca

## 🔧 Personalización

### Cambiar Icono

```tsx
// En ManualCard.tsx
<FontAwesome
  name={isFavorito ? "heart" : "heart-o"} // Cambiar a corazón
  size={18}
  color={isFavorito ? "#FFFFFF" : colors.primary}
/>
```

### Cambiar Colores

```tsx
// Favorito activo
style={{
  backgroundColor: '#FF0000',  // Rojo en lugar de amarillo
  borderColor: '#FF0000',
}}
```

### Agregar Animación

```tsx
import { Animated } from "react-native";

const scaleAnim = useRef(new Animated.Value(1)).current;

const handleToggle = () => {
  Animated.sequence([
    Animated.timing(scaleAnim, {
      toValue: 1.3,
      duration: 150,
      useNativeDriver: true,
    }),
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }),
  ]).start();

  toggleFavorito(manual.id);
};
```

## 💾 Persistencia (Futuro)

Para guardar favoritos permanentemente:

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";

// Guardar
const guardarFavoritos = async (favoritos: number[]) => {
  await AsyncStorage.setItem("favoritos", JSON.stringify(favoritos));
};

// Cargar
const cargarFavoritos = async () => {
  const data = await AsyncStorage.getItem("favoritos");
  return data ? JSON.parse(data) : [];
};

// En FavoritosProvider
useEffect(() => {
  cargarFavoritos().then(setFavoritos);
}, []);

useEffect(() => {
  guardarFavoritos(favoritos);
}, [favoritos]);
```

---

## 🎯 Resumen

✅ **Context API** - Estado compartido entre pestañas  
✅ **Botón de Estrella** - En cada tarjeta de manual  
✅ **Toggle Rápido** - Agregar/eliminar con un toque  
✅ **Badge en Tab** - Muestra cantidad de favoritos  
✅ **Estadísticas** - Desglose por tipo y marca  
✅ **Estado Vacío** - Mensaje instructivo  
✅ **Sincronización** - Actualización automática en todas las vistas

¡El sistema de favoritos está completamente implementado y listo para usar! ⭐✨
