import { create } from "zustand";

interface CreateBookingStore {
  location_id: number | null;
  setLocationID: (location_id: number) => void;
}

export const useCreateBookingStore = create<CreateBookingStore>((set) => ({
  location_id: null,
  setLocationID: (location_id: number) => {
    set(() => ({
      location_id,
    }));
  },
}));
