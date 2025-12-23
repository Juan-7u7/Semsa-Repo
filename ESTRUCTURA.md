# Estructura del Proyecto Marian

## 📁 Estructura de Archivos

````
Marian/
├── 📱 app/
│   ├── 📂 (tabs)/
│   │   ├── _layout.tsx       # ⚙️ Configuración de pestañas
│   │   ├── index.tsx         # 🛍️ Pestaña "Catálogo"
│   │   └── two.tsx           # ❤️ Pestaña "Favoritos"
│   ├── _layout.tsx           # 🎨 Layout principal con tema
│   ├── +html.tsx             # 📄 HTML personalizado
│   ├── +not-found.tsx        # 🚫 Página 404
│   └── modal.tsx             # 📋 Modal de información
│
├── 🎨 components/            # Componentes reutilizables
│   ├── Themed.tsx
│   ├── EditScreenInfo.tsx
│   └── ...
│
├── 🖼️ assets/               # Recursos estáticos
│   ├── images/
│   └── fonts/
│
├── ⚙️ Archivos de Configuración
│   ├── babel.config.js       # Configuración Babel + NativeWind
│   ├── tailwind.config.js    # Configuración Tailwind CSS
│   ├── tsconfig.json         # Configuración TypeScript
│   ├── global.css            # Estilos globales Tailwind
│   ├── nativewind-env.d.ts   # Tipos para NativeWind
│   ├── app.json              # Configuración Expo
│   └── package.json          # Dependencias del proyecto
│
└── 📖 README.md              # Documentación

## 🎯 Características Implementadas

### ✅ Navegación con Expo Router
- Sistema de navegación basado en archivos
- Estructura de carpetas intuitiva
- Navegación tipo-segura con TypeScript

### ✅ Pestañas (Tabs)
1. **Catálogo** 🛍️
   - Grid de productos
   - Tarjetas con gradientes
   - Categorías con badges
   - Botones de acción
   - Responsive design

2. **Favoritos** ❤️
   - Lista de productos guardados
   - Vista horizontal con imágenes
   - Estado vacío con mensaje
   - Iconos de corazón interactivos

### ✅ Tailwind CSS (NativeWind)
- Clases de utilidad de Tailwind
- Soporte para dark mode
- Gradientes y sombras
- Sistema de colores personalizado
- Responsive utilities

### ✅ TypeScript
- Tipado estático completo
- Autocompletado mejorado
- Detección de errores en tiempo de desarrollo

### ✅ Dark Mode
- Detección automática del tema del sistema
- Estilos adaptativos con `dark:` prefix
- Transiciones suaves entre temas

## 🎨 Paleta de Colores

### Catálogo
- **Principal**: Purple (Morado)
  - `purple-400`, `purple-500`, `purple-600`
- **Secundario**: Pink (Rosa)
  - `pink-400`, `pink-500`

### Favoritos
- **Principal**: Pink (Rosa)
  - `pink-400`, `pink-600`
- **Secundario**: Purple (Morado)
  - `purple-500`

### Fondos
- **Light Mode**: `gray-50`
- **Dark Mode**: `gray-900`

## 🔧 Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React Native | Latest | Framework móvil |
| Expo | Latest | Plataforma de desarrollo |
| Expo Router | Latest | Navegación |
| NativeWind | Latest | Tailwind CSS |
| TypeScript | Latest | Tipado estático |
| FontAwesome | Latest | Iconos |

## 📱 Cómo Ejecutar

```bash
# Iniciar el servidor de desarrollo
npm start

# Escanear el código QR con Expo Go
# La app se cargará en tu dispositivo móvil
````

## 🎯 Próximos Pasos Sugeridos

1. **Funcionalidad de Favoritos**

   - Implementar estado global (Context API o Zustand)
   - Agregar/quitar productos de favoritos
   - Persistencia con AsyncStorage

2. **Detalles de Producto**

   - Crear pantalla de detalles
   - Navegación desde el catálogo
   - Imágenes reales de productos

3. **Búsqueda y Filtros**

   - Barra de búsqueda
   - Filtros por categoría
   - Ordenamiento por precio

4. **Animaciones**

   - Transiciones suaves
   - Animaciones de carga
   - Gestos táctiles

5. **API Integration**
   - Conectar con backend
   - Cargar productos dinámicamente
   - Autenticación de usuarios

---

¡La aplicación está lista para usar! 🚀
