# Arquitectura de PailApp Front

Este proyecto es una app móvil hecha con Expo + React Native. La aplicación mezcla tres bloques principales:

- Navegación entre pantallas.
- Estado compartido para foro y recetas.
- Componentes visuales reutilizables para autenticación, foro, perfil y chatbot.

## Flujo General

1. `index.js` registra `App` como punto de entrada de Expo.
2. `App.tsx` carga tipografías, monta los providers globales y define el stack de navegación.
3. Cada archivo dentro de `src/Paginas` arma una pantalla completa.
4. Cada archivo dentro de `src/Componentes` encapsula una pieza reutilizable de interfaz o lógica visual.
5. Los contextos en `src/context` centralizan los datos compartidos entre pantallas.

## Carpetas Principales

### `src/Paginas`

Contiene las pantallas de navegación. Cada archivo representa una vista completa.

- `Carga.tsx`: splash inicial que espera unos segundos antes de ir a inicio.
- `Inicio.tsx`: pantalla de bienvenida con accesos a login y registro.
- `Login.tsx`: compone el formulario de inicio de sesión.
- `Registro.tsx`: compone el formulario de alta y el selector de avatar.
- `Foro.tsx`: muestra filtros, publicaciones y botón para crear receta.
- `Publicaciones.tsx`: pantalla detalle de una publicación y sus comentarios.
- `SubirReceta.tsx`: contenedor de la pantalla para crear una receta/publicación.
- `MisPlatoss.tsx`: lista de recetas guardadas por el usuario.
- `MisPlatosPerfil.tsx`: lista de recetas creadas por el usuario.
- `Configuracion.tsx`: acceso a acciones de configuración.
- `EditarPerfil.tsx`: formulario básico para editar datos del perfil.
- `Chatbot/Chatbot.tsx`: layout principal del chatbot.
- `Chatbot/Chatbot_Voz.tsx`: abre el chatbot arrancando en modo voz.
- `Chatbot/Chatbot_Conversacion.tsx`: pantalla antigua o alternativa de conversación.

### `src/Componentes`

Aquí viven las piezas reutilizables de UI.

- Encabezados y navegación: `Header.tsx`, `Header_pailapp.tsx`, `Navbar.tsx`.
- Formularios: `Formu_Inicio.tsx`, `Formu_Registro.tsx`, `FormSubirReceta.tsx`.
- Foro y publicaciones: `PublicacionCard.tsx`, `DetallesPublicacion.tsx`, `ComentarioItem.tsx`, `Filtros.tsx`.
- Perfil y utilidades: `Seleccionar_Avatar.tsx`, `PlatoGuardadoCard.tsx`, `PlatoPerfilCard.tsx`, `BotonAgregar.tsx`.
- Feedback visual: `Notificacion.tsx`, `ToastMensaje.tsx`, `ModalConfirmacion.tsx`, `ModalConfirmacion2.tsx`.
- Chatbot: `Chatbot/ChatbotPrincipal.tsx` y `Chatbot/ChatbotVoz.tsx`.

### `src/context`

Guarda estado global accesible desde varias pantallas.

- `ForoContext.tsx`: maneja publicaciones, guardados, likes y comentarios.
- `RecetasContext.tsx`: mantiene una lista simple de recetas del usuario.

### `src/Estilos`, `src/Componentes/css` y `src/Paginas/css`

Separan los `StyleSheet` por dominio para mantener componentes y pantallas más limpios.

## Archivos Clave

### `App.tsx`

Es el centro de arranque de la app. Hace tres cosas importantes:

- Espera a que la tipografía esté disponible.
- Envuelve la aplicación con `RecetasProvider` y `ForoProvider`.
- Declara todas las rutas del stack de navegación.

### `src/Componentes/Chatbot/ChatbotPrincipal.tsx`

Es el módulo más complejo del proyecto. Controla:

- El historial de mensajes.
- El envío al backend en modo streaming o modo fallback.
- La síntesis de voz para reproducir respuestas.
- El reconocimiento de voz con `expo-speech-recognition`.
- La transición visual entre modo chat y modo robot expandido.

### `src/context/ForoContext.tsx`

Funciona como una pequeña base de datos en memoria para el foro. Desde aquí se crean publicaciones, se guardan recetas, se cuentan likes y se agregan comentarios o respuestas anidadas.

## Convención de Comentarios Añadida

Para que el proyecto sea más fácil de leer, se añadieron dos niveles de documentación:

- Comentarios de cabecera en cada archivo para explicar su responsabilidad.
- Comentarios internos solo en las zonas con lógica menos evidente.

La idea no es describir cada línea, sino dejar claro:

- qué resuelve el archivo,
- qué parte de la app afecta,
- y por qué cierta lógica existe.
