import React from 'react'
import { useTasks } from '../hooks/useTasks.js'

export default function TaskList() {

    const {taskList, deleteTask, clearTasks} = useTasks()

    console.log(taskList)
   

  return (
    <>
      <ul>
        {taskList.map((task) => (
          <li key={task.id}> {task.title} <button onClick={() => deleteTask(task)}>Delete</button></li>
        ))}
      </ul>
      <button onClick={clearTasks}>Clear</button>

    </>
  )
}