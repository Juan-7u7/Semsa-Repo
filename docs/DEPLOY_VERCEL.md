# 🚀 Deploy en Vercel - Gestor

## ✅ Proyecto Subido a GitHub

El proyecto **Gestor** ha sido subido exitosamente a:
**https://github.com/Juan-7u7/Marian.git**

---

## 📦 Preparar para Vercel

### Paso 1: Exportar para Web

Primero, necesitas exportar el proyecto para web:

```bash
npx expo export --platform web
```

Esto creará una carpeta `dist/` con los archivos estáticos.

---

### Paso 2: Configurar Vercel

#### Opción A: Desde la Web de Vercel (Recomendado)

1. **Ir a Vercel**

   - Visita [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub

2. **Importar Proyecto**

   - Click en "Add New Project"
   - Selecciona el repositorio `Marian`

3. **Configurar Build**

   - **Framework Preset**: Other
   - **Build Command**: `npx expo export --platform web`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy**

   - Click en "Deploy"
   - Espera 2-3 minutos

5. **¡Listo!**
   - Tu app estará en: `https://marian-[tu-usuario].vercel.app`

#### Opción B: Desde la CLI

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Configurar cuando pregunte:
# - Build Command: npx expo export --platform web
# - Output Directory: dist
# - Install Command: npm install

# 5. Deploy a producción
vercel --prod
```

---

## ⚙️ Configuración Adicional

### Crear vercel.json

Crea un archivo `vercel.json` en la raíz del proyecto:

```json
{
  "buildCommand": "npx expo export --platform web",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🔧 Solución de Problemas

### Error: "Build failed"

Si el build falla, intenta:

1. **Limpiar caché**

```bash
npx expo start --clear
```

2. **Reinstalar dependencias**

```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Exportar localmente primero**

```bash
npx expo export --platform web
```

### Error: "Module not found"

Asegúrate de que todas las dependencias estén en `package.json`:

```bash
npm install
```

### Error: "Invalid configuration"

Verifica que `vercel.json` esté correctamente configurado.

---

## 📱 Limitaciones de la Versión Web

**Nota importante**: Expo está optimizado para móviles. La versión web puede tener limitaciones:

- ❌ Algunas animaciones pueden no funcionar igual
- ❌ Componentes nativos pueden verse diferentes
- ❌ Rendimiento puede ser menor que en móvil

### Recomendación

Para la mejor experiencia:

- **Móvil**: Usa la app nativa (APK)
- **Web**: Úsala solo para demostración o acceso rápido

---

## 🌐 Alternativa: Expo Web

Si prefieres usar Expo Web directamente:

1. **Configurar package.json**

```json
{
  "scripts": {
    "web": "expo start --web",
    "build:web": "expo export --platform web"
  }
}
```

2. **Deploy en Vercel**

```bash
vercel --prod
```

---

## 📊 Métricas de Deploy

Después del deploy, Vercel te mostrará:

- ✅ **URL de producción**
- ✅ **Tiempo de build**
- ✅ **Tamaño del bundle**
- ✅ **Performance score**

---

## 🎯 Próximos Pasos

1. ✅ **Proyecto subido a GitHub**
2. ⏳ **Exportar para web** (`npx expo export --platform web`)
3. ⏳ **Deploy en Vercel** (desde web o CLI)
4. ⏳ **Configurar dominio** (opcional)

---

## 📝 Comandos Rápidos

```bash
# Exportar para web
npx expo export --platform web

# Deploy con Vercel CLI
vercel --prod

# Ver logs
vercel logs

# Ver deployments
vercel ls
```

---

## 🔗 Enlaces Útiles

- **Repositorio**: https://github.com/Juan-7u7/Marian.git
- **Vercel Docs**: https://vercel.com/docs
- **Expo Web**: https://docs.expo.dev/workflow/web/

---

## ✅ Checklist

- [x] Proyecto subido a GitHub
- [ ] Exportar para web
- [ ] Crear cuenta en Vercel
- [ ] Importar proyecto
- [ ] Configurar build
- [ ] Deploy
- [ ] Verificar funcionamiento

---

¡Tu proyecto **Gestor** está listo para ser deployado en Vercel! 🚀
