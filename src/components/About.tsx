import { motion } from 'motion/react';
import { stats } from '../data';
import { Code, Database, Layout } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Intro */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p className="text-lg text-gray-300 leading-relaxed">
            I am a results-driven Full Stack Developer with a deep interest in Artificial Intelligence and its application in modern web ecosystems. Currently contributing to Cadera Infotech, I focus on architecting robust backend systems and intuitive frontend experiences that solve real-world problems.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            I thrive in environments where I can learn, build scalable architectures, and integrate cutting-edge AI functionalities into user-friendly platforms. My core stack includes React, Node.js, Express, and MongoDB.
          </p>
        </motion.div>

        {/* Right: Stat Cards */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-xl flex flex-col items-center justify-center text-center"
            >
              <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-xl flex flex-col items-center justify-center text-center sm:col-span-2"
          >
            <div className="flex gap-4 mb-3 text-purple-400">
              <Layout size={28} />
              <Code size={28} />
              <Database size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">MERN Stack Expert</h3>
            <p className="text-sm font-medium text-gray-400">Specializing in Full Stack Engineering</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
