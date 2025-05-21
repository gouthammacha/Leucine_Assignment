/*
  # Create todos table

  1. New Tables
    - `todos`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text)
      - `completed` (boolean, default false)
      - `created_at` (timestamp with time zone, default now())
  
  2. Security
    - Enable RLS on `todos` table
    - Add policy for anonymous users to read/write todos
*/

CREATE TABLE IF NOT EXISTS todos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- For demo purposes, allowing anonymous access
-- In production, you would restrict access based on user authentication
CREATE POLICY "Allow anonymous access to todos"
  ON todos
  FOR ALL
  TO anon
  USING (true);