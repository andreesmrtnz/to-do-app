import { useContext } from 'react'
import { TasksContext } from '../context/TasksContext.js'

export function useTasks() {
    const context = useContext(TasksContext)
    if (!context) {
        throw new Error('useTasks debe ser usado dentro de un TasksProvider')
    }
    return context
}