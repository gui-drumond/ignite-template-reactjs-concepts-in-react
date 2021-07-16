import { useEffect, useState } from 'react'
import nextId from "react-id-generator";
import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function  TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask(title:string) {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(title !== "" && title !== null)
      {
        let id = (parseInt(String(nextId()).slice(2))| Math.random()*10);
        let isComplete = false;
        setTasks(oldState => [...oldState,{ id,title, isComplete}]); 
      }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    let newlist:Task[] = []; 
    tasks.map((task:Task,index)=>{
      if(task.id === id)
      {
        task.isComplete = !task.isComplete;  
      }
      newlist[index] = task;
    })
    setTasks(newlist);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID    
    setTasks(tasks.filter((task:Task,index,array:Task[])=>{
      return task.id !== id
    }));
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={()=>handleCreateNewTask(newTaskTitle)}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={(e) => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}