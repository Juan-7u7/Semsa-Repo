# 📱 Guía Completa para Generar APK con EAS Build

## ✅ Estado Actual

- ✅ Proyecto listo y subido a GitHub
- ✅ EAS CLI instalado globalmente
- ✅ Configuración `eas.json` creada
- ✅ Flecha de tarjeta ajustada

---

## 🚀 Pasos para Generar el APK

### Paso 1: Crear Cuenta en Expo (Si no tienes)

1. Ve a [expo.dev](https://expo.dev)
2. Click en "Sign Up"
3. Crea tu cuenta (puedes usar GitHub)

### Paso 2: Login en EAS CLI

Abre tu terminal y ejecuta:

```bash
eas login
```

Te pedirá:

- **Email**: Tu email de Expo
- **Password**: Tu contraseña

### Paso 3: Configurar el Proyecto

```bash
cd c:\Users\nangv\Desktop\Marian
eas build:configure
```

Esto creará/actualizará:

- `eas.json` (ya existe)
- `app.json` con el Project ID correcto

### Paso 4: Iniciar el Build

```bash
eas build --platform android --profile preview
```

**Opciones que te preguntará:**

1. **"Would you like to automatically create an EAS project for @[tu-usuario]/Marian?"**

   - Responde: `Y` (Yes)

2. **"Generate a new Android Keystore?"**
   - Responde: `Y` (Yes)

### Paso 5: Esperar el Build

El build se ejecuta en la nube:

- ⏱️ **Tiempo estimado**: 10-15 minutos
- 📊 **Progreso**: Verás el progreso en la terminal
- 🔗 **URL**: Te dará un link para ver el build en expo.dev

### Paso 6: Descargar el APK

Una vez completado:

1. Verás un mensaje: **"Build finished"**
2. Te dará un **link de descarga**
3. Click en el link o ve a [expo.dev/accounts/[tu-usuario]/projects/marian/builds](https://expo.dev)
4. Descarga el APK

---

## 📋 Comandos Completos

```bash
# 1. Login
eas login

# 2. Ir al proyecto
cd c:\Users\nangv\Desktop\Marian

# 3. Configurar (si es necesario)
eas build:configure

# 4. Build para Android (APK)
eas build --platform android --profile preview

# 5. Ver builds
eas build:list
```

---

## ⚙️ Perfiles de Build

En `eas.json` tenemos 3 perfiles:

### 1. **preview** (Recomendado para ti)

```bash
eas build --platform android --profile preview
```

- Genera APK (fácil de instalar)
- Para testing y distribución interna

### 2. **production**

```bash
eas build --platform android --profile production
```

- Genera APK optimizado
- Para distribución final

### 3. **development**

```bash
eas build --platform android --profile development
```

- Para desarrollo con Expo Dev Client

---

## 🔧 Solución de Problemas

### Error: "Invalid UUID appId"

**Solución**: Necesitas hacer login primero

```bash
eas login
```

### Error: "No Expo account found"

**Solución**: Crea una cuenta en expo.dev

### Error: "Build failed"

**Solución**: Revisa los logs en expo.dev

### Error: "Keystore not found"

**Solución**: Deja que EAS genere uno automáticamente (responde Y)

---

## 📱 Instalar el APK en tu Dispositivo

### Método 1: Descarga Directa

1. Abre el link del build en tu teléfono
2. Descarga el APK
3. Instala (habilita "Fuentes desconocidas" si es necesario)

### Método 2: Transferencia

1. Descarga el APK en tu PC
2. Transfiere a tu teléfono (USB, email, etc.)
3. Abre el archivo APK
4. Instala

---

## 🎯 Ejemplo de Sesión Completa

```bash
# Terminal
C:\Users\nangv\Desktop\Marian> eas login
✔ Email: tu-email@example.com
✔ Password: ********
✔ Logged in as tu-usuario

C:\Users\nangv\Desktop\Marian> eas build --platform android --profile preview
✔ Would you like to automatically create an EAS project? … yes
✔ Generate a new Android Keystore? … yes

Building...
⠋ Uploading to EAS Build
⠋ Starting build
⠋ Running build

Build finished!
Download: https://expo.dev/accounts/tu-usuario/projects/marian/builds/abc123
```

---

## 📊 Información del Build

- **Nombre**: Marian - Catálogo de Manuales
- **Package**: com.marian.app
- **Versión**: 1.0.0
- **Tamaño**: ~30-40 MB
- **Plataforma**: Android 5.0+

---

## 🔗 Enlaces Útiles

- **Expo Dashboard**: https://expo.dev
- **EAS Build Docs**: https://docs.expo.dev/build/introduction/
- **Tu Proyecto GitHub**: https://github.com/Juan-7u7/Marian

---

## ✅ Checklist

- [ ] Crear cuenta en Expo (si no tienes)
- [ ] Ejecutar `eas login`
- [ ] Ejecutar `eas build:configure`
- [ ] Ejecutar `eas build --platform android --profile preview`
- [ ] Esperar 10-15 minutos
- [ ] Descargar APK
- [ ] Instalar en dispositivo
- [ ] ¡Disfrutar la app!

---

## 💡 Consejo

Si quieres ver el progreso del build en tiempo real:

1. Ve a https://expo.dev
2. Login con tu cuenta
3. Ve a "Projects" → "Marian" → "Builds"
4. Verás el progreso en vivo

---

¡Tu APK estará listo en ~15 minutos! 🚀📱
