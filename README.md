# Prueba Técnica Frontend - Gestión Escolar

## Descripción

Desarrollar una miniaplicación en Blazor que permita a los administradores del colegio gestionar **cursos**, **estudiantes** y **asignaturas**. La aplicación debe ser funcional, interactiva, y amigable, utilizando las tecnologías más recientes.

---

## Tecnologías Utilizadas

- **React**
- **Typescript**
- **CSS Modules**
- **Material UI** (para el diseño de componentes UI)
- **Sonner**
- **Zustand**
- **Driver JS**
- **Vite**
- **Despliegue en Vercel con CI/CD**

---

## Funcionalidades

### 1. **Home**
- Resumen general de los datos:
  - Número total de cursos, asignaturas y estudiantes.

---

### 2. **Gestión de Asignaturas**
- **Listado de Asignaturas**:
  - Tabla con columnas:
    - ID de la asignatura.
    - Nombre.
    - Descripción.
    - Botones para Agregar, Editar y Eliminar.
- **Formulario de Asignaturas**:
  - Agregar o editar asignaturas.
  - **Validaciones**:
    - Nombre con al menos 3 caracteres.
    - Descripción opcional, máximo 200 caracteres.

---

### 3. **Gestión de Estudiantes**
- **Listado de Estudiantes**:
  - Tabla con columnas:
    - ID del estudiante.
    - Nombre completo.
    - Edad.
    - Botones para Agregar, Editar y Eliminar.
- **Formulario de Estudiantes**:
  - Agregar o editar estudiantes.
  - **Validaciones**:
    - Nombre completo con al menos 3 caracteres.
    - Edad entre 5 y 18 años.

---

### 4. **Gestión de Cursos**
- **Listado de Cursos**:
  - Tabla con columnas:
    - Nombre del curso.
    - Color.
    - Ícono (URL o ícono de librerías como FontAwesome).
    - Cantidad de asignaturas y estudiantes vinculados.
    - Botón para Detalle del Curso.
- **Formulario de Cursos**:
  - Agregar o editar cursos.
  - **Validaciones**:
    - Nombre con al menos 3 caracteres.
    - Color hexadecimal válido.
- **Detalle del Curso**:
  - Información básica editable del curso.
  - Listado de asignaturas vinculadas:
    - Vincular/desvincular asignaturas.
    - Botón para agregar asignaturas desde esta vista.
    - Editar/eliminar asignaturas vinculadas.
  - Listado de estudiantes vinculados:
    - Vincular/desvincular estudiantes.
    - Botón para agregar estudiantes desde esta vista.
    - Editar/eliminar estudiantes vinculados.

---

## Diseño de Interfaz
1. Limpio y responsivo utilizando **MudBlazor**.
2. Tablas con búsqueda y paginación.
3. Modales para agregar/editar asignaturas, estudiantes y cursos.
4. Menú de navegación:
   - Home, Asignaturas, Estudiantes, Cursos.

---

## Criterios de Evaluación
1. **Organización del Código**:
   - Modularidad en componentes Blazor.
   - Uso de servicios para manejar datos y estados.
2. **Interactividad**:
   - Binding correcto para datos dinámicos.
   - Validaciones claras en formularios.
3. **Funcionalidad Completa**:
   - CRUD para asignaturas, estudiantes y cursos.
   - Vinculación/desvinculación correcta de datos.
4. **Manejo de Estados**:
   - Actualización en tiempo real de tablas tras operaciones.
5. **Diseño**:
   - Interfaz amigable y fácil de usar.

---

## Datos Iniciales
- **Asignaturas**:
  - Matemáticas.
  - Historia.
  - Ciencias Naturales.
- **Estudiantes**:
  - María Pérez (10 años).
  - Juan López (12 años).
  - Ana García (9 años).
- **Cursos**:
  - "Primaria 1" (Color: Azul).
  - "Primaria 2" (Color: Verde).

---

## Puntos Bonus
1. **API Simulada**:
   - Servicio que simule llamadas REST.
2. **Estado Global**:
   - Uso de `Gestión de estado` o `Context`.
3. **Pruebas Unitarias**:
   - Pruebas básicas para componentes o servicios.
4. **Filtro Avanzado**:
   - Filtrar estudiantes/asignaturas por criterios específicos.

---

## Instrucciones de Configuración
1. Clonar este repositorio.
2. cd <lirmi-challenge-react>
3. Instala las dependencias:
   ```bash
   npm i
3. Ejecutar el proyecto:
   ```bash
   npm run dev
2. Se puede ver deploy en [Vercel](https://lirmi-challenge-react.vercel.app/).

## Autor

[Francisco Molina](https://www.linkedin.com/in/franciscomolina-dev)