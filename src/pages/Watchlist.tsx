import { useEffect, useState } from "react";
import { TopNav } from "@/components/TopNav";
import { MovieCard } from "@/components/MovieCard";
import { useToast } from "@/hooks/use-toast";

interface WatchlistItem {
  id: string;
  title: string;
  year: string;
  poster: string;
  type: "movie" | "tv";
  rating: number;
}

const Watchlist = () => {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const response = await fetch("/api/watchlist", {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch watchlist");

      const data = await response.json();
      setItems(data.items || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load watchlist",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold">My Watchlist</h1>

        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-muted-foreground">
            Your watchlist is empty
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Watchlist;
