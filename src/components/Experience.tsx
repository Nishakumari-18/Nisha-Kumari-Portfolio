import { motion } from 'motion/react';
import { experiences } from '../data';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience</h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
      </motion.div>

      <div className="relative">
        {/* Timeline vertical line */}
        <div className="absolute left-[11px] md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-white/10 rounded-full"></div>

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className={`flex flex-col md:flex-row items-center w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Spacer for alternate side */}
              <div className="hidden md:block md:w-1/2"></div>
              
              {/* Timeline dot */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="absolute left-[3px] md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 bg-purple-500 rounded-full border-4 border-[#0B1120] z-10"
              ></motion.div>

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className={`w-full pl-10 md:pl-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}
              >
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg shadow-xl hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="text-purple-400" size={20} />
                    <span className="text-sm font-semibold text-purple-400 tracking-wider uppercase">
                      {exp.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                  <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-300 hover:text-white transition-colors mb-2 inline-block">
                    {exp.company}
                  </a>
                  <p className="text-sm text-gray-400 mb-4">{exp.duration}</p>
                  
                  <ul className="space-y-2">
                    {exp.points.map((point, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
