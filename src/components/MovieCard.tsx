import { Star } from "lucide-react";

export interface Movie {
  id: string;
  title: string;
  year: string;
  rating: number;
  poster: string;
}

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="flex gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/30">
      <img
        src={movie.poster}
        alt={movie.title}
        className="h-24 w-16 rounded object-cover"
      />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-medium text-card-foreground">{movie.title}</h3>
          <p className="text-xs text-muted-foreground">{movie.year}</p>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="text-xs font-medium text-card-foreground">{movie.rating}</span>
        </div>
      </div>
    </div>
  );
};
