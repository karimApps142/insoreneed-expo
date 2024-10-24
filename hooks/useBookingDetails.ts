import { fetchApi } from "@/lib/fetch";
import { BookingDetailsEndPoints } from "@/server/apis";
import { useQuery } from "@tanstack/react-query";

const useGetBookingOptions = (id: number) => {
  return useQuery({
    queryKey: ["bookingOptions", id],
    queryFn: () =>
      fetchApi<MassageData>({
        url: BookingDetailsEndPoints.GET_BOOKING_OPTIONS(id),
      }),
    retry: false,
    refetchOnMount: false,
  });
};

export { useGetBookingOptions };
