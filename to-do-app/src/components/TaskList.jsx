import React, { useState } from 'react'
import { useTasks } from '../hooks/useTasks.js'
import './TaskList.css'

export default function TaskList() {
    const {taskList, deleteTask, clearTasks, filter, toggleTask, editTask} = useTasks()
    const [editingId, setEditingId] = useState(null)
    const [editingText, setEditingText] = useState('')
    const [removingTasks, setRemovingTasks] = useState(new Set())

    const filteredTasks = taskList.filter((task) => {
        if (filter === 'all') return true
        if (filter === 'pending') return !task.completed
        if (filter === 'completed') return task.completed
    })

    const startEditing = (task) => {
        setEditingId(task.id)
        setEditingText(task.title)
    }

    const saveEdit = (taskId) => {
        editTask(taskId, editingText)
        setEditingId(null)
        setEditingText('')
    }

    const handleDelete = (task) => {
        setRemovingTasks(prev => new Set(prev).add(task.id))
        
        setTimeout(() => {
            deleteTask(task)
            setRemovingTasks(prev => {
                const newSet = new Set(prev)
                newSet.delete(task.id)
                return newSet
            })
        }, 300)
    }
   
    return (
        <>
            <ul className="task-list">
                {filteredTasks.map((task) => (
                    <li 
                        key={task.id} 
                        className={`task-item ${removingTasks.has(task.id) ? 'removing' : ''}`}
                    >
                        <input 
                            type="checkbox" 
                            checked={task.completed}
                            onChange={() => toggleTask(task)}
                            className="task-checkbox"
                        />
                        
                        {editingId === task.id ? (
                            <input 
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                onBlur={() => saveEdit(task.id)}
                                onKeyPress={(e) => e.key === 'Enter' && saveEdit(task.id)}
                                autoFocus
                                className="task-edit-input"
                            />
                        ) : (
                            <span 
                                className={`task-text ${task.completed ? 'completed' : ''}`}
                                onDoubleClick={() => startEditing(task)}
                            >
                                {task.title}
                            </span>
                        )}
                        
                        <button 
                            onClick={() => handleDelete(task)}
                            className="delete-btn"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={clearTasks} className="clear-btn">Clear All</button>
        </>
    )
}