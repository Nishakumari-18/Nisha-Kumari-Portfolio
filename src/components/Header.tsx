import { useState } from 'react';
import { personalInfo, educationLine } from '../data';
import { Menu, X, FileText, Download, Briefcase, Mail, Award, BookOpen } from 'lucide-react';

interface HeaderProps {
  onNavClick: (refId: string) => void;
  activeSection: string;
}

export default function Header({ onNavClick, activeSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: 'home' },
    { label: 'About', href: 'about' },
    { label: 'Experience', href: 'experience' },
    { label: 'Projects', href: 'projects' },
    { label: 'Skills', href: 'skills' },
    { label: 'Footprint', href: 'footprint' },
    { label: 'Contact', href: 'contact' },
  ];

  const handleNav = (href: string) => {
    onNavClick(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav id="navbar-main" className="sticky top-0 w-full z-45 bg-[#051424]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="flex justify-between items-center w-full mx-auto h-20">
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => handleNav('home')}>
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#c0c1ff] to-[#d0bcff] opacity-40 blur-xs group-hover:opacity-100 transition duration-300"></div>
              <div className="relative px-3 py-1 bg-[#051424] rounded-lg text-lg font-bold text-on-surface tracking-tight font-sans">
                NK
              </div>
            </div>
            <span 
              onClick={() => handleNav('home')} 
              className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c7c4d7] tracking-tight cursor-pointer hover:opacity-90 font-sans"
            >
              Nisha Kumari
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className={`py-1 text-sm font-medium tracking-tight transition-all relative group font-sans cursor-pointer ${
                  activeSection === item.href 
                    ? 'text-[#c0c1ff]' 
                    : 'text-[#c7c4d7] hover:text-white'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#c0c1ff] transform transition-transform duration-300 ${
                  activeSection === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>
            ))}
            <button
              id="view-resume-btn-desktop"
              onClick={() => setIsResumeOpen(true)}
              className="bg-[#c0c1ff] text-[#1000a9] text-sm px-5 py-2 rounded-lg font-bold hover:shadow-lg hover:shadow-[#c0c1ff]/20 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <FileText size={16} />
              Resume
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              id="view-resume-btn-mobile"
              onClick={() => setIsResumeOpen(true)}
              className="bg-[#c0c1ff] text-[#1000a9] text-xs px-3 py-1.5 rounded-md font-bold hover:shadow-lg hover:shadow-[#c0c1ff]/25 transition-all"
            >
              Resume
            </button>
            <button 
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-1.5 text-[#c7c4d7] hover:text-white transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#051424] border-b border-white/5 px-4 py-4 space-y-3 absolute w-full left-0">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition-all font-sans cursor-pointer ${
                  activeSection === item.href 
                    ? 'bg-white/5 text-[#c0c1ff] font-semibold' 
                    : 'text-[#c7c4d7] hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Resume Viewer Modal */}
      {isResumeOpen && (
        <div id="resume-modal-overlay" className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-[#010f1f]/85 backdrop-blur-md animate-fade-in">
          <div id="resume-modal-card" className="relative w-full max-w-4xl max-h-[90vh] bg-[#122131] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#1c2b3c]">
              <div className="flex items-center gap-2">
                <FileText className="text-[#c0c1ff]" size={20} />
                <h3 className="text-lg font-bold text-white font-sans">Interactive Resume</h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  id="print-resume-btn"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 text-xs text-[#c7c4d7] hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 transition-all cursor-pointer"
                >
                  <Download size={14} />
                  Print / Save PDF
                </button>
                <button
                  id="close-resume-modal"
                  onClick={() => setIsResumeOpen(false)}
                  className="p-1 px-2.5 bg-white/5 text-[#c7c4d7] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-left selection:bg-[#c0c1ff]/25 scrollbar-thin">
              
              {/* Paper Layout */}
              <div className="bg-white text-slate-800 p-6 md:p-10 rounded-lg shadow-inner max-w-3xl mx-auto border border-gray-200">
                
                {/* Header */}
                <div className="text-center border-b border-gray-300 pb-5">
                  <h1 className="text-3xl font-bold font-sans text-slate-900 tracking-tight">{personalInfo.name}</h1>
                  <p className="text-sm font-sans tracking-tight text-slate-600 mt-1.5">
                    {personalInfo.phone} &bull; {personalInfo.email} &bull; 
                    <a href={personalInfo.linkedin} className="text-blue-600 hover:underline mx-1">LinkedIn</a>&bull;
                    <a href={personalInfo.github} className="text-blue-600 hover:underline mx-1">GitHub</a>&bull;
                    <a href={personalInfo.leetcode} className="text-blue-600 hover:underline mx-1">LeetCode</a>
                  </p>
                </div>

                {/* Summary */}
                <div className="mt-5">
                  <h2 className="text-sm font-bold font-sans uppercase tracking-wider text-slate-900 flex items-center gap-1.5 border-b border-slate-300 pb-1">
                    Professional Summary
                  </h2>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans mt-2">
                    Full Stack Developer (MERN) with hands-on production experience at Cadera Infotech. Skilled in building and 
                    deploying React.js + Node.js applications, secure JWT authentication systems, and AI-powered tools using the Gemini 
                    API. Solved 150+ DSA problems on LeetCode and Coding Ninjas. Seeking Software Engineer roles at product-based companies.
                  </p>
                </div>

                {/* Technical Skills */}
                <div className="mt-5">
                  <h2 className="text-sm font-bold font-sans uppercase tracking-wider text-slate-900 flex items-center gap-1.5 border-b border-slate-300 pb-1">
                    Technical Skills
                  </h2>
                  <div className="grid grid-cols-1 gap-1 text-xs mt-2 font-sans text-slate-700">
                    <p><strong>Languages:</strong> JavaScript (ES6+), Java, C++, HTML5, CSS3, SQL</p>
                    <p><strong>Frontend:</strong> React.js, Redux Toolkit, Tailwind CSS, Bootstrap</p>
                    <p><strong>Backend:</strong> Node.js, Express.js, REST APIs, JWT Authentication</p>
                    <p><strong>Database:</strong> MongoDB, Mongoose ODM, PostgreSQL</p>
                    <p><strong>Tools & Concepts:</strong> Git, GitHub, Postman, Razorpay, Cloudinary, DSA, OOP, DBMS, System Design, Agile</p>
                  </div>
                </div>

                {/* Experience */}
                <div className="mt-5">
                  <h2 className="text-sm font-bold font-sans uppercase tracking-wider text-slate-900 flex items-center gap-1.5 border-b border-slate-300 pb-1">
                    Work Experience
                  </h2>
                  <div className="space-y-4 mt-2">
                    <div>
                      <div className="flex justify-between items-start text-xs font-sans font-bold text-slate-900">
                        <span>Full Stack Developer — Cadera Infotech Pvt. Ltd.</span>
                        <span className="text-right">Jan 2026 – Present | Noida</span>
                      </div>
                      <ul className="list-disc pl-4 mt-1.5 space-y-1 text-xs text-slate-700 font-sans">
                        <li>Developed and deployed 10+ production-ready features for CaderaEdu, serving thousands of monthly active students using React.js, Node.js, Express.js, and MongoDB.</li>
                        <li>Reduced frontend development time by 25% through reusable React component architecture, improving UI consistency across sprints.</li>
                        <li>Validated and published 50+ structured JSON content entries for CMS bulk-upload workflows with schema compliance and internal link optimization.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-start text-xs font-sans font-bold text-slate-900">
                        <span>Frontend Developer Intern — 1Stop.ai</span>
                        <span className="text-right">Aug 2024 – Sep 2024 | Bhubaneswar</span>
                      </div>
                      <ul className="list-disc pl-4 mt-1.5 space-y-1 text-xs text-slate-700 font-sans">
                        <li>Built responsive UI components using React.js, HTML5, and CSS3 for a live AI product; delivered all frontend features within the 2-month internship timeline.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Projects */}
                <div className="mt-5">
                  <h2 className="text-sm font-bold font-sans uppercase tracking-wider text-slate-900 flex items-center gap-1.5 border-b border-slate-300 pb-1">
                    Projects
                  </h2>
                  <div className="space-y-4 mt-2 font-sans">
                    <div>
                      <div className="flex justify-between items-start text-xs font-bold text-slate-900">
                        <span>CareerForge AI &mdash; Personal Project</span>
                      </div>
                      <p className="text-[11px] text-slate-600 italic mt-0.5">Tech: React.js, Node.js, Express.js, MongoDB, Redux Toolkit, Gemini API, Tailwind CSS</p>
                      <ul className="list-disc pl-4 mt-1.5 space-y-1 text-xs text-slate-700">
                        <li>Built an AI-powered career platform with ATS resume analysis, skill-gap detection, AI mock interviews, and roadmap generation, processing 500+ resume analyses using the Gemini API.</li>
                        <li>Reduced ATS evaluation time from 15 minutes to under 30 seconds; implemented JWT authentication, Cloudinary resume upload, and MongoDB analytics dashboards.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-start text-xs font-bold text-slate-900">
                        <span>AquaZone &mdash; Ticket Booking System</span>
                      </div>
                      <p className="text-[11px] text-slate-600 italic mt-0.5">Tech: React.js, Node.js, Express.js, MongoDB, JWT, Razorpay, QR Code</p>
                      <ul className="list-disc pl-4 mt-1.5 space-y-1 text-xs text-slate-700">
                        <li>Built a full-stack water park booking platform with Razorpay payment gateway, QR code onboarding, ride navigation, and mobile-responsive design; achieved 99% transaction success in QA testing.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="mt-5">
                  <h2 className="text-sm font-bold font-sans uppercase tracking-wider text-slate-900 flex items-center gap-1.5 border-b border-slate-300 pb-1">
                    Education
                  </h2>
                  <div className="space-y-2 mt-2 text-xs font-sans text-slate-700">
                    {educationLine.map((edu, idx) => (
                      <div key={idx} className="flex justify-between">
                        <div>
                          <strong>{edu.degree}</strong> &mdash; <span className="text-slate-600">{edu.institution}</span>
                        </div>
                        <div className="text-right">
                          <span>{edu.duration} {edu.score !== 'Active Pursuing' && `| ${edu.score}`}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mt-5 text-slate-700">
                  <h2 className="text-sm font-bold font-sans uppercase tracking-wider text-slate-900 flex items-center gap-1.5 border-b border-slate-300 pb-1">
                    Achievements &amp; Certifications
                  </h2>
                  <ul className="list-disc pl-4 mt-2 space-y-1 text-xs">
                    <li>Solved 150+ DSA problems on LeetCode and Coding Ninjas &mdash; strong in Arrays, Trees, Graphs, DP, and Recursion.</li>
                    <li>Alpha &mdash; DSA with Java (Apna College, 2024–25) | Software Engineering Job Simulation (Accenture Nordics).</li>
                    <li>GenAI-Powered Data Analytics Job Simulation (Tata Steel / Forage) | EF SET English Certificate B2.</li>
                  </ul>
                </div>

              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/5 bg-[#0d1c2d] flex justify-end">
              <button
                id="close-resume-bottom-btn"
                onClick={() => setIsResumeOpen(false)}
                className="bg-[#c0c1ff] hover:bg-[#c0c1ff]/90 text-[#1000a9] text-xs font-bold px-6 py-2 rounded-lg transition-all"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
