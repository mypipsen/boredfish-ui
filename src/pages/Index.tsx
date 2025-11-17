import { useEffect, useRef } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TopNav } from "@/components/TopNav";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const { messages, sendMessage, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filter out welcome message for checking if we should center
  const hasRealMessages = messages.some(m => m.id !== "welcome");

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-background via-background to-background/95">
      <TopNav />

      {hasRealMessages ? (
        <>
          <main className="flex-1 overflow-y-auto px-4 sm:px-6">
            <div className="mx-auto max-w-2xl space-y-4 py-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.content}
                  isUser={message.isUser}
                  movies={message.movies}
                />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/80 backdrop-blur-sm rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.3s]" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.15s]" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </main>

          <div className="border-t border-border/50 bg-background/50 backdrop-blur-sm px-4 sm:px-6">
            <div className="mx-auto max-w-2xl">
              <ChatInput onSend={sendMessage} disabled={isLoading} />
            </div>
          </div>
        </>
      ) : (
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6">
          <div className="w-full max-w-2xl space-y-6">
            <div className="bg-secondary/80 backdrop-blur-sm border border-border/30 rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-lg shadow-black/10 mx-auto max-w-[85%] sm:max-w-[75%]">
              <p className="text-secondary-foreground">
                Hi! I'm your movie and TV show assistant. You can ask me to search for shows, add them to your watchlist, or get recommendations. Try asking about a movie!
              </p>
            </div>
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </div>
        </main>
      )}
    </div>
  );
};

export default Index;
