import { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Button } from "../ui/button";
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useSearchLocationQuery } from "../hooks/useWeather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "../hooks/useSearchHistory";
import { format } from "date-fns";
import { useFavorite } from "../hooks/useFavorite";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: locations, isLoading } = useSearchLocationQuery(searchQuery);
  const { history, addToHistory, clearHistory } = useSearchHistory();
  const {favorites}= useFavorite();

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
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='search cities...'
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          {searchQuery.length > 2 && !isLoading && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {favorites.length > 0 && (
    
              <CommandGroup heading="Favorites">
                {favorites.map((location) => {
                  return (
                    <CommandItem
                      key={location.id}
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                    >
                      <Star className='w-4 h-4 mr-2 text-yellow-500' />
                      <span>{location.name}</span>
                      {location.state && (
                        <span className='text-sm text-muted-foreground'>
                          {location.state}
                        </span>
                      )}
                      <span className='text-sm text-muted-foreground'>
                        {location.country}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
          )}

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className='flex items-center justify-between px-2 my-2'>
                  <p className='text-xs text-muted-foreground'>
                    Recent Searches
                  </p>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => clearHistory.mutate()}
                  >
                    <XCircle className='w-4 h-4' />
                    Clear
                  </Button>
                </div>
                {history.map((location) => {
                  return (
                    <CommandItem
                      key={`${location.lat}-${location.lon}`}
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                    >
                      <Clock className='w-4 h-4 mr-2 text-muted-foreground' />
                      <span>{location.name}</span>
                      {location.state && (
                        <span className='text-sm text-muted-foreground'>
                          {location.state}
                        </span>
                      )}
                      <span className='text-sm text-muted-foreground'>
                        {location.country}
                      </span>
                      <span className='ml-auto text-xs text-muted-foreground'>
                        {format(location.searchedAt, "MMM d, h:mm a")}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />

          {locations && locations.length > 0 && (
            <CommandGroup heading='Suggestions'>
              {isLoading && (
                <div className='flex items-center justify-center p-4'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                </div>
              )}
              {locations.map((location) => (
                <CommandItem
                  key={`${location.lat}-${location.lon}`}
                  value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                  onSelect={handleSelect}
                >
                  <Search className='w-4 h-4 mr-2' />
                  <span>{location.name}</span>
                  {location.state && (
                    <span className='text-sm text-muted-foreground'>
                      {location.state}
                    </span>
                  )}
                  <span className='text-sm text-muted-foreground'>
                    {location.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
