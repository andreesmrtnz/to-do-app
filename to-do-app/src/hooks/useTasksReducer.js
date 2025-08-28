import { useReducer } from 'react'
import { taskListReducer, taskListInitialState } from '../reducers/tasklist'

export function useTasksReducer() {
    const [state, dispatch] = useReducer(taskListReducer, taskListInitialState)

    const addTask = (task) => dispatch({ type: 'ADD', payload: task }) // Agregar una tarea

    const deleteTask = (task) => dispatch({ type: 'DELETE', payload: task }) // Eliminar una tarea

    const clearTasks = () => dispatch({ type: 'CLEAR' }) // Limpiar todas las tareas

    return {
        state,
        addTask,
        deleteTask,
        clearTasks
    }
}
