# 📱 Guía para Generar APK de Marian

## ✅ Archivos Preparados

He configurado todo lo necesario para generar el APK:

1. ✅ **app.json** - Configurado con información de la app
2. ✅ **eas.json** - Configuración de build
3. ✅ **Export completado** - Archivos listos en carpeta `dist`

## 🚀 Opciones para Generar el APK

### Opción 1: Usando EAS Build (Recomendado)

EAS Build es el servicio oficial de Expo para compilar apps.

#### Pasos:

1. **Instalar EAS CLI** (si no lo tienes):

```bash
npm install -g eas-cli
```

2. **Iniciar sesión en Expo**:

```bash
eas login
```

3. **Configurar el proyecto**:

```bash
eas build:configure
```

4. **Generar el APK**:

```bash
eas build --platform android --profile preview
```

5. **Esperar** - El build se hace en la nube (5-15 minutos)

6. **Descargar** - Recibirás un link para descargar el APK

#### Ventajas:

- ✅ No necesitas Android Studio
- ✅ Build en la nube
- ✅ Fácil y rápido
- ✅ Gratis para builds ilimitados

---

### Opción 2: Build Local con Expo (Más Rápido)

Si tienes Android Studio instalado:

1. **Instalar dependencias de Android**:

   - Android Studio
   - Android SDK
   - Java JDK

2. **Generar APK local**:

```bash
npx expo run:android --variant release
```

3. **El APK estará en**:

```
android/app/build/outputs/apk/release/app-release.apk
```

---

### Opción 3: Usando Expo Go (Para Pruebas)

Si solo quieres probar la app sin generar APK:

1. **Iniciar el servidor**:

```bash
npm start
```

2. **Escanear QR** con la app Expo Go en tu teléfono

3. **La app se carga** directamente en Expo Go

---

## 📦 Información del APK

- **Nombre**: Marian - Catálogo de Manuales
- **Package**: com.marian.app
- **Versión**: 1.0.0
- **Tamaño estimado**: ~30-40 MB
- **Plataforma**: Android 5.0+

---

## 🎯 Recomendación

**Para generar el APK final**, te recomiendo usar **EAS Build (Opción 1)**:

```bash
# 1. Instalar EAS CLI
npm install -g eas-cli

# 2. Login
eas login

# 3. Generar APK
eas build --platform android --profile preview
```

Esto generará un APK profesional listo para instalar en cualquier dispositivo Android.

---

## 📱 Instalar el APK

Una vez generado:

1. **Transferir** el APK a tu teléfono Android
2. **Habilitar** instalación de fuentes desconocidas
3. **Tocar** el archivo APK
4. **Instalar** la aplicación

---

## ❓ Necesitas Ayuda?

Si encuentras algún problema:

1. Verifica que tienes Node.js instalado
2. Asegúrate de tener conexión a internet
3. Revisa que no haya errores en el código

---

## 🎉 ¡Listo!

Tu aplicación **Marian** está lista para ser compilada. Elige la opción que prefieras y genera tu APK.

**Archivo de configuración creado**: `eas.json`
**Archivos exportados**: Carpeta `dist/`
