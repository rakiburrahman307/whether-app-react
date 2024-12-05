import { useState } from "react";
import { Button } from "../ui/button";
import { CommandDialog, CommandInput, CommandList } from "../ui/command";
import { Search } from "lucide-react";
import { useSearchLocationQuery } from "../hooks/useWeather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "../hooks/useSearchHistory";
import { useFavorite } from "../hooks/useFavorite";
import FavoritesGroup from "./FavoritesGroup";
import HistoryGroup from "./HistoryGroup";
import SuggestionsGroup from "./SuggestionsGroup";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: locations, isLoading } = useSearchLocationQuery(searchQuery);
  const { history, addToHistory, clearHistory } = useSearchHistory();
  const { favorites } = useFavorite();
  const navigate = useNavigate();

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");
    addToHistory.mutate({
      searchQuery,
      name,
      country,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
    });
    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        variant='outline'
        className='relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
        onClick={() => setOpen(true)}
      >
        <Search className='mr-2 w-4 h-4' />
        search cities...
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        aria-label='City Search Dialog'
      >
        <CommandInput
          placeholder='search cities...'
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          {/* Favorites Group */}
          <FavoritesGroup favorites={favorites} onSelect={handleSelect} />

          {/* History Group */}
          <HistoryGroup
            history={history.map((location) => ({
              ...location,
              searchedAt: new Date(location.searchedAt),
            }))}
            onSelect={handleSelect}
            onClear={() => clearHistory.mutate()}
          />

          {/* Suggestions Group */}
          <SuggestionsGroup
            locations={(locations || []).map((location) => ({
              ...location,
              country: location.country || "Unknown",
            }))}
            isLoading={isLoading}
            onSelect={handleSelect}
          />
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
