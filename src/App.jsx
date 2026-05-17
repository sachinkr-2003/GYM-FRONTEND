import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Trainers from './components/Trainers';
import Schedule from './components/Schedule';
import Pricing from './components/Pricing';
import BMICalculator from './components/BMICalculator';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminApp from './admin/AdminApp';

function App() {
  const currentPath = window.location.pathname;

  // Simple Router
  if (currentPath.startsWith('/admin')) {
    return <AdminApp />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-amber-500 selection:text-zinc-950">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Trainers />
        <Schedule />
        <Pricing />
        <BMICalculator />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
