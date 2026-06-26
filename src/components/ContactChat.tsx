import { motion } from 'motion/react';
import { Send, Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import { personalInfo } from '../data';

export default function ContactChat() {
  return (
    <section id="contact" className="py-24 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-3xl font-bold text-white mb-4">Let's talk about your next project</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              I'm currently available to take on new projects, so feel free to send me a message about anything that you want to run past me.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Email</p>
                <a href={`mailto:${personalInfo.email}`} className="text-lg text-white hover:text-purple-400 transition-colors">
                  {personalInfo.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Location</p>
                <p className="text-lg text-white">{personalInfo.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Phone</p>
                <a href={`tel:${personalInfo.phone}`} className="text-lg text-white hover:text-purple-400 transition-colors">
                  {personalInfo.phone}
                </a>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-4">Social Profiles</p>
            <div className="flex gap-4">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all transform hover:-translate-y-1">
                <Github size={20} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all transform hover:-translate-y-1">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form using FormSubmit.co */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form 
            action={`https://formsubmit.co/${personalInfo.email}`} 
            method="POST" 
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-xl flex flex-col gap-6"
          >
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value="New Contact Message from Portfolio!" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Your Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                placeholder="John Doe"
                required
                className="w-full bg-[#0B1120]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Your Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                placeholder="john@example.com"
                required
                className="w-full bg-[#0B1120]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Your Message</label>
              <textarea 
                id="message"
                name="message"
                rows={5}
                placeholder="Hi, I think we need a design system..."
                required
                className="w-full bg-[#0B1120]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="mt-2 w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/25"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
