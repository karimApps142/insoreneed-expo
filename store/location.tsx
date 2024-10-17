import { create } from "zustand";

interface Location {
    latitude: number;
    longitude: number;
    address: string;
}

declare interface LocationStore {
    userLatitude: number | null;
    userLongitude: number | null;
    userAddress: string | null;

    destinationLatitude: number | null;
    destinationLongitude: number | null;
    destinationAddress: string | null;

    setUserLocation: ({
        latitude,
        longitude,
        address,
    }: Location) => void;

    setDestinationLocation: ({
        latitude,
        longitude,
        address,
    }: Location) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
    userLatitude: null,
    userLongitude: null,
    userAddress: null,
    destinationLatitude: null,
    destinationLongitude: null,
    destinationAddress: null,

    setUserLocation: ({
        latitude,
        longitude,
        address,
    }: Location) => {
        set(() => ({
            userLatitude: latitude,
            userLongitude: longitude,
            userAddress: address,
        }));
    },

    setDestinationLocation: ({
        latitude,
        longitude,
        address,
    }: Location) => {
        set(() => ({
            destinationLatitude: latitude,
            destinationLongitude: longitude,
            destinationAddress: address,
        }));
    },
}));
