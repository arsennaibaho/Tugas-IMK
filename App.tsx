import React, { useState, useEffect } from 'react';
import { Task, TaskPriority, Repetition } from './types';
import LandingPage from './components/LandingPage';
import TaskManager from './components/TaskManager';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'login' | 'register' | 'manager'>('landing');
  const [userName, setUserName] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      if (!savedTasks) return [];
      
      const parsedTasks: (Task & { completed?: boolean })[] = JSON.parse(savedTasks);
      
      // Migration logic to convert old `completed: boolean` to new `completions` object
      return parsedTasks.map(task => {
        if (task.completed !== undefined) {
          if (!task.completions) {
             task.completions = {};
          }
          if (task.completed && task.deadline) {
            task.completions[task.deadline] = true;
          }
          delete task.completed;
        }
        return task as Task;
      });

    } catch (error) {
      console.error("Could not parse tasks from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Could not save tasks to localStorage", error);
    }
  }, [tasks]);

  const addTask = (text: string, deadline: string, priority?: TaskPriority[], repetition?: Repetition) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      deadline,
      priority,
      repetition,
      completions: {},
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const toggleTask = (id: string, date: string) => {
    setTasks(
      tasks.map(task => {
        if (task.id === id) {
          const newCompletions = { ...(task.completions || {}) };
          newCompletions[date] = !newCompletions[date];
          return { ...task, completions: newCompletions };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  // Note: updateTaskNote is no longer needed as editing is handled by updateTask
  const updateTaskNote = (taskId: string, date: string, note: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newNotes = { ...task.notes, [date]: note };
        if (note.trim() === '') {
          delete newNotes[date]; // Clean up empty notes
        }
        return { ...task, notes: newNotes };
      }
      return task;
    }));
  };

  const renderView = () => {
    switch (view) {
      case 'login':
        return <LoginPage onLoginSuccess={(name) => { setUserName(name); setView('manager'); }} onNavigateToRegister={() => setView('register')} />;
      case 'register':
        return <RegisterPage onRegisterSuccess={() => setView('login')} onNavigateToLogin={() => setView('login')} />;
      case 'manager':
        return (
          <TaskManager
            userName={userName}
            tasks={tasks}
            addTask={addTask}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            onLogout={() => { setUserName(''); setView('landing'); }}
          />
        );
      case 'landing':
      default:
        return <LandingPage onNavigateToLogin={() => setView('login')} onNavigateToRegister={() => setView('register')} />;
    }
  }

  return <>{renderView()}</>;
};

export default App;