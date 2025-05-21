import React from 'react';
import { Button } from './ui/Button';
import { MessageSquare } from 'lucide-react';

interface TodoSummaryProps {
  onSummarize: () => Promise<void>;
  summarizing: boolean;
  todoCount: number;
}

export const TodoSummary: React.FC<TodoSummaryProps> = ({
  onSummarize,
  summarizing,
  todoCount,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-2">Summarize & Share</h2>
      <p className="text-sm text-gray-600 mb-4">
        Generate an AI summary of your current todos and post it to your Slack channel.
      </p>
      
      <Button
        onClick={onSummarize}
        isLoading={summarizing}
        disabled={summarizing || todoCount === 0}
        className="w-full"
      >
        <MessageSquare size={18} className="mr-2" />
        Summarize & Send to Slack
      </Button>
      
      {todoCount === 0 && (
        <p className="text-xs text-red-500 mt-2">
          You need at least one todo to generate a summary.
        </p>
      )}
    </div>
  );
};