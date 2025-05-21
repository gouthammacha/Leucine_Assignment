import React from 'react';
import { Todo } from '../types';
import { TodoItem } from './ui/TodoItem';
import { AlertCircle } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  onToggleComplete: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, title: string, description: string) => Promise<void>;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  loading,
  onToggleComplete,
  onDelete,
  onUpdate,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 px-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="flex justify-center mb-4">
          <AlertCircle size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No todos yet</h3>
        <p className="text-gray-500">Add a new todo to get started.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
};