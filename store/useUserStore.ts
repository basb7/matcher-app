import { create } from "zustand";

interface User {
  id: number;
  email: string;
  username: string;
  bio: string;
  is_vip: boolean;
  total_points: number;
  avatar: string | null;
  vip_unitl: string | null;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
