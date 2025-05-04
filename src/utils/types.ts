
export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

export interface Transcript {
  id: string;
  title: string;
  date: string;
  customer: string;
  selected?: boolean;
  content?: string;
  metadata?: Record<string, any>;
}
