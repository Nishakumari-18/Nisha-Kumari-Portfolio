import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import CodingFootprint from './components/CodingFootprint';
import ContactChat from './components/ContactChat';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'projects', 'skills', 'footprint', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-gray-300 font-sans selection:bg-purple-500/30 selection:text-white relative overflow-x-hidden">
      {/* Subtle fixed background gradient effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex-col flex w-full mx-auto px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
        <Header onNavClick={scrollToSection} activeSection={activeSection} />
        
        <main className="flex-1 w-full pb-24">
          <Hero onNavClick={scrollToSection} />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <CodingFootprint />
          <ContactChat />
        </main>
      </div>

      <div className="relative z-10 w-full">
        <Footer />
      </div>
      
      <ChatbotWidget />
    </div>
  );
}
