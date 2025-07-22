
# To_Do_List_Summary Project

This project is a full-stack application consisting of:
- A **frontend** built with React and Vite
- A **backend** built with Express.js and Node.js
- Integration with **Supabase**--> Stores tasks and app data(DB), **Cohere AI**-->Summarizes tasks using language model(LLM), and **Slack Webhooks**-->Sends notifications to your channel(generated summary will be viewed here).

---

## Project Structure

```
Assignment/
├── backend/       # Node.js + Express backend
├── frontend/      # React + Vite frontend
└── .env_example   # Environment variable template
```

---

## Prerequisites

Please install the following before you begin:

1. **Node.js** (v18 or newer recommended)  
   Download from: https://nodejs.org/

2. **Git**  
   Download from: https://git-scm.com/

---

## Setup Instructions

### 1.Download or Clone the shared repository

You can get the project in one of the following ways:

- **Download ZIP**:  
  Visit the GitHub repository link you received and click **"Code" > "Download ZIP"**.  
  Then extract the ZIP file.

- **Clone via Git** (recommended):  
  Open a terminal and run:
  ```bash
  git clone https://github.com/gouthammacha/Leucine_Assignment.git
  cd Leucine_Assignment
  ```

### 2.Configure Environment Variables

1. Locate the file named `.env_example`
2. Make a copy and rename it to `.env`
3. Fill in the required credentials:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_key
   COHERE_API_KEY=your_cohere_ai_api_key
   SLACK_WEBHOOK_URL=your_webhook_url
   PORT=3001
   ```
---

## Supabase Database Setup

To set up the database:

1. Go to [https://app.supabase.com/](https://app.supabase.com/) and create a new project.
2. Open the **SQL Editor** in your Supabase project.
3. Paste and run the following SQL to create the required table:

  # Create todos table

  ## 1. New Tables
    - `todos`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text)
      - `completed` (boolean, default false)
      - `created_at` (timestamp with time zone, default now())
  ## 2. Security
    - Enable RLS on `todos` table
    - Add policy for anonymous users to read/write todos

   ## paste this in SQL editor

      CREATE TABLE IF NOT EXISTS todos (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      description text DEFAULT '',
      completed boolean DEFAULT false,
      created_at timestamptz DEFAULT now()
      );

      ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

      CREATE POLICY "Allow anonymous access to todos"
      ON todos
      FOR ALL
      TO anon
      USING (true);
      
4. Get your **Supabase URL** and **anon key** from `Project Settings > API` and paste them in your `.env`.

---

## Cohere AI Integration

This project uses **Cohere AI** to automatically summarize tasks or perform language-based processing.

### How to Set Up Cohere AI

1. Go to [https://cohere.com/](https://cohere.com/) and sign up for an account.
2. Once logged in, visit your **Dashboard** to find your **API key**.
3. Copy the API key.

### Add It to Your Environment

1. In the root of your project, open the `.env` file.
2. Add the following line (or replace the placeholder if it already exists):
   ```env
   COHERE_API_KEY=your_actual_cohere_api_key
   ```
> Cohere will now be able to summarize or generate content using AI when requested by the application.
---

## Slack Webhook Integration

### How to Set Up:

1. Go to [Slack API: Incoming Webhooks](https://api.slack.com/messaging/webhooks).
2. Click **Create an App**.
3. Choose **From scratch**, give your app a name, and select your workspace.
4. Under **Add features and functionality**, select **Incoming Webhooks** and activate it.
5. Click **Add New Webhook to Workspace** and select the channel you want to post messages to.
6. After authorizing, copy the **Webhook URL**.

### Configure the Webhook

1. Paste the URL in your `.env` file:
   ```env
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url
   ```
> Slack notifications will now be sent based on the project's logic (e.g., when tasks are created or summarized).

---

## Running the Backend

1. Open terminal and go to the backend folder:
   ```bash
   cd backend
   ```

2. Install required packages:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node index.js
   ```

> The backend will run at `http://localhost:3001`.

---

## Running the Frontend

1. Open a new terminal and go to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install frontend packages:
   ```bash
   npm install
   ```

3. Start the frontend:
   ```bash
   npm run dev
   ```

> The frontend will run at `http://localhost:5173`.

---

## Testing the App

- Open your browser and go to:  
  `http://localhost:5173`

- You should be able to add and manage tasks.

- After clicking on summary, that summary will be saved in the slack webhook channel.you can open and see that generated summary by LLM in the webhook channel

---

## Troubleshooting

- **"Command not found"**: Ensure Node.js is installed and you're in the correct folder.
- **Ports already in use**: Change the `PORT` in `.env` (e.g., 3002).
- **Missing data or features**: Ensure the Supabase database was set up and the `.env` file is filled correctly.

---

## Notes

- Backend uses **Node.js**, **Express**, **Supabase**, and **Cohere AI**
- Frontend is built using **React** and styled with **Tailwind CSS**
- Slack integration uses **Incoming Webhooks** for team notifications
- Environment variables are essential — ensure your `.env` file is set up before running the app
- This project follows a **modular structure** to separate concerns between frontend, backend, and services
- All API requests between frontend and backend are handled through **RESTful endpoints**
- Supabase serves as a **PostgreSQL database** platform, with a simple integration layer
- Cohere is used specifically for **natural language processing** and **AI-generated summaries**

> Always restart the backend after making changes to `.env` or modifying core logic files.

---

## Design / Architecture Decisions

This project was structured with clarity, separation of concerns, and scalability in mind. Here are the key architecture decisions made:

### 1. **Separation of Frontend and Backend**
- The project is split into two folders: `frontend/` and `backend/` to cleanly separate UI logic from business logic and database access.
- Allows independent development and deployment of frontend and backend if needed.

### 2. **Supabase as a Backend-as-a-Service (BaaS)**
- Chosen for its simplicity and integrated PostgreSQL support.
- Handles storage, real-time subscriptions, and authentication with minimal setup.

### 3. **Cohere AI for Summarization**
- Integrated for natural language summarization to demonstrate practical use of LLMs (large language models).
- Decouples AI logic from the main application logic for maintainability.

### 4. **Slack Webhooks for Notification Layer**
- Used for sending real-time updates to a team communication platform without building a custom notification service.
- Simple, scalable, and aligns well with modern team workflows.

### 5. **Environment Configuration via .env**
- All sensitive information and API credentials are stored in a `.env` file and accessed using `dotenv` to keep code secure and clean.

### 6. **RESTful API Design**
- Backend routes follow REST conventions to maintain a predictable and standard API interface.

### 7. **React with Vite for Performance**
- Vite was chosen over Create React App for faster development and build performance.
- Tailwind CSS ensures consistent and utility-first UI styling.

> These decisions were made to ensure a clean developer experience, easy onboarding for new contributors, and extensibility for future features.

---
