import { create } from "zustand";

interface LocationSetupType {
  location_id: number;
  country_id: number;
}

interface RecipientValues {
  recipient_id: number;
  provider_note?: string | null;
}
interface CreateBookingStore {
  location_id: number | null;
  country_id: number | null;
  category_id: number | null;
  session_type: string | null;
  persons: Person[];
  recipient_id: number | null;
  provider_note: string | null;

  setLocationValues: ({ location_id, country_id }: LocationSetupType) => void;
  setBookingDetails: ({
    category_id,
    session_type,
    persons,
  }: BookingDetailsTypes) => void;

  setRecipientValues: ({
    recipient_id,
    provider_note,
  }: RecipientValues) => void;
}

export const useCreateBookingStore = create<CreateBookingStore>((set) => ({
  location_id: null,
  country_id: null,
  category_id: null,
  session_type: null,
  persons: [],
  recipient_id: null,
  provider_note: null,

  setLocationValues: ({ location_id, country_id }: LocationSetupType) => {
    set(() => ({
      location_id,
      country_id,
    }));
  },

  setBookingDetails: ({
    category_id,
    session_type,
    persons,
  }: BookingDetailsTypes) => {
    set(() => ({
      category_id,
      session_type,
      persons,
    }));
  },

  setRecipientValues: ({ recipient_id, provider_note }: RecipientValues) => {
    set(() => ({
      recipient_id,
      provider_note,
    }));
  },
}));
