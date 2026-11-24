import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Services />
      <Testimonials />
      <Blog />
      <Contact />
    </div>
  );
}

