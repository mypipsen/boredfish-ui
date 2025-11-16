import { Star } from "lucide-react";

export interface Movie {
  id: string;
  title: string;
  year: string;
  rating: number;
  poster: string;
  description?: string;
}

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="flex gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <img
        src={movie.poster}
        alt={movie.title}
        className="h-32 w-24 rounded object-cover shadow-md"
      />
      <div className="flex flex-1 flex-col gap-2">
        <div>
          <h3 className="font-semibold text-card-foreground">{movie.title}</h3>
          <p className="text-xs text-muted-foreground">{movie.year}</p>
        </div>
        {movie.description && (
          <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
            {movie.description}
          </p>
        )}
        <div className="mt-auto flex items-center gap-1">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="text-xs font-medium text-card-foreground">{movie.rating}</span>
        </div>
      </div>
    </div>
  );
};
