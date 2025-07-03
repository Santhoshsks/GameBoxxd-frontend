import { Navigation } from "@/components/Navigation";
import { GameCard } from "@/components/GameCard";
import { UserReview } from "@/components/UserReview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, TrendingUp, Clock, Users } from "lucide-react";

export default function Index() {
  // Sample data - in a real app this would come from an API
  const featuredGames = [
    {
      title: "The Last of Us Part II",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=400&fit=crop",
      rating: 4.5,
      views: "1.2k",
      likes: "856",
      year: "2020",
    },
    {
      title: "God of War",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=400&fit=crop",
      rating: 4.8,
      views: "2.1k",
      likes: "1.4k",
      year: "2018",
    },
    {
      title: "Cyberpunk 2077",
      image:
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=400&fit=crop",
      rating: 3.7,
      views: "980",
      likes: "421",
      year: "2020",
    },
    {
      title: "Spider-Man: Miles Morales",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      rating: 4.6,
      views: "1.8k",
      likes: "1.2k",
      year: "2020",
    },
  ];

  const justReviewed = [
    {
      title: "Elden Ring",
      image:
        "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=150&h=200&fit=crop",
      rating: 4.9,
      year: "2022",
    },
    {
      title: "Horizon Forbidden West",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=200&fit=crop",
      rating: 4.4,
      year: "2022",
    },
    {
      title: "Gran Turismo 7",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=150&h=200&fit=crop",
      rating: 4.1,
      year: "2022",
    },
    {
      title: "Dying Light 2",
      image:
        "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=150&h=200&fit=crop",
      rating: 3.8,
      year: "2022",
    },
  ];

  const reviews = [
    {
      user: {
        name: "Alex Johnson",
        username: "alexj",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
      game: {
        title: "The Witcher 3",
        year: "2015",
        image:
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=80&h=100&fit=crop",
      },
      rating: 5,
      review:
        "An absolute masterpiece. The storytelling, character development, and world-building are unmatched. Every side quest feels meaningful and the choices you make genuinely impact the narrative.",
      likes: 147,
      timeAgo: "2 hours ago",
    },
    {
      user: {
        name: "Sarah Chen",
        username: "sarahc",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      },
      game: {
        title: "Hades",
        year: "2020",
        image:
          "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=80&h=100&fit=crop",
      },
      rating: 4,
      review:
        "Supergiant Games has done it again. The roguelike mechanics are perfectly balanced, and the narrative integration is brilliant. Each run feels fresh and rewarding.",
      likes: 89,
      timeAgo: "5 hours ago",
    },
  ];

  const topReviewers = [
    {
      name: "James Rodriguez",
      username: "jamesrod",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      reviewCount: 142,
    },
    {
      name: "Emma Wilson",
      username: "emmaw",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b9e8e3e8?w=40&h=40&fit=crop&crop=face",
      reviewCount: 98,
    },
    {
      name: "Michael Park",
      username: "mikepark",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      reviewCount: 87,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero/Featured section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Popular Games This Week</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featuredGames.map((game, index) => (
                  <GameCard
                    key={index}
                    title={game.title}
                    image={game.image}
                    rating={game.rating}
                    views={game.views}
                    likes={game.likes}
                    year={game.year}
                    size="large"
                  />
                ))}
              </div>
            </section>

            {/* Promotional banner */}
            <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Level up! Get a better version of yourself
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Get detailed stats and data, filtering by your favorite
                    platforms, wishlist notifications, no third-party ads and
                    more...
                  </p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Upgrade to Pro
                </Button>
              </div>
            </section>

            {/* Just Reviewed */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Just Reviewed
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="flex space-x-4 overflow-x-auto pb-4">
                {justReviewed.map((game, index) => (
                  <div key={index} className="flex-shrink-0">
                    <GameCard
                      title={game.title}
                      image={game.image}
                      rating={game.rating}
                      year={game.year}
                      size="small"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Popular Reviews */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Popular Reviews This Week</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <UserReview key={index} {...review} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Crew Picks */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Crew Picks</h3>
              <div className="grid grid-cols-2 gap-2">
                <GameCard
                  title="Elden Ring"
                  image="https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=150&h=200&fit=crop"
                  rating={4.9}
                  year="2022"
                  size="small"
                />
                <GameCard
                  title="God of War"
                  image="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&h=200&fit=crop"
                  rating={4.8}
                  year="2018"
                  size="small"
                />
                <GameCard
                  title="The Last of Us"
                  image="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&h=200&fit=crop"
                  rating={4.7}
                  year="2013"
                  size="small"
                />
                <GameCard
                  title="Red Dead 2"
                  image="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=200&fit=crop"
                  rating={4.6}
                  year="2018"
                  size="small"
                />
              </div>
            </section>

            {/* Popular Reviewers */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Popular Reviewers
              </h3>
              <div className="space-y-3">
                {topReviewers.map((reviewer, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={reviewer.avatar} />
                      <AvatarFallback>{reviewer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{reviewer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        @{reviewer.username}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {reviewer.reviewCount}
                    </Badge>
                  </div>
                ))}
              </div>
            </section>

            {/* Can't find a game? */}
            <section className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Can't find a game?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Do you know letterboxd.com? We seek to be your game equivalent.
                Find out how to add a game.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Add a game
              </Button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
