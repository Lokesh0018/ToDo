import React, { useState } from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';

const TodoForm = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [doneCount, setDoneCount] = useState(0);

  const addTask = (e) => {
    e.preventDefault();
    if (task.trim() === '') {
      alert('Please enter a task');
      return;
    }
    setTasks([...tasks, { text: task, done: false }]);
    setTask('');
  };

  const editTask = (index) => {
    const newTask = prompt('Edit Task', tasks[index].text);
    if (newTask !== null && newTask.trim() !== '') {
      const updated = tasks.map((t, i) =>
        i === index ? { ...t, text: newTask } : t
      );
      setTasks(updated);
    }
  };

  const deleteTask = (index) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      setDoneCount(updatedTasks.filter((t) => t.done).length);
    }
  };

  const toggleDone = (e, index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = e.target.checked;
    setTasks(updatedTasks);
    setDoneCount(updatedTasks.filter((t) => t.done).length);
  };

  return (
    <div className="todo-form">
      <form className="form" onSubmit={addTask}>
        <h1>Add List</h1>
        <div className="form-ip">
          <AssignmentIcon className="icon task" fontSize="small" />
          <input
            type="text"
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <input type="submit" value="Add Task" />
        <div className="li">
          <table>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className="task-item">
                    <span className="task-text">
                      <input
                        type="checkbox"
                        className="task-checkbox"
                        checked={task.done}
                        onChange={(e) => toggleDone(e, index)}
                      />
                      <b>Task-{index + 1}</b>:{' '}
                      <span style={{ textDecoration: task.done ? 'line-through 3px' : 'none' }}>
                        {task.text}
                      </span>
                    </span>
                  </td>
                  <td className="task-edit">
                    <button className="edit-btn" onClick={() => editTask(index)}>
                      Edit
                    </button>
                  </td>
                  <td className="task-delete">
                    <button className="delete-btn" onClick={() => deleteTask(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
      <div className="task-list">
        <p><b>Tasks:</b> {tasks.length}</p>
        <p><b>Done:</b> {doneCount}</p>
      </div>
    </div>
  );
};

export default TodoForm;
