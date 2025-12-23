# 🎨 Componente Header - Documentación

## Descripción

Componente de Header atractivo y funcional que incluye:

- **Selector de Tema** (Claro/Oscuro)
- **Barra de Búsqueda** en tiempo real
- **Logo y Título** de la aplicación
- **Animaciones** y estados visuales

## 📁 Ubicación

`components/Header.tsx`

## 🎯 Características

✅ **Búsqueda en Tiempo Real** - Filtra mientras escribes  
✅ **Selector de Tema** - Cambia entre modo claro y oscuro  
✅ **Estados Visuales** - Feedback visual al enfocar la búsqueda  
✅ **Botón de Limpiar** - Limpia la búsqueda con un toque  
✅ **Indicador de Filtro** - Muestra el término de búsqueda actual  
✅ **Diseño Responsive** - Se adapta a diferentes tamaños  
✅ **Tema Dinámico** - Colores adaptativos según el tema

## 🚀 Uso Básico

### Importación

```tsx
import Header from "@/components/Header";
```

### Ejemplo Simple

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import Header from "@/components/Header";

function MiPantalla() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View>
      <Header onSearch={setSearchQuery} />
      {/* Resto del contenido */}
    </View>
  );
}
```

### Ejemplo con Control Externo

```tsx
import React, { useState } from "react";
import { View, FlatList } from "react-native";
import Header from "@/components/Header";
import { buscarManualesPorTitulo } from "@/constants/Manuales";

function CatalogoScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const manualesFiltrados = buscarManualesPorTitulo(searchQuery);

  return (
    <View style={{ flex: 1 }}>
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      <FlatList
        data={manualesFiltrados}
        // ... resto de props
      />
    </View>
  );
}
```

## 📋 Props

| Prop          | Tipo                      | Requerido | Descripción                                           |
| ------------- | ------------------------- | --------- | ----------------------------------------------------- |
| `onSearch`    | `(query: string) => void` | ✅ Sí     | Callback ejecutado cuando cambia el texto de búsqueda |
| `searchQuery` | `string`                  | ❌ No     | Valor de búsqueda controlado externamente             |

## 🎨 Elementos del Header

### 1. Logo y Título

```tsx
// Icono circular con fondo del color primario
<View style={{ backgroundColor: colors.primary }}>
  <FontAwesome name="book" size={20} color="#FFFFFF" />
</View>

// Título y subtítulo
<Text>Manuales</Text>
<Text>Catálogo de equipos</Text>
```

### 2. Selector de Tema

```tsx
// Botón circular que cambia entre sol y luna
<TouchableOpacity onPress={toggleTheme}>
  <FontAwesome name={isDark ? "sun-o" : "moon-o"} color={colors.primary} />
</TouchableOpacity>
```

### 3. Barra de Búsqueda

```tsx
// Input con icono de búsqueda y botón de limpiar
<View>
  <FontAwesome name="search" />
  <TextInput
    placeholder="Buscar manuales..."
    onChangeText={handleSearchChange}
  />
  {searchQuery.length > 0 && (
    <TouchableOpacity onPress={clearSearch}>
      <FontAwesome name="times" />
    </TouchableOpacity>
  )}
</View>
```

### 4. Indicador de Filtro

```tsx
// Muestra el término de búsqueda actual
{
  searchQuery.length > 0 && <Text>Filtrando por: "{searchQuery}"</Text>;
}
```

## 🎭 Estados Visuales

### Estado Normal

- Borde gris claro
- Sombra sutil
- Icono de búsqueda gris

### Estado Enfocado

- Borde del color primario (#FFB800)
- Sombra más pronunciada
- Icono de búsqueda del color primario
- Transición suave

### Con Texto

- Muestra botón de limpiar (X)
- Muestra indicador de filtro
- Icono de búsqueda permanece visible

## 🎨 Personalización de Colores

El Header usa automáticamente los colores del tema:

```typescript
// Colores utilizados
colors.card; // Fondo del header
colors.border; // Borde inferior
colors.shadow; // Sombra
colors.primary; // Color principal (logo, tema, focus)
colors.text; // Texto principal
colors.textSecondary; // Texto secundario
colors.textMuted; // Placeholder y elementos deshabilitados
colors.background; // Fondo del input (modo claro)
colors.backgroundSecondary; // Fondo del input (modo oscuro)
```

## 💡 Ejemplos Avanzados

### Ejemplo 1: Con Filtros Rápidos

```tsx
function CatalogoConFiltros() {
  const [searchQuery, setSearchQuery] = useState("");

  const aplicarFiltroRapido = (filtro: string) => {
    setSearchQuery(filtro);
  };

  return (
    <View>
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />

      {/* Filtros rápidos */}
      <ScrollView horizontal>
        {["Yale", "Jet", "Harrington"].map((marca) => (
          <TouchableOpacity
            key={marca}
            onPress={() => aplicarFiltroRapido(marca)}
          >
            <Text>{marca}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
```

### Ejemplo 2: Con Debounce (Optimización)

```tsx
import { useState, useEffect } from "react";

function CatalogoOptimizado() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce de 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const manuales = buscarManualesPorTitulo(debouncedQuery);

  return (
    <View>
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      <FlatList data={manuales} />
    </View>
  );
}
```

### Ejemplo 3: Con Estadísticas

```tsx
function CatalogoConEstadisticas() {
  const [searchQuery, setSearchQuery] = useState("");
  const manuales = buscarManualesPorTitulo(searchQuery);

  return (
    <View>
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />

      {/* Estadísticas */}
      <View>
        <Text>{manuales.length} resultados encontrados</Text>
      </View>

      <FlatList data={manuales} />
    </View>
  );
}
```

## 🔧 Personalización

### Cambiar el Icono del Logo

```tsx
// En Header.tsx, línea ~50
<FontAwesome name="book" size={20} color="#FFFFFF" />
// Cambiar a:
<FontAwesome name="cog" size={20} color="#FFFFFF" />
```

### Cambiar el Título

```tsx
// En Header.tsx, línea ~55
<Text>Manuales</Text>
<Text>Catálogo de equipos</Text>
// Cambiar a:
<Text>Mi Biblioteca</Text>
<Text>Documentación técnica</Text>
```

### Cambiar el Placeholder

```tsx
// En Header.tsx, línea ~90
placeholder = "Buscar manuales...";
// Cambiar a:
placeholder = "¿Qué estás buscando?";
```

## 📱 Responsive Design

El Header se adapta automáticamente:

- **Padding horizontal**: 16px (4 en Tailwind)
- **Padding vertical**: 12px arriba, 16px abajo
- **Altura del logo**: 40px
- **Altura del botón de tema**: 48px
- **Altura del input**: Auto (padding de 12px)

## 🎯 Mejores Prácticas

1. **Siempre pasar onSearch**: Es requerido para la funcionalidad
2. **Usar searchQuery para control**: Si necesitas controlar el valor externamente
3. **Combinar con useMemo**: Para optimizar el filtrado de listas grandes
4. **Agregar debounce**: Para búsquedas que consultan APIs
5. **Mostrar resultados**: Indicar cuántos resultados se encontraron

## 🐛 Solución de Problemas

### La búsqueda no funciona

```tsx
// ❌ Incorrecto
<Header onSearch={() => {}} />

// ✅ Correcto
<Header onSearch={(query) => setSearchQuery(query)} />
```

### El valor no se actualiza

```tsx
// ❌ Incorrecto - falta searchQuery
<Header onSearch={setSearchQuery} />

// ✅ Correcto - con control externo
<Header onSearch={setSearchQuery} searchQuery={searchQuery} />
```

### El tema no cambia

Asegúrate de que el componente esté dentro del `ThemeProvider`:

```tsx
// En app/_layout.tsx
<ThemeProvider>
  <Stack>
    <Stack.Screen name="(tabs)" />
  </Stack>
</ThemeProvider>
```

## 🎨 Variantes

### Header Compacto

Para crear una versión más compacta, reduce el padding:

```tsx
<View className="px-4 pt-2 pb-3"> {/* En lugar de pt-3 pb-4 */}
```

### Header sin Logo

Elimina la sección del logo y ajusta el layout:

```tsx
<View className="flex-row items-center justify-between mb-4">
  <Text>Manuales</Text>
  <TouchableOpacity onPress={toggleTheme}>
    {/* Botón de tema */}
  </TouchableOpacity>
</View>
```

---

## 📚 Recursos Relacionados

- **ThemeContext**: `contexts/ThemeContext.tsx`
- **Colores**: `constants/Colors.ts`
- **Manuales**: `constants/Manuales.ts`
- **Página de Catálogo**: `app/(tabs)/index.tsx`

---

¡El Header está listo para usar! 🎨✨
