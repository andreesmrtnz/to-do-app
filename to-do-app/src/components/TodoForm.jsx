import { useId, useState } from 'react'

import { useTasks } from '../hooks/useTasks.js'

export default function TodoForm() {

    const {addTask} = useTasks()
    const id = useId()

    const [task, setTask] = useState('')

    const handleChange = (e) => {
        setTask(e.target.value)
    }

    const handleSubmit = (e) => {
        const idTask = Date.now().toString()
        e.preventDefault()
        addTask({id: idTask, title: task})
    }

    return (
        <>
            <h1>To-Do App</h1>
            <form id={id}>
                <input type="text" placeholder="Add a new task" value={task} onChange={handleChange}/>
            </form>
            <button onClick={handleSubmit}>Add</button>
        </>
    )
}