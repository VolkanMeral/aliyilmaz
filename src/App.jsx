import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import PriceCalculator from './components/PriceCalculator';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activePage, setActivePage] = useState('hero');

  // Intersection Observer to detect current active section in view on scroll
  useEffect(() => {
    const sections = ['hero', 'services', 'calculator', 'careers', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // trigger when section occupies middle area
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActivePage(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Dynamic Navigation */}
      <Navbar onNavigate={setActivePage} activePage={activePage} />

      {/* Main Sections */}
      <main>
        <Hero onNavigate={setActivePage} />
        <Services />
        <PriceCalculator />
        <Careers />
        <Contact />
      </main>

      {/* Footer & Legals */}
      <Footer />
    </>
  );
}

export default App;
