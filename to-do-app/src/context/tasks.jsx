

import { useTasksReducer } from '../hooks/useTasksReducer'
import { TasksContext } from './TasksContext'

export function TasksProvider({ children }) {
    const { state, addTask, deleteTask, clearTasks } = useTasksReducer()
    
    return (
        <TasksContext.Provider value={{
            taskList: state,
            addTask,
            deleteTask,
            clearTasks
        }}>
            {children}
        </TasksContext.Provider>
    )
}



