import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Layers, 
  Cloud, 
  Smartphone, 
  Globe, 
  Lock, 
  CreditCard,
  CheckCircle2,
  Mail,
  ArrowRight,
  Database,
  Monitor,
  Cpu,
  Workflow,
  ExternalLink,
  Users,
  Server
} from 'lucide-react';
import Navbar from './components/Navbar';
import Section from './components/Section';
import heroBg from './assets/hero_bg.png';
import imoveImg from './assets/imove_showcase.png';
import './index.css';

export default function App() {
  const capabilities = [
    { title: "Enterprise Web Systems", icon: Monitor, desc: "Designing and building production-grade web applications for businesses." },
    { title: "Mobile Engineering", icon: Smartphone, desc: "Cross-platform mobile applications with native-level performance." },
    { title: "API Architecture", icon: Workflow, desc: "Scalable microservices and robust API layers for modern applications." },
    { title: "Cloud Infrastructure", icon: Cloud, desc: "DevOps, CI/CD, and cloud-native deployments on AWS and Render." },
    { title: "Security & Access", icon: Lock, desc: "Secure authentication and granular role-based access control." },
    { title: "Payment Integration", icon: CreditCard, desc: "Seamless integration with digital payment systems like MoMo & Airtel." }
  ];

  const techStack = {
    frontend: ["React", "React Native", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
    infra: ["AWS", "Firebase", "Render", "Docker"]
  };

  const team = {
    leadership: [
      { name: "UZARAMA Asady", role: "CEO" },
      { name: "KWIZERA Albert", role: "Chief Head Developer" }
    ],
    backend: ["IZERE Joshua", "KAMANA Clare Adetatus"],
    frontend: ["KWIZERA Albert", "KIRENGA Kenny"]
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/20 via-bg-dark/80 to-bg-dark"></div>
        </div>
        
        <div className="container-custom relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6">
              Engineering Scalable <br />
              <span className="gradient-text">Digital Infrastructure</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-10">
              Enterprise Systems • Cloud Platforms • Mobility Technology. <br />
              Building digital systems that scale with ambition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary">View Solutions</button>
              <button className="btn-outline">Flagship Project: iMove</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">About ICODE</span>
            <h2 className="text-4xl md:text-5xl mb-8">Professional software engineering for the enterprise</h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              ICODE CO LTD is a professional software engineering company focused on designing, building, and deploying secure, scalable, and high-performance digital systems.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { icon: Shield, text: "Security-first" },
                { icon: Zap, text: "Performance" },
                { icon: Layers, text: "Scalable Design" },
                { icon: Cpu, text: "Modular Code" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-primary"><item.icon size={20} /></div>
                  <span className="font-medium text-white">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card flex flex-col items-center justify-center p-12 text-center">
            <h3 className="text-6xl font-black gradient-text mb-2 tracking-tighter">100%</h3>
            <p className="font-bold text-white mb-4 uppercase tracking-widest text-xs">Production Grade</p>
            <p className="text-slate-400 max-w-xs text-sm">
              We architect solutions built for reliability, long-term scalability, and enterprise growth.
            </p>
          </div>
        </div>
      </Section>

      {/* iMove Platform Showcase */}
      <Section id="imove" className="bg-slate-900/40 border-y border-white/5">
        <div className="text-center mb-16">
          <span className="text-xs font-black text-primary uppercase tracking-[0.3em] bg-primary/10 px-4 py-2 rounded-full mb-6 inline-block">Flagship Platform</span>
          <h2 className="text-4xl md:text-5xl mb-4">iMove Mobility Ecosystem</h2>
          <p className="text-slate-400">A complete smart mobility developed and maintained by ICODE CO LTD</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              {[
                { title: "Cross-platform Mobile App", icon: Smartphone },
                { title: "Web-based Admin Control Portal", icon: Monitor },
                { title: "Real-time Geolocation & Maps", icon: Globe },
                { title: "Integrated Payment Systems", icon: CreditCard },
                { title: "Secure JWT Authentication", icon: Lock },
                { title: "Cloud-hosted Infrastructure", icon: Server }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="bg-white/5 p-3 rounded-lg group-hover:text-primary transition-colors"><feature.icon size={24} /></div>
                  <div>
                    <h4 className="font-bold text-white transition-colors">{feature.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-tighter">Integrated Production Feature</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex items-center gap-6">
                <a href="https://imove-v2-backend.onrender.com" target="_blank" className="flex items-center gap-2 text-primary font-bold hover:underline">
                    API Documentation <ExternalLink size={16} />
                </a>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <motion.div 
               whileHover={{ scale: 1.02 }}
               transition={{ type: "spring", stiffness: 300 }}
               className="relative"
            >
              <img 
                src={imoveImg} 
                alt="iMove Platform Mockup" 
                className="rounded-3xl shadow-2xl shadow-primary/20 w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary p-6 rounded-2xl shadow-xl hidden md:block">
                <p className="text-white font-black text-2xl leading-none tracking-tighter mb-1 uppercase">2026</p>
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Version 2.0 Released</p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Capabilities Section */}
      <Section id="solutions">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-6">Core Capabilities</h2>
          <p className="text-slate-400">From digital infrastructure to administrative monitoring, we build systems aligned with enterprise best practices.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <div key={i} className="glass-card hover:border-primary/30 group">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <cap.icon size={28} />
              </div>
              <h3 className="text-xl mb-3">{cap.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Tech Stack Section */}
      <Section className="bg-slate-900/40">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Technology Stack</h2>
          <p className="text-slate-400">Our battle-tested infrastructure primitives</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { cat: "Frontend & Mobile", items: techStack.frontend, icon: Smartphone },
            { cat: "Backend & APIs", items: techStack.backend, icon: Database },
            { cat: "Cloud & Infrastructure", items: techStack.infra, icon: Cloud }
          ].map((stack, idx) => (
            <div key={idx} className="bg-white/5 border border-white/5 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-primary"><stack.icon size={20} /></div>
                <h4 className="font-bold text-white uppercase tracking-widest text-sm">{stack.cat}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {stack.items.map(item => (
                  <span key={item} className="bg-slate-800 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium border border-white/5">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Team Section */}
      <Section id="team">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Engineering Talent</h2>
          <p className="text-slate-400">The team behind world-class digital systems</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Leadership */}
          {team.leadership.map((member, i) => (
            <div key={i} className="text-center glass-card border-primary/20 bg-primary/5">
                <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/30">
                    <Users className="text-primary" size={32} />
                </div>
                <h4 className="text-xl font-bold">{member.name}</h4>
                <p className="text-primary text-xs font-black uppercase tracking-widest mt-1">{member.role}</p>
            </div>
          ))}
          {/* Dev Team */}
          {["IZERE Joshua", "KIRENGA Kenny"].map((name, i) => (
            <div key={i} className="text-center glass-card">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/5">
                    <Code2 className="text-slate-400" size={32} />
                </div>
                <h4 className="text-lg font-bold">{name}</h4>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Developer</p>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-500 mt-12 italic text-sm italic font-medium">
            “Building digital systems that scale with ambition.”
        </p>
      </Section>

      {/* Footer / Contact */}
      <footer id="contact" className="border-t border-white/5 pt-24 pb-12 bg-[#050508]">
        <div className="container-custom px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-primary p-1 rounded-lg"><Code2 className="text-white w-5 h-5" /></div>
                <span className="text-xl font-black text-white tracking-tighter">ICODE<span className="text-primary">.RW</span></span>
              </div>
              <p className="text-slate-500 max-w-sm mb-6 leading-relaxed">
                A software engineering company focused on designing, building, and deploying secure, scalable digital infrastructure.
              </p>
              <div className="flex gap-4">
                <a href="mailto:contact@icode.rw" className="bg-white/5 hover:bg-primary/20 p-3 rounded-xl transition-all"><Mail size={20} /></a>
                <a href="#" className="bg-white/5 hover:bg-primary/20 p-3 rounded-xl transition-all"><Globe size={20} /></a>
              </div>
            </div>
            <div>
              <h5 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Resources</h5>
              <ul className="space-y-4 text-slate-500 text-sm font-medium">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Project Portfolio</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact</h5>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-primary" />
                  <span className="text-slate-400 text-sm font-medium">contact@icode.rw</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-primary" />
                  <span className="text-slate-400 text-sm font-medium">www.icode.rw</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 text-center flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-xs">
              © {new Date().getFullYear()} ICODE CO LTD. All rights reserved.
            </p>
            <div className="flex gap-8 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 border border-white/5 rounded-full">
              <span>English</span>
              <span className="text-slate-800">|</span>
              <span>Kinyarwanda</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
