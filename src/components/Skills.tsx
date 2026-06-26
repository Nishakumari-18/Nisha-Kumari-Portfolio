import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { skillCategories } from '../data';
import { Terminal, Database, Layout, PenTool as Tool } from 'lucide-react';

const iconMap: Record<string, ReactNode> = {
  'desktop_windows': <Layout size={24} />,
  'dns': <Terminal size={24} />,
  'psychology': <Database size={24} />,
  'build': <Tool size={24} />
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Technical Skills</h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-xl hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
                {iconMap[category.icon] || <Tool size={24} />}
              </div>
              <h3 className="text-2xl font-bold text-white">{category.name}</h3>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, sIdx) => (
                <motion.span
                  key={sIdx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
