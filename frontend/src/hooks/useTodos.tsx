import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../types';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [summarizing, setSummarizing] = useState<boolean>(false);

  // Fetch todos on component mount
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getTodos();
      setTodos(data);
    } catch (error) {
      toast.error('Failed to fetch todos');
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Create a new todo
  const createTodo = async (todo: CreateTodoInput) => {
    try {
      const newTodo = await api.createTodo(todo);
      setTodos((prev) => [...prev, newTodo]);
      toast.success('Todo created successfully');
      return newTodo;
    } catch (error) {
      toast.error('Failed to create todo');
      console.error('Error creating todo:', error);
      throw error;
    }
  };

  // Update an existing todo
  const updateTodo = async (todo: UpdateTodoInput) => {
    try {
      const updatedTodo = await api.updateTodo(todo);
      setTodos((prev) =>
        prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
      );
      toast.success('Todo updated successfully');
      return updatedTodo;
    } catch (error) {
      toast.error('Failed to update todo');
      console.error('Error updating todo:', error);
      throw error;
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    try {
      await api.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      toast.success('Todo deleted successfully');
    } catch (error) {
      toast.error('Failed to delete todo');
      console.error('Error deleting todo:', error);
      throw error;
    }
  };

  // Toggle todo completion status
  const toggleTodoCompletion = async (id: string, completed: boolean) => {
    return updateTodo({ id, completed: !completed });
  };

  // Summarize todos and send to Slack
  const summarizeAndSendToSlack = async () => {
    setSummarizing(true);
    try {
      const response = await api.summarizeAndSendToSlack();
      toast.success(response.message || 'Summary sent to Slack');
      return response;
    } catch (error) {
      toast.error('Failed to summarize and send to Slack');
      console.error('Error summarizing todos:', error);
      throw error;
    } finally {
      setSummarizing(false);
    }
  };

  return {
    todos,
    loading,
    summarizing,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodoCompletion,
    summarizeAndSendToSlack,
    fetchTodos,
  };
};