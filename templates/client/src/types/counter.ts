/** Types for the counter store */

export interface CounterState {
  count: number;
  increment: () => void;
  reset: () => void;
}
