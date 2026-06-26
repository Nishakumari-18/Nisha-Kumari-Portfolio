import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Download, Github, Linkedin, Sparkles } from 'lucide-react';
import { personalInfo } from '../data';
import avatarImg from '../assets/images/emoji_profile.png';

interface HeroProps {
  onNavClick: (refId: string) => void;
}

export default function Hero({ onNavClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center py-24 overflow-hidden"
    >
      <motion.div 
        style={{ y, opacity }}
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10"
      >
        
        {/* Left Side Info */}
        <div className="flex flex-col text-left space-y-6 md:space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 w-fit"
          >
            <Sparkles size={16} className="text-purple-400" />
            <span className="text-sm text-gray-300 font-medium">Available for new opportunities</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white tracking-tight"
          >
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              {personalInfo.name}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl font-semibold text-gray-300"
          >
            {personalInfo.title}
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-400 max-w-xl leading-relaxed"
          >
            {personalInfo.briefAbout}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={() => onNavClick('projects')}
              className="px-8 py-4 rounded-xl font-bold flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 transform transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              View My Work
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onNavClick('contact')}
              className="px-8 py-4 rounded-xl font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md transform transition-all hover:scale-105"
            >
              Contact Me
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-4 pt-4"
          >
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
              <Github size={24} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
              <Linkedin size={24} />
            </a>
          </motion.div>

        </div>

        {/* Right Side Animated Avatar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex justify-center relative lg:justify-end"
        >
          {/* Animated glow behind avatar */}
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-[80px] rounded-full w-[300px] h-[300px] md:w-[400px] md:h-[400px] m-auto"
          />
          
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <img 
              src={avatarImg} 
              alt={personalInfo.name} 
              className="w-full max-w-[300px] md:max-w-[400px] object-contain drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
