# Plan de implementación: juego-notas

## Resumen

Juego web estático (HTML, CSS y JS sin dependencias) para practicar la lectura de notas en clave de sol, con un modo individual y un modo pizarra de dos equipos con pantalla dividida, sonido e interfaz ES/EN. Se construye en porciones verticales: cada tarea deja algo que se puede abrir y jugar. Ver `SPEC.md`.

## Decisiones de arquitectura

- **Sin compilación ni dependencias.** Son módulos ES servidos tal cual, de modo que GitHub Pages publica la raíz del repo directamente.
- **La lógica pura va aparte del navegador.** `notes.js`, `scoring.js`, `duel.js` e `i18n.js` no tocan el DOM ni el audio, y se prueban con `node --test`. `staff.js`, `audio.js`, `storage.js` y `app.js` son la capa del navegador y se comprueban a mano.
- **Textos desde el primer día en `i18n.js`.** Cada tarea añade sus textos en los dos idiomas, para no tener que reescribir pantallas después.
- **Multitáctil con Pointer Events.** Cada mitad de la pantalla atiende sus propios toques, sin compartir estado de "botón pulsado". Así dos toques simultáneos no se pisan.
- **Audio que se activa al primer toque.** Los navegadores bloquean el sonido hasta que el usuario interactúa, así que se activa al pulsar el primer botón. Si falla, el juego sigue sin sonido.
- **Capturas para revisar.** Se harán con el Chromium que ya tiene la sesión, desde scripts temporales que no se guardan en el repo.

## Grafo de dependencias

```
notes.js ──┬── staff.js ──┐
           │              ├── app.js (individual) ── storage.js ── app.js (inicio)
i18n.js ───┤   audio.js ──┤
           │  scoring.js ─┘
           └── duel.js ──────── app.js (pizarra)
```

## Lista de tareas

### Fase 1: primera porción jugable
- [x] Tarea 1: Lógica de notas y textos
- [x] Tarea 2: Una nota en pantalla y responder

### Punto de control 1
- [x] Los tests pasan
- [x] Se ve una nota, se pulsa un botón y dice si es correcto
- [ ] Revisión contigo (captura en móvil)

### Fase 2: modo individual completo
- [ ] Tarea 3: Sonido
- [ ] Tarea 4: Partida de 20 notas con puntos y tiempo
- [ ] Tarea 5: Inicio, niveles, récords e idioma

### Punto de control 2
- [ ] Modo individual de principio a fin, en ES y EN
- [ ] Revisión contigo

### Fase 3: modo pizarra
- [ ] Tarea 6: Reglas del duelo
- [ ] Tarea 7: Pantalla dividida para dos equipos

### Punto de control 3
- [ ] Partida de 10 rondas completa en 16:9 con toques simultáneos (simulados)
- [ ] Revisión contigo

### Fase 4: publicar
- [ ] Tarea 8: README y GitHub Pages

### Punto de control final
- [ ] Todos los criterios de éxito de `SPEC.md` cumplidos
- [ ] Probado por ti en el móvil y en la pizarra real

## Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|---|---|---|
| La pizarra real no detecta dos toques a la vez | Alto | Se prueba en cuanto exista la Tarea 7. Aquí solo se puede simular, así que la prueba real la haces tú en clase. |
| Safari (iPhone) no suena hasta un toque, o suena con retraso | Medio | Activar el audio en el primer toque y probar en un iPhone en el punto de control 2. |
| Notas con líneas adicionales mal colocadas en el pentagrama | Medio | Test de posición en `notes.js` y captura de las 15 notas del nivel 4. |
| Los botones no caben en un móvil pequeño o en media pizarra | Medio | Capturas a 360×640 y 1920×1080 en cada punto de control. |
| GitHub Pages necesita activarse en la configuración del repo | Bajo | En la Tarea 8 te pido permiso y te explico el paso si no puedo hacerlo yo. |

## Preguntas abiertas

Ninguna.
