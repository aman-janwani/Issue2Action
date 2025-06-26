import React from "react";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import HowItWorksSection from "@/components/how-it-works-section";
import UseCasesSection from "@/components/use-cases-section";
import TestimonialsSection from "@/components/testimonials-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

const page = () => {
  return (
    <main className="min-h-screen bg-[#0d1117]">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UseCasesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default page;
