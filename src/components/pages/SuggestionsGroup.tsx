import { CommandGroup, CommandItem } from "../ui/command";
import { Loader2, Search } from "lucide-react";
type Location = {
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string; // Optional
};

type SuggestionsGroupProps = {
  locations: Location[]; // Array of location objects
  isLoading: boolean; // Whether the suggestions are loading
  onSelect: (value: string) => void; // Callback when a suggestion is selected
};

const SuggestionsGroup: React.FC<SuggestionsGroupProps> = ({ locations, isLoading, onSelect }) => {
  if (!locations || locations.length === 0) return null;

  return (
    <CommandGroup heading="Suggestions">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        locations.map((location) => (
          <CommandItem
            key={`${location.lat}-${location.lon}`}
            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
            onSelect={onSelect}
          >
            <Search className="w-4 h-4 mr-2" />
            <span>{location.name}</span>
            {location.state && (
              <span className="text-sm text-muted-foreground">{location.state}</span>
            )}
            <span className="text-sm text-muted-foreground">{location.country}</span>
          </CommandItem>
        ))
      )}
    </CommandGroup>
  );
};

export default SuggestionsGroup;
