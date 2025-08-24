import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Technologies from './components/Technologies';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Technologies />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;