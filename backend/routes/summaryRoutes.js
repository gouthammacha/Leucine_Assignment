import express from 'express';
import { supabase } from '../services/supabaseService.js';
import { generateSummary } from '../services/cohereService.js';
import { sendToSlack } from '../services/slackService.js';

const router = express.Router();

// Summarize todos and send to Slack
router.post('/', async (req, res, next) => {
  try {
    // Fetch incomplete todos
    const { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    if (!todos || todos.length === 0) {
      return res.status(400).json({
        error: true,
        message: 'No todos found to summarize'
      });
    }
    
    // Generate summary with Cohere AI
    const summary = await generateSummary(todos);
    
    // Send to Slack
    await sendToSlack(summary, todos);
    
    res.json({ 
      success: true, 
      message: 'Summary generated and sent to Slack successfully'
    });
  } catch (error) {
    next(error);
  }
});

export { router as summaryRoutes };