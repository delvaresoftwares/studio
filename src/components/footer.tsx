'use client';

import { useState } from 'react';
import { Phone, Mail, Copyright, Package, ExternalLink, ShieldCheck, MapPin, Globe } from 'lucide-react';
import Logo from '@/components/logo';
import { LegalModals, type PolicyType } from '@/components/legal-modals';
import { siteConfig } from '@/lib/site-config';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPolicy = (type: PolicyType) => {
    setActivePolicy(type);
    setIsModalOpen(true);
  };

  return (
    <footer className="bg-white relative border-t border-border pt-24 pb-12 overflow-hidden border-b-4 border-primary">
      {/* Refined Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Logo simple className="!items-start opacity-90" />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-semibold italic">
              "We build simple, fast, and secure technology to help your business grow and succeed every day."
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-all cursor-pointer">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-all cursor-pointer">
                <Globe className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">Ecosystem</h3>
            <ul className="space-y-5 text-muted-foreground font-bold text-sm">
              <li><a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-primary transition-all flex items-center gap-2 group"><div className="w-1 h-1 bg-border group-hover:bg-primary rounded-full transition-all" />Services</a></li>
              <li><a href="#products" onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-primary transition-all flex items-center gap-2 group"><div className="w-1 h-1 bg-border group-hover:bg-primary rounded-full transition-all" />Our Work</a></li>
              <li><a href="#clients" onClick={(e) => { e.preventDefault(); document.getElementById('clients')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-primary transition-all flex items-center gap-2 group"><div className="w-1 h-1 bg-border group-hover:bg-primary rounded-full transition-all" />Clients</a></li>
              <li><a href="#blog" onClick={(e) => { e.preventDefault(); document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-primary transition-all flex items-center gap-2 group"><div className="w-1 h-1 bg-border group-hover:bg-primary rounded-full transition-all" />Speciality</a></li>
              <li><a href="#careers" onClick={(e) => { e.preventDefault(); document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-primary transition-all flex items-center gap-2 group"><div className="w-1 h-1 bg-border group-hover:bg-primary rounded-full transition-all" />Careers</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">Assets</h3>
            <ul className="space-y-6">
              <li>
                <a
                  href="https://ecbills.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group hover:text-primary transition-all"
                >
                  <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Package className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black tracking-tight text-foreground">ECBills.in</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Inventory Management</span>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-3 opacity-40 grayscale pl-2">
                <div className="w-1.5 h-1.5 rounded-full bg-border" />
                <span className="text-xs font-bold uppercase tracking-widest">Expansion in Progress</span>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">Headquarters</h3>
            <ul className="space-y-6 text-muted-foreground font-bold text-sm">
              <li className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 text-primary">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">Executive Inquiry</span>
                  <a href={siteConfig.contact.emailHref} className="hover:text-primary transition-colors text-foreground">{siteConfig.contact.email}</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 text-primary">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">Direct Support</span>
                  <a href={siteConfig.contact.phoneHref} className="hover:text-primary transition-colors text-foreground">{siteConfig.contact.phone}</a>
                  <a href="tel:+918606281125" className="hover:text-primary transition-colors text-foreground">+91 8606281125</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-60">
            <Logo simple className="w-16 grayscale scale-75" />
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              &copy; {currentYear} XAAS by Delvare MNC. All Rights Reserved.
            </p>
          </div>
          <div className="flex gap-10 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
            <button onClick={() => openPolicy('privacy')} className="hover:text-primary transition-all">Privacy</button>
            <button onClick={() => openPolicy('terms')} className="hover:text-primary transition-all">Terms</button>
            <button onClick={() => openPolicy('security')} className="hover:text-primary transition-all">Security</button>
          </div>
        </div>
      </div>

      <LegalModals
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        type={activePolicy}
      />
    </footer>
  );
};

export default Footer;
