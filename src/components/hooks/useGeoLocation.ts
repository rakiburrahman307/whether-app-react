import { useEffect, useState } from "react";
import { Coordinates } from "../api/types";

interface GeoLocationState {
  coordinates: Coordinates | null;
  error: string | null;
  loading: boolean;
}
const useGeoLocation = () => {
  const [locationData, setLocationData] = useState<GeoLocationState>({
    coordinates: null,
    error: null,
    loading: true,
  });

  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by this browser",
        loading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          loading: false,
        });
      },
      (error) => {
        let errMessage: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errMessage = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            errMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errMessage = "The request to get user location timed out.";
            break;
          default:
            errMessage = "An unknown error occurred.";
            break;
        }
        setLocationData({
          coordinates: null,
          error: errMessage,
          loading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
};

export default useGeoLocation;
