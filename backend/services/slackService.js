import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const webhookUrl = process.env.SLACK_WEBHOOK_URL;

if (!webhookUrl) {
  console.error('Missing Slack webhook URL in .env file');
  process.exit(1);
}

export const sendToSlack = async (summary, todos) => {
  try {
    const pendingCount = todos.filter(todo => !todo.completed).length;
    const completedCount = todos.length - pendingCount;
    
    const message = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📋 Todo Summary Report',
            emoji: true
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: summary
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `*Status*: ${pendingCount} pending, ${completedCount} completed`
            }
          ]
        }
      ]
    };
    
    await axios.post(webhookUrl, message);
    return true;
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    throw new Error('Failed to send message to Slack');
  }
};