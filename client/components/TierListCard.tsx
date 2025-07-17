import { GameCard } from "./GameCard";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface TierGame {
  title: string;
  image: string;
  rating: number;
  genre: string;
  ratingsCount: number;
}

interface TierListCardProps {
  tier: "S" | "A" | "B" | "C" | "D" | "E" | "F";
  games: TierGame[];
  ratingRange: string;
  genre: string;
}

const tierColors = {
  S: "bg-gradient-to-r from-yellow-400 to-orange-500 text-black",
  A: "bg-gradient-to-r from-green-400 to-green-600 text-white",
  B: "bg-gradient-to-r from-blue-400 to-blue-600 text-white",
  C: "bg-gradient-to-r from-purple-400 to-purple-600 text-white",
  D: "bg-gradient-to-r from-gray-400 to-gray-600 text-white",
  E: "bg-gradient-to-r from-red-400 to-red-500 text-white",
  F: "bg-gradient-to-r from-red-600 to-red-800 text-white",
};

export function TierListCard({
  tier,
  games,
  ratingRange,
  genre,
}: TierListCardProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {/* Tier Header */}
      <div
        className={`${tierColors[tier]} p-4 flex items-center justify-between`}
      >
        <div className="flex items-center space-x-3">
          <div className="text-3xl font-bold">{tier}</div>
          <div>
            <h3 className="font-bold text-lg capitalize">{genre} Games</h3>
            <div className="flex items-center space-x-1 opacity-90">
              <Users className="h-4 w-4" />
              <span className="text-sm">{ratingRange} ratings</span>
            </div>
          </div>
        </div>
        <Badge variant="secondary" className="bg-black/20 text-current">
          {games.length} games
        </Badge>
      </div>

      {/* Games Grid */}
      <div className="p-4">
        {games.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {games.map((game, index) => (
              <div key={index} className="space-y-2">
                <GameCard
                  title={game.title}
                  image={game.image}
                  rating={game.rating}
                  size="small"
                />
                <div className="text-xs text-muted-foreground text-center">
                  {game.ratingsCount.toLocaleString()} ratings
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No games in this tier yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
