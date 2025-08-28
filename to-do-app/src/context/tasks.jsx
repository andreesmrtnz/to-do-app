

import { useTasksReducer } from '../hooks/useTasksReducer'
import { TasksContext } from './TasksContext'
import { useState } from 'react'

export function TasksProvider({ children }) {
    const { state, addTask, deleteTask, clearTasks, toggleTask, editTask } = useTasksReducer()
    const [filter, setFilter] = useState('all')

    return (
        <TasksContext.Provider value={{
            taskList: state,
            addTask,
            deleteTask,
            clearTasks,
            filter,
            setFilter,
            toggleTask,
            editTask
        }}>
            {children}
        </TasksContext.Provider>
    )
}



