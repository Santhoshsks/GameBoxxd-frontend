import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { TierListCard } from "@/components/TierListCard";
import { TierListFilter } from "@/components/TierListFilter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trophy, TrendingUp, Star } from "lucide-react";

interface TierGame {
  title: string;
  image: string;
  rating: number;
  genre: string;
  ratingsCount: number;
}

export default function Lists() {
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedRatingRange, setSelectedRatingRange] = useState("all");

  // Sample tier list data - in a real app this would come from an API
  const tierListData = {
    action: {
      "10000-50000": {
        S: [
          {
            title: "God of War",
            image:
              "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&h=200&fit=crop",
            rating: 4.8,
            genre: "action",
            ratingsCount: 45000,
          },
          {
            title: "Spider-Man: Miles Morales",
            image:
              "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=200&fit=crop",
            rating: 4.7,
            genre: "action",
            ratingsCount: 42000,
          },
        ],
        A: [
          {
            title: "Ghost of Tsushima",
            image:
              "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&h=200&fit=crop",
            rating: 4.6,
            genre: "action",
            ratingsCount: 38000,
          },
        ],
        B: [
          {
            title: "Assassin's Creed Valhalla",
            image:
              "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=150&h=200&fit=crop",
            rating: 4.2,
            genre: "action",
            ratingsCount: 32000,
          },
        ],
        C: [],
        D: [],
        E: [],
        F: [],
      },
      "1000-10000": {
        S: [],
        A: [
          {
            title: "Nioh 2",
            image:
              "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=150&h=200&fit=crop",
            rating: 4.5,
            genre: "action",
            ratingsCount: 8500,
          },
        ],
        B: [
          {
            title: "Control",
            image:
              "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=150&h=200&fit=crop",
            rating: 4.1,
            genre: "action",
            ratingsCount: 7200,
          },
        ],
        C: [],
        D: [],
        E: [],
        F: [],
      },
    },
    rpg: {
      "10000-50000": {
        S: [
          {
            title: "The Witcher 3",
            image:
              "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150&h=200&fit=crop",
            rating: 4.9,
            genre: "rpg",
            ratingsCount: 48000,
          },
        ],
        A: [
          {
            title: "Persona 5 Royal",
            image:
              "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=200&fit=crop",
            rating: 4.7,
            genre: "rpg",
            ratingsCount: 35000,
          },
        ],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
      },
      "1000-10000": {
        S: [],
        A: [
          {
            title: "Disco Elysium",
            image:
              "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=150&h=200&fit=crop",
            rating: 4.8,
            genre: "rpg",
            ratingsCount: 9200,
          },
        ],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
      },
    },
    adventure: {
      "10000-50000": {
        S: [
          {
            title: "The Last of Us Part II",
            image:
              "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&h=200&fit=crop",
            rating: 4.6,
            genre: "adventure",
            ratingsCount: 41000,
          },
        ],
        A: [
          {
            title: "Horizon Zero Dawn",
            image:
              "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=200&fit=crop",
            rating: 4.5,
            genre: "adventure",
            ratingsCount: 36000,
          },
        ],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
      },
      "1000-10000": {
        S: [],
        A: [],
        B: [
          {
            title: "A Plague Tale: Innocence",
            image:
              "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=150&h=200&fit=crop",
            rating: 4.3,
            genre: "adventure",
            ratingsCount: 6800,
          },
        ],
        C: [],
        D: [],
        E: [],
        F: [],
      },
    },
  };

  const getFilteredTierLists = () => {
    const results = [];
    const genres =
      selectedGenre === "all" ? Object.keys(tierListData) : [selectedGenre];

    for (const genre of genres) {
      const genreData = tierListData[genre as keyof typeof tierListData];
      if (!genreData) continue;

      const ranges =
        selectedRatingRange === "all"
          ? Object.keys(genreData)
          : [selectedRatingRange];

      for (const range of ranges) {
        const rangeData = genreData[range as keyof typeof genreData];
        if (!rangeData) continue;

        const tiers: ("S" | "A" | "B" | "C" | "D" | "E" | "F")[] = [
          "S",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
        ];

        for (const tier of tiers) {
          const games = rangeData[tier] || [];
          if (
            games.length > 0 ||
            (selectedGenre !== "all" && selectedRatingRange !== "all")
          ) {
            results.push({
              tier,
              games,
              ratingRange: range,
              genre,
            });
          }
        }
      }
    }

    return results;
  };

  const filteredTierLists = getFilteredTierLists();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Trophy className="h-8 w-8 mr-3 text-primary" />
              Game Tier Lists
            </h1>
            <p className="text-muted-foreground">
              Discover the best games organized by tiers, genres, and community
              ratings
            </p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/create-tier-list">
              <Plus className="h-4 w-4 mr-2" />
              Create Custom Tier List
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">847</p>
                <p className="text-muted-foreground text-sm">
                  Total Games Ranked
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">2.4M</p>
                <p className="text-muted-foreground text-sm">Total Ratings</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Trophy className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-muted-foreground text-sm">S-Tier Games</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <TierListFilter
          selectedGenre={selectedGenre}
          selectedRatingRange={selectedRatingRange}
          onGenreChange={setSelectedGenre}
          onRatingRangeChange={setSelectedRatingRange}
        />

        {/* Tier Lists */}
        <div className="mt-8 space-y-6">
          {filteredTierLists.length > 0 ? (
            filteredTierLists.map((tierList, index) => (
              <TierListCard
                key={`${tierList.genre}-${tierList.ratingRange}-${tierList.tier}-${index}`}
                tier={tierList.tier}
                games={tierList.games}
                ratingRange={tierList.ratingRange}
                genre={tierList.genre}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No tier lists found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or create a custom tier list
              </p>
              <Button asChild>
                <Link to="/create-tier-list">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Custom Tier List
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Popular Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { genre: "action", count: 234, color: "bg-red-500" },
              { genre: "rpg", count: 189, color: "bg-blue-500" },
              { genre: "adventure", count: 156, color: "bg-green-500" },
              { genre: "strategy", count: 98, color: "bg-purple-500" },
            ].map((category) => (
              <button
                key={category.genre}
                onClick={() => setSelectedGenre(category.genre)}
                className="p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors text-left"
              >
                <div
                  className={`w-3 h-3 rounded-full ${category.color} mb-2`}
                />
                <h3 className="font-semibold capitalize">{category.genre}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.count} games
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
