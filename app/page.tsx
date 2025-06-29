"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Github, Linkedin, Mail, Phone, ExternalLink, Download, MessageCircle } from "lucide-react"
import Image from "next/image"
import { submitContactForm } from "./actions"
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaProjectDiagram, FaDatabase, FaServer, FaCloud, FaMobile, FaLaptopCode, FaNetworkWired, FaShieldAlt, FaBrain, FaRocket } from 'react-icons/fa';
import { SiCplusplus, SiNextdotjs, SiMysql, SiDocker, SiKubernetes, SiGooglecloud, SiGit, SiGithub, SiPostman, SiMongodb, SiRedis, SiNginx } from 'react-icons/si';

const skills = [
  { name: 'C++', icon: SiCplusplus },
  { name: 'DSA', icon: FaProjectDiagram },
  { name: 'JavaScript', icon: FaJs },
  { name: 'React', icon: FaReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Python', icon: FaPython },
  { name: 'SQL', icon: SiMysql },
  { name: 'HTML', icon: FaHtml5 },
  { name: 'CSS', icon: FaCss3Alt },
]

const projects = [
  {
    title: "Predictive Pest Guard",
    description:
      "An AI-powered system that predicts pest outbreaks using weather and historical pest data to help farmers and agricultural agencies take preventive measures.",
    link: "https://predictive-pest-guard.vercel.app/",
    github: "https://github.com/anmolsalaria/predictive-pest-guard",
    tech: [
      "Python",
      "TensorFlow",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "OpenWeatherMap API",
      "Plotly",
      "React.js",
      "Next.js",
      "CSS3",
      "Vercel",
    ],
    image: "/projects/predictive-pest-guard.jpg",
    featured: true,
  },
  {
    title: "Web Vulnerability Scanner",
    description:
      "A web-based tool to identify common security issues in websites using OWASP-based scanning techniques.",
    link: "https://web-vuln-scannner.vercel.app/",
    github: "https://github.com/Kushagra-Gupta-755/WebVulnScannner",
    tech: ["Security", "OWASP", "Web Scanning", "Vulnerability Assessment"],
    image: "/projects/web-vulnerability-scanner.jpg",
    featured: false,
  },
]

const certificates = [
  {
    title: "Linux - Learn App Development using Linux",
    issuer: "Infosys Springboard",
    date: "October 2024",
    image: "/certificates/linux-cert.jpg",
    verificationUrl: "https://verify.onwingspan.com/",
  },
  {
    title: "Data Structures",
    issuer: "University of California San Diego (Coursera)",
    date: "August 2024",
    image: "/certificates/data-structures-cert.jpg",
    verificationUrl: "https://coursera.org/verify/XWJIJPLIL8AY",
  },
  {
    title: "Object-Oriented Data Structures in C++",
    issuer: "University of Illinois Urbana-Champaign (Coursera)",
    date: "August 2024",
    image: "/certificates/cpp-cert.jpg",
    verificationUrl: "https://coursera.org/verify/1CC7R0TWPUJ9",
  },
  {
    title: "Getting Started with Data Visualization in R",
    issuer: "Johns Hopkins University (Coursera)",
    date: "August 2024",
    image: "/certificates/data-viz-r-cert.jpg",
    verificationUrl: "https://coursera.org/verify/XWJIJPLIL8AY",
  },
  {
    title: "CS403: Introduction to Modern Database Systems",
    issuer: "Saylor Academy",
    date: "August 2024",
    image: "/certificates/database-cert.jpg",
    verificationUrl: "https://learn.saylor.org/admin/tool/certificate/index.php?code=6202783751AS",
  },
  {
    title: "Project Initiation: Starting a Successful Project",
    issuer: "Google (Coursera)",
    date: "January 2025",
    image: "/certificates/project-initiation-cert.jpg",
    verificationUrl: "https://coursera.org/verify/J847NIPIS4LC",
  },
  {
    title: "Operating Systems and You: Becoming a Power User",
    issuer: "Google (Coursera)",
    date: "January 2025",
    image: "/certificates/operating-systems-cert.jpg",
    verificationUrl: "https://coursera.org/verify/9R0MOOQ9TG26",
  },
  {
    title: "Computer Networks and Network Security",
    issuer: "IBM (Coursera)",
    date: "January 2025",
    image: "/certificates/network-security-cert.jpg",
    verificationUrl: "https://coursera.org/verify/HTET82MCPTF1",
  },
  {
    title: "Fundamentals of Network Communication",
    issuer: "University of Colorado System (Coursera)",
    date: "January 2025",
    image: "/certificates/network-communication-cert.jpg",
    verificationUrl: "https://coursera.org/verify/4V27JSO8WY1T",
  },
  {
    title: "Connect and Protect: Networks and Network Security",
    issuer: "Google (Coursera)",
    date: "January 2025",
    image: "/certificates/connect-protect-cert.jpg",
    verificationUrl: "https://coursera.org/verify/6D1O0BOMD2WO",
  },
  {
    title: "Algorithmic Toolbox",
    issuer: "University of California San Diego (Coursera)",
    date: "January 2025",
    image: "/certificates/algorithmic-toolbox-cert.jpg",
    verificationUrl: "https://coursera.org/verify/XR3LUYLCHD73",
  },
]

const developer = {
  name: 'Anmol Salaria',
  university: 'Bennett University',
  degree: 'B.Tech CSE',
  interests: ['Web Development', 'DSA using C++', 'Problem Solving'],
  skills: ['C++', 'DSA', 'JavaScript', 'React', 'Next.js', 'Python', 'SQL', 'HTML', 'CSS'],
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  passionateProgrammer: true,
  hireable: function() {
    return (
      this.hardWorker &&
      this.quickLearner &&
      this.problemSolver &&
      this.passionateProgrammer &&
      this.skills.length >= 5
    );
  }
}

const CodeEditor = () => {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-auto shadow-2xl min-h-[600px] min-w-[350px] max-w-xl mx-auto p-0">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-gray-400 text-sm font-mono">developer.js</div>
      </div>

      {/* Code Content */}
      <div className="p-6 font-mono text-sm leading-relaxed flex">
        {/* Line Numbers */}
        <div className="text-gray-500 text-right select-none mr-4">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
          <div>12</div>
          <div>13</div>
          <div>14</div>
          <div>15</div>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <div>19</div>
          <div>20</div>
          <div>21</div>
          <div>22</div>
          
        </div>
        {/* Code Content */}
        <div>
          <div>
            <span className="text-purple-400">const</span> <span className="text-blue-300">developer</span>{" "}
            <span className="text-white">=</span> <span className="text-yellow-300">{"{"}</span>
          </div>
          <div className="ml-4">
            <span className="text-red-300">name</span>
            <span className="text-white">:</span> <span className="text-green-300">'Anmol Salaria'</span>
            <span className="text-white">,</span>
          </div>
          <div className="ml-4">
            <span className="text-red-300">university</span>
            <span className="text-white">:</span> <span className="text-green-300">'Bennett University'</span>
            <span className="text-white">,</span>
          </div>
          <div className="ml-4">
            <span className="text-red-300">degree</span>
            <span className="text-white">:</span> <span className="text-green-300">'B.Tech CSE'</span>
            <span className="text-white">,</span>
          </div>
          <div className="ml-4">
            <span className="text-red-300">interests</span>
            <span className="text-white">:</span> <span className="text-yellow-300">[</span>
            <span className="text-green-300">'Web Development'</span><span className="text-white">,</span>{' '}
            <span className="text-green-300">'DSA using C++'</span><span className="text-white">,</span>{' '}
            <span className="text-green-300">'Problem Solving'</span>
            <span className="text-yellow-300">]</span>
            <span className="text-white">,</span>
          </div>
          <div className="ml-4">
            <span className="text-red-300">skills</span>
            <span className="text-white">:</span> <span className="text-yellow-300">[</span>
            <span className="text-green-300">'C++'</span><span className="text-white">,</span>{' '}
            <span className="text-green-300">'DSA'</span><span className="text-white">,</span>{' '}
            <span className="text-green-300">'JavaScript'</span><span className="text-white">,</span>{' '}
            <span className="text-green-300">'React'</span><span className="text-white">,</span>{' '}
            <span className="text-green-300">'Next.js'</span><span className="text-white">,</span>{' '}
            <span className="text-green-300">'Python'</span><span className="text-white">,</span>{' '}
            <span className="text-green-300">'SQL'</span><span className="text-white">,</span>{' '}
            <span className="text-green-300">'HTML'</span><span className="text-white">,</span>{' '}
            <span className="text-green-300">'CSS'</span>
            <span className="text-yellow-300">]</span>
            <span className="text-white">,</span>
          </div>
          <div className="ml-4">
            <span className="text-red-300">hardWorker</span>
            <span className="text-white">:</span> <span className="text-blue-300">true</span>
            <span className="text-white">,</span>
          </div>
          <div className="ml-4">
            <span className="text-red-300">quickLearner</span>
            <span className="text-white">:</span> <span className="text-blue-300">true</span>
            <span className="text-white">,</span>
          </div>
          <div className="ml-4">
            <span className="text-red-300">problemSolver</span>
            <span className="text-white">:</span> <span className="text-blue-300">true</span>
            <span className="text-white">,</span>
          </div>
          <div className="ml-4">
            <span className="text-red-300">passionateProgrammer</span>
            <span className="text-white">:</span> <span className="text-blue-300">true</span>
            <span className="text-white">,</span>
          </div>
          <div className="ml-4">
            <span className="text-red-300">hireable</span>
            <span className="text-white">:</span> <span className="text-purple-400">function() {'{'}</span>
          </div>
          <div className="ml-8">
            <span className="text-purple-400">return</span> <span className="text-yellow-300">(</span>
          </div>
          <div className="ml-12">
            <span className="text-blue-300">this</span>
            <span className="text-white">.</span>
            <span className="text-red-300">hardWorker</span> <span className="text-white">&&</span>
          </div>
          <div className="ml-12">
            <span className="text-blue-300">this</span>
            <span className="text-white">.</span>
            <span className="text-red-300">quickLearner</span> <span className="text-white">&&</span>
          </div>
          <div className="ml-12">
            <span className="text-blue-300">this</span>
            <span className="text-white">.</span>
            <span className="text-red-300">problemSolver</span> <span className="text-white">&&</span>
          </div>
          <div className="ml-12">
            <span className="text-blue-300">this</span>
            <span className="text-white">.</span>
            <span className="text-red-300">passionateProgrammer</span> <span className="text-white">&&</span>
          </div>
          <div className="ml-12">
            <span className="text-blue-300">this</span>
            <span className="text-white">.</span>
            <span className="text-red-300">skills</span>
            <span className="text-white">.</span>
            <span className="text-red-300">length</span> <span className="text-white">&gt;=</span>{' '}
            <span className="text-orange-300">5</span>
          </div>
          <div className="ml-8">
            <span className="text-yellow-300">);</span>
          </div>
          <div className="ml-4">
            <span className="text-yellow-300">{'}'}</span>
          </div>
          <div>
            <span className="text-yellow-300">{'}'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const FloatingTechIcons = () => {
  const [isSkillsSectionVisible, setIsSkillsSectionVisible] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial window dimensions
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const handleScroll = () => {
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        // Check if skills section is fully visible in viewport
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setIsSkillsSectionVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const techIcons = [
    { icon: SiCplusplus, delay: 0, duration: 20 },
    { icon: FaPython, delay: 2, duration: 25 },
    { icon: FaJs, delay: 4, duration: 18 },
    { icon: FaReact, delay: 6, duration: 22 },
    { icon: SiNextdotjs, delay: 8, duration: 24 },
    { icon: FaDatabase, delay: 10, duration: 19 },
    { icon: SiMysql, delay: 12, duration: 21 },
    { icon: FaServer, delay: 14, duration: 23 },
    { icon: FaCloud, delay: 16, duration: 20 },
    { icon: SiDocker, delay: 18, duration: 26 },
    { icon: SiGit, delay: 20, duration: 17 },
    { icon: FaBrain, delay: 22, duration: 28 },
    { icon: FaNetworkWired, delay: 24, duration: 25 },
    { icon: FaShieldAlt, delay: 26, duration: 22 },
    { icon: FaRocket, delay: 28, duration: 30 },
  ];

  // Don't render until window dimensions are available
  if (windowDimensions.width === 0 || windowDimensions.height === 0) {
    return null;
  }

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-500 ${isSkillsSectionVisible ? 'opacity-0' : 'opacity-100'}`}>
      {techIcons.map((tech, index) => (
        <motion.div
          key={index}
          className="absolute text-emerald-400/20"
          initial={{
            x: Math.random() * windowDimensions.width,
            y: Math.random() * windowDimensions.height,
            rotate: 0,
            scale: 0.5,
          }}
          animate={{
            x: [
              Math.random() * windowDimensions.width,
              Math.random() * windowDimensions.width,
              Math.random() * windowDimensions.width,
            ],
            y: [
              Math.random() * windowDimensions.height,
              Math.random() * windowDimensions.height,
              Math.random() * windowDimensions.height,
            ],
            rotate: [0, 360, 720],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: tech.duration,
            delay: tech.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <tech.icon className="text-4xl md:text-6xl" />
        </motion.div>
      ))}
    </div>
  );
};

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true) // Default to dark mode
  const [activeSection, setActiveSection] = useState("hero")
  const [contactState, setContactState] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const [isContactPending, setIsContactPending] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsContactPending(true)
    setContactState(null)

    const formData = new FormData(event.currentTarget)

    try {
      const result = await submitContactForm(formData)
      setContactState(result)
    } catch (error) {
      setContactState({
        success: false,
        message: "Something went wrong. Please try again later.",
      })
    } finally {
      setIsContactPending(false)
    }
  }

  const handleWhatsAppClick = () => {
    const name = (document.querySelector('input[name="name"]') as HTMLInputElement)?.value || '';
    const email = (document.querySelector('input[name="email"]') as HTMLInputElement)?.value || '';
    const message = (document.querySelector('textarea[name="message"]') as HTMLTextAreaElement)?.value || '';
    
    const generateWhatsAppLink = (name: string, email: string, message: string) => {
      const whatsappMessage = `Hi Anmol! I'm ${name} (${email}). ${message}`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      return `https://wa.me/916306150846?text=${encodedMessage}`;
    };
    
    if (typeof window !== 'undefined') {
      if (name && email && message) {
        const whatsappLink = generateWhatsAppLink(name, email, message);
        window.open(whatsappLink, '_blank');
      } else {
        // If form is not filled, open WhatsApp with a generic message
        const whatsappLink = generateWhatsAppLink('Visitor', 'visitor@example.com', 'Hi! I would like to get in touch with you.');
        window.open(whatsappLink, '_blank');
      }
    }
  }

  return (
    <div className={
      `min-h-screen transition-colors duration-300 relative ` +
      (darkMode
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white'
        : 'bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100 text-gray-900')
    }>
      {/* Floating Tech Icons Background */}
      <FloatingTechIcons />
      
      {/* Navigation */}
      <nav className={
        `fixed top-0 w-full z-50 border-b backdrop-blur-md transition-colors duration-300 ` +
        (darkMode
          ? 'bg-gray-900/80 border-gray-700'
          : 'bg-white/80 border-gray-200')
      }>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-xl text-emerald-400"
            >
              ANMOL SALARIA
            </motion.div>

            <div className={
              `hidden md:flex space-x-8`}
            >
              {['HOME', 'ABOUT', 'SKILLS', 'PROJECTS', 'EDUCATION', 'CERTIFICATES', 'CONTACT'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (item === 'HOME') {
                      scrollToSection('hero');
                    } else {
                      scrollToSection(
                        item.toLowerCase().replace('experience', 'about').replace('education', 'education')
                      );
                    }
                  }}
                  className={`transition-colors text-sm font-medium tracking-wider ${darkMode ? 'text-gray-300 hover:text-emerald-400' : 'text-gray-800 hover:text-emerald-600'}`}
                >
                  {item}
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className={`ml-4 transition-colors ${darkMode ? 'text-gray-300 hover:text-emerald-400' : 'text-gray-800 hover:text-emerald-600'}`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className={`text-5xl md:text-6xl font-bold ${darkMode ? '' : 'text-gray-900'}`}>Hi,</h1>
              <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? '' : 'text-gray-900'}`}>
                I'm <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>ANMOL SALARIA</span>,
              </h2>
              <h3 className={`text-4xl md:text-5xl font-bold ${darkMode ? '' : 'text-gray-900'}`}>
                a Passionate <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>Software</span>
              </h3>
              <h3 className={`text-4xl md:text-5xl font-bold ${darkMode ? '' : 'text-gray-900'}`}>
                <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>Developer.</span>
              </h3>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://github.com/anmolsalaria"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors"
              >
                <Github className="h-8 w-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/anmol-salaria-b2164028a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors"
              >
                <Linkedin className="h-8 w-8" />
              </a>
              <a href="mailto:anmolsalaria31@gmail.com" className="text-pink-400 hover:text-pink-300 transition-colors">
                <Mail className="h-8 w-8" />
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection("contact")}
                className={`bg-transparent border-2 ${darkMode ? 'border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900' : 'border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white'} px-8 py-3 rounded-full font-medium transition-all duration-300`}
              >
                CONTACT ME ⚡
              </Button>
              <Button className={`bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 ${darkMode ? '' : 'shadow-md'}`}>
                <Download className="mr-2 h-4 w-4" />
                GET RESUME ⬇
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <CodeEditor />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={
        `py-20 transition-colors duration-300 ` +
        (darkMode ? 'bg-gray-900/50' : 'bg-white/50')
      }>
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>About Me</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              Hi, I'm Anmol Salaria.
              I'm a passionate and dedicated programmer with a strong interest in building innovative and impactful software solutions. I'm a quick learner with a self-driven attitude, always eager to explore new technologies and sharpen my problem-solving skills.
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              I have a solid foundation in Data Structures and Algorithms (DSA), which I implement using C++. Solving complex problems and writing optimized code is something I genuinely enjoy, and it helps me think critically and code efficiently.
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              I work across the full stack of web development and enjoy building responsive, user-friendly web applications using JavaScript, React, and Next.js. I'm also open to learning and adapting to new technologies as needed.
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              I'm actively looking for opportunities that align with my skills, curiosity, and passion for technology.
              </p>

              <div className="space-y-4 pt-6">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-emerald-400" />
                  <span className={`text-gray-300 ${!darkMode ? 'text-gray-800' : ''}`}>anmolsalaria31@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-emerald-400" />
                  <span className={`text-gray-300 ${!darkMode ? 'text-gray-800' : ''}`}>+916306150846</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-96 h-96 mx-auto">
                <Image
                  src="/images/profile.jpg"
                  alt="Anmol Salaria"
                  fill
                  className="rounded-2xl object-cover shadow-2xl border-4 border-emerald-400/20"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-500/10 to-purple-500/10"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>SKILLS</h2>
          </motion.div>

          {/* 3D Timeline/Horizontal Scroll Prep */}
          <div className="relative w-full overflow-x-hidden py-8">
            <div className="flex space-x-8 animate-skills-scroll will-change-transform" style={{ animationDuration: '10s', minWidth: '200%' }}>
              {Array(4).fill(skills).flat().map((skill, index) => (
                <motion.div
                  key={skill.name + index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (index % skills.length) * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.15 }}
                  className="group flex flex-col items-center justify-center min-w-[120px]"
                >
                  <div className="bg-gray-800/50 border border-gray-700 group-hover:border-emerald-400 rounded-full p-6 shadow-lg mb-4 transition-all duration-300">
                    {skill.icon && <skill.icon className="text-5xl text-emerald-400" />}
                  </div>
                  <h3 className={`font-semibold mt-2 group-hover:text-emerald-400 transition-colors text-lg ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    {skill.name}
                  </h3>
                </motion.div>
              ))}
            </div>
            <style jsx>{`
              @keyframes skills-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-skills-scroll {
                animation: skills-scroll linear infinite;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={
        `py-20 transition-colors duration-300 ` +
        (darkMode ? 'bg-gray-900/50' : 'bg-white/50')
      }>
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>PROJECTS</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card
                  className={`h-full hover:shadow-xl transition-all duration-300 bg-gray-800/50 border-gray-700 group-hover:border-emerald-400 backdrop-blur-sm ${project.featured ? "ring-2 ring-emerald-400/20" : ""}`}
                >
                  <CardContent className="p-6">
                    {project.featured && (
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-gradient-to-r from-emerald-400 to-purple-600 text-gray-900">
                          Featured Project
                        </Badge>
                      </div>
                    )}

                    <div className="aspect-video bg-gradient-to-br from-emerald-900/20 to-purple-900/20 rounded-lg mb-6 overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={project.image || "/placeholder.svg?height=300&width=500"}
                        alt={project.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="h-8 w-8 text-white opacity-80" />
                      </div>
                    </div>

                    <h3 className={`text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      {project.title}
                    </h3>

                    <p className={`mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-emerald-900/30 text-emerald-300 text-xs border border-emerald-400/20"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        asChild
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-700 hover:to-purple-700 text-white"
                      >
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>

                      {project.github && (
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 bg-transparent"
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            View Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>EDUCATION</h2>
          </motion.div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {/* B.Tech */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 bg-gray-800/50 border-gray-700 group-hover:border-emerald-400 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-400/20">
                      <span className="text-2xl font-bold text-emerald-400">🎓</span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      B.Tech in Computer Science and Engineering
                    </h3>
                    <p className={`text-lg font-semibold mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      Bennett University
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      2023 – 2027
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Senior Secondary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 bg-gray-800/50 border-gray-700 group-hover:border-emerald-400 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-400/20">
                      <span className="text-2xl font-bold text-emerald-400">📚</span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      Senior Secondary (Class 11–12)
                    </h3>
                    <p className={`text-lg font-semibold mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      Lakshay Public School
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Secondary Education */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 bg-gray-800/50 border-gray-700 group-hover:border-emerald-400 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-400/20">
                      <span className="text-2xl font-bold text-emerald-400">🏫</span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      Secondary Education (Class 1–10)
                    </h3>
                    <p className={`text-lg font-semibold mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      Kendriya Vidyalaya
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>CERTIFICATES</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 bg-gray-800/50 border-gray-700 group-hover:border-emerald-400 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="aspect-[4/3] bg-gradient-to-br from-emerald-900/20 to-purple-900/20 rounded-lg mb-4 overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={cert.image || "/placeholder.svg?height=300&width=400"}
                        alt={cert.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <h3 className={`font-bold mb-2 group-hover:text-emerald-400 transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      {cert.title}
                    </h3>

                    <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{cert.issuer}</p>

                    <p className={`text-sm text-emerald-400 font-medium mb-4 ${darkMode ? '' : ''}`}>{cert.date}</p>

                    {cert.verificationUrl && (
                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-700 hover:to-purple-700 text-white"
                      >
                        <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Certificate
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={
        `py-20 transition-colors duration-300 ` +
        (darkMode ? 'bg-gray-900/50' : 'bg-white/50')
      }>
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>CONTACT ME</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Get In Touch</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center border border-emerald-400/20">
                    <Mail className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Email</p>
                    <p className={`text-gray-300 ${!darkMode ? 'text-gray-800' : ''}`}>anmolsalaria31@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center border border-emerald-400/20">
                    <Phone className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Phone</p>
                    <p className={`text-gray-300 ${!darkMode ? 'text-gray-800' : ''}`}>+916306150846</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-6">
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-full border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 bg-transparent"
                >
                  <a href="https://github.com/anmolsalaria" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-full border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 bg-transparent"
                >
                  <a
                    href="https://www.linkedin.com/in/anmol-salaria-b2164028a/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-0">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        required
                        className={`border focus:border-emerald-400 ${darkMode ? 'bg-gray-900/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        className={`border focus:border-emerald-400 ${darkMode ? 'bg-gray-900/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        rows={5}
                        required
                        className={`border focus:border-emerald-400 ${darkMode ? 'bg-gray-900/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isContactPending}
                      className={`w-full bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-700 hover:to-purple-700 text-white disabled:opacity-50 ${darkMode ? '' : 'shadow-md'}`}
                    >
                      {isContactPending ? 'Sending...' : 'Send Message'}
                    </Button>
                    
                    <Button
                      type="button"
                      onClick={handleWhatsAppClick}
                      className={`w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white ${darkMode ? '' : 'shadow-md'}`}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Send via WhatsApp
                    </Button>
                  </form>

                  {contactState && (
                    <div
                      className={`mt-4 p-3 rounded-lg text-center ${
                        contactState.success
                          ? "bg-emerald-900/30 text-emerald-300 border border-emerald-400/20"
                          : "bg-red-900/30 text-red-300 border border-red-400/20"
                      }`}
                    >
                      {contactState.message}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={
        `py-8 border-t transition-colors duration-300 ` +
        (darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200')
      }>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className={`text-gray-400 ${!darkMode ? 'text-gray-600' : ''}`}>© 2025 Anmol Salaria | Building one project at a time - many more ahead</p>
        </div>
      </footer>
    </div>
  )
}
