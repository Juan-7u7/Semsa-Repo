# Sistema de Temas - Documentación

## 📋 Descripción

Este proyecto implementa un sistema de temas completo con soporte para modo claro y oscuro, utilizando React Context API.

## 🎨 Configuración de Colores

### Color Primario

- **Primary**: `#FFB800` (Amarillo/Dorado)
- **Primary Dark**: `#E6A600`
- **Primary Light**: `#FFC933`

### Fondos

- **Light Mode**: `#FFFFFF` (Blanco)
- **Dark Mode**: `#121212` (Negro profundo)

### Colores Completos

```typescript
// Tema Claro
{
  primary: '#FFB800',
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  text: '#1F2937',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  card: '#FFFFFF',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
}

// Tema Oscuro
{
  primary: '#FFB800',
  background: '#121212',
  backgroundSecondary: '#1E1E1E',
  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textMuted: '#9CA3AF',
  border: '#374151',
  card: '#1E1E1E',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
}
```

## 📁 Estructura de Archivos

```
├── constants/
│   └── Colors.ts              # Definición de colores
├── contexts/
│   └── ThemeContext.tsx       # Context y hooks del tema
├── components/
│   └── ThemeExample.tsx       # Componente de ejemplo
└── app/
    └── _layout.tsx            # Integración del ThemeProvider
```

## 🚀 Uso del Sistema de Temas

### 1. Hook `useTheme()`

El hook principal para acceder al tema:

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function MiComponente() {
  const { colors, isDark, toggleTheme, setTheme, colorScheme } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>
        Tema actual: {isDark ? "Oscuro" : "Claro"}
      </Text>
      <Button onPress={toggleTheme} title="Cambiar Tema" />
    </View>
  );
}
```

### 2. Hook `useThemeColors()`

Hook simplificado para obtener solo los colores:

```tsx
import { useThemeColors } from "@/contexts/ThemeContext";

function MiComponente() {
  const colors = useThemeColors();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hola Mundo</Text>
    </View>
  );
}
```

## 🎯 Ejemplos de Uso

### Ejemplo 1: Botón con Color Primario

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function BotonPrimario() {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{ backgroundColor: colors.primary }}
      className="rounded-lg py-3 px-6"
    >
      <Text className="text-white text-center font-semibold">
        Botón Primario
      </Text>
    </TouchableOpacity>
  );
}
```

### Ejemplo 2: Tarjeta Adaptativa

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function Tarjeta() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderColor: colors.cardBorder,
        shadowColor: colors.shadow,
      }}
      className="rounded-xl p-4 border shadow-sm"
    >
      <Text style={{ color: colors.text }} className="text-lg font-bold mb-2">
        Título de la Tarjeta
      </Text>
      <Text style={{ color: colors.textSecondary }}>
        Descripción de la tarjeta
      </Text>
    </View>
  );
}
```

### Ejemplo 3: Botón de Cambio de Tema

```tsx
import { useTheme } from "@/contexts/ThemeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function BotonCambiarTema() {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
      }}
      className="p-3 rounded-full border"
    >
      <FontAwesome
        name={isDark ? "sun-o" : "moon-o"}
        size={24}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
}
```

### Ejemplo 4: Badge de Categoría

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function Badge({ text }: { text: string }) {
  const { colors } = useTheme();

  return (
    <View
      style={{ backgroundColor: `${colors.primary}20` }}
      className="self-start px-2 py-1 rounded-md"
    >
      <Text style={{ color: colors.primary }} className="text-xs font-semibold">
        {text}
      </Text>
    </View>
  );
}
```

## 🔧 Integración con Tailwind CSS

Los colores personalizados están integrados en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#FFB800',
        dark: '#E6A600',
        light: '#FFC933',
      },
      background: {
        light: '#FFFFFF',
        dark: '#121212',
      },
    },
  },
}
```

Uso en componentes:

```tsx
// Color primario
<View className="bg-primary">

// Color primario oscuro
<View className="bg-primary-dark">

// Color primario claro
<View className="bg-primary-light">
```

## 📱 Funcionalidades del ThemeContext

### Propiedades Disponibles

| Propiedad     | Tipo                | Descripción                           |
| ------------- | ------------------- | ------------------------------------- |
| `colorScheme` | `'light' \| 'dark'` | Esquema de color actual               |
| `colors`      | `ThemeColors`       | Objeto con todos los colores del tema |
| `isDark`      | `boolean`           | `true` si el tema es oscuro           |
| `toggleTheme` | `() => void`        | Alterna entre tema claro y oscuro     |
| `setTheme`    | `(scheme) => void`  | Establece un tema específico          |

### Métodos

```tsx
const { toggleTheme, setTheme } = useTheme();

// Alternar tema
toggleTheme();

// Establecer tema específico
setTheme("dark"); // Cambiar a oscuro
setTheme("light"); // Cambiar a claro
```

## 🎨 Paleta de Colores de Estado

```tsx
const { colors } = useTheme();

// Success (Verde)
<View style={{ backgroundColor: colors.success }}>

// Error (Rojo)
<View style={{ backgroundColor: colors.error }}>

// Warning (Naranja)
<View style={{ backgroundColor: colors.warning }}>

// Info (Azul)
<View style={{ backgroundColor: colors.info }}>
```

## 💡 Mejores Prácticas

### 1. Siempre usa el hook useTheme

```tsx
// ✅ Correcto
const { colors } = useTheme();
<View style={{ backgroundColor: colors.background }}>

// ❌ Incorrecto
<View style={{ backgroundColor: '#FFFFFF' }}>
```

### 2. Combina estilos inline con Tailwind

```tsx
const { colors } = useTheme();

<View
  style={{ backgroundColor: colors.card }}
  className="rounded-xl p-4 shadow-sm"
>
```

### 3. Usa transparencias con template strings

```tsx
const { colors } = useTheme();

// 20% de opacidad
<View style={{ backgroundColor: `${colors.primary}20` }}>

// 50% de opacidad
<View style={{ backgroundColor: `${colors.primary}80` }}>
```

### 4. Mantén la consistencia

```tsx
// ✅ Usa colors.text para texto principal
<Text style={{ color: colors.text }}>

// ✅ Usa colors.textSecondary para texto secundario
<Text style={{ color: colors.textSecondary }}>

// ✅ Usa colors.textMuted para texto deshabilitado
<Text style={{ color: colors.textMuted }}>
```

## 🔄 Sincronización con el Sistema

El tema se sincroniza automáticamente con el tema del dispositivo:

```tsx
// En ThemeContext.tsx
const deviceColorScheme = useDeviceColorScheme();

useEffect(() => {
  if (deviceColorScheme) {
    setColorScheme(deviceColorScheme);
  }
}, [deviceColorScheme]);
```

## 📦 Exportaciones

```tsx
// Desde constants/Colors.ts
export { Colors, ColorScheme, ThemeColors };

// Desde contexts/ThemeContext.tsx
export { ThemeProvider, useTheme, useThemeColors };
```

## 🎯 Casos de Uso Comunes

### Pantalla Completa

```tsx
function MiPantalla() {
  const { colors } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="p-4">{/* Contenido */}</View>
    </ScrollView>
  );
}
```

### Modal

```tsx
function MiModal() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
      }}
      className="rounded-t-3xl p-6 border-t"
    >
      {/* Contenido del modal */}
    </View>
  );
}
```

### Input de Texto

```tsx
function MiInput() {
  const { colors } = useTheme();

  return (
    <TextInput
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
        color: colors.text,
      }}
      className="rounded-lg px-4 py-3 border"
      placeholderTextColor={colors.textMuted}
      placeholder="Escribe algo..."
    />
  );
}
```

---

## 🚀 Próximos Pasos

1. **Persistencia**: Guardar la preferencia del tema en AsyncStorage
2. **Animaciones**: Agregar transiciones suaves al cambiar de tema
3. **Temas Personalizados**: Permitir múltiples temas (no solo claro/oscuro)
4. **Accesibilidad**: Agregar soporte para alto contraste

---

¡El sistema de temas está listo para usar! 🎨✨
