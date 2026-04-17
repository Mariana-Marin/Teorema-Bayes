# Proyecto: Teorema de Bayes - Aplicación Interactiva

## Descripción

Aplicación React + TypeScript interactiva y visualmente rica que enseña el Teorema de Bayes mediante:
- Animaciones suaves con Framer Motion
- Visualizaciones interactivas (drag & drop, flip cards)
- 5 secciones temáticas (Historia, Ecuación, Comparación, Mundo Real, Juego Misterio)
- Navegación sin scroll (100vh por pantalla)

## Stack Tecnológico

- **Frontend**: React 19.2 + TypeScript
- **Estilos**: Tailwind CSS 3.4
- **Animaciones**: Framer Motion 12
- **Build**: Vite 8
- **Node**: v16+

## Estructura del Proyecto

```
src/
├── components/
│   ├── Navigation.tsx           # Barra de navegación superior
│   ├── FloatingButtons.tsx      # Botones Anterior/Siguiente flotantes
│   └── sections/
│       ├── Section1.tsx         # Historia e Introducción (Thomas Bayes)
│       ├── Section2.tsx         # La Ecuación (P(A|B) = ...)
│       ├── Section3.tsx         # Probabilidad Normal vs Inversa
│       ├── Section4.tsx         # Bayes en el Mundo Real (WWII, Ajedrez, Poker, IA)
│       └── Section5.tsx         # El Juego del Misterio (Mona Lisa - Drag & Drop)
├── App.tsx                      # Componente raíz (orquestador de secciones)
├── main.tsx                     # Punto de entrada
└── index.css                    # Estilos globales + Tailwind

```

## Características Principales

### Sección 1: Historia e Introducción
- Ilustración SVG de Thomas Bayes
- Animaciones de entrada y órbitas decorativas
- Introducción al concepto del teorema

### Sección 2: La Ecuación
- Fórmula matemática formatizada
- Variables interactivas con tooltips explicativos (hover)
- 4 variables: P(A|B), P(B|A), P(A), P(B)

### Sección 3: Probabilidad Normal vs Inversa
- Comparación visual Frecuentista vs Bayesiana
- Animaciones de monedas (normal vs maldita)
- Explicación del razonamiento inverso de Bayes

### Sección 4: Bayes en el Mundo Real
- 4 tarjetas interactivas con flip animation (3D):
  - 🎖️ WWII: Descifrando Enigma
  - ♟️ Ajedrez: Cálculo de movimientos
  - 🎰 Poker: Ajuste de apuestas
  - 🤖 IA: Machine Learning y filtrado de spam

### Sección 5: El Juego del Misterio (Mona Lisa)
- **Escenario**: Robo de la Mona Lisa en 1911
- **4 Sospechosos**: 
  - Picasso (🎨)
  - Apollinaire (✍️)
  - Pieret (💼)
  - Peruggia (🚪)
- **3 Pistas** (Drag & Drop):
  1. Testigo vio bata blanca
  2. Requirió conocimiento de cristales
  3. Requirió fuerza física inmensa
- **Visualización**: Barra animada de probabilidades
- **Resultado Final**: Vincenzo Peruggia (culpable histórico)

## Desarrollo

### Instalación
```bash
npm install
```

### Servidor de Desarrollo
```bash
npm run dev
# Accesible en http://localhost:5173/
```

### Build Producción
```bash
npm run build
```

### Vista Previa Producción
```bash
npm run preview
```

## Decisiones de Diseño

1. **Framer Motion** para todas las animaciones (no CSS animations puro) para mejor control
2. **Tailwind CSS** para estilos utilities (menor bundle size)
3. **100vh sin scroll** para experiencia de presentación
4. **Estado local** en App.tsx para orquestación de secciones (sin necesidad de state management complejo)
5. **SVG nativo** para iconos y gráficos (sin dependencias de UI icons)
6. **TypeScript strict** para type safety

## Próximas Mejoras

- [ ] Responsiveness mejorado para mobile
- [ ] Sonidos/audio en transiciones
- [ ] Estadísticas de aprendizaje (quiz)
- [ ] Tema oscuro/claro configurable
- [ ] Exportación PDF de contenido
- [ ] Versión en otros idiomas

## Notas de Mantenimiento

- Los colores principales usan gradientes purple/cyan (verificar en tailwind.config.js)
- Las animaciones están calibradas para 60fps (inspeccionar con DevTools)
- Section5 tiene probabilidades hardcodeadas históricas (customizable en revealClue())
- Las transiciones entre secciones usan spring animation (ajustable)

---

**Última Actualización**: Abril 2026  
**Versión**: 1.0.0  
**Estado**: ✅ Completo y Funcional
