
import React from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onStartChat: () => void;
}

const EmptyState = ({ onStartChat }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-180px)] text-center px-4">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <MessageSquare className="h-10 w-10 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Chat with your Gong transcripts</h2>
      <p className="text-gray-500 max-w-md mb-6">
        Select your transcripts and start asking questions about your customer conversations.
      </p>
      <Button onClick={onStartChat} size="lg">
        Start a conversation
      </Button>
    </div>
  );
};

export default EmptyState;
