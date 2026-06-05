import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Product } from "./components/Product";
import { Team } from "./components/Team";
import { CTA } from "./components/CTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Product />
        <Team />
      </main>
      <CTA />
    </>
  );
}
