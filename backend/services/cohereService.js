import { CohereClient } from 'cohere-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.COHERE_API_KEY;

if (!apiKey) {
  console.error('Missing Cohere API key in .env file');
  process.exit(1);
}

const cohere = new CohereClient({
  token: apiKey,
});

export const generateSummary = async (todos) => {
  try {
    // Format todos for the prompt
    const todosList = todos.map(todo => {
      return `- ${todo.title}${todo.description ? `: ${todo.description}` : ''} (${todo.completed ? 'Completed' : 'Pending'})`;
    }).join('\n');
    
    const pendingCount = todos.filter(todo => !todo.completed).length;
    const completedCount = todos.length - pendingCount;
    
    const prompt = `
      Please provide a concise summary of the following todo list. Focus on highlighting the most important pending tasks, any patterns or themes you notice, and suggest priorities. Also include a brief status overview mentioning the number of completed vs pending tasks.
      
      TODO LIST:
      ${todosList}
      
      Stats:
      - Total todos: ${todos.length}
      - Completed: ${completedCount}
      - Pending: ${pendingCount}
    `;
    
    const response = await cohere.generate({
      prompt,
      maxTokens: 300,
      temperature: 0.7,
      k: 0,
      stopSequences: [],
      returnLikelihoods: 'NONE',
    });
    
    return response.generations[0].text.trim();
  } catch (error) {
    console.error('Error generating summary with Cohere:', error);
    throw new Error('Failed to generate summary with AI');
  }
};