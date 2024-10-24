import { create } from "zustand";

interface LocationSetupType {
  location_id: number;
  country_id: number;
}
interface CreateBookingStore {
  location_id: number | null;
  country_id: number | null;

  setLocationValues: ({ location_id, country_id }: LocationSetupType) => void;
}

export const useCreateBookingStore = create<CreateBookingStore>((set) => ({

  location_id: null,
  country_id: null,

  setLocationValues: ({ location_id, country_id }: LocationSetupType) => {
    set(() => ({
      location_id,
      country_id,
    }));
  },


}));
