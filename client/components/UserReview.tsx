import { Star, Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface UserReviewProps {
  user: {
    name: string;
    avatar?: string;
    username: string;
  };
  game: {
    title: string;
    year: string;
    image: string;
  };
  rating: number;
  review: string;
  likes: number;
  timeAgo: string;
}

export function UserReview({
  user,
  game,
  rating,
  review,
  likes,
  timeAgo,
}: UserReviewProps) {
  return (
    <div className="flex space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
      {/* Game poster */}
      <div className="flex-shrink-0">
        <img
          src={game.image}
          alt={game.title}
          className="w-12 h-16 rounded object-cover"
        />
      </div>

      {/* Review content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-xs">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm">{user.name}</span>
            <span className="text-xs text-muted-foreground">
              @{user.username}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mb-2">
          <h4 className="font-medium text-sm text-primary hover:underline cursor-pointer">
            {game.title} {game.year}
          </h4>
        </div>

        <p className="text-sm text-foreground mb-3 line-clamp-3">{review}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
              <Heart className="h-3 w-3" />
              <span>Like review</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
              <MessageCircle className="h-3 w-3" />
              <span>Comment</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span>{likes} likes</span>
            <span>•</span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
