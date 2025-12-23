# Guía de Tailwind CSS con NativeWind

## 🎨 Ejemplos de Uso

### Contenedores y Layout

```tsx
// Contenedor flex centrado
<View className="flex-1 items-center justify-center">
  <Text>Contenido centrado</Text>
</View>

// Contenedor con padding
<View className="p-4">
  <Text>Contenido con padding</Text>
</View>

// Grid de 2 columnas
<View className="flex-row flex-wrap justify-between">
  <View className="w-[48%]">Columna 1</View>
  <View className="w-[48%]">Columna 2</View>
</View>
```

### Colores y Fondos

```tsx
// Fondos con soporte dark mode
<View className="bg-white dark:bg-gray-800">
  <Text className="text-gray-800 dark:text-white">Texto adaptativo</Text>
</View>

// Gradientes (usando View como contenedor)
<View className="bg-gradient-to-br from-purple-400 to-pink-500">
  <Text className="text-white">Texto sobre gradiente</Text>
</View>

// Colores de texto
<Text className="text-purple-600 dark:text-purple-400">
  Texto morado
</Text>
```

### Tipografía

```tsx
// Tamaños de texto
<Text className="text-xs">Muy pequeño</Text>
<Text className="text-sm">Pequeño</Text>
<Text className="text-base">Normal</Text>
<Text className="text-lg">Grande</Text>
<Text className="text-xl">Muy grande</Text>
<Text className="text-2xl">Extra grande</Text>
<Text className="text-3xl">Título</Text>

// Peso de fuente
<Text className="font-normal">Normal</Text>
<Text className="font-semibold">Semi-negrita</Text>
<Text className="font-bold">Negrita</Text>

// Alineación
<Text className="text-left">Izquierda</Text>
<Text className="text-center">Centro</Text>
<Text className="text-right">Derecha</Text>
```

### Espaciado

```tsx
// Padding
<View className="p-2">Padding pequeño</View>
<View className="p-4">Padding medio</View>
<View className="p-6">Padding grande</View>
<View className="px-4 py-2">Padding horizontal y vertical</View>

// Margin
<View className="m-2">Margin pequeño</View>
<View className="m-4">Margin medio</View>
<View className="mb-4">Margin bottom</View>
<View className="mt-6">Margin top</View>
```

### Bordes y Sombras

```tsx
// Bordes redondeados
<View className="rounded">Esquinas redondeadas</View>
<View className="rounded-lg">Esquinas más redondeadas</View>
<View className="rounded-xl">Esquinas muy redondeadas</View>
<View className="rounded-full">Círculo/Píldora</View>

// Sombras
<View className="shadow-sm">Sombra pequeña</View>
<View className="shadow">Sombra media</View>
<View className="shadow-lg">Sombra grande</View>
```

### Botones

```tsx
// Botón primario
<TouchableOpacity className="bg-purple-600 rounded-lg py-3 px-6">
  <Text className="text-white text-center font-semibold">
    Botón Primario
  </Text>
</TouchableOpacity>

// Botón secundario
<TouchableOpacity className="bg-gray-200 dark:bg-gray-700 rounded-lg py-3 px-6">
  <Text className="text-gray-800 dark:text-white text-center font-semibold">
    Botón Secundario
  </Text>
</TouchableOpacity>

// Botón outline
<TouchableOpacity className="border-2 border-purple-600 rounded-lg py-3 px-6">
  <Text className="text-purple-600 text-center font-semibold">
    Botón Outline
  </Text>
</TouchableOpacity>

// Botón circular (icono)
<TouchableOpacity className="bg-purple-600 p-3 rounded-full">
  <FontAwesome name="heart" size={20} color="white" />
</TouchableOpacity>
```

### Tarjetas (Cards)

```tsx
// Tarjeta básica
<View className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
  <Text className="text-lg font-bold text-gray-800 dark:text-white mb-2">
    Título de la Tarjeta
  </Text>
  <Text className="text-gray-600 dark:text-gray-400">
    Descripción de la tarjeta
  </Text>
</View>

// Tarjeta con imagen
<View className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
  <View className="bg-gradient-to-br from-purple-400 to-pink-500 h-40" />
  <View className="p-4">
    <Text className="text-lg font-bold text-gray-800 dark:text-white">
      Título
    </Text>
  </View>
</View>
```

### Badges

```tsx
// Badge de categoría
<View className="bg-purple-100 dark:bg-purple-900 self-start px-2 py-1 rounded-md">
  <Text className="text-xs font-semibold text-purple-700 dark:text-purple-300">
    Categoría
  </Text>
</View>

// Badge de estado
<View className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
  <Text className="text-xs font-semibold text-green-700 dark:text-green-300">
    Activo
  </Text>
</View>
```

### Listas

```tsx
// Lista vertical
<ScrollView className="flex-1">
  {items.map((item) => (
    <View key={item.id} className="bg-white dark:bg-gray-800 p-4 mb-2 rounded-lg">
      <Text className="text-gray-800 dark:text-white">{item.name}</Text>
    </View>
  ))}
</ScrollView>

// Lista horizontal
<ScrollView horizontal className="flex-row">
  {items.map((item) => (
    <View key={item.id} className="bg-white dark:bg-gray-800 p-4 mr-2 rounded-lg w-40">
      <Text className="text-gray-800 dark:text-white">{item.name}</Text>
    </View>
  ))}
</ScrollView>
```

### Estados Vacíos

```tsx
<View className="items-center justify-center py-20">
  <View className="bg-gray-200 dark:bg-gray-700 rounded-full p-6 mb-4">
    <FontAwesome name="inbox" size={48} color="#9ca3af" />
  </View>
  <Text className="text-xl font-bold text-gray-800 dark:text-white mb-2">
    No hay elementos
  </Text>
  <Text className="text-gray-600 dark:text-gray-400 text-center px-8">
    Agrega elementos para verlos aquí
  </Text>
</View>
```

### Inputs (Formularios)

```tsx
// Input de texto
<TextInput
  className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-800 dark:text-white"
  placeholder="Escribe algo..."
  placeholderTextColor="#9ca3af"
/>

// Input con icono
<View className="flex-row items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3">
  <FontAwesome name="search" size={20} color="#9ca3af" />
  <TextInput
    className="flex-1 ml-2 text-gray-800 dark:text-white"
    placeholder="Buscar..."
    placeholderTextColor="#9ca3af"
  />
</View>
```

### Animaciones con Opacity

```tsx
// Efecto de presión
<TouchableOpacity activeOpacity={0.7} className="bg-purple-600 rounded-lg p-4">
  <Text className="text-white">Presióname</Text>
</TouchableOpacity>
```

## 🎨 Paleta de Colores Recomendada

### Primarios

- `purple-400`, `purple-500`, `purple-600`, `purple-700`
- `pink-400`, `pink-500`, `pink-600`

### Neutros

- `gray-50`, `gray-100`, `gray-200` (fondos claros)
- `gray-600`, `gray-700`, `gray-800`, `gray-900` (fondos oscuros)

### Acentos

- `blue-500`, `blue-600` (información)
- `green-500`, `green-600` (éxito)
- `red-500`, `red-600` (error)
- `yellow-500`, `yellow-600` (advertencia)

## 💡 Tips y Mejores Prácticas

1. **Siempre usa dark mode**: Agrega `dark:` a todos los colores
2. **Usa self-start/self-end**: Para badges y elementos que no deben ocupar todo el ancho
3. **Combina flex-row con flex-wrap**: Para grids responsivos
4. **activeOpacity en TouchableOpacity**: Para mejor feedback visual
5. **overflow-hidden con rounded**: Para que las imágenes respeten los bordes redondeados

## 🚀 Recursos Adicionales

- [Documentación de NativeWind](https://www.nativewind.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Expo Icons](https://icons.expo.fyi/)

---

¡Experimenta y crea interfaces increíbles! 🎨
