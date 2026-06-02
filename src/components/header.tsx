'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { saveContactInfoAction, type ContactFormData } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Our Work', href: '#products' },
  { name: 'Clients', href: '#clients' },
  { name: 'Speciality', href: '#blog' },
  { name: 'Careers', href: '#careers' },
];

const Header = () => {
  const { toast } = useToast();
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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenForm = (e: Event) => {
      const type = (e as CustomEvent<{ type?: 'contact' | 'career' }>).detail?.type ?? 'contact';
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

  useEffect(() => {
    const handleAutofill = (e: Event) => {
      const message = (e as CustomEvent<{ message?: string }>).detail?.message;
      if (message) {
        setFormType('contact');
        setFormOpen(true);
        setMenuOpen(false);
        setIsSubmitted(false);
        setFormData(prev => ({ ...prev, message }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('delvare:autofill', handleAutofill);
    return () => window.removeEventListener('delvare:autofill', handleAutofill);
  }, []);

  const toggleForm = (type: 'contact' | 'career') => {
    if (formOpen && formType === type) {
      setFormOpen(false);
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
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
        setTimeout(() => {
          setFormOpen(false);
          setIsSubmitted(false);
        }, 3000);
      } else {
        toast({ variant: 'destructive', title: 'Submission Failed', description: result.error ?? 'Connection lost. Please try again.' });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({ variant: 'destructive', title: 'Error', description: 'System timeout. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className={cn(
        "fixed z-[60] transition-all duration-500 ease-in-out",
        formOpen
          ? "top-0 left-0 w-full rounded-none bg-white py-6 h-screen overflow-y-auto"
          : scrolled
            ? "top-0 left-0 w-full rounded-none bg-white py-3"
            : "top-4 left-1/2 -translate-x-1/2 w-[95%] lg:max-w-7xl rounded-2xl bg-primary py-4",
        "[box-shadow:none!important]"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between transition-all duration-500">
            <a href="#hero" className="flex items-center gap-3 group" onClick={() => { if (formOpen) setFormOpen(false); }}>
              <Logo 
                compact={scrolled}
                glow={!scrolled && !formOpen}
                light={!scrolled && !formOpen} 
                simple 
                variant="header" 
                className={cn("transition-all duration-500", formOpen && "scale-110")} 
              />
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 px-5 py-2 rounded-full",
                    formOpen
                      ? "text-primary hover:bg-secondary/50"
                      : scrolled
                        ? "text-primary hover:bg-secondary/50"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                  onClick={(e) => {
                    if (link.name === 'Careers') {
                      e.preventDefault();
                      toggleForm('career');
                    } else if (link.href.startsWith('#')) {
                      e.preventDefault();
                      const element = document.getElementById(link.href.substring(1));
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.location.href = '/' + link.href;
                      }
                    }
                  }}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => toggleForm('contact')}
                variant={formOpen ? "ghost" : "default"}
                className={cn(
                  "h-10 px-6 rounded-lg font-black text-[10px] uppercase tracking-[0.1em] transition-all duration-500",
                  "bg-primary text-white hover:bg-primary/90"
                )}
              >
                {formOpen ? "Close" : "Start Now"}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(true)}
                className={cn(
                  "lg:hidden transition-colors", 
                  formOpen ? "text-foreground" : scrolled ? "text-primary" : "text-white"
                )}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>



          {/* Expanded Drawer Form */}
          <div className={cn(
            "overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]",
            formOpen ? "max-h-[2000px] opacity-100 mt-16" : "max-h-0 opacity-0"
          )}>
            <div className="max-w-4xl mx-auto py-12 px-4 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] rounded-[3rem] border border-border/40 bg-white">
              {!isSubmitted ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-5 space-y-8">
                    <div className="space-y-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Priority Contact</span>
                      <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-none">
                        {formType === 'contact' ? "Direct Access to Experts." : "Join Our Team."}
                      </h2>
                      <p className="text-muted-foreground font-semibold italic text-lg leading-relaxed pt-4">
                        {formType === 'contact'
                          ? "Talk directly to our tech leads about your custom software or security needs."
                          : "We're looking for elite talent to help us build the next generation of business tools."}
                      </p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-secondary/50 border border-border">
                      <div className="flex items-center gap-4 text-foreground font-black text-sm uppercase tracking-widest">
                        <ArrowRight className="w-4 h-4 text-primary" />
                        Response in &lt; 24h
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-2">Identity</label>
                          <input
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Full Name"
                            className="w-full h-16 bg-secondary/40 border-none rounded-2xl px-6 text-foreground font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-2">Email</label>
                          <input
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            type="email"
                            placeholder="work@domain.com"
                            className="w-full h-16 bg-secondary/40 border-none rounded-2xl px-6 text-foreground font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-2">Contact</label>
                        <input
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          type="tel"
                          placeholder="+1 (000) 000-0000"
                          className="w-full h-16 bg-secondary/40 border-none rounded-2xl px-6 text-foreground font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-2">Requirements</label>
                        <textarea
                          required
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder={formType === 'contact' ? "Outline your project scope..." : "Describe your engineering background..."}
                          className="w-full bg-secondary/40 border-none rounded-2xl px-6 py-5 text-foreground font-bold focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-16 text-lg font-black bg-primary text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
                      >
                        {isLoading ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          formType === 'contact' ? "Transmit Inquiry" : "Submit Credentials"
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-8">
                  <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center shadow-inner">
                    <CheckCircle className="w-12 h-12 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-4xl font-black text-foreground tracking-tighter leading-none">Submission Complete.</h2>
                    <p className="text-muted-foreground text-lg font-medium italic">"Our team will reach out to facilitate the next phase."</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Classy Mobile Navigation Drawer */}
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-opacity duration-500 lg:hidden",
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMenuOpen(false)}
      />

      <div className={cn(
        "fixed top-0 right-0 bottom-0 z-[100] w-[90vw] max-w-xs bg-white backdrop-blur-2xl border-l border-border shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden overflow-y-auto",
        menuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full uppercase px-8 py-10">
          <div className="flex justify-center items-center mb-16 relative">
            <Logo simple variant="logo" className="scale-125" />
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)} className="rounded-full bg-black/5 text-foreground hover:bg-black/10 absolute right-0">
              <X className="w-5 h-5" />
            </Button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-8 mb-16">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-black tracking-tighter text-foreground hover:text-primary transition-all duration-300 relative group"
                onClick={(e) => {
                  if (link.name === 'Careers') {
                    e.preventDefault();
                    toggleForm('career');
                    setMenuOpen(false);
                  } else if (link.href.startsWith('#')) {
                    e.preventDefault();
                    setMenuOpen(false);
                    setTimeout(() => {
                      const element = document.getElementById(link.href.substring(1));
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.location.href = '/' + link.href;
                      }
                    }, 500);
                  } else {
                    setMenuOpen(false);
                  }
                }}
              >
                {link.name}
                <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-primary transition-all duration-500 group-hover:w-16 group-hover:-translate-x-1/2"></span>
              </a>
            ))}
          </nav>
          <div className="mt-auto pb-8">
            <Button size="xl" className="w-full h-16 text-[11px] font-black bg-primary text-white rounded-2xl uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all" onClick={() => { toggleForm('contact'); setMenuOpen(false); }}>
              Start Project
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
