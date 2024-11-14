// src/components/Tasklist.js
import React, { useState } from 'react';

const Tasklist = ({ title, tasks, updateTask, deleteTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditedTask(task); // Prefill with current task details
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditedTask({});
  };

  const handleSave = () => {
    updateTask(editedTask);
    setEditingTaskId(null); // Exit edit mode after saving
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks to show</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="task-item">
            {editingTaskId === task.id ? (
              // Edit Form
              <div className="edit-task-form">
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  placeholder="Task Title"
                />
                <textarea
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  placeholder="Task Description"
                />
                <input
                  type="date"
                  value={editedTask.dueDate}
                  onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                />
                <select
                  value={editedTask.priority}
                  onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <button onClick={handleSave}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              // Display Task
              <div>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <p>Due Date: {task.dueDate}</p>
                <p>Priority: {task.priority}</p>
                <button onClick={() => updateTask({ ...task, completed: !task.completed })}>
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button onClick={() => startEditing(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Tasklist;
