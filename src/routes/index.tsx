import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/hotel/Navbar";
import { Hero } from "@/components/hotel/Hero";
import { Overview } from "@/components/hotel/Overview";
import { Rooms } from "@/components/hotel/Rooms";
import { Amenities } from "@/components/hotel/Amenities";
import { Gallery } from "@/components/hotel/Gallery";
import { Reviews } from "@/components/hotel/Reviews";
import { Location } from "@/components/hotel/Location";
import { Footer } from "@/components/hotel/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hotel Velsatis — Boutique luxury in Beni Mellal, Morocco" },
      {
        name: "description",
        content:
          "Velsatis is a boutique hotel on Boulevard Mohamed V in Beni Mellal — 50 considered rooms, a café-restaurant, and quiet luxury at the foot of the Middle Atlas.",
      },
      { property: "og:title", content: "Hotel Velsatis — Beni Mellal, Morocco" },
      { property: "og:description", content: "Boutique luxury hotel, café & restaurant in the heart of Beni Mellal." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      {
        property: "og:image",
        content:
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/335024411.jpg?k=e6e17054da7144e30e73d8cb0d39b64728fbdb8afea42cccdcfdfe70922b9f42&o=",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Overview />
      <Rooms />
      <Amenities />
      <Gallery />
      <Reviews />
      <Location />
      <Footer />
    </main>
  );
}
