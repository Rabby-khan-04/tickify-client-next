import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useBookingStore = create(
  persist(
    (set) => ({
      theater: null,
      price: null,
      date: null,
      time: null,
      showId: null,
      movie: null,
      seats: [],

      setBookingData: (data) => set((state) => ({ ...state, ...data })),
      setBookedSeat: (data) => set(() => ({ seats: data })),
      clearBookingData: () =>
        set(() => ({
          theater: null,
          date: null,
          time: null,
          showId: null,
          movie: null,
          seats: [],
        })),
    }),
    {
      name: "booking-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useBookingStore;
