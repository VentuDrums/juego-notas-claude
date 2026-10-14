# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Alumnado de ESO (12–16 años)**, de todos los cursos. Practican en casa, en su móvil o en el ordenador, y en clase compiten por equipos.
- **Profesorado de Música** (el autor del juego), que lo proyecta o lo abre en la pizarra digital del aula para hacer partidas de dos equipos, y lo manda para practicar en casa. Imparte también en programa bilingüe (inglés).

## Product Purpose
Practicar la lectura de notas en clave de sol hasta que salga sola. Los juegos que el profesor ya tenía (`pentagramapro`, `desafio-notas`) funcionaban pero no enganchaban. Este existe para que los alumnos practiquen más porque es un juego, con puntos, niveles, tiempo, sonido y competición. Éxito: una partida de 5 minutos en la pizarra sin fallos, y alumnos que lo abren en casa por su cuenta.

## Positioning
Un solo enlace sirve para dos escenas del aula: práctica individual en el móvil y duelo de dos equipos en la misma pantalla de la pizarra, con la misma nota a la vez para los dos y gana quien acierta antes. Sin cuentas, sin instalación y sin datos personales.

## Operating Context
- **Modo individual:** móvil en vertical (desde 360 px de ancho) u ordenador, en casa. Partidas de 20 notas.
- **Modo pizarra:** pizarra digital táctil o proyector en un aula iluminada, en horizontal (1366×768 a 1920×1080), vista desde el fondo de la clase. Dos alumnos tocan a la vez, uno en cada mitad. El resto de la clase mira y anima.
- Uso en sesiones cortas: los últimos minutos de clase o un rato en casa.

## Capabilities and Constraints
- 4 niveles libres (líneas, espacios, pentagrama completo, líneas adicionales), con tiempo por nota de 10, 10, 7 y 5 s.
- Puntos: 10 por acierto más 1 por segundo sobrante. Récord por nivel guardado en el dispositivo.
- Modo pizarra: equipos Rojo y Azul, 5, 10 o 15 rondas, el equipo que falla queda bloqueado esa ronda, pausa de 2,5 s entre rondas.
- Sonido con Web Audio: la nota a su altura real, sonidos distintos para acierto y fallo, y botón de silencio.
- Interfaz completa en español e inglés (nivel A1), con selector en el inicio.
- Técnica: HTML, CSS y JS estáticos, sin dependencias ni compilación, publicado en GitHub Pages. Cualquier cambio de diseño debe mantenerlo así (las fuentes web externas son una dependencia de red; decidir con cuidado).
- La lógica pura (`src/notes.js`, `scoring.js`, `duel.js`, `i18n.js`) tiene tests y no debe cambiar por un rediseño.
- Notación: clave de sol dibujada en SVG y notas redondas, aprobadas por el profesor.

## Brand Commitments
- Nombre visible: "Juego de notas" / "Note game". No hay logo, centro ni identidad previa que respetar.
- Los equipos se llaman Rojo y Azul.

## Evidence on Hand
Ninguna: no hay testimonios, datos de uso ni imágenes. No inventarlos.

## Product Principles
1. **Se juega en un segundo.** Del enlace a la primera nota con dos toques; nada de explicaciones largas.
2. **La nota es la protagonista.** El pentagrama y la respuesta mandan sobre cualquier adorno.
3. **Divertido sin ser infantil.** Tiene que gustar a un alumno de 1º y no avergonzar a uno de 4º.
4. **Justo en el duelo.** Las dos mitades de la pizarra deben ser idénticas en todo salvo el color del equipo.

## Accessibility & Inclusion
- **Legible proyectado:** contraste muy alto y tamaños grandes, pensando en proyectores con poca luz y en la vista desde el fondo del aula (requisito confirmado por el profesor).
- Botones grandes y fáciles de tocar en el móvil y en la pizarra.
- Acierto y fallo no se comunican solo por el color: también hay texto y sonido.
