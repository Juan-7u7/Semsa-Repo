# 🎨 Sistema de Temas - Resumen Rápido

## Configuración de Colores

### ✨ Color Primario

```
#FFB800 (Amarillo/Dorado)
```

### 🌞 Tema Claro

```
Background: #FFFFFF
```

### 🌙 Tema Oscuro

```
Background: #121212
```

## 📦 Archivos Creados

1. **`constants/Colors.ts`** - Configuración de colores
2. **`contexts/ThemeContext.tsx`** - Context y hooks del tema
3. **`components/ThemeExample.tsx`** - Componente de ejemplo

## 🚀 Uso Básico

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function MiComponente() {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>
        Tema: {isDark ? "Oscuro" : "Claro"}
      </Text>
      <Button onPress={toggleTheme} title="Cambiar Tema" />
    </View>
  );
}
```

## 🎯 Características

✅ **Context API** - Sistema de temas con React Context  
✅ **Colores Personalizados** - Primary: #FFB800  
✅ **Auto-sincronización** - Se sincroniza con el tema del dispositivo  
✅ **TypeScript** - Completamente tipado  
✅ **Tailwind Integration** - Colores integrados en Tailwind  
✅ **Hooks Personalizados** - `useTheme()` y `useThemeColors()`

## 📚 Documentación Completa

Ver **`THEME_SYSTEM.md`** para documentación detallada con ejemplos y mejores prácticas.

## 🎨 Colores Disponibles

| Color      | Light   | Dark    |
| ---------- | ------- | ------- |
| Primary    | #FFB800 | #FFB800 |
| Background | #FFFFFF | #121212 |
| Text       | #1F2937 | #F9FAFB |
| Card       | #FFFFFF | #1E1E1E |
| Success    | #10B981 | #10B981 |
| Error      | #EF4444 | #EF4444 |

---

**Implementado por:** Sistema de Temas Personalizado  
**Fecha:** Diciembre 2025
