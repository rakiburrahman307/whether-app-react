import { Star } from "lucide-react";
import { WeatherData } from "../api/types";
import { useFavorite } from "../hooks/useFavorite";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface FavoriteBtnProps {
  data: WeatherData;
}

const FavoriteBtn = ({ data }: FavoriteBtnProps) => {
  const { addToFavorite, isFavorite, removeFavorite } = useFavorite();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from Favorite`);
    } else {
      addToFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favorite`);
    }
  };
  return (
    <Button
      variant={isCurrentlyFavorite ? "default" : "outline"}
      size='icon'
      className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
      onClick={handleToggleFavorite}
    >
      <Star
        className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
      />
    </Button>
  );
};

export default FavoriteBtn;
