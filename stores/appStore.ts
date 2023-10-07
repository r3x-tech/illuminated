import create from "zustand";

const useStore = create((set) => ({
  loggedIn: false,
  login: () => set({ loggedIn: true }),
}));

export default useStore;
