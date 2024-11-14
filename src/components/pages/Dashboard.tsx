import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import useGeoLocation from "../hooks/useGeoLocation";
import WeatherSkeleton from "../loadingSkeleton/WeatherSkeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const Dashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    loading: locationLoading,
  } = useGeoLocation();

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      // relode waether data
    }
  };
  if (locationLoading) {
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
  return (
    <section className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          // disabled={}
        >
          <RefreshCw className='h-4 w-4' />
        </Button>
      </div>
    </section>
  );
};

export default Dashboard;
