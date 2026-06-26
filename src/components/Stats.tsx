import { stats } from '../data';

export default function Stats() {
  return (
    <section className="py-12 px-4 md:px-6 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div 
            key={idx}
            className="group relative bg-[#122131]/40 border border-white/5 backdrop-blur-xl p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg transition-all duration-300 hover:border-[#c0c1ff]/30 hover:scale-[1.02] hover:-translate-y-1"
          >
            {/* Background glowing sphere on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#c0c1ff] to-[#d0bcff] opacity-0 group-hover:opacity-10 rounded-2xl blur-lg transition duration-500"></div>
            
            <span className="relative font-bold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-white via-[#c0c1ff] to-[#d0bcff] drop-shadow-sm font-sans tracking-tight">
              {stat.value}
            </span>
            <span className="relative font-mono text-xs uppercase tracking-widest text-[#c7c4d7] mt-3 group-hover:text-white transition-colors">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
