import Button from "../../../components/Button";
import {useCounter} from "../hooks/useCounter";

export default function Counter() {
  const {label, canReset, increment, reset} = useCounter();

  return (
    <div className="flex flex-col items-center gap-3">
      <p aria-live="polite" className="text-sm text-muted">
        {label}
      </p>
      <div className="flex gap-2">
        <Button onClick={increment}>Click me</Button>
        <Button variant="secondary" onClick={reset} disabled={!canReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
