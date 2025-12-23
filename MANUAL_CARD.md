# 🎴 Componente ManualCard - Documentación

## Descripción

Tarjeta de manual con diseño profesional y atractivo que muestra:

- **Logo de marca** a la izquierda (emoji distintivo)
- **Nombre del manual** en negrita al centro
- **Icono de tipo** a la derecha (⚡ rayo para eléctrico, ✋ mano para manual)
- **Barra inferior** con tipo y botón de descarga

## 🎨 Diseño Visual

```
┌─────────────────────────────────────────┐
│  🏭    Polipasto Eléctrico Yale    ⚡  │
│      CPV 1 Ton                          │
│      ┌──────┐                           │
│      │ Yale │                           │
│      └──────┘                           │
├─────────────────────────────────────────┤
│  ⚡ Eléctrico        [Descargar 📥]    │
└─────────────────────────────────────────┘
```

## 📋 Características

### Sección Superior

✅ **Logo de marca** - Emoji grande en contenedor con color de marca  
✅ **Nombre del manual** - Texto en negrita, máximo 2 líneas  
✅ **Badge de marca** - Chip con color distintivo  
✅ **Icono de tipo** - Círculo con icono de rayo o mano

### Sección Inferior

✅ **Tipo de manual** - Con icono pequeño  
✅ **Botón de descarga** - Botón amarillo con icono

## 🎨 Colores por Marca

### Yale

- **Color**: Rojo (#DC2626)
- **Emoji**: 🏭 (Fábrica)
- **Fondo**: Rojo claro (#DC262615)

### Jet

- **Color**: Azul (#2563EB)
- **Emoji**: ✈️ (Avión)
- **Fondo**: Azul claro (#2563EB15)

### Harrington

- **Color**: Verde (#059669)
- **Emoji**: ⚙️ (Engranaje)
- **Fondo**: Verde claro (#05966915)

## 🎯 Colores por Tipo

### Eléctrico

- **Icono**: ⚡ (bolt)
- **Color**: Amarillo/Naranja (#F59E0B)
- **Fondo**: Amarillo claro (#FCD34D20)

### Manual

- **Icono**: ✋ (hand-paper-o)
- **Color**: Morado (#8B5CF6)
- **Fondo**: Morado claro (#A78BFA20)

## 🚀 Uso

### Importación

```tsx
import ManualCard from "@/components/ManualCard";
import { type Manual } from "@/constants/Manuales";
```

### Ejemplo Básico

```tsx
import ManualCard from "@/components/ManualCard";

function MiPantalla() {
  const manual = {
    id: 1,
    titulo: "Polipasto Eléctrico Yale CPV 1 Ton",
    marca: "Yale",
    tipo: "Eléctrico",
    url_falsa_pdf: "https://example.com/manual.pdf",
  };

  return (
    <ManualCard
      manual={manual}
      onPress={() => console.log("Manual seleccionado")}
    />
  );
}
```

### Ejemplo en Lista

```tsx
import { FlatList } from "react-native";
import ManualCard from "@/components/ManualCard";
import { obtenerTodosManuales } from "@/constants/Manuales";

function ListaManuales() {
  const manuales = obtenerTodosManuales();

  return (
    <FlatList
      data={manuales}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ManualCard manual={item} onPress={() => navegarADetalle(item)} />
      )}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}
```

## 📋 Props

| Prop      | Tipo         | Requerido | Descripción                     |
| --------- | ------------ | --------- | ------------------------------- |
| `manual`  | `Manual`     | ✅ Sí     | Objeto con los datos del manual |
| `onPress` | `() => void` | ❌ No     | Callback al tocar la tarjeta    |

### Tipo Manual

```typescript
interface Manual {
  id: number;
  titulo: string;
  marca: "Yale" | "Jet" | "Harrington";
  tipo: "Eléctrico" | "Manual";
  url_falsa_pdf: string;
}
```

## 🎨 Estructura de la Tarjeta

### Contenedor Principal

```tsx
<TouchableOpacity
  style={{
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    shadowColor: colors.shadow,
  }}
  className="mb-3 rounded-2xl border shadow-md"
>
```

### Logo de Marca

```tsx
<View
  style={{ backgroundColor: `${marcaColor}15` }}
  className="w-16 h-16 rounded-xl items-center justify-center"
>
  <Text className="text-3xl">{emoji}</Text>
</View>
```

### Nombre del Manual

```tsx
<Text
  style={{ color: colors.text }}
  className="text-base font-bold mb-1"
  numberOfLines={2}
>
  {manual.titulo}
</Text>
```

### Badge de Marca

```tsx
<View
  style={{ backgroundColor: marcaColor }}
  className="px-3 py-1 rounded-full"
>
  <Text className="text-white text-xs font-bold">{manual.marca}</Text>
</View>
```

### Icono de Tipo

```tsx
<View
  style={{
    backgroundColor: manual.tipo === "Eléctrico" ? "#FCD34D20" : "#A78BFA20",
  }}
  className="w-12 h-12 rounded-full items-center justify-center"
>
  <FontAwesome
    name={manual.tipo === "Eléctrico" ? "bolt" : "hand-paper-o"}
    size={20}
    color={manual.tipo === "Eléctrico" ? "#F59E0B" : "#8B5CF6"}
  />
</View>
```

### Barra Inferior

```tsx
<View
  style={{ backgroundColor: colors.backgroundSecondary }}
  className="px-4 py-3 flex-row items-center justify-between"
>
  {/* Tipo */}
  <View className="flex-row items-center">
    <FontAwesome name="bolt" size={12} />
    <Text>{manual.tipo}</Text>
  </View>

  {/* Botón de descarga */}
  <TouchableOpacity
    style={{ backgroundColor: colors.primary }}
    className="flex-row items-center px-4 py-2 rounded-full"
  >
    <FontAwesome name="download" size={12} color="#FFFFFF" />
    <Text className="text-white text-xs font-bold">Descargar</Text>
  </TouchableOpacity>
</View>
```

## 💡 Personalización

### Cambiar Emojis de Marca

```tsx
// En ManualCard.tsx, línea ~30
const getMarcaLogo = (marca: string) => {
  const logos: Record<string, string> = {
    Yale: "🏭", // Cambiar a '🔧' o cualquier otro
    Jet: "✈️",
    Harrington: "⚙️",
  };
  return logos[marca] || "📦";
};
```

### Cambiar Colores de Marca

```tsx
// En ManualCard.tsx, línea ~40
const getMarcaColor = (marca: string) => {
  const colores: Record<string, string> = {
    Yale: "#DC2626", // Cambiar a '#FF0000'
    Jet: "#2563EB",
    Harrington: "#059669",
  };
  return colores[marca] || colors.primary;
};
```

### Cambiar Iconos de Tipo

```tsx
// En ManualCard.tsx, línea ~85
<FontAwesome
  name={manual.tipo === "Eléctrico" ? "bolt" : "hand-paper-o"}
  // Cambiar a:
  name={manual.tipo === "Eléctrico" ? "flash" : "wrench"}
/>
```

## 🎯 Acciones

### Navegación a Detalle

```tsx
const handleManualPress = (manual: Manual) => {
  // Navegar a pantalla de detalles
  navigation.navigate("DetalleManual", { manualId: manual.id });
};

<ManualCard manual={manual} onPress={() => handleManualPress(manual)} />;
```

### Descargar PDF

```tsx
import { Linking } from "react-native";

const descargarPDF = (url: string) => {
  Linking.openURL(url);
};

// En ManualCard.tsx, modificar el botón de descarga:
<TouchableOpacity
  onPress={() => descargarPDF(manual.url_falsa_pdf)}
  style={{ backgroundColor: colors.primary }}
>
  <Text>Descargar</Text>
</TouchableOpacity>;
```

### Agregar a Favoritos

```tsx
const [favoritos, setFavoritos] = useState<number[]>([]);

const toggleFavorito = (id: number) => {
  setFavoritos((prev) =>
    prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
  );
};

// Agregar botón de favorito a la tarjeta
<TouchableOpacity onPress={() => toggleFavorito(manual.id)}>
  <FontAwesome
    name={favoritos.includes(manual.id) ? "heart" : "heart-o"}
    color={colors.primary}
  />
</TouchableOpacity>;
```

## 📱 Responsive

La tarjeta se adapta automáticamente:

- **Ancho**: 100% del contenedor
- **Altura**: Auto (según contenido)
- **Padding**: 16px interno
- **Margen**: 12px inferior
- **Bordes**: Redondeados (16px)

## 🎨 Tema Dinámico

La tarjeta usa colores del tema:

- `colors.card` - Fondo de la tarjeta
- `colors.cardBorder` - Borde
- `colors.shadow` - Sombra
- `colors.text` - Texto principal
- `colors.textSecondary` - Texto secundario
- `colors.backgroundSecondary` - Barra inferior
- `colors.primary` - Botón de descarga

## 🔍 Variantes

### Tarjeta Compacta

```tsx
// Reducir padding y tamaño de logo
<View className="flex-row items-center p-2">
  <View className="w-12 h-12 rounded-lg">
    <Text className="text-2xl">{emoji}</Text>
  </View>
</View>
```

### Tarjeta Expandida

```tsx
// Agregar más información
<View>
  <Text>{manual.titulo}</Text>
  <Text>ID: {manual.id}</Text>
  <Text>URL: {manual.url_falsa_pdf}</Text>
</View>
```

---

## 🎯 Resumen

✅ **Diseño Profesional** - Logo, nombre e icono bien organizados  
✅ **Colores Distintivos** - Por marca y tipo  
✅ **Interactivo** - Toque para ver detalles  
✅ **Botón de Descarga** - Acción rápida  
✅ **Tema Dinámico** - Se adapta al modo claro/oscuro  
✅ **Responsive** - Se ajusta al contenedor

¡La tarjeta de manual está lista para usar! 🎴✨
