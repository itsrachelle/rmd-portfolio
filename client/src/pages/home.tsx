import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Monitor, 
  Smartphone, 
  Rocket, 
  Mail, 
  Phone, 
  MapPin, 
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Check,
  ExternalLink,
  FileText,
  Globe,
  Settings,
  Palette,
  Star,
  Zap,
  Shield,
  Users
} from "lucide-react";

import tempImageQe40RA from "@assets/tempImageQe40RA.png";
import stretchInspireScreenshot from "@assets/Screenshot 2025-07-22 at 14.22.05_1753208599743.png";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    budget: "",
    message: ""
  });
  const { toast } = useToast();

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#pricing", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" }
  ];



  const portfolioItems = [
    {
      companyName: "Stretch Inspire BLOG",
      description: "5-page site with blog, contact, and embedded subscription option.",
      image: stretchInspireScreenshot,
      liveUrl: "https://www.stretchinspire.com/"
    }
  ];

  const pricingPlans = [
    {
      name: "One-Page Website",
      price: "$200",
      period: "",
      icon: FileText,
      description: "A sleek, modern one-page site designed to capture your brand essence and drive action.\n\nPerfect for small businesses, consultants, or personal brands just getting started online.",
      features: [
        "Full website setup and design",
        "Brand Integration",
        "Mobile-friendly design",
        "Basic SEO setup",
        "Hosting and domain setup support"
      ],
      popular: false
    },
    {
      name: "3–5 Page Website",
      price: "$400 - $600",
      period: "",
      icon: Globe,
      description: "A fully customized website (up to 5 pages) to showcase your brand and convert visitors.",
      features: [
        "Website setup and design",
        "Up to 5 pages (e.g., Home, Services/Menu, About, Contact, Blog, Booking)",
        "Full website setup and design",
        "Brand Integration",
        "Mobile-friendly design",
        "Basic SEO setup",
        "Hosting and domain setup support"
      ],
      popular: true
    },
    {
      name: "Website management*",
      price: "$100",
      period: "per month",
      icon: Settings,
      description: "Keep your site fresh, up-to-date, and running smoothly - without lifting a finger.",
      features: [
        "Up to 3 content updates per month (text, photos, menus, seasonal offers, etc.)",
        "Add new sections (e.g. an about page, blog posts, or promotions)",
        "Basic performance and upkeep monitoring",
        "*Service only available after website set up"
      ],
      popular: false
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY + 200;

      sections.forEach((section) => {
        const htmlSection = section as HTMLElement;
        const sectionTop = htmlSection.offsetTop;
        const sectionHeight = htmlSection.clientHeight;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId || "");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      budget: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-0 shadow-lg z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-normal font-poppins tracking-tight">
              <span className="text-gradient">Design</span>
              <span className="text-[hsl(var(--secondary-dark))]">Pro</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative font-medium text-gray-700 hover:text-[hsl(var(--primary-brown))] transition-all duration-300 group ${
                    activeSection === item.href.replace("#", "") ? "text-[hsl(var(--primary-brown))]" : ""
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[hsl(var(--primary-brown))] to-[hsl(var(--secondary-dark))] transition-all duration-300 ${
                    activeSection === item.href.replace("#", "") ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </button>
              ))}

            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-[hsl(var(--primary-brown))]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left text-gray-600 hover:text-[hsl(var(--primary-brown))] transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ))}
                <Link href="/theme-generator">
                  <Button className="w-full bg-[hsl(var(--primary-brown))] text-white hover:bg-[hsl(var(--primary-brown))]/90 justify-start">
                    <Palette className="h-4 w-4 mr-2" />
                    Color Themes
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Hero Section */}
      <section className="modern-hero-gradient min-h-[70vh] flex items-center justify-center text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full floating-animation" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full floating-animation" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/3 w-16 h-16 bg-white rounded-full floating-animation" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8 pt-8"
          >

            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal font-poppins leading-none tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white">
                Modern Website Design
              </span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl font-light max-w-4xl mx-auto leading-relaxed text-white/90"
            >
              Fast, functional, and beautifully designed websites - ready in just days.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12 pb-16"
            >
              <Button
                onClick={() => scrollToSection("#portfolio")}
                size="lg"
                className="bg-white text-[hsl(var(--secondary-dark))] hover:bg-gray-100 px-10 py-5 text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 group"
              >
                View My Work 
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button
                onClick={() => scrollToSection("#services")}
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-5 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
              >
                Services
              </Button>
              
              <Button
                onClick={() => scrollToSection("#contact")}
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-5 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
              >
                Let's Talk
              </Button>
            </motion.div>
            

          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </section>
      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-blue-50/30 via-cyan-50/20 to-blue-50/30 relative overflow-hidden section-modern">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal font-poppins text-[hsl(var(--secondary-dark))] mb-6 leading-none">
                About <span className="text-gradient">Me</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Crafting digital experiences that make a lasting impact
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <img
                  src={tempImageQe40RA}
                  alt="Professional headshot"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-[hsl(var(--secondary-dark))]">Hi, I'm Rachelle!</h3>
                <p className="text-gray-600 leading-relaxed">A digital project manager who builds clean, modern websites for small businesses - websites that not only look great, but work. Whether you’re starting fresh or upgrading your current site, I’ll make sure your online presence reflects the professionalism of your business.</p>
                <p className="text-gray-600 leading-relaxed">With experience leading web projects across industries, I bring clarity, speed, and style to every build - focusing on user-friendly design, smooth functionality, and fast delivery. The process is simple and stress-free, so you can focus on your business while I handle the website.</p>
                
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-32 left-0 w-1/4 h-40 bg-gradient-to-r from-[hsl(var(--accent-nude))]/10 to-transparent rounded-r-full"></div>
        <div className="absolute bottom-20 right-0 w-1/3 h-32 bg-gradient-to-l from-[hsl(var(--primary-brown))]/5 to-transparent rounded-l-full"></div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-br from-gray-50 via-white to-[hsl(var(--surface))]/20 relative overflow-hidden section-modern">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal font-poppins text-[hsl(var(--secondary-dark))] mb-6 leading-none">
              <span className="text-gradient">Services</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Modern websites that work as hard as you do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50, rotateY: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`card-modern p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 relative group perspective-1000 ${
                  plan.popular ? "ring-2 ring-[hsl(var(--primary-brown))]/50 ring-offset-4" : ""
                }`}
              >
                
                
                <div className="text-center relative">

                  
                  <div className="flex justify-center mb-6 mt-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[hsl(var(--primary-brown))] to-[hsl(var(--secondary-dark))] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <plan.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-normal font-poppins text-[hsl(var(--secondary-dark))] mb-4">
                    {plan.name}
                  </h3>
                  
                  <div className="mb-6">
                    <span className="text-2xl md:text-3xl font-normal font-poppins text-gradient">
                      {plan.price}
                    </span>
                    {plan.period && <span className="text-base font-medium text-gray-500 ml-2">{plan.period}</span>}
                  </div>
                  
                  {plan.description && (
                    <div className="text-gray-600 mb-4 text-left leading-relaxed text-sm">
                      {plan.description.split('\n').map((line, index) => (
                        <p key={index} className={index > 0 ? 'mt-2' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-left mb-6">
                    <h4 className="font-normal font-poppins text-[hsl(var(--secondary-dark))] mb-4 text-base">
                      {plan.name === "Basic 3–5 Page Website" ? "What's included:" : "Includes:"}
                    </h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * featureIndex, duration: 0.4 }}
                          className="flex items-start"
                        >
                          {!feature.startsWith('*') && (
                            <div className="w-5 h-5 bg-gradient-to-r from-[hsl(var(--primary-brown))] to-[hsl(var(--secondary-dark))] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                          <span className={`text-gray-700 ${feature.startsWith('*') ? 'italic text-gray-600' : 'font-medium'} leading-relaxed`}>
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Custom Work Section */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-20 card-modern p-10 max-w-3xl mx-auto relative overflow-hidden group"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary-brown))]/5 via-transparent to-[hsl(var(--secondary-dark))]/5 group-hover:from-[hsl(var(--primary-brown))]/10 group-hover:to-[hsl(var(--secondary-dark))]/10 transition-all duration-500"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[hsl(var(--primary-brown))] to-[hsl(var(--secondary-dark))] rounded-2xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-3xl font-normal font-poppins text-[hsl(var(--secondary-dark))]">
                  Need something <span className="text-gradient">custom?</span>
                </h3>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Let's discuss your unique vision and create something extraordinary together!
              </p>
              
              <Button
                onClick={() => scrollToSection("#contact")}
                className="btn-modern text-lg px-8 py-3 shadow-xl group"
              >
                Let's Talk Custom Projects
                <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-[hsl(var(--accent-nude))]/20 rounded-full floating-animation blur-sm"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-[hsl(var(--primary-brown))]/20 rounded-full floating-animation blur-sm" style={{ animationDelay: '3s' }}></div>
          </motion.div>
        </div>
      </section>
      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-gradient-to-b from-white via-gray-50/20 to-white relative overflow-hidden section-modern">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal font-poppins text-[hsl(var(--secondary-dark))] mb-6 leading-none">
              <span className="text-gradient">Portfolio</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Recent projects showcasing modern design and powerful functionality
            </p>
          </motion.div>

          <div className="flex justify-center">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.companyName}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="card-modern overflow-hidden max-w-lg group hover:scale-105 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.companyName} website screenshot`}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Floating view button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <a
                      href={item.liveUrl}
                      className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-[hsl(var(--secondary-dark))] px-4 py-2 rounded-full font-semibold hover:bg-white transition-colors duration-200 shadow-lg"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Live
                    </a>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-normal font-poppins text-[hsl(var(--secondary-dark))] mb-4">
                    {item.companyName}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <a
                      href={item.liveUrl}
                      className="inline-flex items-center gap-2 text-[hsl(var(--primary-brown))] hover:text-[hsl(var(--secondary-dark))] font-bold transition-colors duration-300 group/link"
                    >
                      Live Preview
                      <ExternalLink className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </a>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-500">Live</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 via-white to-[hsl(var(--surface))]/30 relative overflow-hidden section-modern">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal font-poppins text-[hsl(var(--secondary-dark))] mb-6 leading-none">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Ready to create your website? Let's discuss how I can help bring your vision to life!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="space-y-8">
                <h3 className="text-3xl font-normal font-poppins text-[hsl(var(--secondary-dark))] mb-8">
                  Let's Start Your Project
                </h3>
                
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex items-start gap-6 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-[hsl(var(--primary-brown))] to-[hsl(var(--secondary-dark))] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <Mail className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-normal font-poppins text-[hsl(var(--secondary-dark))] mb-2">Email</h4>
                    <p className="text-lg font-medium text-gray-800 mb-1">itsrachellenaomi@gmail.com</p>
                    <p className="text-sm text-gray-500">Drop me a line anytime</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="card-modern p-10"
            >
              <div className="mb-8">
                <h3 className="text-3xl font-normal font-poppins text-[hsl(var(--secondary-dark))] mb-4">
                  Send a Message
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Tell me about your project and I'll get back to you within 24 hours.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[hsl(var(--secondary-dark))] mb-2">
                      First Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[hsl(var(--secondary-dark))] mb-2">
                      Last Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--secondary-dark))] mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full"
                    required
                  />
                </div>



                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--secondary-dark))] mb-2">
                    Message *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe the type of website you would like to create in as much detail as possible"
                    className="w-full min-h-[120px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full btn-modern text-lg py-4 px-8 font-bold shadow-xl group hover:shadow-2xl"
                >
                  Send Message
                  <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gradient-to-t from-[hsl(var(--secondary-dark))] via-[hsl(var(--secondary-dark))]/95 to-[hsl(var(--secondary-dark))]/90 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary-brown))]/5 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="text-5xl font-normal font-poppins mb-6">
                <span className="text-gradient">Design</span>Pro
              </div>
              <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                Creating beautiful, functional websites that drive results and elevate your brand.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-center space-x-10 mb-16"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-white text-lg font-medium transition-all duration-300 hover:scale-110 group"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[hsl(var(--primary-brown))] to-[hsl(var(--surface))] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </motion.button>
              ))}
            </motion.div>
            
            <div className="border-t border-gray-600/30 pt-12">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 text-lg font-light"
              >
                © 2025 DesignPro. All rights reserved.
              </motion.p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
