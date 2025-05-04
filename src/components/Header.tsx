
import React from "react";
import { MessageSquare } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-blue-600" />
        <h1 className="text-xl font-semibold">Transcript Whisperer</h1>
      </div>
      <div className="text-sm text-gray-500">
        Powered by Gong Transcripts
      </div>
    </header>
  );
};

export default Header;
