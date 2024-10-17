import { create } from "zustand";

interface CreateBookingStore { }

export const useCreateBookingStore = create<CreateBookingStore>((set) => ({}));
