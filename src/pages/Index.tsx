
import React, { useState } from "react";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import EmptyState from "@/components/EmptyState";
import { Transcript } from "@/utils/types";

// Mock data - this would come from Supabase in the real implementation
const mockTranscripts: Transcript[] = [
  {
    id: "1",
    title: "Acme Corp - Product Demo",
    date: "2023-05-15",
    customer: "Acme Corporation",
  },
  {
    id: "2",
    title: "TechStar - Sales Call",
    date: "2023-05-10",
    customer: "TechStar Inc.",
  },
  {
    id: "3",
    title: "GlobalFirm - Follow-up",
    date: "2023-05-05",
    customer: "Global Firm LLC",
  },
  {
    id: "4",
    title: "Acme Corp - Contract Discussion",
    date: "2023-04-28",
    customer: "Acme Corporation",
  },
  {
    id: "5",
    title: "NewStart - Initial Meeting",
    date: "2023-04-20",
    customer: "NewStart Solutions",
  },
];

const Index = () => {
  const [chatStarted, setChatStarted] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-col">
        {chatStarted ? (
          <ChatInterface transcripts={mockTranscripts} />
        ) : (
          <EmptyState onStartChat={() => setChatStarted(true)} />
        )}
      </main>
    </div>
  );
};

export default Index;
