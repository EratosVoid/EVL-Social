import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import CompanyMarquee from "@/components/landing/CompanyMarquee";
import About from "@/components/landing/About";
import Highlights from "@/components/landing/Highlights";
import HowItWorks from "@/components/landing/HowItWorks";
import Experience from "@/components/landing/Experience";
import Testimonials from "@/components/landing/Testimonials";
import Partners from "@/components/landing/Partners";
import Venue from "@/components/landing/Venue";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CompanyMarquee />
        <About />
        <Highlights />
        <HowItWorks />
        <Experience />
        <Testimonials />
        <Partners />
        <Venue />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
