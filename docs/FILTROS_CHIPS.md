# 🎯 Sistema de Filtros con Chips - Documentación

## Descripción

Sistema completo de filtrado con chips (botones pequeños redondeados) que permite filtrar los manuales por:

- **Búsqueda de texto** - En tiempo real
- **Marca** - Yale, Jet, Harrington
- **Tipo de funcionamiento** - Todos, Eléctrico, Manual

## 🎨 Diseño Visual

```
┌─────────────────────────────────────────────┐
│  📚 Manuales                    🌙          │
│  Catálogo de equipos                        │
│                                             │
│  🔍 Buscar manuales...                 ✕   │
│                                             │
│  MARCA                                      │
│  ┌──────┐ ┌──────┐ ┌────────────┐         │
│  │ Yale │ │ Jet  │ │ Harrington │         │
│  └──────┘ └──────┘ └────────────┘         │
│                                             │
│  FUNCIONAMIENTO                             │
│  ┌───────┐ ┌───────────┐ ┌────────┐       │
│  │ Todos │ │⚡Eléctrico│ │🔧Manual │       │
│  └───────┘ └───────────┘ └────────┘       │
│                                             │
│  🔍 Filtros activos: "yale" Yale Eléctrico │
└─────────────────────────────────────────────┘
```

## 📋 Características

### Fila 1: Filtro por Marca

✅ **3 Chips horizontales** - Yale, Jet, Harrington  
✅ **Scroll horizontal** - Si no caben en pantalla  
✅ **Selección única** - Solo una marca a la vez  
✅ **Toggle** - Toca de nuevo para deseleccionar  
✅ **Indicador visual** - Fondo amarillo cuando está seleccionado

### Fila 2: Filtro por Funcionamiento

✅ **3 Chips** - Todos, Eléctrico, Manual  
✅ **Distribución equitativa** - Cada chip ocupa 1/3 del ancho  
✅ **Iconos** - ⚡ para Eléctrico, 🔧 para Manual  
✅ **Selección única** - Solo un tipo a la vez  
✅ **"Todos" por defecto** - Muestra todos los tipos

### Indicador de Filtros Activos

✅ **Muestra filtros aplicados** - Búsqueda, marca y tipo  
✅ **Badges pequeños** - Con fondo amarillo claro  
✅ **Icono de filtro** - Para identificación visual

## 🚀 Uso

### Props del Header

```typescript
interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery?: string;
  onMarcaFilter?: (marca: MarcaManual | null) => void;
  onTipoFilter?: (tipo: TipoManual | null) => void;
  marcaSeleccionada?: MarcaManual | null;
  tipoSeleccionado?: TipoManual | null;
}
```

### Ejemplo Completo

```tsx
import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import {
  obtenerTodosManuales,
  buscarManualesPorTitulo,
} from "@/constants/Manuales";

function CatalogoScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [marcaFiltro, setMarcaFiltro] = useState(null);
  const [tipoFiltro, setTipoFiltro] = useState(null);

  // Filtrado combinado
  const manualesFiltrados = useMemo(() => {
    let manuales = obtenerTodosManuales();

    // Filtro de búsqueda
    if (searchQuery.trim() !== "") {
      manuales = buscarManualesPorTitulo(searchQuery);
    }

    // Filtro de marca
    if (marcaFiltro) {
      manuales = manuales.filter((m) => m.marca === marcaFiltro);
    }

    // Filtro de tipo
    if (tipoFiltro) {
      manuales = manuales.filter((m) => m.tipo === tipoFiltro);
    }

    return manuales;
  }, [searchQuery, marcaFiltro, tipoFiltro]);

  return (
    <View>
      <Header
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        onMarcaFilter={setMarcaFiltro}
        onTipoFilter={setTipoFiltro}
        marcaSeleccionada={marcaFiltro}
        tipoSeleccionado={tipoFiltro}
      />

      <FlatList data={manualesFiltrados} />
    </View>
  );
}
```

## 🎨 Estilos de los Chips

### Chip No Seleccionado

```tsx
{
  backgroundColor: colors.card,      // Fondo blanco/gris
  borderColor: colors.border,        // Borde gris claro
  borderWidth: 2,
}
```

### Chip Seleccionado

```tsx
{
  backgroundColor: colors.primary,   // Fondo amarillo (#FFB800)
  borderColor: colors.primary,       // Borde amarillo
  borderWidth: 2,
}
```

### Texto del Chip

```tsx
// No seleccionado
{
  color: colors.text;
} // Gris oscuro / Blanco

// Seleccionado
{
  color: "#FFFFFF";
} // Blanco
```

## 💡 Comportamiento de los Filtros

### Filtro de Marca

1. **Sin selección**: Muestra todas las marcas
2. **Yale seleccionado**: Solo manuales de Yale
3. **Toca Yale de nuevo**: Deselecciona, vuelve a mostrar todas

### Filtro de Tipo

1. **"Todos" seleccionado**: Muestra Eléctricos y Manuales
2. **"Eléctrico" seleccionado**: Solo manuales eléctricos
3. **"Manual" seleccionado**: Solo manuales manuales
4. **Toca "Todos"**: Vuelve a mostrar todos

### Combinación de Filtros

Los filtros se aplican en cascada:

```
Todos los manuales (30)
    ↓ Búsqueda: "polipasto"
Manuales con "polipasto" (12)
    ↓ Marca: Yale
Polipastos de Yale (4)
    ↓ Tipo: Eléctrico
Polipastos eléctricos de Yale (2)
```

## 📊 Ejemplos de Filtrado

### Ejemplo 1: Solo Marca

```tsx
// Usuario selecciona "Yale"
marcaFiltro = "Yale";
tipoFiltro = null;
searchQuery = "";

// Resultado: 10 manuales de Yale (5 eléctricos + 5 manuales)
```

### Ejemplo 2: Solo Tipo

```tsx
// Usuario selecciona "Eléctrico"
marcaFiltro = null;
tipoFiltro = "Eléctrico";
searchQuery = "";

// Resultado: 15 manuales eléctricos (5 Yale + 5 Jet + 5 Harrington)
```

### Ejemplo 3: Marca + Tipo

```tsx
// Usuario selecciona "Jet" y "Manual"
marcaFiltro = "Jet";
tipoFiltro = "Manual";
searchQuery = "";

// Resultado: 5 manuales manuales de Jet
```

### Ejemplo 4: Búsqueda + Marca + Tipo

```tsx
// Usuario busca "polipasto", selecciona "Yale" y "Eléctrico"
marcaFiltro = "Yale";
tipoFiltro = "Eléctrico";
searchQuery = "polipasto";

// Resultado: Polipastos eléctricos de Yale
```

## 🎯 Limpiar Filtros

### Opción 1: Botón en Estado Vacío

```tsx
<TouchableOpacity
  onPress={() => {
    setSearchQuery("");
    setMarcaFiltro(null);
    setTipoFiltro(null);
  }}
>
  <Text>Limpiar Filtros</Text>
</TouchableOpacity>
```

### Opción 2: Tocar el Chip Seleccionado

```tsx
// Si Yale está seleccionado, tocar Yale de nuevo lo deselecciona
handleMarcaPress("Yale"); // marcaFiltro = null
```

### Opción 3: Seleccionar "Todos"

```tsx
// Tocar "Todos" limpia el filtro de tipo
handleTipoPress("Todos"); // tipoFiltro = null
```

## 🎨 Personalización

### Cambiar Colores de los Chips

```tsx
// En Header.tsx, línea ~200
style={{
  backgroundColor: isSelected ? colors.primary : colors.card,
  borderColor: isSelected ? colors.primary : colors.border,
}}

// Cambiar a otro color:
style={{
  backgroundColor: isSelected ? '#FF6B6B' : colors.card,
  borderColor: isSelected ? '#FF6B6B' : colors.border,
}}
```

### Cambiar Iconos

```tsx
// En Header.tsx, línea ~245
<FontAwesome
  name={tipo === "Eléctrico" ? "bolt" : "wrench"}
  // Cambiar a:
  name={tipo === "Eléctrico" ? "flash" : "cog"}
/>
```

### Agregar Más Marcas

```tsx
// En Header.tsx, línea ~50
const marcas: MarcaManual[] = ["Yale", "Jet", "Harrington", "NuevaMarca"];

// También actualizar en constants/Manuales.ts
export type MarcaManual = "Yale" | "Jet" | "Harrington" | "NuevaMarca";
```

## 📱 Responsive

### Fila de Marcas

- **Scroll horizontal** - Si las marcas no caben
- **Gap de 8px** - Entre chips
- **Padding horizontal** - Para mejor toque

### Fila de Tipos

- **Distribución equitativa** - `flex-1` en cada chip
- **Gap de 8px** - Entre chips
- **Sin scroll** - Siempre caben 3 chips

## 🔍 Indicador de Filtros Activos

### Cuándo se Muestra

```tsx
{
  (searchQuery.length > 0 || marcaSeleccionada || tipoSeleccionado) && (
    <View>{/* Indicador */}</View>
  );
}
```

### Qué Muestra

1. **Icono de filtro** - Para identificación
2. **Texto "Filtros activos:"**
3. **Badges** - Uno por cada filtro activo
   - Búsqueda: `"texto buscado"`
   - Marca: `Yale`, `Jet`, o `Harrington`
   - Tipo: `Eléctrico` o `Manual`

## 🎯 Mejores Prácticas

1. **Usar useMemo** - Para optimizar el filtrado
2. **Combinar filtros** - Aplicar en cascada
3. **Mostrar resultados** - Indicar cuántos manuales se encontraron
4. **Estado vacío** - Mostrar mensaje cuando no hay resultados
5. **Botón de limpiar** - Facilitar el reseteo de filtros

## 📊 Estadísticas

Con los filtros, puedes mostrar estadísticas dinámicas:

```tsx
const stats = {
  total: manualesFiltrados.length,
  electricos: manualesFiltrados.filter((m) => m.tipo === "Eléctrico").length,
  manuales: manualesFiltrados.filter((m) => m.tipo === "Manual").length,
};
```

## 🎨 Animaciones (Opcional)

Para agregar animaciones a los chips:

```tsx
import { Animated } from "react-native";

const scaleAnim = useRef(new Animated.Value(1)).current;

const animatePress = () => {
  Animated.sequence([
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start();
};
```

---

## 🎯 Resumen

✅ **2 Filas de Chips** - Marca y Funcionamiento  
✅ **Filtrado Combinado** - Búsqueda + Marca + Tipo  
✅ **Indicadores Visuales** - Chips seleccionados y filtros activos  
✅ **Optimizado** - Con useMemo para performance  
✅ **Responsive** - Se adapta a diferentes tamaños  
✅ **Tema Dinámico** - Colores adaptativos

¡El sistema de filtros está completo y listo para usar! 🎯✨
