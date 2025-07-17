import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TierListFilterProps {
  selectedGenre: string;
  selectedRatingRange: string;
  onGenreChange: (genre: string) => void;
  onRatingRangeChange: (range: string) => void;
}

const genres = [
  { value: "all", label: "All Genres" },
  { value: "action", label: "Action" },
  { value: "rpg", label: "RPG" },
  { value: "adventure", label: "Adventure" },
  { value: "strategy", label: "Strategy" },
  { value: "fps", label: "FPS" },
  { value: "racing", label: "Racing" },
];

const ratingRanges = [
  { value: "all", label: "All Rating Ranges" },
  { value: "1000-10000", label: "1K - 10K ratings" },
  { value: "10000-50000", label: "10K - 50K ratings" },
  { value: "50000-100000", label: "50K - 100K ratings" },
  { value: "100000+", label: "100K+ ratings" },
];

export function TierListFilter({
  selectedGenre,
  selectedRatingRange,
  onGenreChange,
  onRatingRangeChange,
}: TierListFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Filter by:</span>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Genre:</span>
        <Select value={selectedGenre} onValueChange={onGenreChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => (
              <SelectItem key={genre.value} value={genre.value}>
                {genre.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Rating Range:</span>
        <Select value={selectedRatingRange} onValueChange={onRatingRangeChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ratingRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {(selectedGenre !== "all" || selectedRatingRange !== "all") && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onGenreChange("all");
            onRatingRangeChange("all");
          }}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}
