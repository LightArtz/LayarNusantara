// components/chatbot/ChatbotIcon.tsx
import { MessageSquareText } from 'lucide-react';

export default function ChatbotIcon() {
  return (
    <div className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors">
      <MessageSquareText size={28} />
    </div>
  );
}