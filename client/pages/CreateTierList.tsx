import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Game {
  id: string;
  title: string;
  image: string;
  genre: string;
}

interface CustomTier {
  id: string;
  name: string;
  color: string;
  games: Game[];
}

const defaultTiers: Omit<CustomTier, "games">[] = [
  { id: "s", name: "S", color: "bg-yellow-500" },
  { id: "a", name: "A", color: "bg-green-500" },
  { id: "b", name: "B", color: "bg-blue-500" },
  { id: "c", name: "C", color: "bg-purple-500" },
  { id: "d", name: "D", color: "bg-gray-500" },
];

const initialGames: Game[] = [
  { id: "1", title: "The Witcher 3", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150&h=150&fit=crop", genre: "RPG" },
  { id: "2", title: "God of War", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&h=150&fit=crop", genre: "Action" },
  { id: "3", title: "The Last of Us", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&h=150&fit=crop", genre: "Adventure" },
  { id: "4", title: "Cyberpunk 2077", image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=150&h=150&fit=crop", genre: "RPG" },
];

export default function CreateTierList() {
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [tiers, setTiers] = useState<CustomTier[]>(defaultTiers.map((t) => ({ ...t, games: [] })));
  const [gamesPool, setGamesPool] = useState<Game[]>(initialGames);

  // Add Game Form
  const [newGameTitle, setNewGameTitle] = useState("");
  const [newGameImage, setNewGameImage] = useState("");
  const [newGameGenre, setNewGameGenre] = useState("");

  // Drag & Drop handling
  const onDragEnd = (result: any) => {
  if (!result.destination) return;

  const { source, destination } = result;

  // ✅ If dropped in the same place, do nothing
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return;
  }

  // ✅ Dragging inside the same tier → just reorder
  if (source.droppableId === destination.droppableId && source.droppableId !== "pool") {
    setTiers((prevTiers) => {
      const newTiers = [...prevTiers];
      const tierIndex = newTiers.findIndex((t) => t.id === source.droppableId);
      const games = Array.from(newTiers[tierIndex].games);
      const [moved] = games.splice(source.index, 1);
      games.splice(destination.index, 0, moved);
      newTiers[tierIndex].games = games;
      return newTiers;
    });
    return;
  }

  // ✅ Dragging inside the pool (just reorder pool)
  if (source.droppableId === "pool" && destination.droppableId === "pool") {
    setGamesPool((prev) => {
      const updated = Array.from(prev);
      const [moved] = updated.splice(source.index, 1);
      updated.splice(destination.index, 0, moved);
      return updated;
    });
    return;
  }

  // ===== MOVING BETWEEN POOL <-> TIER or BETWEEN TWO TIERS =====
  setTiers((prevTiers) => {
    const newTiers = [...prevTiers];
    const sourceTierIndex = newTiers.findIndex((t) => t.id === source.droppableId);
    const destTierIndex = newTiers.findIndex((t) => t.id === destination.droppableId);

    // FROM pool to tier
    if (source.droppableId === "pool") {
      const newGamesPool = Array.from(gamesPool);
      const [moved] = newGamesPool.splice(source.index, 1);

      const newDestGames = Array.from(newTiers[destTierIndex].games);
      // ✅ Prevent duplicate game
      if (!newDestGames.find((g) => g.id === moved.id)) {
        newDestGames.splice(destination.index, 0, moved);
      }
      newTiers[destTierIndex].games = newDestGames;
      setGamesPool(newGamesPool);
      return newTiers;
    }

    // FROM tier to pool
    if (destination.droppableId === "pool") {
      const sourceGames = Array.from(newTiers[sourceTierIndex].games);
      const [moved] = sourceGames.splice(source.index, 1);
      const newGamesPool = Array.from(gamesPool);
      newGamesPool.splice(destination.index, 0, moved);
      newTiers[sourceTierIndex].games = sourceGames;
      setGamesPool(newGamesPool);
      return newTiers;
    }

    // FROM one tier to another tier
    const sourceGames = Array.from(newTiers[sourceTierIndex].games);
    const [moved] = sourceGames.splice(source.index, 1);
    const destGames = Array.from(newTiers[destTierIndex].games);
    // ✅ Prevent duplicate game in destination tier
    if (!destGames.find((g) => g.id === moved.id)) {
      destGames.splice(destination.index, 0, moved);
    }
    newTiers[sourceTierIndex].games = sourceGames;
    newTiers[destTierIndex].games = destGames;

    return newTiers;
  });
};


  const addCustomTier = () => {
    setTiers((prev) => [
      ...prev,
      { id: `custom-${Date.now()}`, name: `Tier ${prev.length + 1}`, color: "bg-slate-500", games: [] },
    ]);
  };

  const removeTier = (tierId: string) => {
    setTiers((prev) => prev.filter((tier) => tier.id !== tierId));
  };

  const addNewGame = () => {
    if (!newGameTitle.trim()) return;
    const newGame: Game = {
      id: Date.now().toString(),
      title: newGameTitle.trim(),
      image: newGameImage.trim() || "https://via.placeholder.com/150",
      genre: newGameGenre.trim() || "Unknown",
    };
    setGamesPool((prev) => [...prev, newGame]);
    setNewGameTitle("");
    setNewGameImage("");
    setNewGameGenre("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Link to="/lists" className="flex items-center text-sm text-muted-foreground mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Link>

        <h1 className="text-3xl font-bold mb-4">Create Tier List</h1>

        <div className="space-y-4 max-w-2xl mb-8">
          <div>
            <Label htmlFor="listName">Tier List Name</Label>
            <Input value={listName} onChange={(e) => setListName(e.target.value)} placeholder="My Epic Tier List" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe it..." />
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          <Button onClick={addCustomTier} variant="outline"><Plus className="h-4 w-4 mr-2" /> Add Tier</Button>
          <Button onClick={() => console.log("Save tier list")} disabled={!listName}><Save className="h-4 w-4 mr-2" /> Save</Button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="space-y-3">
            {tiers.map((tier) => (
              <Droppable key={tier.id} droppableId={tier.id} direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex items-center p-3 rounded-lg ${tier.color} text-white min-h-[100px]`}
                  >
                    <div className="w-16 text-center font-bold text-xl flex-shrink-0">{tier.name}</div>
                    <div className="flex flex-wrap gap-2 flex-1">
                      {tier.games.map((game, index) => (
                        <Draggable key={game.id} draggableId={game.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white text-black rounded shadow overflow-hidden w-[80px]"
                            >
                              <img src={game.image} alt={game.title} className="w-full h-16 object-cover" />
                              <p className="text-xs p-1 truncate">{game.title}</p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                    <Badge variant="secondary" className="ml-2">{tier.games.length}</Badge>
                    {tiers.length > 1 && (
                      <Button size="icon" variant="ghost" onClick={() => removeTier(tier.id)}>
                        <Trash2 className="h-4 w-4 text-white" />
                      </Button>
                    )}
                  </div>
                )}
              </Droppable>
            ))}

            {/* Add Game Form */}
            <div className="bg-neutral-50 p-3 rounded border">
              <h3 className="font-semibold mb-2">Add New Game</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                <Input placeholder="Title" value={newGameTitle} onChange={(e) => setNewGameTitle(e.target.value)} />
                <Input placeholder="Image URL" value={newGameImage} onChange={(e) => setNewGameImage(e.target.value)} />
                <Input placeholder="Genre" value={newGameGenre} onChange={(e) => setNewGameGenre(e.target.value)} />
                <Button onClick={addNewGame}>Add</Button>
              </div>
            </div>

            {/* Games Pool */}
            <Droppable droppableId="pool" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-neutral-100 p-3 rounded-lg flex flex-wrap gap-2 min-h-[80px]"
                >
                  {gamesPool.map((game, index) => (
                    <Draggable key={game.id} draggableId={game.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white border rounded shadow w-[80px]"
                        >
                          <img src={game.image} alt={game.title} className="w-full h-16 object-cover" />
                          <p className="text-xs p-1 truncate">{game.title}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </main>
    </div>
  );
}
