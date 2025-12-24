# 📱 Generar APK Localmente (Sin EAS)

## 🎯 Método Recomendado: Expo Prebuild + Android Studio

Este método genera el APK directamente en tu computadora sin necesidad de EAS.

---

## 📋 Requisitos Previos

### 1. Instalar Android Studio

1. **Descargar Android Studio**

   - Ve a: https://developer.android.com/studio
   - Descarga e instala

2. **Instalar Android SDK**

   - Abre Android Studio
   - Ve a: Tools → SDK Manager
   - Instala:
     - Android SDK Platform 33 (o superior)
     - Android SDK Build-Tools
     - Android SDK Platform-Tools

3. **Configurar Variables de Entorno**

   **En Windows (PowerShell como Administrador):**

   ```powershell
   # Agregar al PATH
   $env:ANDROID_HOME = "C:\Users\TU_USUARIO\AppData\Local\Android\Sdk"
   $env:PATH += ";$env:ANDROID_HOME\platform-tools"
   $env:PATH += ";$env:ANDROID_HOME\tools"
   $env:PATH += ";$env:ANDROID_HOME\tools\bin"
   ```

   **Permanente (Sistema):**

   - Panel de Control → Sistema → Configuración avanzada
   - Variables de entorno
   - Agregar `ANDROID_HOME` = `C:\Users\TU_USUARIO\AppData\Local\Android\Sdk`
   - Editar `Path` y agregar:
     - `%ANDROID_HOME%\platform-tools`
     - `%ANDROID_HOME%\tools`

### 2. Instalar Java JDK

1. **Descargar JDK 17**

   - Ve a: https://www.oracle.com/java/technologies/downloads/
   - Descarga JDK 17

2. **Configurar JAVA_HOME**
   ```powershell
   $env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
   ```

---

## 🚀 Generar el APK

### Paso 1: Prebuild (Generar carpetas nativas)

```bash
cd c:\Users\nangv\Desktop\Marian
npx expo prebuild --platform android
```

Esto creará la carpeta `android/` con todo el código nativo.

### Paso 2: Generar APK de Release

```bash
cd android
.\gradlew assembleRelease
```

O en una sola línea:

```bash
cd c:\Users\nangv\Desktop\Marian\android && .\gradlew assembleRelease
```

### Paso 3: Encontrar el APK

El APK estará en:

```
c:\Users\nangv\Desktop\Marian\android\app\build\outputs\apk\release\app-release.apk
```

---

## 🎯 Método Alternativo: Expo Build Local

Si no quieres instalar Android Studio:

```bash
# Instalar expo-cli globalmente
npm install -g expo-cli

# Generar APK
expo build:android -t apk
```

**Nota**: Este método usa los servidores de Expo pero es más simple.

---

## 📦 Método Rápido: APK sin Firmar (Para Testing)

Si solo quieres probar rápido:

```bash
# 1. Prebuild
npx expo prebuild --platform android

# 2. Generar APK debug (más rápido)
cd android
.\gradlew assembleDebug

# APK estará en:
# android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 🔧 Solución de Problemas

### Error: "ANDROID_HOME not found"

**Solución**: Configura la variable de entorno ANDROID_HOME

### Error: "Java not found"

**Solución**: Instala JDK 17 y configura JAVA_HOME

### Error: "SDK location not found"

**Solución**: Crea el archivo `android/local.properties`:

```properties
sdk.dir=C:\\Users\\TU_USUARIO\\AppData\\Local\\Android\\Sdk
```

### Error: "Gradle build failed"

**Solución**:

```bash
cd android
.\gradlew clean
.\gradlew assembleRelease
```

---

## 📱 Instalar el APK

### En tu Dispositivo Android:

1. **Transferir el APK**

   - Conecta tu teléfono por USB
   - Copia el APK a tu teléfono

2. **Habilitar Instalación**

   - Configuración → Seguridad
   - Habilitar "Fuentes desconocidas"

3. **Instalar**
   - Abre el archivo APK
   - Toca "Instalar"

---

## 🎯 Comandos Completos (Resumen)

```bash
# Opción 1: APK de Release (Recomendado)
cd c:\Users\nangv\Desktop\Marian
npx expo prebuild --platform android
cd android
.\gradlew assembleRelease

# Opción 2: APK Debug (Más rápido para testing)
cd c:\Users\nangv\Desktop\Marian
npx expo prebuild --platform android
cd android
.\gradlew assembleDebug

# Opción 3: Con Expo CLI
npm install -g expo-cli
expo build:android -t apk
```

---

## 📊 Comparación de Métodos

| Método            | Tiempo    | Requisitos     | Tamaño APK |
| ----------------- | --------- | -------------- | ---------- |
| **EAS Build**     | 10-15 min | Cuenta Expo    | ~30 MB     |
| **Local Release** | 5-10 min  | Android Studio | ~30 MB     |
| **Local Debug**   | 2-5 min   | Android Studio | ~40 MB     |
| **Expo CLI**      | 10-15 min | Internet       | ~30 MB     |

---

## ✅ Checklist para Build Local

- [ ] Instalar Android Studio
- [ ] Instalar JDK 17
- [ ] Configurar ANDROID_HOME
- [ ] Configurar JAVA_HOME
- [ ] Ejecutar `npx expo prebuild --platform android`
- [ ] Ejecutar `cd android && .\gradlew assembleRelease`
- [ ] Encontrar APK en `android\app\build\outputs\apk\release\`
- [ ] Transferir a dispositivo
- [ ] Instalar

---

## 💡 Recomendación

**Para tu caso**, te recomiendo:

1. **Si tienes Android Studio**: Usa el método local
2. **Si no tienes Android Studio**: Usa `expo build:android`

El método local es más rápido una vez configurado, pero requiere más setup inicial.

---

## 🔗 Enlaces Útiles

- **Android Studio**: https://developer.android.com/studio
- **JDK 17**: https://www.oracle.com/java/technologies/downloads/
- **Expo Prebuild**: https://docs.expo.dev/workflow/prebuild/
- **Gradle**: https://gradle.org/

---

¡Elige el método que prefieras y genera tu APK! 🚀
