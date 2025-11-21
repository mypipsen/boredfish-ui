import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, isSameDay, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

interface ReleaseItem {
  id: string;
  title: string;
  releaseDate?: string;
  type: "movie" | "tv";
  poster: string;
}

interface ReleaseCalendarProps {
  items: ReleaseItem[];
}

export const ReleaseCalendar = ({ items }: ReleaseCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Filter items with release dates
  const upcomingReleases = items
    .filter((item) => item.releaseDate)
    .map((item) => ({
      ...item,
      date: parseISO(item.releaseDate),
    }));

  // Get releases for selected date
  const releasesOnDate = selectedDate
    ? upcomingReleases.filter((item) =>
        isSameDay(item.date, selectedDate)
      )
    : [];

  // Create a set of dates that have releases
  const releaseDates = new Set(
    upcomingReleases.map((item) => format(item.date, "yyyy-MM-dd"))
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Release Calendar</h2>
        <p className="text-muted-foreground">
          Track upcoming releases for movies and shows on your watchlist
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className={cn("pointer-events-auto")}
            modifiers={{
              hasRelease: (date) => releaseDates.has(format(date, "yyyy-MM-dd")),
            }}
            modifiersClassNames={{
              hasRelease: "bg-primary/20 font-bold text-primary hover:bg-primary/30",
            }}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {selectedDate
              ? `Releases on ${format(selectedDate, "MMMM d, yyyy")}`
              : "Upcoming Releases"}
          </h3>

          <div className="space-y-4">
            {selectedDate && releasesOnDate.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No releases scheduled for this date
              </p>
            )}

            {selectedDate && releasesOnDate.length > 0 && (
              <>
                {releasesOnDate.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.title}</h4>
                      <Badge variant="secondary" className="mt-1">
                        {item.type === "movie" ? "Movie" : "TV Show"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </>
            )}

            {!selectedDate && upcomingReleases.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-3">
                  Select a highlighted date to see details
                </p>
                {upcomingReleases
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => setSelectedDate(item.date)}
                    >
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {format(item.date, "MMMM d, yyyy")}
                        </p>
                        <Badge variant="secondary" className="mt-1">
                          {item.type === "movie" ? "Movie" : "TV Show"}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {!selectedDate && upcomingReleases.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No upcoming releases in your watchlist
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
