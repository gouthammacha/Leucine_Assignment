import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { todoRoutes } from './routes/todoRoutes.js';
import { summaryRoutes } from './routes/summaryRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/todos', todoRoutes);
app.use('/summarize', summaryRoutes);

// check
app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: err.message || 'An unexpected error occurred',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port https://localhost:${PORT}`);
});