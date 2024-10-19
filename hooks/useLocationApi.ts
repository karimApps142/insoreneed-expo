import { fetchApi } from "@/lib/fetch";
import { LocationEndpoints } from "@/server/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useCreateLocation = () => useMutation({
    mutationFn: (data:LocationFormValues) =>
      fetchApi({
        method: "POST",
        url: LocationEndpoints.CREATE_LOCATION,
        data,
      }),
    retry: false,
  });

  const useUpdateLocation = (id?:any) => useMutation({
    mutationFn: (data:LocationFormValues) =>
      fetchApi({
        method: "POST",
        url: LocationEndpoints.UPDATE_LOCATION(id),
        data,
      }),
    retry: false,
  });

const useGetLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: () =>
      fetchApi<LocationsResponse>({
        url: LocationEndpoints.GET_LOCATIONS,
      }),
    retry: 1,
  });
};

const useGetCoordinates = () => {
  return useQuery({
    queryKey: ["coordinates"],
    queryFn: () =>
      fetchApi<LocationRecord[]>({
        url: LocationEndpoints.GET_COORDINATES,
      }),
    retry: 1,
    refetchOnMount:false,
    refetchOnWindowFocus:false
  });
};

const useGetLocationOptions = () => {
  return useQuery({
    queryKey: ["locationOptions"],
    queryFn: () =>
      fetchApi<OptionsResponse>({
        url: LocationEndpoints.GET_LOCATION_OPTIONS,
      }),
    retry: false,
    refetchOnMount:false,
  });
};

export { useCreateLocation,useUpdateLocation, useGetLocations, useGetLocationOptions ,useGetCoordinates };
