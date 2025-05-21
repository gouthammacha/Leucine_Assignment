import axios from 'axios';
import { CreateTodoInput, Todo, UpdateTodoInput } from '../types';

const API_URL = 'https://backend-api-pmsv.onrender.com';

export const api = {
  // Todo CRUD operations
  getTodos: async (): Promise<Todo[]> => {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  },
  
  createTodo: async (todo: CreateTodoInput): Promise<Todo> => {
    const response = await axios.post(`${API_URL}/todos`, todo);
    return response.data;
  },
  
  updateTodo: async (todo: UpdateTodoInput): Promise<Todo> => {
    const response = await axios.put(`${API_URL}/todos/${todo.id}`, todo);
    return response.data;
  },
  
  deleteTodo: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/todos/${id}`);
  },
  
  // Summarize and send to Slack
  summarizeAndSendToSlack: async (): Promise<{ message: string }> => {
    const response = await axios.post(`${API_URL}/summarize`);
    return response.data;
  }
};