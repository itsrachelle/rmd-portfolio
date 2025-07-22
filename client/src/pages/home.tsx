import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Settings
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
      name: "Website management",
      price: "$100",
      period: "per month",
      icon: Settings,
      description: "Service only available after website set up\nKeep your site fresh, up-to-date, and running smoothly - without lifting a finger.",
      features: [
        "Up to 3 content updates per month (text, photos, menus, seasonal offers, etc.)",
        "Add new sections (e.g. an about page, blog posts, or promotions)",
        "Basic performance and upkeep monitoring"
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
    <div className="min-h-screen bg-amber-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-[hsl(var(--secondary-dark))]">
              <span className="text-[hsl(var(--primary-brown))]">Design</span>Pro
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-gray-600 hover:text-[hsl(var(--primary-brown))] transition-colors duration-200 ${
                    activeSection === item.href.replace("#", "") ? "text-[hsl(var(--primary-brown))]" : ""
                  }`}
                >
                  {item.label}
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Hero Section */}
      <section className="hero-gradient h-[70vh] flex items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Modern Website Design
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Get a beautiful, mobile-friendly website in less than 3 days
            </p>
            <Button
              onClick={() => scrollToSection("#portfolio")}
              size="lg"
              className="bg-white text-[hsl(var(--primary-brown))] hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              See My Work <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-white" />
        </motion.div>
      </section>
      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--secondary-dark))] mb-6">
                About Me
              </h2>
              <p className="text-xl text-gray-600">
                Crafting digital experiences that make an impact
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
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-stone-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--secondary-dark))] mb-6">
              Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Modern Websites That Do the Work for You</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                  plan.popular ? "border-2 border-[hsl(var(--primary-brown))]" : ""
                }`}
              >
                
                
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 bg-[hsl(var(--accent-nude))] rounded-full flex items-center justify-center">
                      <plan.icon className="h-7 w-7 text-[hsl(var(--primary-brown))]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[hsl(var(--secondary-dark))] mb-3">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-[hsl(var(--primary-brown))] mb-4">
                    {plan.price}
                    {plan.period && <span className="text-base font-normal text-gray-600"> {plan.period}</span>}
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
                  
                  <div className="text-left mb-4">
                    <h4 className="font-semibold text-[hsl(var(--secondary-dark))] mb-2 text-sm">
                      {plan.name === "Basic 3–5 Page Website" ? "What's included:" : "Includes:"}
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="h-4 w-4 text-[hsl(var(--primary-brown))] mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Custom Work Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16 bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-[hsl(var(--secondary-dark))] mb-4">
              Need something custom?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get in touch - I'd love to hear what you need and help make it happen!
            </p>
          </motion.div>
        </div>
      </section>
      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--secondary-dark))] mb-6">
              Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Recent projects showcasing modern design and functionality
            </p>
          </motion.div>

          <div className="flex justify-center">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.companyName}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden max-w-md"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.companyName} website screenshot`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[hsl(var(--secondary-dark))] mb-3">
                    {item.companyName}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <a
                    href={item.liveUrl}
                    className="inline-flex items-center text-[hsl(var(--primary-brown))] hover:text-[hsl(var(--primary-brown))]/80 font-medium transition-colors duration-200"
                  >
                    Live Preview
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--secondary-dark))] mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Ready to create your website? Let's discuss how I can help bring your vision to life.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-[hsl(var(--primary-brown))]/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-[hsl(var(--primary-brown))]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[hsl(var(--secondary-dark))] mb-2">Email</h3>
                  <p className="text-gray-600">itsrachellenaomi@gmail.com</p>
                </div>
              </div>


            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-stone-50 rounded-2xl p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Tell me about your project..."
                    className="w-full min-h-[120px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[hsl(var(--primary-brown))] text-white hover:bg-[hsl(var(--primary-brown))]/90 py-3 font-semibold"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[hsl(var(--secondary-dark))] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-4">
              <span className="text-[hsl(var(--primary-brown))]">Design</span>Pro
            </div>
            <p className="text-gray-400 mb-6">
              Creating beautiful, functional websites that drive results.
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-400 text-sm">
                © 2024 DesignPro. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
