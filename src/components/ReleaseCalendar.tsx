import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, isSameDay, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Film, Tv } from "lucide-react";

interface ReleaseItem {
  id: string;
  title: string;
  year: string;
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

  // Get release type for a specific date
  const getReleaseForDate = (date: Date) => {
    return upcomingReleases.find((item) =>
      isSameDay(item.date, date)
    );
  };

  // Sort all items by release date
  const allItemsSorted = [...items].sort((a, b) => {
    if (!a.releaseDate) return 1;
    if (!b.releaseDate) return -1;
    return parseISO(a.releaseDate).getTime() - parseISO(b.releaseDate).getTime();
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Release Calendar</h2>
        <p className="text-muted-foreground">
          Track upcoming releases for movies and shows on your watchlist
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="p-8 xl:col-span-2">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className={cn("pointer-events-auto w-full [&_.rdp-months]:w-full [&_.rdp-month]:w-full [&_.rdp-table]:w-full [&_td]:p-3 [&_th]:p-3")}
            modifiers={{
              hasRelease: (date) => releaseDates.has(format(date, "yyyy-MM-dd")),
            }}
            modifiersClassNames={{
              hasRelease: "relative",
            }}
            components={{
              DayContent: (props) => {
                const release = getReleaseForDate(props.date);
                return (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <span>{props.date.getDate()}</span>
                    {release && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                        {release.type === "movie" ? (
                          <Film className="h-3 w-3 text-primary" />
                        ) : (
                          <Tv className="h-3 w-3 text-primary" />
                        )}
                      </div>
                    )}
                  </div>
                );
              },
            }}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {selectedDate
              ? `Releases on ${format(selectedDate, "MMMM d, yyyy")}`
              : "All Items"}
          </h3>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
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
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-12 h-18 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                      <Badge variant="secondary" className="mt-1">
                        {item.type === "movie" ? <Film className="h-3 w-3 mr-1" /> : <Tv className="h-3 w-3 mr-1" />}
                        {item.type === "movie" ? "Movie" : "TV Show"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </>
            )}

            {!selectedDate && (
              <>
                {allItemsSorted.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => item.releaseDate && setSelectedDate(parseISO(item.releaseDate))}
                  >
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-12 h-18 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                      {item.releaseDate ? (
                        <p className="text-xs text-muted-foreground">
                          {format(parseISO(item.releaseDate), "MMM d, yyyy")}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Released {item.year}
                        </p>
                      )}
                      <Badge variant="secondary" className="mt-1">
                        {item.type === "movie" ? <Film className="h-3 w-3 mr-1" /> : <Tv className="h-3 w-3 mr-1" />}
                        {item.type === "movie" ? "Movie" : "TV Show"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
