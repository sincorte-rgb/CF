# CF Cell - Sitio Web Oficial & Catálogo Modificable

Sitio web moderno, rápido y totalmente adaptable para **CF Cell**, especializado en servicio técnico multimarca, informática, cargadores de notebooks, repuestos de celulares, televisores, circuitos cerrados de TV (CCTV) y ventas minoristas y mayoristas.

---

## 🚀 Características Principales

1. **Laboratorio de Servicio Técnico:**
   - Secciones dedicadas con detalles para:
     - 📱 **Celulares y Tablets** (pantallas, baterías, pines de carga, microelectrónica).
     - 💻 **Notebooks & Informática** (cargadores originales, teclados, displays, formateo, SSD y RAM).
     - 📺 **Smart TVs & Televisores LED** (cambio de tiras LED, fuentes de alimentación, placas main).
     - 📹 **CCTV & Cámaras de Seguridad** (DVR, cámaras domo/tubo, fuentes 12V y configuración remota).

2. **Catálogo de Productos 100% Modificable (Sin necesidad de base de datos externa):**
   - **Panel de Control Integrado:** Puedes agregar, editar o eliminar productos en tiempo real.
   - **Doble Lista de Precios:** Selector interactivo para ver precios **Minoristas** o precios para el **Gremio / Mayoristas**.
   - **Filtros por Categoría y Buscador en Vivo:** Cargadores Notebook, Informática, Repuestos Celular, CCTV y Accesorios.
   - **Guardado Automático:** Los cambios se guardan en el navegador (`localStorage`).
   - **Copia de Seguridad:** Botón para **Descargar Copia (Exportar JSON)** y **Cargar Copia (Importar JSON)** para respaldar tu inventario en cualquier momento.

3. **Integración Directa con WhatsApp:**
   - Botón flotante siempre visible.
   - Botones en cada producto del catálogo que envían a WhatsApp el nombre, categoría y precio exacto consultado.
   - Botón directo para cotizaciones mayoristas.
   - Formulario de contacto directo que arma el mensaje listo para enviar.

4. **Configuración Rápida desde la Web:**
   - Puedes cambiar tu número de WhatsApp, dirección del local y horarios de atención directamente desde la pestaña **Configuración** del Panel Admin sin tocar código.

---

## 📂 Estructura de Archivos

```
cf-cell/
├── index.html     # Estructura principal y componentes de la web
├── app.js         # Lógica interactiva del catálogo, administración y WhatsApp
├── style.css      # Estilos personalizados, efectos glow y tipografía
└── README.md      # Documentación y guía de uso
```

---

## 💻 ¿Cómo abrir y usar la web?

1. Ve a la carpeta donde se creó el proyecto:
   `C:\Users\Cesar Fleitas\.gemini\antigravity\scratch\cf-cell`
2. Haz doble clic sobre el archivo **`index.html`** para abrirlo en cualquier navegador (Google Chrome, Microsoft Edge, etc.).
3. Para abrir el panel administrador:
   - Haz clic en el botón superior **"Panel Admin"** o en el botón **"Editar Catálogo"** junto al catálogo.
   - Podrás cargar tus productos reales, ajustar los precios y cambiar tu número de WhatsApp.

---

## 🌐 ¿Cómo subirla a Internet gratis?

Este proyecto está construido en HTML, CSS y JavaScript puro, por lo que puedes publicarlo gratuitamente en segundos usando:
- **Netlify Drop:** Solo arrastra la carpeta `cf-cell` en [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel:** Sube la carpeta con el CLI o vinculando tu repositorio de GitHub.
- **GitHub Pages:** Sube los archivos a un repositorio de GitHub y activa Pages en la configuración.
