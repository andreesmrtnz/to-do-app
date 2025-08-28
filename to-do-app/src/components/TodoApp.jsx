
import TaskList from './TaskList'
import TodoForm from './TodoForm'
import Filters from './Filters'
import { TasksProvider } from '../context/tasks'

export default function TodoApp() {
    

    return (
        <>
            <TasksProvider>
                <TodoForm />
                <Filters />
                <TaskList />
            </TasksProvider>
        </>
    )
}