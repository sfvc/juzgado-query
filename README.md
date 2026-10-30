# ⚖️ Juzgado de Faltas

Aplicación web para **gestionar los procesos del Juzgado de Faltas Municipal** de la Municipalidad de San Fernando del Valle de Catamarca.

Permite el **registro, seguimiento y resolución de infracciones municipales** de distintas áreas:

- 🚦 **Tránsito**
- 🍽️ **Bromatología**
- 🏗️ **Obras particulares**
- 🔍 **Inspecciones**
- 👮🏻‍♀️ **Policía ambiental**

---

## ✨ Funcionalidades

| Módulo | Qué permite |
|---|---|
| **Actas** | Alta, edición y seguimiento de actas, con archivos adjuntos, filtros avanzados y panel de detalle |
| **Estados** | Historial de estados de cada acta y cambio de estado |
| **Notificaciones** | Generación y seguimiento de notificaciones a partir de plantillas |
| **Actuaciones** | Expediente, sentencias (simples y múltiples), plan de pago y bandeja de cobro |
| **Acumuladas** | Agrupar actas de un mismo infractor para resolverlas juntas |
| **Plantillas** | Documentos Word con variables que se completan automáticamente |
| **Inhabilitados** | Registro y consulta de personas inhabilitadas |
| **Antecedentes** | Consulta y reporte de antecedentes de una persona |
| **Recaudación** | Planilla diaria de comprobantes por juzgado |
| **Descargo / Libre deuda** | Gestión de descargos y certificados de libre deuda |
| **Dashboard y auditoría** | Estadísticas de uso y registro de actividad (roles habilitados) |
| **Parámetros** | Artículos (con varias conductas cada uno), estados, rubros, propiedades, personas, vehículos, juzgados, usuarios, unidades de multa y datos de domicilio |

El sistema trabaja con **dos juzgados**. Cada usuario ve y opera las actas de su juzgado, y de las del otro puede consultar el historial de estados.

### Roles

`Admin`, `Juez`, `Secretario del Juez`, `Jefe de Área` y `Operador`. Algunas pantallas, como el Dashboard, la Auditoría y la Recaudación, se muestran solo a ciertos roles.

---

## 🧰 Tecnologías

- ⚛️ **React 18** + **TypeScript**, compilado con **Vite**
- 🎨 **Tailwind CSS** + **Flowbite React** (componentes)
- 🔗 **TanStack Query** (datos y caché)
- 📝 **React Hook Form** + **Yup** (formularios y validaciones)
- 🧭 **React Router 6**
- 📄 **Carbone** (servidor externo que genera los documentos a partir de plantillas Word)
- 🐳 **Docker** + **Nginx** para producción

---

## 🚀 Puesta en marcha

### Requisitos

- **Node.js 22** o superior (es la versión que usa el Dockerfile)
- Acceso a la **API del juzgado** y al **servidor de Carbone**

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/sfvc/juzgado-query.git
   cd juzgado-query
   ```

2. **Instalar las dependencias**
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno.** Copiá el ejemplo y completá los valores:
   ```bash
   cp .env-example .env
   ```

   | Variable | Para qué sirve |
   |---|---|
   | `VITE_API_URL` | URL base de la API del juzgado. Ej: `https://api-test-juzgado.cc.gob.ar/api/v1` |
   | `VITE_TEMPLATE_URL` | Servidor de plantillas de Carbone (subir y descargar plantillas) |
   | `VITE_CARBONE_URL` | Servicio de Carbone que genera los documentos |

   > El archivo `.env` no se sube al repositorio. Las variables se incorporan **al compilar**, por lo que hay que reiniciar el servidor de desarrollo si cambian.

4. **Levantar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la versión compilada |
| `npm run lint` | Revisa el código con ESLint |
| `npx tsc --noEmit -p tsconfig.app.json` | Verifica los tipos de TypeScript |

> ⚠️ `npm run build` **no verifica tipos** (solo compila). Antes de subir cambios conviene correr también el comando de tipos y `npm run lint`. Usá `-p tsconfig.app.json`: con `-p .` TypeScript no revisa ningún archivo en este proyecto.

---

## 🗂️ Estructura del proyecto

```
src/
├── api/            Cliente HTTP (axios) y manejo de sesión vencida
├── auth/           Login, roles y rutas protegidas
├── context/        Estado global: sesión, tema y actas seleccionadas
├── layout/         Barra de navegación, menú de usuario y novedades
├── modules/        Un directorio por módulo del sistema
│   ├── actas/
│   ├── actuaciones/
│   ├── carbone/    Generación de documentos y variables de plantillas
│   ├── parametros/ Artículos, estados, rubros, juzgados, domicilio, etc.
│   └── ...
├── routes/         Rutas públicas y privadas (carga diferida por pantalla)
└── shared/         Componentes, hooks, helpers e íconos reutilizables
```

Cada módulo sigue la misma organización: `pages/` (pantallas), `components/` y `forms/`, `hooks/` (datos con TanStack Query), `services/` (llamadas a la API) e `interfaces/` (tipos).

### Convenciones útiles

- **Listados con alta, edición y baja**: usan `useCrudModals` (estado de los modales) y `useCrudMutations` (mutaciones con avisos y refresco de caché), ambos en `src/shared/hooks/`.
- **Refrescar datos tras un cambio**: `useInvalidate` agrupa las consultas relacionadas en `QUERY_GROUPS`. Si una pantalla muestra datos viejos después de editar algo, falta agregar la consulta a su grupo.
- **Caché**: por defecto los datos se consideran frescos 5 minutos (ver `src/plugins/TanStackProvider.tsx`). Una consulta que deba pedirse siempre al abrir la pantalla necesita `staleTime: 0`.
- **Almacenamiento local**: no usar `localStorage.clear()`. Se guardan el tema (`theme`), la sesión (`token`) y filtros; al vencer la sesión solo se borran estos dos últimos.
- **Fechas en documentos**: usar `formatDateDMY` (`src/shared/helpers/formatDate.ts`) para que salgan como DD/MM/AAAA.

---

## 📄 Plantillas y variables

Los documentos se generan con **Carbone** a partir de plantillas Word (`.docx`) que usan variables con el formato `{d.nombreVariable}`.

Las variables disponibles se definen en dos archivos de `src/modules/carbone/helpers/` que **deben mantenerse iguales**:

- `formatData.ts`: los valores reales que se envían al generar un documento.
- `dictionary.ts`: los nombres que se muestran en la vista previa de una plantilla.

Si se agrega o renombra una variable hay que cambiarla en ambos. Una variable que figura en el diccionario pero no en `formatData` sale **vacía** en el documento final. En `src/assets/files/` están el diccionario de variables (`diccionario-juzgado-de-faltas.docx`) y plantillas de ejemplo.

---

## 🆕 Novedades del sistema

El botón ✨ de la barra superior muestra a los usuarios los últimos cambios, escritos en lenguaje simple. Para agregar una novedad, sumá un bloque al principio de `src/layout/data/novedades.ts` con la fecha, el tipo (`nuevo`, `mejora` o `correccion`), un título y una descripción.

---

## 🚢 Despliegue

El despliegue es automático con **GitHub Actions** (`.github/workflows/main.yml`) al hacer *push*:

| Rama | Entorno | Qué hace |
|---|---|---|
| `main` | Producción | Conecta por SSH al servidor, actualiza el código, construye la imagen Docker y reinicia el contenedor `juzgado-query` |
| `development` | Pruebas | Igual, pero con la API de pruebas y el contenedor `juzgado-query-dev` |

La imagen se construye en dos etapas: `node:22-alpine` compila la aplicación y `nginx:alpine` la sirve (con redirección al `index.html` para las rutas de la aplicación). Las URL del entorno se pasan como `--build-arg` al construir.

El flujo usa estos *secrets* del repositorio: `SSH_HOST`, `SSH_USER`, `SSH_PASSWORD`, `SSH_PORT` y `WORK_DIR` (y sus equivalentes `SSH_DEV_*` y `DEV_WORK_DIR` para pruebas). Si el despliegue falla con `unable to authenticate`, hay que revisar que usuario y contraseña sigan vigentes en el servidor.

Para probar la imagen localmente:

```bash
docker build \
  --build-arg VITE_API_URL=<url-api> \
  --build-arg VITE_TEMPLATE_URL=<url-plantillas> \
  --build-arg VITE_CARBONE_URL=<url-carbone> \
  -t juzgado-query .
docker run -p 8080:80 juzgado-query
```

---

## 👥 Equipo

Desarrollado por el área de **Modernización de la Municipalidad de San Fernando del Valle de Catamarca**.
