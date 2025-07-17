import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Search, Plus, X, Save, Trash2 } from "lucide-react";

interface CustomTier {
  id: string;
  name: string;
  color: string;
  games: Game[];
}

interface Game {
  id: string;
  title: string;
  image: string;
  genre: string;
}

const defaultTiers: Omit<CustomTier, "games">[] = [
  {
    id: "s",
    name: "S",
    color: "bg-gradient-to-r from-yellow-400 to-orange-500",
  },
  { id: "a", name: "A", color: "bg-gradient-to-r from-green-400 to-green-600" },
  { id: "b", name: "B", color: "bg-gradient-to-r from-blue-400 to-blue-600" },
  {
    id: "c",
    name: "C",
    color: "bg-gradient-to-r from-purple-400 to-purple-600",
  },
  { id: "d", name: "D", color: "bg-gradient-to-r from-gray-400 to-gray-600" },
];

const availableGames: Game[] = [
  {
    id: "1",
    title: "The Witcher 3",
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150&h=200&fit=crop",
    genre: "RPG",
  },
  {
    id: "2",
    title: "God of War",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&h=200&fit=crop",
    genre: "Action",
  },
  {
    id: "3",
    title: "The Last of Us",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&h=200&fit=crop",
    genre: "Adventure",
  },
  {
    id: "4",
    title: "Cyberpunk 2077",
    image:
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=150&h=200&fit=crop",
    genre: "RPG",
  },
  {
    id: "5",
    title: "Spider-Man",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=200&fit=crop",
    genre: "Action",
  },
  {
    id: "6",
    title: "Horizon Zero Dawn",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=200&fit=crop",
    genre: "Adventure",
  },
];

export default function CreateTierList() {
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [tiers, setTiers] = useState<CustomTier[]>(
    defaultTiers.map((tier) => ({ ...tier, games: [] })),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const filteredGames = availableGames.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "all" || game.genre.toLowerCase() === selectedGenre;
    const notInAnyTier = !tiers.some((tier) =>
      tier.games.some((g) => g.id === game.id),
    );
    return matchesSearch && matchesGenre && notInAnyTier;
  });

  const addGameToTier = (game: Game, tierId: string) => {
    setTiers((prev) =>
      prev.map((tier) =>
        tier.id === tierId ? { ...tier, games: [...tier.games, game] } : tier,
      ),
    );
  };

  const removeGameFromTier = (gameId: string, tierId: string) => {
    setTiers((prev) =>
      prev.map((tier) =>
        tier.id === tierId
          ? { ...tier, games: tier.games.filter((g) => g.id !== gameId) }
          : tier,
      ),
    );
  };

  const addCustomTier = () => {
    const newTier: CustomTier = {
      id: `custom-${Date.now()}`,
      name: `Tier ${tiers.length + 1}`,
      color: "bg-gradient-to-r from-slate-400 to-slate-600",
      games: [],
    };
    setTiers((prev) => [...prev, newTier]);
  };

  const removeTier = (tierId: string) => {
    setTiers((prev) => prev.filter((tier) => tier.id !== tierId));
  };

  const updateTierName = (tierId: string, newName: string) => {
    setTiers((prev) =>
      prev.map((tier) =>
        tier.id === tierId ? { ...tier, name: newName } : tier,
      ),
    );
  };

  const handleSave = () => {
    // In a real app, this would save to a backend
    console.log("Saving tier list:", {
      name: listName,
      description,
      tiers,
    });
    alert("Tier list saved! (In a real app, this would save to the backend)");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/lists"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tier Lists
          </Link>

          <h1 className="text-3xl font-bold mb-4">Create Custom Tier List</h1>

          <div className="space-y-4 max-w-2xl">
            <div>
              <Label htmlFor="listName">Tier List Name</Label>
              <Input
                id="listName"
                placeholder="My Epic Games Tier List"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Describe your tier list..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tier List Builder */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Build Your Tiers</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={addCustomTier}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tier
                </Button>
                <Button onClick={handleSave} disabled={!listName}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Tier List
                </Button>
              </div>
            </div>

            {/* Tiers */}
            <div className="space-y-4">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="border border-border rounded-lg overflow-hidden bg-card"
                >
                  {/* Tier Header */}
                  <div
                    className={`${tier.color} p-4 flex items-center justify-between text-white`}
                  >
                    <div className="flex items-center space-x-3">
                      <Input
                        value={tier.name}
                        onChange={(e) =>
                          updateTierName(tier.id, e.target.value)
                        }
                        className="bg-black/20 border-0 text-white placeholder:text-white/70 font-bold text-xl w-20"
                      />
                      <Badge
                        variant="secondary"
                        className="bg-black/20 text-white"
                      >
                        {tier.games.length} games
                      </Badge>
                    </div>
                    {tiers.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTier(tier.id)}
                        className="text-white hover:bg-black/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Games in Tier */}
                  <div className="p-4 min-h-[120px] bg-card">
                    {tier.games.length > 0 ? (
                      <div className="grid grid-cols-6 gap-3">
                        {tier.games.map((game) => (
                          <div key={game.id} className="relative group">
                            <img
                              src={game.image}
                              alt={game.title}
                              className="w-full h-20 object-cover rounded cursor-move"
                            />
                            <button
                              onClick={() =>
                                removeGameFromTier(game.id, tier.id)
                              }
                              className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <p className="text-xs mt-1 truncate">
                              {game.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-20 text-muted-foreground text-sm">
                        Drag games here or click to add
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Selection Panel */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Available Games</h2>

            {/* Search and Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="rpg">RPG</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto">
              {filteredGames.map((game) => (
                <div key={game.id} className="cursor-pointer group">
                  <div className="relative">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-24 object-cover rounded group-hover:opacity-80 transition-opacity"
                    />

                    {/* Add to tier buttons */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center space-y-1 p-2">
                      {tiers.slice(0, 3).map((tier) => (
                        <Button
                          key={tier.id}
                          size="sm"
                          variant="secondary"
                          onClick={() => addGameToTier(game, tier.id)}
                          className="text-xs h-6"
                        >
                          Add to {tier.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-xs font-medium truncate">{game.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {game.genre}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No games found</p>
                <p className="text-xs">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
