import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Pillars from "@/components/Pillars";
import WebinarDetails from "@/components/WebinarDetails";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Pillars />
        <WebinarDetails />
        <About />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
