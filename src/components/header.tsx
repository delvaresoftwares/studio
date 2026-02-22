'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { saveContactInfoAction, type ContactFormData } from '@/app/actions';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Features', href: '#features' },
  { name: 'Careers', href: '#careers' },
  { name: 'Estimator', href: '#estimator' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formType, setFormType] = useState<'contact' | 'career'>('contact');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenForm = (e: any) => {
      const type = e.detail?.type || 'contact';
      setFormType(type);
      setFormOpen(true);
      setMenuOpen(false);
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('open-contact-form', handleOpenForm);
    return () => window.removeEventListener('open-contact-form', handleOpenForm);
  }, []);

  const toggleForm = (type: 'contact' | 'career') => {
    if (formOpen && formType === type) {
      setFormOpen(false);
      setIsSubmitted(false);
    } else {
      setFormType(type);
      setFormOpen(true);
      setMenuOpen(false);
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submissionData: ContactFormData = {
        ...formData,
        type: formType
      };

      const result = await saveContactInfoAction(submissionData);

      if (result.success) {
        setIsSubmitted(true);
        // Auto close after 4 seconds
        setTimeout(() => {
          setFormOpen(false);
          setIsSubmitted(false);
        }, 4000);
      } else {
        alert(result.error || "Failed to send enquiry. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-500",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-foreground/10 dark:border-white/10" : "bg-transparent border-b-transparent",
        formOpen && "bg-emerald-600 border-none backdrop-blur-none"
      )}>
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-20 px-4">
            <a href="#hero" className="flex items-center gap-3 group">
              <Logo simple color="white" />
            </a>
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-full",
                    formOpen ? "text-white hover:bg-white/20" : "text-foreground/80 dark:text-muted-foreground hover:text-primary transition-colors"
                  )}
                  onClick={(e) => {
                    if (link.name === 'Careers') {
                      e.preventDefault();
                      toggleForm('career');
                    }
                  }}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="hidden md:flex items-center gap-4">
              <Button
                onClick={() => toggleForm('contact')}
                className={cn(
                  "transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
                  formOpen ? "bg-white text-emerald-600 hover:bg-white/90" : "bg-emerald-500 hover:bg-emerald-600 text-white"
                )}
              >
                {formOpen ? "Close Panel" : "Contact Us"}
              </Button>
              {!formOpen && <ThemeToggle />}
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(true)}
                className={formOpen ? "text-white" : ""}
              >
                <Menu />
              </Button>
            </div>
          </div>

          <div className={cn(
            "overflow-hidden transition-all duration-700 ease-in-out bg-emerald-600 px-4",
            formOpen ? (isSubmitted ? "max-h-[400px] pb-12 opacity-100" : "max-h-[800px] pb-12 opacity-100") : "max-h-0 opacity-0"
          )}>
            <div className="max-w-4xl mx-auto pt-8 border-t border-white/20">
              {!isSubmitted ? (
                <>
                  <h2 className="text-3xl font-black text-white mb-2 font-headline">
                    {formType === 'contact' ? 'Let\'s Scale Together' : 'Join the Future'}
                  </h2>
                  <p className="text-emerald-50 mb-8 font-medium">
                    {formType === 'contact'
                      ? 'Tell us about your project and we\'ll get back to you within 24 hours.'
                      : 'Submit your details to learn from the best engineers in the industry.'}
                  </p>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/70 uppercase tracking-wider ml-1">Full Name</label>
                      <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-emerald-700/50 border border-emerald-400/30 rounded-xl px-4 py-3 text-white placeholder:text-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/70 uppercase tracking-wider ml-1">Email address</label>
                      <input
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email"
                        placeholder="john@company.com"
                        className="w-full bg-emerald-700/50 border border-emerald-400/30 rounded-xl px-4 py-3 text-white placeholder:text-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/70 uppercase tracking-wider ml-1">Phone Number</label>
                      <input
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-emerald-700/50 border border-emerald-400/30 rounded-xl px-4 py-3 text-white placeholder:text-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/70 uppercase tracking-wider ml-1">
                        {formType === 'contact' ? 'Message' : 'Tell us about yourself'}
                      </label>
                      <input
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        type="text"
                        placeholder={formType === 'contact' ? 'How can we help you?' : 'Your background and experience...'}
                        className="w-full bg-emerald-700/50 border border-emerald-400/30 rounded-xl px-4 py-3 text-white placeholder:text-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-inner"
                      />
                    </div>
                    <div className="md:col-span-2 mt-4 flex flex-col gap-3">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-6 text-lg font-bold bg-white text-emerald-600 hover:bg-emerald-50 rounded-xl shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></span>
                            Sending...
                          </span>
                        ) : (
                          `Send ${formType === 'contact' ? 'Enquiry' : 'Application'}`
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full text-white/70 hover:text-white hover:bg-white/10 font-bold"
                        onClick={() => setFormOpen(false)}
                      >
                        Cancel & Close
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                  <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center shadow-2xl animate-bounce">
                    <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white font-headline tracking-tight">Sent Successfully!</h2>
                    <p className="text-emerald-100 text-lg font-medium opacity-80">Our engineering team will contact you shortly.</p>
                  </div>
                  <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => { setFormOpen(false); setIsSubmitted(false); }}>
                    Close Message
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl transition-all duration-500 md:hidden",
        menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <div className="container mx-auto flex flex-col h-full bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent)]">
          <div className="flex justify-between items-center h-20 px-4">
            <Logo />
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)} className="rounded-full bg-foreground/5 dark:bg-white/5">
              <X />
            </Button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-grow gap-10">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                className="text-4xl font-black transition-all hover:text-primary hover:tracking-widest"
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={(e) => {
                  if (link.name === 'Careers') {
                    e.preventDefault();
                    toggleForm('career');
                  } else {
                    setMenuOpen(false);
                  }
                }}
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-4 w-full px-8 mt-10">
              <Button size="lg" className="h-16 text-xl font-bold bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl" onClick={() => toggleForm('contact')}>
                Contact Us
              </Button>
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
