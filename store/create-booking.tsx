import { create } from "zustand";

interface CreateBookingStore {
    destination_latitude: number | null;
    destination_longitude: number | null;
    destination_address: string | null;
    setDestinationLocation: ({
        latitude,
        longitude,
        address,
    }: {
        latitude: number;
        longitude: number;
        address: string;
    }) => void;
}
export const useCreateBookingStore = create<CreateBookingStore>((set) => ({
    destination_latitude: null,
    destination_longitude: null,
    destination_address: null,

    setDestinationLocation: ({
        latitude,
        longitude,
        address,
    }: {
        latitude: number;
        longitude: number;
        address: string;
    }) => {
        set(() => ({
            destination_latitude: latitude,
            destination_longitude: longitude,
            destination_address: address,
        }));
    },
}));
