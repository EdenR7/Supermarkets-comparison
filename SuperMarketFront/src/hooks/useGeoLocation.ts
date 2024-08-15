import { useEffect, useState } from "react";
export interface LocationPositionI {
  lat: number;
  lng: number;
}
export interface LocationI {
  loaded: boolean;
  position?: LocationPositionI;
  error?: string;
}
function useGeoLocation() {
  const [location, setLocation] = useState<LocationI>({
    loaded: false,
    position: {
      lat: 0,
      lng: 0,
    },
  });

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function onSuccess(coordinates: GeolocationPosition) {
    setLocation({
      loaded: true,
      position: {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      },
    });
  }
  function onError(err: any) {
    setLocation({
      loaded: true,
      error: err,
    });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  });

  return location;
}

export default useGeoLocation;
