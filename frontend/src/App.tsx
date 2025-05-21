// import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useTodos } from './hooks/useTodos';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { TodoSummary } from './components/TodoSummary';
import { ClipboardList } from 'lucide-react';

function App() {
  const {
    todos,
    loading,
    summarizing,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodoCompletion,
    summarizeAndSendToSlack,
  } = useTodos();

  const handleAddTodo = async (title: string, description: string) => {
    await createTodo({ title, description });
  };

  const handleUpdateTodo = async (id: string, title: string, description: string) => {
    await updateTodo({ id, title, description });
  };

  // ✅ Fix: wrap to match (id: string, completed: boolean) => Promise<void>
  const handleToggleComplete = async (id: string, completed: boolean): Promise<void> => {
    await toggleTodoCompletion(id, completed); // discard returned value
  };

  // ✅ Fix: wrap to match () => Promise<void>
  const handleSummarize = async (): Promise<void> => {
    await summarizeAndSendToSlack(); // discard returned { message }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      <header className="bg-black text-white py-6 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <ClipboardList size={24} className="mr-2" />
            <h1 className="text-2xl font-bold">Todo Summary Assistant</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AddTodoForm onAddTodo={handleAddTodo} />
              <TodoList
                todos={todos}
                loading={loading}
                onToggleComplete={handleToggleComplete}
                onDelete={deleteTodo}
                onUpdate={handleUpdateTodo}
              />
            </div>

            <div className="md:col-span-1">
              <TodoSummary
                onSummarize={handleSummarize}
                summarizing={summarizing}
                todoCount={todos.length}
              />

              <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p className="text-sm text-gray-600">
                  This Todo Summary Assistant helps you manage your tasks and generate AI-powered
                  summaries to share with your team via Slack.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-4 border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Todo Summary Assistant
        </div>
      </footer>
    </div>
  );
}

export default App;
