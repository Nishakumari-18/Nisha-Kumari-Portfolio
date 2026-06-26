import { certifications, educationLine } from '../data';
import { Award, GraduationCap, Calendar, BookOpen, Check } from 'lucide-react';

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4 md:px-6 max-w-7xl mx-auto w-full border-t border-white/5 scroll-mt-20">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start text-left">
        
        {/* Left Track: Certifications & Simulation Credentials */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 w-fit mb-4">
              <Award size={14} className="text-[#c0c1ff]" />
              <span className="text-[10px] font-mono tracking-widest text-[#c7c4d7] uppercase">Endorsements</span>
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white mb-2">
              Credentials &amp; Milestones
            </h2>
            <div className="h-1 bg-gradient-to-r from-[#c0c1ff] to-[#d0bcff] w-20 rounded-full"></div>
          </div>

          <div className="space-y-4">
            {certifications.map((cert) => (
              <div 
                key={cert.id}
                className="group relative bg-[#122131]/30 border border-white/5 p-6 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:border-[#c0c1ff]/30 shadow-md"
              >
                <div className="p-3 bg-[#c0c1ff]/15 rounded-xl border border-[#c0c1ff]/20 text-[#c0c1ff] flex-shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-base font-sans">{cert.title}</h4>
                  <p className="text-xs font-mono text-purple-300 mt-0.5">{cert.issuer}</p>
                  <p className="text-xs text-[#c7c4d7] mt-2 leading-relaxed">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Track: Educational Timeline history */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 w-fit mb-4">
              <GraduationCap size={14} className="text-[#c0c1ff]" />
              <span className="text-[10px] font-mono tracking-widest text-[#c7c4d7] uppercase">Academics</span>
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white mb-2">
              Educational Milestones
            </h2>
            <div className="h-1 bg-gradient-to-r from-[#c0c1ff] to-[#d0bcff] w-20 rounded-full"></div>
          </div>

          <div className="relative border-l border-white/5 pl-6 space-y-6">
            {educationLine.map((edu, idx) => (
              <div key={idx} className="relative group text-left">
                {/* Timeline node node */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#122131] border-2 border-purple-400 group-hover:bg-[#c0c1ff] transition-colors"></div>
                
                <span className="inline-flex items-center gap-1.5 text-3xs font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 mb-2">
                  <Calendar size={10} />
                  {edu.duration}
                </span>

                <h4 className="text-lg font-semibold text-white font-sans group-hover:text-[#c0c1ff] transition-colors leading-snug">
                  {edu.degree}
                </h4>
                <p className="text-xs text-[#c7c4d7] mt-1 flex items-center gap-1.5 font-sans">
                  <BookOpen size={12} className="text-white/30" />
                  {edu.institution}
                </p>

                {edu.score && (
                  <span className="inline-block text-[11px] font-mono text-[#c0c1ff] mt-2.5 bg-[#c0c1ff]/10 px-2.5 py-1 rounded-md border border-[#c0c1ff]/15">
                    Result: {edu.score}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
