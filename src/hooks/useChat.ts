import { useState } from "react";
import { Movie } from "@/components/MovieCard";

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: number;
  movies?: Movie[];
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm your movie and TV show assistant. You can ask me to search for shows, add them to your watchlist, or get recommendations. Try asking about a movie!",
      isUser: false,
      timestamp: Date.now(),
    },
    {
      id: "sample",
      content: "Here are some popular sci-fi movies you might enjoy:",
      isUser: false,
      timestamp: Date.now() + 1,
      movies: [
        {
          id: "1",
          title: "Inception",
          year: "2010",
          rating: 8.8,
          poster: "https://image.tmdb.org/t/p/w200/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg"
        },
        {
          id: "2",
          title: "Interstellar",
          year: "2014",
          rating: 8.7,
          poster: "https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
        },
        {
          id: "3",
          title: "The Matrix",
          year: "1999",
          rating: 8.7,
          poster: "https://image.tmdb.org/t/p/w200/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
        }
      ]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = (content: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      isUser: true,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: generateResponse(content),
        isUser: false,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  return { messages, sendMessage, isLoading };
};

const generateResponse = (input: string): string => {
  const lower = input.toLowerCase();

  if (lower.includes("search") || lower.includes("find") || lower.includes("looking for")) {
    return "I found several matches! What would you like to do? You can ask me to:\n• Add to watchlist\n• Get similar recommendations\n• Notify when new episodes are available";
  }

  if (lower.includes("watchlist") || lower.includes("add")) {
    return "Added to your watchlist! You'll find all your saved shows there. Want me to recommend something similar?";
  }

  if (lower.includes("recommend") || lower.includes("similar")) {
    return "Based on your interests, here are some recommendations you might enjoy. Would you like to add any to your watchlist?";
  }

  if (lower.includes("notify") || lower.includes("alert") || lower.includes("episode")) {
    return "I'll notify you when new episodes are released! You can manage your notifications in settings.";
  }

  return "I can help you search for movies and TV shows, manage your watchlist, and get personalized recommendations. What would you like to do?";
};
