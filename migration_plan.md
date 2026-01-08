# Plan de Migración a React

El objetivo es refactorizar el sitio web actual (HTML/CSS/JS) a una aplicación moderna de **React (Vite)**. Esto permitirá modularizar componentes (Navbar, Footer, Hero), gestionar mejor el estado y escalar la aplicación fácilmente.

## 1. Configuración del Proyecto

- [ ] Crear estructura de proyecto React con Vite dentro de la carpeta `v2-react` (para no sobrescribir lo actual inmediatamente).
- [ ] Instalar dependencias clave:
  - `react-router-dom` (Navegación)
  - `gsap` (Animaciones)
  - `@fortawesome/fontawesome-free` (Iconos)

## 2. Migración de Estilos y Assets

- [ ] Mover carpeta `assets` a `v2-react/public/assets` o `v2-react/src/assets`.
- [ ] Migrar `style.css`:
  - Se puede importar globalmente en `main.jsx` inicialmente.
  - O refactorizar a CSS Modules / Styled Components (Recomendado: Importar globalmente primero para mantener diseño exacto, luego modularizar).

## 3. Arquitectura de Componentes

Identificamos los componentes reutilizables:

### Layout

- **`Layout.jsx`**: Contenedor principal que incluye `Navbar` y `Footer`.
- **`Navbar.jsx`**:
  - Lógica de menú responsive (hamburguesa).
  - Lógica de transparencia en Home vs Fondo blanco en otras páginas.
  - Links de navegación con `react-router-dom`.
- **`Footer.jsx`**: Pie de página estático.

### Home (Página de Inicio)

- **`Hero.jsx`**:
  - Carrusel de imágenes de fondo.
  - Animación de texto carácter por carácter (GSAP).
- **`CarouselSection.jsx`**: Componente reutilizable para "Diseños Recientes", "Más Vendidos", etc.
- **`StyleGrid.jsx`**: Grilla de estilos (Tipografía, Minimalista, etc.).

### Páginas de Categoría (e.g., Minimalist)

- **`CategoryPage.jsx`**: Plantilla genérica para categorías.
  - **`FilterBar.jsx`**: Barra de filtros y visualización.
  - **`ProductGrid.jsx`**: Grilla de productos.

### Inspiración

- **`Inspirate.jsx`**: Página de galería.
  - **`MasonryGrid.jsx`**: Layout tipo masonry para imágenes de inspiración.

### Modales

- **`ProductModal.jsx`**: Modal de detalle de producto.

## 4. Rutas (React Router)

- `/` -> `Home.jsx`
- `/minimalist` -> `CategoryPage.jsx` (con datos de minimalist)
- `/inspirate` -> `Inspirate.jsx`

## 5. Pasos de Ejecución

1.  Inicializar proyecto Vite.
2.  Copiar assets y estilos.
3.  Crear componentes base (`Navbar`, `Footer`).
4.  Crear páginas principales.
5.  Integrar lógica JS (GSAP, Dropdowns) en los componentes.
6.  Verificar que el diseño sea idéntico al original.
