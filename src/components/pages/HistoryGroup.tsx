
import { Clock, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { CommandGroup, CommandItem, CommandSeparator } from "../ui/command";
import { format } from "date-fns";

type HistoryLocation = {
  name: string;
  country: string;
  state?: string; // Optional
  lat: number;
  lon: number;
  searchedAt: Date; // Date is expected
};

type HistoryGroupProps = {
  history: HistoryLocation[];
  onSelect: (value: string) => void;
  onClear: () => void;
};

const HistoryGroup: React.FC<HistoryGroupProps> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) return null;

  return (
    <>
      <CommandSeparator />
      <CommandGroup>
        <div className="flex items-center justify-between px-2 my-2">
          <p className="text-xs text-muted-foreground">Recent Searches</p>
          <Button variant="ghost" size="sm" onClick={onClear}>
            <XCircle className="w-4 h-4" />
            Clear
          </Button>
        </div>
        {history.map((location) => (
          <CommandItem
            key={`${location.lat}-${location.lon}`}
            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
            onSelect={onSelect}
          >
            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>{location.name}</span>
            {location.state && (
              <span className="text-sm text-muted-foreground">{location.state}</span>
            )}
            <span className="text-sm text-muted-foreground">{location.country}</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {format(location.searchedAt, "MMM d, h:mm a")}
            </span>
          </CommandItem>
        ))}
      </CommandGroup>
    </>
  );
};

export default HistoryGroup;
