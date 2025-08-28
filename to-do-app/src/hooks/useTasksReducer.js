import { useReducer } from 'react'
import { taskListReducer, taskListInitialState } from '../reducers/tasklist'

export function useTasksReducer() {
    const [state, dispatch] = useReducer(taskListReducer, taskListInitialState)

    const addTask = (task) => dispatch({ type: 'ADD', payload: task }) // Agregar una tarea

    const deleteTask = (task) => dispatch({ type: 'DELETE', payload: task }) // Eliminar una tarea

    const clearTasks = () => dispatch({ type: 'CLEAR' }) // Limpiar todas las tareas

    const toggleTask = (task) => dispatch({ type: 'TOGGLE', payload: task }) // Cambiar el estado de una tarea

    const editTask = (taskId, title) => dispatch({ type: 'EDIT', payload: {id: taskId, title} }) // Editar una tarea

    return {
        state,
        addTask,
        deleteTask,
        clearTasks,
        toggleTask,
        editTask
    }
}
