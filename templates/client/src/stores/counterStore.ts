import {create} from "zustand";
import type {CounterState} from "../types";

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({count: state.count + 1})),
  reset: () => set({count: 0}),
}));
