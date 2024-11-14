// src/components/Dashboard.js
import React, { useState } from 'react';
import Tasklist from './Tasklist';
// import TaskForm from './TaskForm';

const Dashboard = ({ tasks, updateTask, deleteTask }) => {
  const [searchItem, setSearchItem] = useState('');
  const [filter, setFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredTasks = tasks.filter(task => {
    const isMatch = task.title.toLowerCase().includes(searchItem.toLowerCase()) || 
                    task.description.toLowerCase().includes(searchItem.toLowerCase());

    const priorityMatches = priorityFilter === 'All' || task.priority === priorityFilter;
    const filterMatches = (
      filter === 'All' ||
      (filter === 'Completed' && task.completed) ||
      (filter === 'Incomplete' && !task.completed) ||
      (filter === 'Upcoming' && new Date(task.dueDate) > new Date() && !task.completed) ||
      (filter === 'Overdue' && new Date(task.dueDate) < new Date() && !task.completed)
    );

    return isMatch && priorityMatches && filterMatches;
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All Tasks</option>
          <option value="Completed">Completed Tasks</option>
          <option value="Incomplete">Incomplete Tasks</option>
          <option value="Upcoming">Upcoming Tasks</option>
          <option value="Overdue">Overdue Tasks</option>
        </select>
        <select onChange={(e) => setPriorityFilter(e.target.value)} value={priorityFilter}>
          <option value="All">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
      </div>

      <div className="task-columns">
        <Tasklist
          title="Tasks"
          tasks={filteredTasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default Dashboard;
