import React, { useState } from 'react';
import { Todo } from '../../types';
import { Button } from './Button';
import { Input } from './Input';
import { TextArea } from './TextArea';
import { Check, Edit, Trash2, X, Save } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, title: string, description: string) => Promise<void>;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      await onToggleComplete(todo.id, todo.completed);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(todo.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) return;
    
    setIsLoading(true);
    try {
      await onUpdate(todo.id, title, description);
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description);
    setIsEditing(false);
  };

  return (
    <div className={`border rounded-lg p-4 mb-4 transition-all duration-200 ${todo.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'}`}>
      {isEditing ? (
        <div className="space-y-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo title"
          />
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
          />
          <div className="flex space-x-2 mt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleUpdate}
              isLoading={isLoading}
              disabled={!title.trim()}
            >
              <Save size={16} className="mr-1" /> Save
            </Button>
            <Button variant="outline" size="sm" onClick={handleCancel} disabled={isLoading}>
              <X size={16} className="mr-1" /> Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2">
              <button
                onClick={handleToggleComplete}
                disabled={isLoading}
                className={`mt-1 flex-shrink-0 h-5 w-5 rounded border ${
                  todo.completed
                    ? 'bg-black border-black text-white'
                    : 'border-gray-300'
                } flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
              >
                {todo.completed && <Check size={14} />}
              </button>
              <div>
                <h3 className={`text-base font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                    {todo.description}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(todo.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex space-x-1">
              <button
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black rounded"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="p-1 text-gray-500 hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};