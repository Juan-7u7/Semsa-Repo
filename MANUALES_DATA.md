# 📚 Datos de Manuales - Documentación

## Descripción

Este archivo contiene una lista de **30 manuales** de equipos industriales de las marcas **Yale**, **Jet** y **Harrington**.

## 📊 Estructura de Datos

### Tipo `Manual`

```typescript
interface Manual {
  id: number; // ID único del manual
  titulo: string; // Título descriptivo del manual
  marca: MarcaManual; // 'Yale' | 'Jet' | 'Harrington'
  tipo: TipoManual; // 'Eléctrico' | 'Manual'
  url_falsa_pdf: string; // URL simulada del PDF
}
```

## 📈 Distribución de Manuales

### Por Marca

- **Yale**: 10 manuales (5 Eléctricos, 5 Manuales)
- **Jet**: 10 manuales (5 Eléctricos, 5 Manuales)
- **Harrington**: 10 manuales (5 Eléctricos, 5 Manuales)

### Por Tipo

- **Eléctricos**: 15 manuales
- **Manuales**: 15 manuales

## 🚀 Uso Básico

### Importar los datos

```typescript
import {
  MANUALES,
  obtenerTodosManuales,
  obtenerManualesPorMarca,
  obtenerManualesPorTipo,
  obtenerManualPorId,
  buscarManualesPorTitulo,
  obtenerEstadisticas,
  type Manual,
  type MarcaManual,
  type TipoManual,
} from "@/constants/Manuales";
```

### Obtener todos los manuales

```typescript
const manuales = obtenerTodosManuales();
// Retorna: Manual[] (30 manuales)
```

### Filtrar por marca

```typescript
const manualesYale = obtenerManualesPorMarca("Yale");
// Retorna: Manual[] (10 manuales de Yale)

const manualesJet = obtenerManualesPorMarca("Jet");
// Retorna: Manual[] (10 manuales de Jet)

const manualesHarrington = obtenerManualesPorMarca("Harrington");
// Retorna: Manual[] (10 manuales de Harrington)
```

### Filtrar por tipo

```typescript
const manualesElectricos = obtenerManualesPorTipo("Eléctrico");
// Retorna: Manual[] (15 manuales eléctricos)

const manualesManuales = obtenerManualesPorTipo("Manual");
// Retorna: Manual[] (15 manuales manuales)
```

### Buscar por ID

```typescript
const manual = obtenerManualPorId(1);
// Retorna: Manual | undefined
// {
//   id: 1,
//   titulo: 'Polipasto Eléctrico Yale CPV 1 Ton',
//   marca: 'Yale',
//   tipo: 'Eléctrico',
//   url_falsa_pdf: 'https://example.com/manuales/yale-cpv-1ton.pdf'
// }
```

### Buscar por título

```typescript
const resultados = buscarManualesPorTitulo("polipasto");
// Retorna: Manual[] (todos los manuales que contengan "polipasto" en el título)

const resultados2 = buscarManualesPorTitulo("yale");
// Retorna: Manual[] (todos los manuales de Yale)
```

### Obtener estadísticas

```typescript
const stats = obtenerEstadisticas();
// Retorna:
// {
//   total: 30,
//   porMarca: {
//     Yale: 10,
//     Jet: 10,
//     Harrington: 10
//   },
//   porTipo: {
//     Eléctrico: 15,
//     Manual: 15
//   }
// }
```

## 💡 Ejemplos de Uso en Componentes

### Ejemplo 1: Lista de Manuales

```tsx
import React from "react";
import { View, Text, FlatList } from "react-native";
import { obtenerTodosManuales } from "@/constants/Manuales";

function ListaManuales() {
  const manuales = obtenerTodosManuales();

  return (
    <FlatList
      data={manuales}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="p-4 mb-2 bg-white rounded-lg">
          <Text className="text-lg font-bold">{item.titulo}</Text>
          <Text className="text-sm text-gray-600">
            {item.marca} - {item.tipo}
          </Text>
        </View>
      )}
    />
  );
}
```

### Ejemplo 2: Filtro por Marca

```tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import {
  obtenerManualesPorMarca,
  obtenerMarcas,
  type MarcaManual,
} from "@/constants/Manuales";

function FiltroMarcas() {
  const [marcaSeleccionada, setMarcaSeleccionada] =
    useState<MarcaManual>("Yale");
  const marcas = obtenerMarcas();
  const manuales = obtenerManualesPorMarca(marcaSeleccionada);

  return (
    <View>
      {/* Botones de filtro */}
      <View className="flex-row gap-2 mb-4">
        {marcas.map((marca) => (
          <TouchableOpacity
            key={marca}
            onPress={() => setMarcaSeleccionada(marca)}
            className={`px-4 py-2 rounded-lg ${
              marcaSeleccionada === marca ? "bg-primary" : "bg-gray-200"
            }`}
          >
            <Text
              className={
                marcaSeleccionada === marca ? "text-white" : "text-gray-800"
              }
            >
              {marca}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de manuales */}
      <FlatList
        data={manuales}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-4 mb-2 bg-white rounded-lg">
            <Text className="text-lg font-bold">{item.titulo}</Text>
            <Text className="text-sm text-gray-600">{item.tipo}</Text>
          </View>
        )}
      />
    </View>
  );
}
```

### Ejemplo 3: Búsqueda

```tsx
import React, { useState } from "react";
import { View, TextInput, FlatList, Text } from "react-native";
import { buscarManualesPorTitulo } from "@/constants/Manuales";

function BuscadorManuales() {
  const [query, setQuery] = useState("");
  const resultados = buscarManualesPorTitulo(query);

  return (
    <View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar manuales..."
        className="bg-white px-4 py-3 rounded-lg mb-4"
      />

      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-4 mb-2 bg-white rounded-lg">
            <Text className="text-lg font-bold">{item.titulo}</Text>
            <Text className="text-sm text-gray-600">
              {item.marca} - {item.tipo}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-4">
            No se encontraron manuales
          </Text>
        }
      />
    </View>
  );
}
```

### Ejemplo 4: Detalle de Manual

```tsx
import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { obtenerManualPorId } from "@/constants/Manuales";

function DetalleManual({ id }: { id: number }) {
  const manual = obtenerManualPorId(id);

  if (!manual) {
    return <Text>Manual no encontrado</Text>;
  }

  const abrirPDF = () => {
    Linking.openURL(manual.url_falsa_pdf);
  };

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold mb-2">{manual.titulo}</Text>

      <View className="flex-row gap-2 mb-4">
        <View className="bg-primary-light px-3 py-1 rounded-full">
          <Text className="text-sm font-semibold">{manual.marca}</Text>
        </View>
        <View className="bg-gray-200 px-3 py-1 rounded-full">
          <Text className="text-sm font-semibold">{manual.tipo}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={abrirPDF}
        className="bg-primary py-3 rounded-lg"
      >
        <Text className="text-white text-center font-semibold">
          Descargar PDF
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Ejemplo 5: Estadísticas

```tsx
import React from "react";
import { View, Text } from "react-native";
import { obtenerEstadisticas } from "@/constants/Manuales";

function EstadisticasManuales() {
  const stats = obtenerEstadisticas();

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold mb-4">Estadísticas</Text>

      <View className="bg-white p-4 rounded-lg mb-4">
        <Text className="text-lg font-semibold mb-2">Total de Manuales</Text>
        <Text className="text-3xl font-bold text-primary">{stats.total}</Text>
      </View>

      <View className="bg-white p-4 rounded-lg mb-4">
        <Text className="text-lg font-semibold mb-2">Por Marca</Text>
        {Object.entries(stats.porMarca).map(([marca, cantidad]) => (
          <View key={marca} className="flex-row justify-between mb-1">
            <Text>{marca}</Text>
            <Text className="font-bold">{cantidad}</Text>
          </View>
        ))}
      </View>

      <View className="bg-white p-4 rounded-lg">
        <Text className="text-lg font-semibold mb-2">Por Tipo</Text>
        {Object.entries(stats.porTipo).map(([tipo, cantidad]) => (
          <View key={tipo} className="flex-row justify-between mb-1">
            <Text>{tipo}</Text>
            <Text className="font-bold">{cantidad}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
```

## 📋 Lista Completa de Manuales

### Yale (10 manuales)

**Eléctricos:**

1. Polipasto Eléctrico Yale CPV 1 Ton
2. Grúa Eléctrica Yale YK 2 Ton
3. Montacargas Eléctrico Yale ERP030
4. Polipasto Eléctrico Yale CPE 5 Ton
5. Winche Eléctrico Yale RPE 3 Ton

**Manuales:** 6. Polipasto Manual Yale Yalelift 360 7. Tecle Manual Yale VS III 1 Ton 8. Diferencial Manual Yale LX 2 Ton 9. Polipasto Manual Yale Mini 360 500kg 10. Tirfor Manual Yale TU 1.6 Ton

### Jet (10 manuales)

**Eléctricos:** 11. Polipasto Eléctrico Jet JSH 1 Ton 12. Grúa Eléctrica Jet VOLT 2 Ton 13. Polipasto Eléctrico Jet TS 3 Ton 14. Winche Eléctrico Jet ESH 5 Ton 15. Polipasto Eléctrico Jet FESH 10 Ton

**Manuales:** 16. Polipasto Manual Jet JLH 1 Ton 17. Diferencial Manual Jet L100 2 Ton 18. Tecle Manual Jet S90 3 Ton 19. Polipasto Manual Jet JG 500kg 20. Tirfor Manual Jet JGP 1.5 Ton

### Harrington (10 manuales)

**Eléctricos:** 21. Polipasto Eléctrico Harrington NER 1 Ton 22. Grúa Eléctrica Harrington SNER 2 Ton 23. Polipasto Eléctrico Harrington SEQ 3 Ton 24. Winche Eléctrico Harrington ER2 5 Ton 25. Polipasto Eléctrico Harrington NERP 10 Ton

**Manuales:** 26. Polipasto Manual Harrington CB 1 Ton 27. Diferencial Manual Harrington CF 2 Ton 28. Tecle Manual Harrington LX 3 Ton 29. Polipasto Manual Harrington Mini Cat 500kg 30. Tirfor Manual Harrington LB 1.6 Ton

---

## 🔧 Funciones Disponibles

| Función                     | Parámetros           | Retorno               | Descripción                |
| --------------------------- | -------------------- | --------------------- | -------------------------- |
| `obtenerTodosManuales()`    | -                    | `Manual[]`            | Retorna todos los manuales |
| `obtenerManualesPorMarca()` | `marca: MarcaManual` | `Manual[]`            | Filtra por marca           |
| `obtenerManualesPorTipo()`  | `tipo: TipoManual`   | `Manual[]`            | Filtra por tipo            |
| `obtenerManualPorId()`      | `id: number`         | `Manual \| undefined` | Busca por ID               |
| `buscarManualesPorTitulo()` | `query: string`      | `Manual[]`            | Busca en títulos           |
| `obtenerMarcas()`           | -                    | `MarcaManual[]`       | Lista de marcas            |
| `obtenerTipos()`            | -                    | `TipoManual[]`        | Lista de tipos             |
| `obtenerEstadisticas()`     | -                    | `object`              | Estadísticas generales     |

---

¡Los datos están listos para usar en tu aplicación! 📚✨
