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

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'project-inquiry'>('home');
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
  };

  const handleTechnologyClick = (technologyName: string) => {
    setSelectedTechnology(technologyName);
    setSelectedService('');
    setCurrentView('project-inquiry');
  };

  const handleGetStartedClick = () => {
    setSelectedService('');
    setSelectedTechnology('');
    setCurrentView('project-inquiry');
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