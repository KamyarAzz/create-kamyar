import Counter from "../components/Counter";
import Hero from "../components/Hero";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-5">
      <Hero />
      <Counter />
    </main>
  );
}
