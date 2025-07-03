import { Heart, Eye, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GameCardProps {
  title: string;
  image: string;
  rating?: number;
  views?: string;
  likes?: string;
  year?: string;
  genre?: string;
  size?: "small" | "medium" | "large";
}

export function GameCard({
  title,
  image,
  rating,
  views,
  likes,
  year,
  genre,
  size = "medium",
}: GameCardProps) {
  const sizeClasses = {
    small: "w-24 h-32",
    medium: "w-32 h-44",
    large: "w-40 h-56",
  };

  return (
    <div className="group cursor-pointer">
      <div
        className={`relative ${sizeClasses[size]} rounded-lg overflow-hidden bg-muted`}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-white text-center p-2">
            <div className="flex items-center justify-center space-x-4 text-xs">
              {rating && (
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{rating}</span>
                </div>
              )}
              {views && (
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{views}</span>
                </div>
              )}
              {likes && (
                <div className="flex items-center space-x-1">
                  <Heart className="h-3 w-3" />
                  <span>{likes}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rating badge */}
        {rating && (
          <div className="absolute top-2 right-2">
            <Badge
              variant="secondary"
              className="text-xs bg-black/70 text-white"
            >
              {rating}
            </Badge>
          </div>
        )}
      </div>

      <div className="mt-2">
        <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {year && <p className="text-xs text-muted-foreground mt-1">{year}</p>}
      </div>
    </div>
  );
}
