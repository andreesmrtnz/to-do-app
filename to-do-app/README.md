# To‑Do List Mejorado

**Descripción rápida**

To‑Do List en React enfocada a práctica rápida y por pasos: no solo CRUD, sino persistencia en `localStorage`, filtros (todas / completadas / pendientes) y pequeñas animaciones CSS. Este README está pensado como una guía de objetivos pequeños para que te pongas un cronómetro (1h / bloques) y compruebes que vas por buen camino.

---

# Objetivos de aprendizaje

* Entender el flujo básico de datos en React (estado -> vista -> eventos).
* Manejar arrays de objetos en estado (añadir, editar, borrar, toggle).
* Persistencia simple con `localStorage` usando `useEffect`.
* Implementar filtros derivados (sin duplicar estado).
* Añadir animaciones sencillas con CSS cuando se marca o borra una tarea.
* Mejorar accesibilidad mínima (labels, keyboard friendly).

---

# Stack recomendado

* React (Vite o Create React App)
* JavaScript (ES6+)
* CSS (puedes usar CSS puro, módulos o Tailwind si prefieres)

---

# Requisitos

* Node.js (v16+ recomendado)
* npm o yarn

---

# Instalación (rápida)

1. Crea el proyecto (ejemplo con Vite):

```bash
npm create vite@latest todo-app -- --template react
cd todo-app
npm install
npm run dev
```

2. Estructura mínima sugerida (en `src/`):

```
src/
  components/
    TodoApp.jsx
    TodoForm.jsx
    TodoList.jsx
    TodoItem.jsx
    Filters.jsx
  hooks/
    useLocalStorage.js
  utils/
    id.js
  App.jsx
  main.jsx
  index.css
```

---

# Forma mínima de estado (ejemplo)

```js
// Cada task:
{
  id: '164234234',
  text: 'Comprar leche',
  done: false,
  createdAt: 1690000000000
}

// state:
const [tasks, setTasks] = useState([])
```

---

# Hooks y utilidades útiles

## Hook `useLocalStorage` (sencillo)

```js
import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    } catch (err) {
      console.error('useLocalStorage parse error', err)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (err) {
      console.error('useLocalStorage set error', err)
    }
  }, [key, state])

  return [state, setState]
}
```

Usar: `const [tasks, setTasks] = useLocalStorage('tasks', [])`

---

# Funciones principales (pseudocódigo)

* `addTask(text)` → crea `{ id, text, done: false, createdAt }` y hace `setTasks([...tasks, newTask])`
* `toggleTask(id)` → `setTasks(tasks.map(t => t.id === id ? {...t, done: !t.done} : t))`
* `editTask(id, newText)` → `setTasks(tasks.map(...))`
* `deleteTask(id)` → `setTasks(tasks.filter(t => t.id !== id))`

Consejo: evita mutar objetos; siempre devuelve copias.

---

# Filtros

Mantén un estado aparte para el filtro (`'all'|'done'|'active'`). No dupliques arrays. Deriva la lista a mostrar con:

```js
const filtered = tasks.filter(task => {
  if (filter === 'all') return true
  if (filter === 'done') return task.done
  if (filter === 'active') return !task.done
})
```

---

# Reglas para el reto de 1 hora (sugerencia de bloques)

* **MVP (20–30 min)**

  * Añadir tarea
  * Mostrar lista
  * Marcar como completada (toggle)
  * Borrar tarea

* **Persistencia (10 min)**

  * Guardar y cargar desde `localStorage` (usa `useLocalStorage` o `useEffect`).

* **Filtros (10 min)**

  * Botones para `Todas / Completadas / Pendientes`.

* **Edición en línea (10 min)**

  * Doble click o botón editar que permita cambiar el texto.

* **Animaciones (15–20 min)**

  * Animación al marcar (tachar con transición)
  * Animación al borrar (fade-out + height collapse)

Si te queda tiempo: añadir contador de tareas y botón para borrar todas las completadas.

---

# Sugerencias para animaciones CSS (rápidas)

* **Tachar con transición**: usa `text-decoration: line-through` combinado con `opacity` y `transform` para suavizar.
* **Borrar con animación**: aplica una clase `.removing` que haga `opacity: 0` y `height: 0` con `transition` y, tras terminar la animación, remueve el elemento del estado.
* Alternativa: usa `react-transition-group` si quieres control fino, pero para el reto 1h hazlo con clases y `setTimeout`.

Ejemplo simple:

```css
.task {
  transition: opacity 200ms ease, transform 200ms ease;
}
.task.done .text {
  text-decoration: line-through;
  opacity: .7;
  transform: translateX(4px);
}
.task.removing {
  opacity: 0;
  height: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  transition: opacity 250ms ease, height 250ms ease;
}
```

---

# Accesibilidad y UX mínimos

* Usa `label` para el input de añadir tarea.
* Botones con `aria-pressed` o `aria-label` cuando tiene sentido.
* Permite enviar el formulario con `Enter`.
* Evita botones pequeños: mínimo hit target \~40px.

---

# Tests / Checks rápidos (aceptación)

Marca estas comprobaciones para saber si vas por buen camino:

* [ ] Añadir tarea funciona (nuevo item aparece en la lista).
* [ ] Marcar/desmarcar actualiza el estado y la vista.
* [ ] Borrar elimina el item de la lista.
* [ ] Tras recargar la página, las tareas persisten.
* [ ] Filtros muestran el subset correcto.
* [ ] Editar conserva `id` y fecha de creación.
* [ ] Animaciones se ven fluidas y no bloquean la UI.

Si todas están OK → vas perfecto.

---

# Troubleshooting rápido

* **Nada se guarda:** revisa la clave de `localStorage` y los errores en consola (JSON.parse fallo).
* **Lista no se renderiza correctamente:** comprueba `key` en `map` y que no estés mutando el array.
* **Animación no se ejecuta en borrado:** si remueves del estado inmediatamente, la animación no se ve. Marca con `.removing` y quita el item tras `setTimeout` del tiempo de la transición.

---

# Buenas prácticas y mejoras incrementales (post‑reto)

* Extra: usar `useReducer` si la lógica de tareas crece.
* Extra: añadir tests con React Testing Library (comportamiento básico).
* Extra: sincronización entre pestañas (usar `storage` event).
* Extra: importar/ exportar JSON de tareas.
* Extra: añadir prioridad/etiquetas/fechas y ordenar por prioridad.

---

# Git y versiones (sugerencia de commits)

* `feat: inicializar proyecto con Vite`
* `feat: añadir UI básica del todo (MVP)`
* `feat: persistencia en localStorage`
* `feat: filtros (todas/completadas/pendientes)`
* `feat: editar tareas` / `fix: evitar mutaciones de estado`
* `style: animaciones CSS para marcar y borrar`

---

# Retos extra (para cuando quieras subir el nivel)

1. Añadir etiquetado (tags) y filtro por etiqueta.
2. Implementar undo al borrar (toast con "Deshacer") usando un buffer temporal.
3. Implementar orden drag & drop de tareas (react-beautiful-dnd).
4. Hacer versión offline-first con Service Worker (caching) — avanzado.

---

¡Listo! Sigue la checklist y ve avanzando por bloques. Si quieres, puedo:

* Generar un repositorio inicial con la estructura y el `useLocalStorage` ya implementado.
* Adaptar el README para usar TypeScript en vez de JS.

Dime qué prefieres y lo preparo.
