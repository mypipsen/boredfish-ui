import { useEffect, useState } from "react";
import { TopNav } from "@/components/TopNav";
import { MovieCard } from "@/components/MovieCard";
import { useToast } from "@/hooks/use-toast";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface ArchiveItem {
  id: string;
  title: string;
  year: string;
  poster: string;
  type: "movie" | "tv";
  rating: number;
  liked: boolean;
}

const Archive = () => {
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchArchive();
  }, []);

  const fetchArchive = async () => {
    try {
      const response = await fetch("/api/archive", {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch archive");

      const data = await response.json();
      setItems(data.items || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load archive",
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
        <h1 className="mb-8 text-3xl font-bold">Watched Archive</h1>

        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-muted-foreground">
            Your archive is empty
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <div key={item.id} className="relative">
                <MovieCard movie={item} />
                <div className="absolute right-2 top-2 rounded-full bg-background/80 p-2 backdrop-blur-sm">
                  {item.liked ? (
                    <ThumbsUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <ThumbsDown className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Archive;
