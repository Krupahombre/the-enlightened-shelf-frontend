import Carousel from "./Carousel";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center py-24 gap-8">
      <h1 className="text-4xl font-bold">Welcome to Enlightened Shelf!</h1>
      <h2>Find yourself the light in books</h2>
      <Carousel />
    </main>
  );
}
