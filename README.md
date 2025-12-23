# 📱 Gestor - Catálogo de Manuales Industriales

Aplicación móvil moderna y profesional para gestionar y acceder a manuales de equipos industriales (Yale, Jet, Harrington).

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-green)
![Framework](https://img.shields.io/badge/framework-Expo-black)

## ✨ Características

- 🔍 **Búsqueda Inteligente** - Encuentra manuales rápidamente
- 🏷️ **Filtros Avanzados** - Por marca y tipo de equipo
- ⭐ **Favoritos** - Guarda tus manuales más usados
- 📥 **Descarga PDF** - Accede a los documentos offline
- 🌓 **Modo Oscuro** - Interfaz adaptable
- 📱 **Diseño Responsivo** - Optimizado para todos los tamaños
- 🎨 **UI Premium** - Diseño minimalista y profesional

## 🚀 Tecnologías

- **Framework**: Expo / React Native
- **Lenguaje**: TypeScript
- **Navegación**: Expo Router
- **Estilos**: NativeWind (Tailwind CSS)
- **Animaciones**: React Native Reanimated
- **Iconos**: FontAwesome

## 📦 Instalación

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Expo Go (para pruebas en dispositivo)

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/Juan-7u7/Marian.git
cd Marian
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar el servidor de desarrollo**

```bash
npm start
```

4. **Ejecutar en dispositivo**

- Escanea el QR con Expo Go (Android/iOS)
- O presiona `a` para Android Emulator
- O presiona `i` para iOS Simulator

## 🏗️ Estructura del Proyecto

```
Marian/
├── app/                    # Pantallas de la aplicación
│   ├── (tabs)/            # Navegación por pestañas
│   │   ├── index.tsx      # Catálogo
│   │   └── two.tsx        # Favoritos
│   ├── modal.tsx          # Detalle de manual
│   ├── help.tsx           # Guía de uso
│   └── _layout.tsx        # Layout principal
├── components/            # Componentes reutilizables
│   ├── PremiumHeader.tsx
│   ├── PremiumManualCard.tsx
│   └── EmptyState.tsx
├── constants/             # Constantes y datos
│   ├── Colors.ts          # Paleta de colores
│   └── Manuales.ts        # Datos de manuales
├── contexts/              # Context API
│   ├── ThemeContext.tsx   # Tema claro/oscuro
│   └── FavoritosContext.tsx # Gestión de favoritos
└── utils/                 # Utilidades
    └── responsive.ts      # Funciones responsivas
```

## 🎨 Paleta de Colores

### Modo Claro

- **Fondo**: `#FFFFFF` (Blanco puro)
- **Secundario**: `#F9FAFB` (Gris muy claro)
- **Primario**: `#FFB800` (Amarillo industrial)
- **Texto**: `#111827` (Negro profundo)

### Modo Oscuro

- **Fondo**: `#000000` (Negro puro)
- **Secundario**: `#121212` (Negro profundo)
- **Primario**: `#FFB800` (Amarillo industrial)
- **Texto**: `#FFFFFF` (Blanco puro)

## 📱 Capturas de Pantalla

### Catálogo

- Búsqueda en tiempo real
- Filtros por marca (Yale, Jet, Harrington)
- Filtros por tipo (Eléctrico, Manual)
- Estadísticas de manuales

### Favoritos

- Lista de manuales guardados
- Estadísticas por tipo
- Estado vacío amigable

### Detalle

- Información completa del manual
- Visor de PDF simulado
- Botón de descarga

### Ayuda

- Guía de uso completa
- Características principales
- Consejos útiles

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start              # Iniciar servidor Expo
npm run android        # Ejecutar en Android
npm run ios            # Ejecutar en iOS
npm run web            # Ejecutar en navegador

# Build
npx expo export        # Exportar para producción
eas build              # Build con EAS (requiere cuenta Expo)
```

## 📚 Documentación

- [THEME_SYSTEM.md](./THEME_SYSTEM.md) - Sistema de temas
- [MANUALES_DATA.md](./MANUALES_DATA.md) - Estructura de datos
- [FAVORITOS_SYSTEM.md](./FAVORITOS_SYSTEM.md) - Sistema de favoritos
- [MODAL_DETALLE.md](./MODAL_DETALLE.md) - Modal de detalle
- [EMPTY_STATE.md](./EMPTY_STATE.md) - Estados vacíos
- [ANIMACIONES_RESPONSIVE.md](./ANIMACIONES_RESPONSIVE.md) - Animaciones
- [GENERAR_APK.md](./GENERAR_APK.md) - Generar APK

## 🌐 Deploy en Vercel

Este proyecto está optimizado para Expo, pero si deseas deployar una versión web:

1. **Exportar para web**

```bash
npx expo export --platform web
```

2. **Configurar Vercel**

```bash
npm install -g vercel
vercel
```

3. **Deploy**

```bash
vercel --prod
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

**Juan-7u7**

- GitHub: [@Juan-7u7](https://github.com/Juan-7u7)

## 🙏 Agradecimientos

- Expo Team por el excelente framework
- Comunidad de React Native
- Diseño inspirado en Apple y herramientas industriales modernas

---

**Desarrollado con ❤️ usando Expo y React Native**
