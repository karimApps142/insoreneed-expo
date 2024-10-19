import { useState } from "react";
import { isPointInPolygon } from "geolib";
import { useGetCoordinates } from "./useLocationApi";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const useGeoFencing = () => {
  const { data, isLoading: loadingCities } = useGetCoordinates();
  const [regionID, setRegionId] = useState<null | number>(null);
  
  const regions = data ?? [];

  const checkLocation = (point: Coordinates | null): Promise<number | null> => {
    return new Promise((resolve, reject) => {
      setRegionId(null);
      if (!point) {
        reject("Please provide a valid location.");
        return;
      }
      
      if (regions.length === 0) {
        reject("Currently, we have no available regions to check against.");
        return;
      }

      for (const region of regions) {
        const polygon = region.polygon as Coordinates[];
        
        // Check if the point is in the polygon
        if (isPointInPolygon(point, polygon)) {
          setRegionId(region.region_id);
          resolve(region.region_id); // Resolve with the found region ID
          return; // Exit the function once found
        }
      }
      // Reject with a professional message if no matching region is found
      reject("Unfortunately, this location is not covered by our services at the moment.");
    });
  };

  return { regionID, loadingCities, checkLocation };
};

export default useGeoFencing;