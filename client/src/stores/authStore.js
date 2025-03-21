import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const authStore = create(
  persist(
    (set) => ({
      token: null,
      userInfo: null,
      setToken: (token) => set(() => ({ token })),
      setUserInfo: (userInfo) => set(() => ({ userInfo })),
    }),
    {
      name: 'auth-storage', // store in loca storage
    }
  )
);

export default authStore;
