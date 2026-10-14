# Juego de notas

Juego web para practicar la **lectura de notas en clave de sol** en ESO. Se abre con un enlace: no hay que instalar nada ni registrarse.

## Cómo se juega

Al empezar se elige el modo y el idioma (español o inglés).

- **Individual:** para el móvil o el ordenador. Se elige uno de los 4 niveles y se responden 20 notas pulsando su nombre. Cada acierto da 10 puntos más 1 por cada segundo que sobre. Cada nivel guarda su récord en el dispositivo.
- **Pizarra (2 equipos):** para la pizarra digital. La pantalla se divide en Equipo Rojo y Equipo Azul, con la misma nota en las dos mitades. El primero que acierta gana el punto, y el equipo que falla queda bloqueado esa ronda. Se juegan 5, 10 o 15 rondas.

| Nivel | Notas | Tiempo por nota |
|---|---|---|
| 1. Líneas | Mi, Sol, Si, Re, Fa | 10 s |
| 2. Espacios | Fa, La, Do, Mi | 10 s |
| 3. Todo el pentagrama | Mi4 a Fa5 | 7 s |
| 4. Líneas adicionales | Do4 a Do6 | 5 s |

Cada nota suena al aparecer, y el acierto y el fallo tienen sonidos distintos. El botón 🔊 quita el sonido.

## Probar en local

```bash
python3 -m http.server 8000   # y abrir http://localhost:8000
node --test                   # tests de la lógica del juego
```

Hace falta servir la carpeta: abrir `index.html` con doble clic no funciona, porque usa módulos de JavaScript.

## Cómo está hecho

HTML, CSS y JavaScript sin dependencias ni compilación. La especificación está en [`SPEC.md`](SPEC.md) y el plan de trabajo en [`tasks/`](tasks/).

El diseño visual ("el metalófono del aula") está documentado en [`DESIGN.md`](DESIGN.md), y el producto en [`PRODUCT.md`](PRODUCT.md). La tipografía es Rubik (licencia OFL, `fonts/`).

| Archivo | Qué hace |
|---|---|
| `src/notes.js` | Niveles, nombres de notas, frecuencias y posición en el pentagrama |
| `src/scoring.js` | Puntos y récords del modo individual |
| `src/duel.js` | Reglas de las rondas del modo pizarra |
| `src/i18n.js` | Todos los textos en español e inglés |
| `src/staff.js` | Dibuja el pentagrama en SVG |
| `src/audio.js` | Sonidos con Web Audio |
| `src/storage.js` | Récords y preferencias en el navegador |
| `src/app.js` | Pantallas y lógica de la interfaz |
