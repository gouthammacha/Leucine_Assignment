import express from 'express';
import { supabase } from '../services/supabaseService.js';

const router = express.Router();

// Get all todos
router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Create a new todo
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ 
        error: true, 
        message: 'Title is required' 
      });
    }
    
    const { data, error } = await supabase
      .from('todos')
      .insert([{ 
        title, 
        description: description || '',
        completed: false
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

// Update a todo
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (completed !== undefined) updates.completed = completed;
    
    const { data, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ 
        error: true, 
        message: 'Todo not found' 
      });
    }
    
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Delete a todo
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { router as todoRoutes };