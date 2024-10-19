import { create } from "zustand";

interface Location {
  latitude: number;
  longitude: number;
  address: string;
  regionId?:number
}

declare interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;

  location: LocationType | null;

  destinationLatitude: number | string | null;
  destinationLongitude: number | string | null;
  destinationAddress: string | null;
  regionId:number | null;

  setUserLocation: ({ latitude, longitude, address }: Location) => void;

  setLocation: (location: LocationType | null) => void;

  setDestinationLocation: ({ latitude, longitude, address }: Location) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,

  location: null,
  regionId:null,

  setLocation: (location: LocationType | null) => {
    set(() => ({
      location: location,
      destinationLatitude: location?.latitude,
      destinationLongitude: location?.longitude,
      destinationAddress: location?.address,
    }));
  },

  setUserLocation: ({ latitude, longitude, address }: Location) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));
  },

  setDestinationLocation: ({ latitude, longitude, address , regionId }: Location) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
      regionId
    }));
  },
}));
