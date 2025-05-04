
import React, { useState } from "react";
import { Transcript } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface TranscriptSelectorProps {
  transcripts: Transcript[];
  selectedTranscripts: Transcript[];
  onSelectTranscript: (transcript: Transcript) => void;
}

const TranscriptSelector = ({
  transcripts,
  selectedTranscripts,
  onSelectTranscript,
}: TranscriptSelectorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-md">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-gray-700 border-gray-300"
          >
            {selectedTranscripts.length > 0
              ? `${selectedTranscripts.length} transcript${selectedTranscripts.length > 1 ? "s" : ""} selected`
              : "Select transcripts"}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 max-h-[400px] overflow-y-auto">
          <div className="p-2">
            {transcripts.map((transcript) => {
              const isSelected = selectedTranscripts.some(t => t.id === transcript.id);
              return (
                <div key={transcript.id}>
                  <div
                    className={cn(
                      "flex items-center justify-between rounded-md px-2 py-2 cursor-pointer hover:bg-gray-100",
                      isSelected && "bg-blue-50"
                    )}
                    onClick={() => onSelectTranscript(transcript)}
                  >
                    <div className="flex-1 mr-2">
                      <div className="font-medium">{transcript.title}</div>
                      <div className="text-xs text-gray-500">
                        {transcript.customer} - {transcript.date}
                      </div>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-blue-600" />}
                  </div>
                  <Separator className="my-1" />
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TranscriptSelector;
