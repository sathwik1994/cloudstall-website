import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Technologies from './components/Technologies';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectInquiry from './components/ProjectInquiry';
import ContactForm from './components/ContactForm';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'project-inquiry' | 'contact-form'>('home');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('');

  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setSelectedTechnology('');
    setCurrentView('project-inquiry');
    // Use setTimeout to ensure the component has rendered before scrolling
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleTechnologyClick = (technologyName: string) => {
    setSelectedTechnology(technologyName);
    setSelectedService('');
    setCurrentView('project-inquiry');
    // Use setTimeout to ensure the component has rendered before scrolling
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleGetStartedClick = () => {
    setSelectedService('');
    setSelectedTechnology('');
    setCurrentView('contact-form');
    // Use setTimeout to ensure the component has rendered before scrolling
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedService('');
    setSelectedTechnology('');
  };

  if (currentView === 'project-inquiry') {
    return (
      <ProjectInquiry
        selectedService={selectedService}
        selectedTechnology={selectedTechnology}
        onBack={handleBackToHome}
      />
    );
  }

  if (currentView === 'contact-form') {
    return (
      <ContactForm
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero onGetStartedClick={handleGetStartedClick} />
      <About />
      <Services onServiceClick={handleServiceClick} />
      <Technologies onTechnologyClick={handleTechnologyClick} />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;