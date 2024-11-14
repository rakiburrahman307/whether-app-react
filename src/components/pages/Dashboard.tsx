import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import useGeoLocation from "../hooks/useGeoLocation";
import WeatherSkeleton from "../loadingSkeleton/WeatherSkeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  useForecastQuery,
  useReverseGeoCodeQuery,
  useWeatherQuery,
} from "../hooks/useWeather";
import CurrentWeather from "./CurrentWeather";
import HourlyTemperature from "./HourlyTemperature";

const Dashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    loading: locationLoading,
  } = useGeoLocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeoCodeQuery(coordinates);

  console.log(locationQuery);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };
  if (locationLoading) {
    return <WeatherSkeleton />;
  }
  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }
  if (locationError) {
    return (
      <Alert variant='destructive'>
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className='w-fit'>
            <MapPin className='mr-2 h-4 w-4' />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinates) {
    return (
      <Alert variant='destructive'>
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>please enable location access to see your local weather</p>
          <Button onClick={getLocation} variant={"outline"} className='w-fit'>
            <MapPin className='mr-2 h-4 w-4' />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  const locationName = locationQuery.data?.[0];
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant='destructive'>
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Failed to fetch data. please try again...</p>
          <Button onClick={handleRefresh} variant={"outline"} className='w-fit'>
            <RefreshCw className='mr-2 h-4 w-4' />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  return (
    <section className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
         <CurrentWeather
         data={weatherQuery?.data}
         locationName={locationName}
         />   
         <HourlyTemperature
         data={forecastQuery?.data}
         />      
        </div>
        <div>
          {/* details  */}
          {/* forcast  */}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
