# Tareas: juego-notas

Comandos: `node --test` (tests) · `python3 -m http.server 8000` (probar en local).

## Fase 1: primera porción jugable

- [x] **Tarea 1: Lógica de notas y textos** (S)
  - Qué: `notes.js` con los 4 niveles, nombres ES/EN, frecuencias, nota al azar sin repetir la anterior y posición en el pentagrama (incluidas las líneas adicionales). `i18n.js` con la estructura ES/EN y los primeros textos.
  - Aceptación:
    - Las notas de cada nivel coinciden con la tabla de `SPEC.md`.
    - La4 = 440 Hz y Do4 ≈ 261,63 Hz.
    - Do4 y La5–Do6 indican sus líneas adicionales.
    - `randomNote` nunca devuelve la nota anterior.
    - ES y EN tienen las mismas claves.
  - Verificar: `node --test`
  - Archivos: `src/notes.js`, `src/i18n.js`, `tests/notes.test.js`, `tests/i18n.test.js`
  - Depende de: nada

- [x] **Tarea 2: Una nota en pantalla y responder** (M)
  - Qué: `index.html` y `styles.css` mínimos. `staff.js` dibuja en SVG el pentagrama con clave de sol y la nota. Debajo hay 7 botones; al pulsar uno se ve "¡Bien!" o "Inténtalo otra vez" y sale otra nota (nivel 3 fijo, sin puntos).
  - Aceptación:
    - Las notas se dibujan en su sitio.
    - La respuesta correcta se reconoce.
    - Cabe en 360×640 sin desplazar la pantalla.
  - Verificar: tests + captura en móvil de varias notas, incluida una con línea adicional.
  - Archivos: `index.html`, `styles.css`, `src/staff.js`, `src/app.js`, `src/i18n.js`
  - Depende de: 1

### Punto de control 1: tests en verde, porción jugable, revisión contigo

## Fase 2: modo individual completo

- [x] **Tarea 3: Sonido** (S)
  - Qué: `audio.js` hace sonar la nota al aparecer, con sonido distinto para acierto y para fallo, y añade el botón de silencio. El audio se activa al primer toque.
  - Aceptación:
    - Suenan las tres cosas.
    - El silencio lo apaga todo.
    - Sin audio disponible, el juego sigue funcionando.
  - Verificar: comprobación manual en el navegador; captura del botón de silencio.
  - Archivos: `src/audio.js`, `src/app.js`, `index.html`
  - Depende de: 2

- [x] **Tarea 4: Partida de 20 notas con puntos y tiempo** (M)
  - Qué: `scoring.js` calcula 10 puntos más 1 por segundo sobrante y cuenta los aciertos. Hay temporizador por nivel; al agotarse cuenta como fallo. Al final, pantalla de resultado.
  - Aceptación:
    - La puntuación es correcta con y sin tiempo sobrante.
    - El tiempo agotado cuenta como fallo.
    - Tras 20 notas se ve el resultado.
  - Verificar: `node --test` + partida completa en el navegador.
  - Archivos: `src/scoring.js`, `tests/scoring.test.js`, `src/app.js`, `src/i18n.js`, `styles.css`
  - Depende de: 2

- [x] **Tarea 5: Inicio, niveles, récords e idioma** (M)
  - Qué: pantalla de inicio con "Individual / Pizarra", selector ES/EN y silencio. Selector de los 4 niveles (todos libres) con el récord de cada uno. `storage.js` guarda récords, idioma y silencio. Todos los textos, también en inglés A1.
  - Aceptación:
    - El récord se guarda al recargar.
    - "Récord nuevo" solo aparece si se supera.
    - En EN no queda ningún texto en español.
    - El idioma se recuerda.
  - Verificar: tests + capturas de inicio y niveles en ES y EN + recargar la página.
  - Archivos: `src/storage.js`, `src/app.js`, `src/i18n.js`, `index.html`, `styles.css`
  - Depende de: 3, 4

### Punto de control 2: modo individual de principio a fin en ES y EN, revisión contigo

## Fase 3: modo pizarra

- [x] **Tarea 6: Reglas del duelo** (S)
  - Qué: `duel.js` gestiona una ronda entre Rojo y Azul (el primero que acierta gana, quien falla queda bloqueado, si fallan los dos o se acaba el tiempo nadie suma) y el marcador de la partida.
  - Aceptación: los casos de la estrategia de tests de `SPEC.md` pasan.
  - Verificar: `node --test`
  - Archivos: `src/duel.js`, `tests/duel.test.js`
  - Depende de: 1

- [ ] **Tarea 7: Pantalla dividida para dos equipos** (M)
  - Qué: configuración (nivel y 5, 10 o 15 rondas). Partida en dos mitades con la misma nota, un solo sonido de nota, multitáctil con Pointer Events y bloqueo visual del equipo que falla. Resultado con ganador y revancha.
  - Aceptación:
    - Partida de 10 rondas completa.
    - Dos toques simultáneos en mitades distintas se registran los dos.
    - Cabe en 1920×1080.
  - Verificar: tests + captura a 1920×1080 + simulación de toques simultáneos con Chromium.
  - Archivos: `src/app.js`, `src/i18n.js`, `index.html`, `styles.css`
  - Depende de: 5, 6

### Punto de control 3: modo pizarra completo, revisión contigo

## Fase 4: publicar

- [ ] **Tarea 8: README y GitHub Pages** (S)
  - Qué: README breve (qué es, cómo jugar, cómo probar en local). Publicar en GitHub Pages desde `main`, previa confirmación tuya.
  - Aceptación: el enlace público abre el juego en el móvil.
  - Verificar: abrir el enlace; la lista final de comprobación la haces tú en el móvil y en la pizarra.
  - Archivos: `README.md`
  - Depende de: 7

### Punto de control final: todos los criterios de éxito de `SPEC.md`
