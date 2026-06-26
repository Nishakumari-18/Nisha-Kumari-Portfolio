import { motion } from 'motion/react';
import { Github } from 'lucide-react';
import { personalInfo } from '../data';

export default function CodingFootprint() {
  const username = personalInfo.github.split('/').pop() || 'Nishakumari-18';
  
  return (
    <section id="footprint" className="py-24 relative flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Coding Footprint</h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto"></div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl p-6 md:p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-xl"
      >
        <div className="flex items-center gap-3 mb-8 justify-center">
          <Github className="text-white" size={28} />
          <h3 className="text-2xl font-bold text-white">GitHub Contributions</h3>
        </div>
        
        <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
          <div className="min-w-[800px] flex justify-center">
            <img 
              src={`https://ghchart.rshah.org/8B5CF6/${username}`} 
              alt={`${username}'s Github chart`}
              className="w-full max-w-[800px] object-contain opacity-90 hover:opacity-100 transition-opacity drop-shadow-lg"
            />
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <a 
            href={personalInfo.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors border border-white/10"
          >
            View GitHub Profile
          </a>
        </div>
      </motion.div>
    </section>
  );
}
