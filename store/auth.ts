import { create } from "zustand";

interface AuthStore {
  loading: boolean;

  setLoading: ({ loading }: { loading: boolean }) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  loading: false,

  setLoading: ({ loading }: { loading: boolean }) => {
    set(() => ({
      loading,
    }));
  },
}));
