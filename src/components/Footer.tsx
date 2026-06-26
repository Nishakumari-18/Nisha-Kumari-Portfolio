import { personalInfo } from '../data';
import { Github, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 bg-[#020d18] border-t border-white/5 w-full">
      <div className="w-full mx-auto px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        
        {/* Name and subtitle */}
        <div>
          <h4 className="text-sm font-bold text-white font-sans tracking-tight">Nisha Kumari</h4>
          <p className="text-2xs font-mono text-[#c7c4d7]/70 mt-1">Full Stack Developer &amp; AI Integration Engineer</p>
        </div>

        {/* Heart quote */}
        <p className="text-2xs font-mono text-[#c7c4d7]/50 flex items-center gap-1">
          Made with <Heart size={10} className="text-red-400 fill-red-400 animate-pulse" /> using React, Node &amp; Gemini &bull; 2026
        </p>

        {/* social mini links */}
        <div className="flex gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="text-[#c7c4d7] hover:text-white transition-colors"
            title="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-[#c7c4d7] hover:text-white transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>

      </div>
    </footer>
  );
}
