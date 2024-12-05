import { Star } from "lucide-react";
import { CommandGroup, CommandItem } from "../ui/command";

// Type definitions
type Location = {
  id: string;
  name: string;
  country: string;
  state?: string; // Optional
  lat: number;
  lon: number;
};

type FavoritesGroupProps = {
  favorites: Location[];
  onSelect: (value: string) => void;
};

const FavoritesGroup: React.FC<FavoritesGroupProps> = ({ favorites, onSelect }) => {
  if (favorites.length === 0) return null;

  return (
    <CommandGroup heading="Favorites">
      {favorites.map((location) => (
        <CommandItem
          key={location.id}
          value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
          onSelect={onSelect}
        >
          <Star className="w-4 h-4 mr-2 text-yellow-500" />
          <span>{location.name}</span>
          {location.state && (
            <span className="text-sm text-muted-foreground">{location.state}</span>
          )}
          <span className="text-sm text-muted-foreground">{location.country}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};

export default FavoritesGroup;
