
import React from "react";
import { MessageSquare, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { processAndStoreDocuments } from "@/utils/documentProcessing";

const Header = () => {
  const { toast } = useToast();
  
  const handleImportFromGong = async () => {
    try {
      toast({
        title: "Processing Gong Transcripts",
        description: "Starting to fetch and process your transcripts...",
      });
      
      // This will be implemented properly once Supabase is connected
      const processedTranscripts = await processAndStoreDocuments();
      
      toast({
        title: "Import Complete",
        description: `Successfully processed ${processedTranscripts.length} transcripts.`,
      });
    } catch (error) {
      console.error("Error importing from Gong:", error);
      toast({
        title: "Import Failed",
        description: "Could not import transcripts. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="border-b bg-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-blue-600" />
        <h1 className="text-xl font-semibold">Transcript Whisperer</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button 
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={handleImportFromGong}
        >
          <Database className="h-4 w-4" />
          <span>Import from Gong</span>
        </Button>
        <div className="text-sm text-gray-500">
          Powered by Gong Transcripts
        </div>
      </div>
    </header>
  );
};

export default Header;
