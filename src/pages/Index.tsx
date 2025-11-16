import { useEffect, useRef } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { useChat } from "@/hooks/useChat";
import boredFish from "@/assets/bored-fish.png";

const Index = () => {
  const { messages, sendMessage, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-background via-background to-background/95">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-2xl items-center justify-center gap-3">
          <img src={boredFish} alt="Bored Fish" className="h-8 w-8 sm:h-10 sm:w-10 opacity-90" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent sm:text-2xl">
            bored.fish
          </h1>
        </div>
      </header>

      {hasMessages ? (
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
          <div className="w-full max-w-2xl">
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </div>
        </main>
      )}
    </div>
  );
};

export default Index;
