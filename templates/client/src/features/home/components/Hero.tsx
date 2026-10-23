import {greeting} from "../../../data/greeting";

export default function Hero() {
  return (
    <div className="flex flex-col gap-2 text-center">
      <h1 className="text-3xl font-bold tracking-tight">{greeting.title}</h1>
      <p className="text-muted">{greeting.subtitle}</p>
    </div>
  );
}
