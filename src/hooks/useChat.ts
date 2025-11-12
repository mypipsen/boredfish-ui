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

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      isUser: true,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost/search?q=${encodeURIComponent(content)}`);
      const data = await response.json();
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: data.message || "Here are the results:",
        isUser: false,
        timestamp: Date.now(),
        movies: data.movies || [],
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `bot-${Date.now()}`,
        content: "Sorry, I couldn't search for that right now. Please try again.",
        isUser: false,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
};
