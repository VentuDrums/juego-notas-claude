---
name: Juego de notas
description: Juego de lectura de notas en clave de sol con el instrumental Orff del aula como mundo visual.
colors:
  ground: "#eef2f6"
  surface: "#ffffff"
  ink: "#14213d"
  ink-soft: "#3a4a6b"
  line: "#c9d2de"
  ok: "#12805c"
  ko: "#c62828"
  team-red: "#c62828"
  team-blue: "#1d4ed8"
  note-c: "#e2342d"
  note-d: "#f28c1b"
  note-e: "#f7ce2a"
  note-f: "#8cc63f"
  note-g: "#15a388"
  note-a: "#6a4bc4"
  note-b: "#d6337e"
typography:
  title:
    fontFamily: "Rubik, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  heading:
    fontFamily: "Rubik, system-ui, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  score:
    fontFamily: "Rubik, system-ui, sans-serif"
    fontSize: "2.6rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  label:
    fontFamily: "Rubik, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Rubik, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  bar: "10px"
  control: "12px"
  card: "14px"
  team: "20px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "20px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.card}"
    padding: "10px 16px"
    height: "60px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.card}"
    padding: "10px 16px"
    height: "60px"
  toggle-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "8px 18px"
    height: "52px"
  answer-bar-c:
    backgroundColor: "{colors.note-c}"
    textColor: "{colors.surface}"
    rounded: "{rounded.bar}"
  answer-bar-e:
    backgroundColor: "{colors.note-e}"
    textColor: "{colors.ink}"
    rounded: "{rounded.bar}"
  staff-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
---

# Design System: Juego de notas

## Overview

**Creative North Star: "El metalófono del aula"**

El juego toma su mundo del instrumental Orff que hay en cualquier aula de Música: xilófonos, metalófonos y boomwhackers, donde cada nota tiene su color. Ese mundo aporta cuatro cosas y solo esas: la paleta, la tipografía redonda y gruesa, una densidad generosa pensada para tocar con el dedo, y un gesto propio. Los botones de respuesta son láminas que se golpean, y al acertar la nota del pentagrama se tiñe del color de su lámina.

Todo lo demás es una interfaz de juego corriente: botones, barra de tiempo, marcador. Se proyecta en aulas con luz y se juega en móviles, así que el fondo es claro y frío y la tinta es casi negra, con contraste alto en todo.

**Key Characteristics:**
- Siete colores de nota, siempre ligados a su nota y nunca usados como decoración suelta.
- Láminas de respuesta de largo decreciente, de Do a Si, con dos clavijas.
- Fondo de aluminio claro y frío, tinta azul marino, tarjetas blancas.
- Rubik redonda y gruesa, autoalojada, con cifras tabulares.

## Colors

### Primary
- **Tinta marino** (`ink`, #14213d): texto, botón principal, barra de tiempo, pentagrama.

### Neutral
- **Aluminio** (`ground`, #eef2f6): fondo de página. Frío a propósito: nunca crema.
- **Blanco tarjeta** (`surface`, #ffffff): pentagrama, botones secundarios.
- **Tinta suave** (`ink-soft`, #3a4a6b): texto secundario (récords, subtítulos).
- **Línea** (`line`, #c9d2de): bordes y pista de la barra de tiempo.

### Notas (código boomwhacker)
Do `note-c` rojo, Re `note-d` naranja, Mi `note-e` amarillo, Fa `note-f` verde lima, Sol `note-g` verde azulado, La `note-a` morado, Si `note-b` magenta. El texto sobre la lámina es blanco en Do, La y Si, y tinta en Re, Mi, Fa y Sol, para cumplir el contraste de texto grande.

### Estados y equipos
- `ok` #12805c y `ko` #c62828 solo para acierto, fallo y tiempo agotado.
- `team-red` y `team-blue` solo para el marco, el nombre y el marcador de cada equipo.

### Named Rules
**The One Note, One Colour Rule.** Un color de nota solo aparece donde está esa nota: su lámina, sus puntos en la tarjeta de nivel, la cabeza de la nota acertada y la franja de firma. Nunca como acento genérico.

**The Cold Ground Rule.** El fondo es aluminio frío. Un fondo crema o cálido rompe el mundo y baja el contraste proyectado.

## Typography

Rubik variable (300–900), autoalojada en `fonts/rubik.woff2` con licencia OFL. No hay segunda familia.

### Hierarchy
- **Título** 1.5rem/800, con el logotipo de siete láminas.
- **Encabezado de pantalla** 1.6rem/800, centrado.
- **Marcador** 2.6rem/800 (resultado) y 2.4rem (equipos), con cifras tabulares.
- **Etiqueta** 1.2rem/700 en botones; láminas de 1.15rem en el móvil a 2.1rem en la pizarra.
- **Secundario** 1rem/500 en `ink-soft`.

### Named Rules
**The Tabular Score Rule.** Toda cifra que cambia (puntos, nota n/20, ronda, marcador) usa cifras tabulares para no bailar.

## Layout

- Una columna de hasta 640 px en el modo individual. En la partida, las láminas van abajo, al alcance del pulgar (`margin-top: auto`).
- Pizarra: ancho completo, dos mitades iguales en horizontal y una debajo de otra en vertical. Los altos se escalan con `vh` para caber sin desplazar la pantalla desde 1366×768.
- Ritmo de espaciado: 6, 10, 16 y 20 px.

## Elevation & Depth

Sombras suaves con desplazamiento y desenfoque, nunca bloques duros.

- **Tarjeta** `0 3px 8px rgb(20 33 61 / 0.16)`: pentagrama y botones.
- **Lámina** `0 4px 8px rgb(20 33 61 / 0.22)` más un canto inferior interior (`inset 0 -4px 0 rgb(0 0 0 / 0.14)`), que es el grosor de la lámina. Al golpearla baja 4 px y la sombra se reduce.

## Shapes

Esquinas redondeadas moderadas: lámina 10 px, controles 12 px, tarjetas 14 px, marco de equipo 20 px con borde de 6 px. Las clavijas son círculos de 8 px.

## Components

### Buttons
Principal en tinta con texto blanco y secundario en blanco con borde `line`, ambos de 60 px de alto. Al pulsarlos bajan 2 px y pierden la sombra. Foco visible: contorno de 3 px en tinta, separado 3 px.

### Toggles (idioma, nivel y rondas de la pizarra)
Botones de 52 px. El seleccionado se invierte a tinta con texto blanco y lleva `aria-pressed`.

### Tarjeta de nivel
Botón ancho con el nombre del nivel, una fila de puntos de color con las notas que salen en él y el récord en `ink-soft`.

### Pentagrama
Tarjeta blanca con la clave de sol y la redonda en SVG, en tinta. La cabeza de la nota se rellena con el color de la lámina acertada (180 ms, ease-out).

### Lámina de respuesta (componente propio)
Siete láminas en fila, de Do a Si, con largo decreciente del 100 % al 64 % (`--len`), color de su nota, dos clavijas y el nombre en el centro. Equipo bloqueado: láminas en gris al 40 %. Tras un fallo (o al acabar la ronda en la pizarra) la lámina correcta se ilumina: color completo, contorno de 4 px en tinta y un pequeño salto, y la nota se rellena de su color.

### Barra de tiempo
Pista `line` de 12 px y relleno en tinta, que pasa a `ko` por debajo del 30 % del tiempo.

## Do's and Don'ts

### Do:
- Do ligar cada color de nota a su nota y a nada más.
- Do mantener el contraste alto pensando en un proyector en un aula con luz.
- Do usar iconos SVG dibujados en el mismo trazo (2.2 px, redondeado).
- Do respetar `prefers-reduced-motion`: sin transiciones.

### Don't:
- Don't usar un fondo crema o cálido.
- Don't usar los colores de nota como decoración o como colores de estado.
- Don't usar emojis o glifos como iconos.
- Don't añadir sombras duras desplazadas, texto con degradado o etiquetas encima de los encabezados.
- Don't usar la tipografía del sistema como voz principal: es Rubik.
