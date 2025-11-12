import { cn } from "@/lib/utils";
import { MovieCard, Movie } from "./MovieCard";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  movies?: Movie[];
}

export const ChatMessage = ({ message, isUser, movies }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full animate-in fade-in-50 slide-in-from-bottom-2 duration-300",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        {message}
        {movies && movies.length > 0 && (
          <div className="mt-3 space-y-2">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
