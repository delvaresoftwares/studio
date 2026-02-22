'use client';

import { useState } from 'react';
import { Phone, Mail, Copyright } from 'lucide-react';
import Logo from '@/components/logo';
import { LegalModals, type PolicyType } from '@/components/legal-modals';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPolicy = (type: PolicyType) => {
    setActivePolicy(type);
    setIsModalOpen(true);
  };

  return (
    <footer className="bg-background relative border-t border-foreground/5 dark:border-white/5 pt-16 pb-8 overflow-hidden">
      {/* Footer Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Logo simple color="white" className="!items-start" />
            <p className="text-muted-foreground text-sm max-w-xs transition-colors duration-500 hover:text-white">
              Advancing the world through Anything-as-a-Service. We build, maintain, and secure the digital core of modern enterprises.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-headline text-xl font-bold">Quick Links</h3>
            <ul className="space-y-4 text-muted-foreground font-medium">
              <li><a href="#services" className="hover:text-emerald-500 transition-colors">Services</a></li>
              <li><a href="#careers" className="hover:text-emerald-500 transition-colors">Careers & Academy</a></li>
              <li><a href="#estimator" className="hover:text-emerald-500 transition-colors">Cost Estimator</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-headline text-xl font-bold">Contact</h3>
            <ul className="space-y-4 text-muted-foreground font-medium">
              <li className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-emerald-500" />
                </div>
                <a href="mailto:delvaresoftwares@gmail.com" className="hover:text-emerald-500 transition-colors">admin@delvare.in</a>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-emerald-500" />
                </div>
                <a href="tel:8606281125" className="hover:text-emerald-500 transition-colors">+91 8606821125</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            <Copyright className="w-4 h-4 shrink-0" /> {currentYear} XAAS by Delvare MNC. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-sm font-bold text-muted-foreground uppercase tracking-widest">
            <button onClick={() => openPolicy('privacy')} className="hover:text-emerald-500 transition-colors">Privacy</button>
            <button onClick={() => openPolicy('terms')} className="hover:text-emerald-500 transition-colors">Terms</button>
            <button onClick={() => openPolicy('security')} className="hover:text-emerald-500 transition-colors">Security</button>
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
