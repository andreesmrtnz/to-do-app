import { useState } from 'react'
import { useTasks } from '../hooks/useTasks.js'
import './TodoForm.css'

export default function TodoForm() {
    const { addTask, taskList } = useTasks()
    const [task, setTask] = useState('')
    


    const handleChange = (e) => {
        setTask(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (task.trim()) {
            addTask({
                id: Date.now().toString(),
                title: task.trim(),
                completed: false
            })
            setTask('')
        }
    }

    return (
        <div className="todo-form-container">
            <h1>To-Do App</h1>
            <form className="todo-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Add a new task..." 
                    value={task} 
                    onChange={handleChange}
                    className="todo-input"
                />
                <button 
                    type="submit" 
                    className="add-btn"
                    disabled={!task.trim()}
                >
                    Add Task
                </button>
            </form>
            <h2>Tareas totales: {taskList.length}</h2>
            <h2>Tareas completadas: {taskList.filter(task => task.completed).length}</h2>
            <h2>Tareas pendientes: {taskList.filter(task => !task.completed).length}</h2>
        </div>
    )
}