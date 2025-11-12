import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 py-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for movies or TV shows..."
        disabled={disabled}
        className={cn(
          "flex-1 bg-secondary text-foreground placeholder:text-muted-foreground",
          "rounded-xl px-4 py-3 text-sm outline-none",
          "focus:ring-2 focus:ring-ring transition-all",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      />
      <Button
        type="submit"
        size="icon"
        disabled={!input.trim() || disabled}
        className="h-12 w-12 shrink-0 rounded-xl"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};
