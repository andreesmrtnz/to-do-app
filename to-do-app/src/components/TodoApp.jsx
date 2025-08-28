
import TaskList from './TaskList'
import TodoForm from './TodoForm'
import { TasksProvider } from '../context/tasks'

export default function TodoApp() {
    

    return (
        <>
            <TasksProvider>
                <TodoForm />
                <TaskList />
            </TasksProvider>
        </>
    )
}