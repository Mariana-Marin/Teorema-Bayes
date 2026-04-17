# Teorema de Bayes - Aplicación Interactiva

Una aplicación web altamente visual e interactiva que enseña el Teorema de Bayes a través de animaciones, infografías y experiencias interactivas.

## 🎯 Características

- **Sin Scroll (100vh)**: La aplicación funciona como una presentación de diapositivas interactiva que ocupa el 100% de la altura de la pantalla
- **5 Secciones Completas**:
  1. Historia e Introducción - Thomas Bayes con animaciones
  2. La Ecuación - Fórmula interactiva con tooltips explicativos
  3. Probabilidad Normal vs Inversa - Visualización de monedas animadas
  4. Bayes en el Mundo Real - Tarjetas interactivas (WWII, Ajedrez, Poker, IA)
  5. El Juego del Misterio - Drag and drop de pistas con cálculo bayesiano en tiempo real

- **Animaciones Suave**: Transiciones entre secciones con Framer Motion
- **Navegación Intuitiva**: 
  - Barra superior con todos los temas
  - Botones flotantes Anterior/Siguiente en la esquina inferior derecha
  - Barra de progreso animada

## 🛠️ Tecnologías

- **React 19.2** - Framework UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 3.4** - Utilidades de estilos
- **Framer Motion 12** - Animaciones avanzadas
- **Vite 8** - Herramienta de construcción rápida

## 📋 Requisitos

- Node.js 16+ 
- npm 8+ o yarn

## 🚀 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

El servidor de desarrollo se inicia en `http://localhost:5173/`

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Navigation.tsx        # Barra de navegación superior
│   ├── FloatingButtons.tsx   # Botones Anterior/Siguiente
│   └── sections/
│       ├── Section1.tsx      # Historia e Introducción
│       ├── Section2.tsx      # La Ecuación
│       ├── Section3.tsx      # Normal vs Inversa
│       ├── Section4.tsx      # Mundo Real
│       └── Section5.tsx      # El Juego del Misterio
├── App.tsx                   # Componente principal
├── main.tsx                  # Punto de entrada
└── index.css                 # Estilos globales + Tailwind
```

## 🎮 Uso de Secciones

### Sección 1: Historia e Introducción
- Presenta a Thomas Bayes con una ilustración animada
- Introduce el concepto del teorema

### Sección 2: La Ecuación
- Muestra la fórmula: P(A|B) = P(B|A) × P(A) / P(B)
- **Interactivo**: Hover sobre cada variable para ver su significado

### Sección 3: Normal vs Inversa
- Compara enfoque Frecuentista vs Bayesiano
- Animaciones de monedas (normal vs maldita)

### Sección 4: Mundo Real
- 4 tarjetas interactivas que se voltean:
  - WWII: Descifrando Enigma
  - Ajedrez: Cálculo de movimientos
  - Poker: Ajuste de apuestas
  - IA: Machine Learning y filtrado de spam

### Sección 5: El Juego del Misterio (Mona Lisa)
- **Mecánica**: 4 sospechosos con 25% probabilidad inicial
- **Drag & Drop**: Arrastra 3 pistas para revelarlas
- **Interactivo**: Visualización en tiempo real de cambios de probabilidad
- **Resultado**: Identifica al culpable histórico (Vincenzo Peruggia)

## 🎨 Personalizaciones

### Cambiar Colores
Edita el `tailwind.config.js` en la sección `theme.extend` o modifica las clases de Tailwind en los componentes.

### Agregar Nuevas Secciones
1. Crea un nuevo componente en `src/components/sections/`
2. Importalo en `App.tsx`
3. Agrégalo al array `SECTIONS` y al `renderSection()`

### Ajustar Animaciones
Todas las animaciones usan Framer Motion. Consulta la documentación en https://www.framer.com/motion/

## 📱 Responsiveness

La aplicación está optimizada para pantallas de escritorio con resolución mínima de 1024px. Para dispositivos móviles, se recomienda usar en modo horizontal (landscape).

## 🧮 Cálculos Bayesianos en Section5

Los cambios de probabilidad están configurados para el contexto histórico:
- **Pista 1** (Bata blanca): Favorece a Picasso
- **Pista 2** (Cristales): Favorece a Pieret  
- **Pista 3** (Fuerza): Favorece a Peruggia

Se pueden personalizar en el archivo `Section5.tsx` en la función `revealClue()`.

## 📄 Licencia

Este proyecto es libre de usar con fines educativos.

---

**Versión**: 1.0.0  
**Año**: 2026
```
