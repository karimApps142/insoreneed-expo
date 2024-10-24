import isPointInPolygon from "geolib/es/isPointInPolygon";
import { useGetCoordinates } from "./useLocationApi";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const useGeoFencing = () => {
  const { data, isLoading: loadingCities } = useGetCoordinates();

  const regions = data ?? [];

  const checkLocation = (point: Coordinates | null): Promise<number | null> => {
    return new Promise((resolve, reject) => {
      if (!point) {
        reject("Please provide a valid location.");
        return;
      }

      if (regions.length === 0) {
        reject("Currently, we have no available regions to check against.");
        return;
      }

      const region = regions.find((region) => {
        return isPointInPolygon(point, region.polygon);
      });

      if (region) {
        resolve(region.region_id);
      } else {
        reject(
          "Unfortunately, this location is not covered by our services at the moment."
        );
      }
    });
  };

  return { regions, loadingCities, checkLocation };
};

export default useGeoFencing;
