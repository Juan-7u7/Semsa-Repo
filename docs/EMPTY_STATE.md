# 😢 Componente EmptyState - Documentación

## Descripción

Componente reutilizable para mostrar un estado vacío cuando no hay resultados. Incluye:

- **Icono triste** (😢) grande y centrado
- **Título** personalizable
- **Mensaje** descriptivo
- **Sugerencias** útiles para el usuario
- **Botón** para limpiar filtros

## 🎨 Diseño Visual

```
┌─────────────────────────────────────┐
│                                     │
│           😢                        │
│      (icono triste)                 │
│                                     │
│  No se encontraron resultados       │
│                                     │
│  Intenta ajustar los filtros o      │
│  la búsqueda para encontrar lo      │
│  que necesitas                      │
│                                     │
│  ┌─────────────────────────┐       │
│  │ 💡 Sugerencias:          │       │
│  │ • Verifica la ortografía │       │
│  │ • Términos más generales │       │
│  │ • Diferentes filtros     │       │
│  │ • Limpia los filtros     │       │
│  └─────────────────────────┘       │
│                                     │
│      [🔄 Limpiar Filtros]          │
│                                     │
│  Esto eliminará todos los filtros   │
│  y búsquedas activas                │
│                                     │
└─────────────────────────────────────┘
```

## 🎯 Características

✅ **Icono Personalizable** - Por defecto muestra cara triste  
✅ **Título Personalizable** - Mensaje principal  
✅ **Mensaje Personalizable** - Descripción secundaria  
✅ **Sugerencias Útiles** - 4 consejos para el usuario  
✅ **Botón de Limpiar** - Opcional, con callback  
✅ **Tema Dinámico** - Colores adaptativos  
✅ **Responsive** - Se adapta al contenedor

## 📁 Archivo

**`components/EmptyState.tsx`** - Componente reutilizable

## 🚀 Uso Básico

### Importación

```tsx
import EmptyState from "@/components/EmptyState";
```

### Ejemplo Simple

```tsx
function MiPantalla() {
  return (
    <EmptyState
      onClearFilters={() => {
        setSearchQuery("");
        setMarcaFiltro(null);
        setTipoFiltro(null);
      }}
      showClearButton={true}
    />
  );
}
```

### Ejemplo con Condición

```tsx
function CatalogoScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [marcaFiltro, setMarcaFiltro] = useState(null);
  const [tipoFiltro, setTipoFiltro] = useState(null);

  const handleClearFilters = () => {
    setSearchQuery("");
    setMarcaFiltro(null);
    setTipoFiltro(null);
  };

  const hayFiltrosActivos =
    searchQuery !== "" || marcaFiltro !== null || tipoFiltro !== null;

  return (
    <FlatList
      data={manualesFiltrados}
      ListEmptyComponent={() => (
        <EmptyState
          onClearFilters={handleClearFilters}
          showClearButton={hayFiltrosActivos}
        />
      )}
    />
  );
}
```

## 📋 Props

| Prop              | Tipo         | Requerido | Default                          | Descripción                             |
| ----------------- | ------------ | --------- | -------------------------------- | --------------------------------------- |
| `onClearFilters`  | `() => void` | ❌ No     | -                                | Callback al presionar "Limpiar Filtros" |
| `showClearButton` | `boolean`    | ❌ No     | `true`                           | Mostrar botón de limpiar filtros        |
| `title`           | `string`     | ❌ No     | `"No se encontraron resultados"` | Título principal                        |
| `message`         | `string`     | ❌ No     | `"Intenta ajustar..."`           | Mensaje descriptivo                     |
| `icon`            | `string`     | ❌ No     | `"frown-o"`                      | Nombre del icono de FontAwesome         |

## 💡 Ejemplos de Uso

### Ejemplo 1: Con Todos los Props por Defecto

```tsx
<EmptyState onClearFilters={() => limpiarFiltros()} />
```

**Resultado:**

- Título: "No se encontraron resultados"
- Mensaje: "Intenta ajustar los filtros..."
- Icono: Cara triste (frown-o)
- Botón: Visible

### Ejemplo 2: Personalizado para Búsqueda

```tsx
<EmptyState
  title="No encontramos lo que buscas"
  message="Prueba con otras palabras clave o revisa la ortografía"
  icon="search"
  onClearFilters={() => setSearchQuery("")}
  showClearButton={searchQuery !== ""}
/>
```

### Ejemplo 3: Sin Botón de Limpiar

```tsx
<EmptyState
  title="Lista vacía"
  message="Aún no has agregado ningún elemento"
  icon="inbox"
  showClearButton={false}
/>
```

### Ejemplo 4: Para Favoritos Vacíos

```tsx
<EmptyState
  title="No hay favoritos"
  message="Agrega manuales a tus favoritos desde el catálogo"
  icon="star-o"
  showClearButton={false}
/>
```

### Ejemplo 5: Error de Conexión

```tsx
<EmptyState
  title="Error de conexión"
  message="No pudimos cargar los datos. Verifica tu conexión a internet"
  icon="wifi"
  showClearButton={false}
/>
```

## 🎨 Elementos del Componente

### 1. Icono

```tsx
<View
  style={{ backgroundColor: colors.backgroundSecondary }}
  className="w-32 h-32 rounded-full items-center justify-center"
>
  <FontAwesome name="frown-o" size={64} color={colors.textMuted} />
</View>
```

- **Tamaño del contenedor**: 128x128px
- **Tamaño del icono**: 64px
- **Color**: `colors.textMuted`
- **Fondo**: `colors.backgroundSecondary`

### 2. Título

```tsx
<Text
  style={{ color: colors.text }}
  className="text-2xl font-bold mb-3 text-center"
>
  No se encontraron resultados
</Text>
```

- **Tamaño**: 24px (text-2xl)
- **Peso**: Bold
- **Alineación**: Centro

### 3. Mensaje

```tsx
<Text
  style={{ color: colors.textSecondary }}
  className="text-base text-center mb-6 px-4 leading-6"
>
  Intenta ajustar los filtros...
</Text>
```

- **Tamaño**: 16px (text-base)
- **Color**: `colors.textSecondary`
- **Padding horizontal**: 16px

### 4. Tarjeta de Sugerencias

```tsx
<View
  style={{
    backgroundColor: colors.primary + "15",
    borderColor: colors.primary + "30",
  }}
  className="p-4 rounded-xl border"
>
  <View className="flex-row items-center mb-3">
    <FontAwesome name="lightbulb-o" size={20} color={colors.primary} />
    <Text>Sugerencias:</Text>
  </View>

  {/* Lista de sugerencias */}
  <View>
    <Text>• Verifica la ortografía de tu búsqueda</Text>
    <Text>• Intenta con términos más generales</Text>
    <Text>• Prueba con diferentes filtros</Text>
    <Text>• Limpia los filtros para ver todos</Text>
  </View>
</View>
```

- **Fondo**: Amarillo claro con opacidad
- **Borde**: Amarillo con opacidad
- **Icono**: Bombilla (lightbulb-o)

### 5. Botón de Limpiar Filtros

```tsx
<TouchableOpacity
  onPress={onClearFilters}
  style={{ backgroundColor: colors.primary }}
  className="flex-row items-center px-8 py-4 rounded-full shadow-lg"
>
  <FontAwesome name="refresh" size={18} color="#FFFFFF" />
  <Text className="text-white text-base font-bold">Limpiar Filtros</Text>
</TouchableOpacity>
```

- **Fondo**: Amarillo (#FFB800)
- **Icono**: Refresh
- **Forma**: Redondeado completo
- **Sombra**: Elevada

### 6. Mensaje Adicional

```tsx
<Text style={{ color: colors.textMuted }} className="text-xs text-center mt-4">
  Esto eliminará todos los filtros y búsquedas activas
</Text>
```

- **Tamaño**: 12px (text-xs)
- **Color**: `colors.textMuted`

## 🎯 Iconos Disponibles

Algunos iconos útiles de FontAwesome:

| Icono | Nombre                 | Uso Sugerido             |
| ----- | ---------------------- | ------------------------ |
| 😢    | `frown-o`              | Sin resultados (default) |
| 🔍    | `search`               | Búsqueda sin resultados  |
| ⭐    | `star-o`               | Favoritos vacíos         |
| 📥    | `inbox`                | Lista vacía              |
| 📡    | `wifi`                 | Error de conexión        |
| ⚠️    | `exclamation-triangle` | Error o advertencia      |
| 🚫    | `ban`                  | Acceso denegado          |
| 📄    | `file-o`               | Sin documentos           |

## 🔧 Personalización

### Cambiar Colores

```tsx
// Modificar en EmptyState.tsx
<View
  style={{ backgroundColor: '#FF0000' + '15' }}  // Rojo claro
  className="p-4 rounded-xl border"
>
```

### Cambiar Sugerencias

```tsx
// Modificar en EmptyState.tsx
<Text>• Tu sugerencia personalizada 1</Text>
<Text>• Tu sugerencia personalizada 2</Text>
<Text>• Tu sugerencia personalizada 3</Text>
```

### Agregar Más Elementos

```tsx
// Después del botón
<TouchableOpacity>
  <Text>Ver todos los manuales</Text>
</TouchableOpacity>
```

## 📱 Integración con FlatList

```tsx
<FlatList
  data={manualesFiltrados}
  renderItem={({ item }) => <ManualCard manual={item} />}
  ListEmptyComponent={() => (
    <EmptyState
      onClearFilters={handleClearFilters}
      showClearButton={hayFiltros}
    />
  )}
/>
```

## 🎨 Variantes

### Variante Compacta

```tsx
<EmptyState
  title="Sin resultados"
  message="Intenta otra búsqueda"
  showClearButton={false}
/>
```

### Variante con Acción Personalizada

```tsx
<EmptyState
  title="No hay manuales"
  message="Sé el primero en agregar uno"
  icon="plus-circle"
  showClearButton={false}
/>
<TouchableOpacity>
  <Text>Agregar Manual</Text>
</TouchableOpacity>
```

## 🎯 Mejores Prácticas

1. **Mostrar solo cuando sea necesario** - Usar con `ListEmptyComponent`
2. **Mensaje claro** - Explicar por qué no hay resultados
3. **Acción útil** - Botón para resolver el problema
4. **Sugerencias relevantes** - Ayudar al usuario a encontrar lo que busca
5. **Icono apropiado** - Usar icono que represente el estado

## 📊 Casos de Uso

### Caso 1: Búsqueda Sin Resultados

```tsx
const hayBusqueda = searchQuery !== "";

<EmptyState
  onClearFilters={() => setSearchQuery("")}
  showClearButton={hayBusqueda}
/>;
```

### Caso 2: Filtros Sin Resultados

```tsx
const hayFiltros = marcaFiltro !== null || tipoFiltro !== null;

<EmptyState
  onClearFilters={() => {
    setMarcaFiltro(null);
    setTipoFiltro(null);
  }}
  showClearButton={hayFiltros}
/>;
```

### Caso 3: Lista Vacía (Sin Filtros)

```tsx
<EmptyState
  title="Lista vacía"
  message="No hay elementos para mostrar"
  icon="inbox"
  showClearButton={false}
/>
```

---

## 🎯 Resumen

✅ **Componente Reutilizable** - Usar en cualquier pantalla  
✅ **Icono Triste** - Cara triste por defecto  
✅ **Sugerencias Útiles** - 4 consejos para el usuario  
✅ **Botón de Limpiar** - Opcional y personalizable  
✅ **Tema Dinámico** - Colores adaptativos  
✅ **Props Personalizables** - Título, mensaje, icono  
✅ **Fácil Integración** - Con FlatList y otras listas

¡El componente EmptyState está listo para usar! 😢✨
