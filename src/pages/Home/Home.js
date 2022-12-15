import Aos from "aos";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "aos/dist/aos.css";
import HeroSection from "../../components/Home/HeroSection";
import KeyFeaturesSection from "../../components/Home/KeyFeaturesSection";
import AboutSection from "../../components/Home/AboutSection";
import FeatureSection from "../../components/Home/FeatureSection";
import IntroSection from "../../components/Home/IntroSection";
import CountSection from "../../components/Home/CountSection";
import TestimonialSection from "../../components/Home/TestimonialSection";

import PartnersSection from "../../components/Home/PartnersSection";
Aos.init();

const Home = () => {
  return (
    <>
      <Header />
      <div>
        <HeroSection />
        <KeyFeaturesSection />
        <AboutSection />
        <FeatureSection />
        <IntroSection />
        <CountSection />
        <TestimonialSection />
        <PartnersSection />
      </div>
      <Footer />
    </>
  );
};

export default Home;
