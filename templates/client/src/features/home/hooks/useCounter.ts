import {pluralize} from "../../../lib/pluralize";
import {useCounterStore} from "../../../stores/counterStore";

export function useCounter() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const reset = useCounterStore((state) => state.reset);

  return {
    label: pluralize(count, "click"),
    canReset: count > 0,
    increment,
    reset,
  };
}
