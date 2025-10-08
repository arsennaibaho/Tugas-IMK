import React from 'react';
import { Task, TaskPriority, RepetitionType } from '../types';
import TrashIcon from './icons/TrashIcon';
import RepeatIcon from './icons/RepeatIcon';
import EditIcon from './icons/EditIcon';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, date: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task, date: string) => void;
  currentDate: string;
  noteForCurrentDate?: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit, currentDate, noteForCurrentDate }) => {
  const isCompleted = task.completions?.[currentDate] ?? false;
  
  const formattedDeadline = task.deadline 
    ? new Date(task.deadline).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;
    
  const getPriorityClasses = () => {
    if (isCompleted) return 'border-l-slate-400';
    
    const isImportant = task.priority?.includes(TaskPriority.IMPORTANT);
    const isUrgent = task.priority?.includes(TaskPriority.URGENT);

    if (isImportant && isUrgent) {
      return 'border-l-red-500';
    }
    if (isImportant) {
      return 'border-l-green-500';
    }
    if (isUrgent) {
      return 'border-l-blue-500';
    }

    return 'border-l-transparent';
  };

  const getRepetitionTooltip = (): string => {
    if (!task.repetition || task.repetition.type === RepetitionType.NONE) return '';
    
    switch (task.repetition.type) {
      case RepetitionType.DAILY:
        return 'Diulang setiap hari';
      case RepetitionType.WEEKLY:
        return 'Diulang setiap minggu';
      case RepetitionType.MONTHLY:
        return 'Diulang setiap bulan';
      case RepetitionType.CUSTOM: {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const customDays = task.repetition.days?.map(d => days[d]).join(', ');
        return `Diulang setiap: ${customDays}`;
      }
      default:
        return '';
    }
  };

  return (
    <li
      className={`flex items-start justify-between p-4 bg-white rounded-xl border-2 border-slate-200 mb-3 transition-all duration-300 shadow-sm border-l-8 ${getPriorityClasses()}`}
    >
      <div className="flex items-start gap-4 flex-grow">
        <button
          onClick={() => onToggle(task.id, currentDate)}
          className={`w-7 h-7 rounded-full border-2 flex-shrink-0 transition-all duration-300 flex items-center justify-center self-start mt-1 ${
            isCompleted
              ? 'border-green-500 bg-green-500'
              : 'border-slate-400 hover:border-teal-500'
          }`}
          aria-label={isCompleted ? 'Tandai sebagai belum selesai' : 'Tandai sebagai selesai'}
        >
          {isCompleted && (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <div className="flex-grow">
          <span
            className={`transition-all duration-300 text-lg ${
              isCompleted ? 'line-through text-slate-400' : 'text-slate-700'
            }`}
          >
            {task.text}
          </span>
          {noteForCurrentDate && (
            <p className="mt-1 text-sm text-slate-600 bg-yellow-100 p-2 rounded-md border border-yellow-200">
              {noteForCurrentDate}
            </p>
          )}
          {formattedDeadline && (
            <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
               <div className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formattedDeadline}</span>
               </div>
               {task.repetition && task.repetition.type !== RepetitionType.NONE && (
                  <div title={getRepetitionTooltip()}>
                    <RepeatIcon className="w-4 h-4 text-purple-600" />
                  </div>
               )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center self-start">
        <button
          onClick={() => onEdit(task, currentDate)}
          className="text-slate-400 hover:text-teal-500 transition-colors duration-300 p-1 rounded-full"
          aria-label="Edit tugas"
        >
          <EditIcon className="w-5 h-5" />
        </button>
        <button
            onClick={() => onDelete(task.id)}
            className="text-slate-400 hover:text-red-500 transition-colors duration-300 p-1 rounded-full"
            aria-label="Hapus tugas"
        >
            <TrashIcon className="w-6 h-6" />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;