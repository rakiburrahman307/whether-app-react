import { useParams, useSearchParams } from "react-router-dom";
import { useForecastQuery, useWeatherQuery } from "../hooks/useWeather";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import WeatherSkeleton from "../loadingSkeleton/WeatherSkeleton";
import CurrentWeather from "./CurrentWeather";
import HourlyTemperature from "./HourlyTemperature";
import WeatherDetails from "./WeatherDetails";
import WeatherForecast from "./WeatherForecast";
import { AlertTriangle } from "lucide-react";
import FavoriteBtn from "./FavoriteBtn";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant='destructive'>
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Failed to fetch data. please try again...</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <section>
      <div className='flex items-center justify-between mb-5'>
        <h1 className='text-3xl font-bold tracking-tight'>{params?.cityName},{weatherQuery?.data?.sys?.country}</h1>
        <div>
           <FavoriteBtn
           data={{...weatherQuery.data, name: params.cityName}}
           />
        </div>
      </div>
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4'>
          <CurrentWeather data={weatherQuery?.data} />
          <HourlyTemperature data={forecastQuery?.data} />
        </div>
        <div className='grid gap-6 md:grid-cols-2 items-start'>
          {/* details  */}
          <WeatherDetails data={weatherQuery?.data} />
          {/* forecast  */}
          <WeatherForecast data={forecastQuery?.data} />
        </div>
      </div>
    </section>
  );
};

export default CityPage;
