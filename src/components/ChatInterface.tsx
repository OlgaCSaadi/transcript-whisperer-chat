
import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage as MessageType, Transcript } from "@/utils/types";
import { Send } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import TranscriptSelector from "./TranscriptSelector";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

interface ChatInterfaceProps {
  transcripts: Transcript[];
}

const ChatInterface = ({ transcripts }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedTranscripts, setSelectedTranscripts] = useState<Transcript[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    if (selectedTranscripts.length === 0) {
      toast({
        title: "No transcripts selected",
        description: "Please select at least one transcript to chat with.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: MessageType = {
      id: uuidv4(),
      content: inputMessage,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Here you would call your Supabase function to process the message
    // For now, we'll simulate a response
    setTimeout(() => {
      const assistantMessage: MessageType = {
        id: uuidv4(),
        content: `This is a simulated response. Once connected to Supabase, I'll be able to answer questions about your selected transcripts (${selectedTranscripts.map(t => t.title).join(", ")}).`,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSelectTranscript = (transcript: Transcript) => {
    setSelectedTranscripts((prev) => {
      const isAlreadySelected = prev.some((t) => t.id === transcript.id);
      
      if (isAlreadySelected) {
        return prev.filter((t) => t.id !== transcript.id);
      } else {
        return [...prev, transcript];
      }
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-72px)]">
      <div className="p-4 border-b bg-gray-50">
        <TranscriptSelector 
          transcripts={transcripts} 
          selectedTranscripts={selectedTranscripts} 
          onSelectTranscript={handleSelectTranscript} 
        />
        {selectedTranscripts.length > 0 && (
          <div className="mt-3 text-sm text-gray-500">
            Chatting with {selectedTranscripts.length} transcript{selectedTranscripts.length > 1 ? "s" : ""}
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-gray-400">
              <p className="mb-2">Select transcripts and start asking questions</p>
              <p className="text-sm">Example: "What objections came up in the last call with Acme Corp?"</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
