import React, { useState } from 'react';
import { Input } from './ui/Input';
import { TextArea } from './ui/TextArea';
import { Button } from './ui/Button';
import { Plus } from 'lucide-react';

interface AddTodoFormProps {
  onAddTodo: (title: string, description: string) => Promise<void>;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      await onAddTodo(title, description);
      setTitle('');
      setDescription('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
      
      <div className="space-y-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          error={error}
          required
        />
        
        <TextArea
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          rows={3}
        />
        
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={!title.trim() || isSubmitting}
          className="w-full"
        >
          <Plus size={18} className="mr-1" /> Add Todo
        </Button>
      </div>
    </form>
  );
};