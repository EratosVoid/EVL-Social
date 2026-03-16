import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Highlights from "@/components/landing/Highlights";
import Venue from "@/components/landing/Venue";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Highlights />
      <Venue />
      <CTA />
      <Footer />
    </main>
  );
}
