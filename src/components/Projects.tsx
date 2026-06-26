import { motion } from 'motion/react';

import { featuredProjects, moreRepositories } from '../data';
import { Github, ExternalLink } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      {/* <div className="w-full flex justify-center mb-8">
        <img src={movieAIHero} alt="Movie AI hero" className="max-w-full rounded-xl shadow-lg" />
      </div> */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projects</h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300 backdrop-blur-lg flex flex-col"
          >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
              {project.imageUrl && (
                <img 
                  src={project.imageUrl} 
                  alt={project.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              )}
              
              {/* Overlay Buttons */}
              <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:text-purple-400 hover:bg-black/70 transition-colors">
                    <Github size={18} />
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:text-blue-400 hover:bg-black/70 transition-colors">
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{project.name}</h3>
                <span className="text-xs font-semibold text-purple-300 bg-purple-900/30 px-2 py-1 rounded-md">{project.category}</span>
              </div>
              <p className="text-gray-400 text-sm mb-4 flex-1">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Render a few more repositories */}
        {moreRepositories.slice(0, 4).map((repo, idx) => {
            const isMovieAI = repo.id === 'repo-1';
            return (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (featuredProjects.length + idx) * 0.1 }}
                className={`group relative rounded-2xl bg-white/5 border border-white/10 ${isMovieAI ? '' : 'p-6'} overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(${isMovieAI ? '139,92,246' : '59,130,246'},0.15)] transition-all duration-300 backdrop-blur-lg flex flex-col`}
              >
                {isMovieAI ? (
                  <>
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                      <img src={repo.imageUrl} alt={repo.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {repo.githubUrl && (
                          <a href={repo.githubUrl} target="_blank" rel="noopener noreferrer"
                            className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:text-purple-400 hover:bg-black/70 transition-colors">
                            <Github size={18} />
                          </a>
                        )}
                        {repo.liveUrl && repo.liveUrl !== "#" && (
                          <a href={repo.liveUrl} target="_blank" rel="noopener noreferrer"
                            className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:text-blue-400 hover:bg-black/70 transition-colors">
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{repo.name}</h3>
                        <span className="text-xs font-semibold text-purple-300 bg-purple-900/30 px-2 py-1 rounded-md">{repo.category}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 flex-1">{repo.description}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {repo.tags.map((tag, i) => (
                          <span key={i} className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded-md">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{repo.name}</h3>
                      {repo.githubUrl && (
                        <a href={repo.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors">
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-6 flex-1">{repo.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {repo.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-xs text-blue-300/80 bg-blue-900/20 px-2 py-1 rounded-md">{tag}</span>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
      </div>
    </section>
  );
}
