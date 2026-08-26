'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, CalendarCheck, ArrowUpRight, ArrowLeft, Package, ArrowRight } from 'lucide-react';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import { LegalModals, type PolicyType } from '@/components/legal-modals';
import { siteConfig } from '@/lib/site-config';
import { specialties } from '@/lib/specialties-data';
import { useTrackClick } from '@/hooks/use-track-click';

const PRODUCT_SLUGS = ['ecbills', 'blendly'];

const Footer = () => {
  const pathname = usePathname();
  const isDark = pathname === '/founder';
  const currentYear = new Date().getFullYear();
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const trackFooterSchedule = useTrackClick('footer-schedule');

  const openPolicy = (type: PolicyType) => {
    setActivePolicy(type);
    setIsModalOpen(true);
  };

  const services = specialties.filter(s => !PRODUCT_SLUGS.includes(s.slug)).slice(0, 6);

  // Shared tone helpers
  const heading = cn('text-[10px] font-black uppercase tracking-[0.35em] mb-5', isDark ? 'text-white' : 'text-foreground');
  const bodyMuted = isDark ? 'text-white/50 hover:text-white' : 'text-muted-foreground hover:text-foreground';
  const iconBox = cn(
    'h-9 w-9 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300',
    isDark ? 'border-white/10 bg-white/5 text-white/70 group-hover:text-primary group-hover:border-primary/40' : 'border-border bg-secondary text-muted-foreground group-hover:text-primary group-hover:border-primary/30'
  );

  return (
    <footer className={cn('relative overflow-hidden border-t border-b-4 border-primary', isDark ? 'bg-black text-white' : 'bg-white')}>
      {/* Ambient glow */}
      <div className={cn('absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[320px] blur-[120px] rounded-full pointer-events-none', isDark ? 'bg-primary/[0.06]' : 'bg-primary/[0.04]')} />

      <div className="container mx-auto px-4 relative z-10 pt-16 md:pt-20 pb-10">
        {/* Top band */}
        <div className="grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] gap-x-8 gap-y-12 pb-14">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <div className={cn('inline-block p-3 rounded-2xl border shadow-sm', isDark ? 'bg-white border-white/10' : 'bg-white border-border')}>
              <img src="/assets/logo.png" alt="Delvare" className="h-9 w-auto object-contain" onError={(e) => { e.currentTarget.src = 'https://res.cloudinary.com/dt4mweku7/image/upload/v1751266408/buissware_h6bmig.png'; }} />
            </div>
            <p className={cn('text-sm leading-relaxed max-w-xs font-medium italic', isDark ? 'text-white/60' : 'text-muted-foreground')}>
              Scalable &amp; secure solutions for your business — built with innovative approaches and emerging technologies.
            </p>
            <div className={cn('inline-flex items-center gap-2 rounded-full border px-4 py-1.5', isDark ? 'border-primary/40 bg-primary/10' : 'border-primary/20 bg-primary/5')}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary">Accepting New Projects</span>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services" className="space-y-1">
            <h3 className={heading}>Services</h3>
            <ul className="space-y-2.5">
              {services.map(service => (
                <li key={service.slug}>
                  <Link href={`/main/${service.slug}`} className={cn('group inline-flex items-center gap-1.5 text-[13px] font-bold transition-colors', bodyMuted)}>
                    {service.title}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#services" className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-primary mt-2 hover:gap-2 transition-all">
                  All services <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label="Products" className="space-y-1">
            <h3 className={heading}>Products</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://ecbills.in" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                  <div className={iconBox}><Package className="w-4 h-4" /></div>
                  <span>
                    <span className={cn('block text-[13px] font-black tracking-tight', isDark ? 'text-white' : 'text-foreground')}>ECBills.in</span>
                    <span className={cn('block text-[10px] uppercase font-bold tracking-widest', isDark ? 'text-white/40' : 'text-muted-foreground')}>Billing &amp; Inventory</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="https://blendly.sbs" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                  <div className={iconBox}><Package className="w-4 h-4" /></div>
                  <span>
                    <span className={cn('block text-[13px] font-black tracking-tight', isDark ? 'text-white' : 'text-foreground')}>Blendly.sbs</span>
                    <span className={cn('block text-[10px] uppercase font-bold tracking-widest', isDark ? 'text-white/40' : 'text-muted-foreground')}>Literature Network</span>
                  </span>
                </a>
              </li>
            </ul>
            <Link href="/#products" className={cn('inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-primary pt-2 hover:gap-2 transition-all')}>
              Explore products <ArrowUpRight className="w-3 h-3" />
            </Link>
          </nav>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className={heading}>Get in Touch</h3>
            <ul className="space-y-4">
              <li>
                <a href={siteConfig.contact.emailHref} className="group flex items-start gap-3">
                  <div className={iconBox}><Mail className="w-4 h-4" /></div>
                  <div>
                    <span className={cn('block text-[9px] uppercase font-bold tracking-widest', isDark ? 'text-white/40' : 'text-muted-foreground/70')}>Email</span>
                    <span className={cn('block text-[13px] font-bold break-all', isDark ? 'text-white/80' : 'text-foreground')}>{siteConfig.contact.email}</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className={iconBox}><MapPin className="w-4 h-4" /></div>
                <div>
                  <span className={cn('block text-[9px] uppercase font-bold tracking-widest', isDark ? 'text-white/40' : 'text-muted-foreground/70')}>Headquarters</span>
                  <span className={cn('block text-[12px] font-medium leading-relaxed max-w-[26ch]', isDark ? 'text-white/60' : 'text-muted-foreground')}>{siteConfig.contact.address}</span>
                </div>
              </li>
              <li>
                <button
                  onClick={() => { trackFooterSchedule(); window.dispatchEvent(new CustomEvent('open-contact-form', { detail: { type: 'contact' } })); }}
                  className="group inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Schedule a Meeting
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={cn('pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-5', isDark ? 'border-white/10' : 'border-border')}>
          <div className="flex items-center gap-3">
            <Logo simple light={isDark} variant="header" className="w-14 grayscale opacity-70 scale-90" />
            <p className={cn('text-[10px] font-black uppercase tracking-widest', isDark ? 'text-white/50' : 'text-muted-foreground')}>
              &copy; {currentYear} XAAS by Delvare.in. All rights reserved.
            </p>
          </div>
          <div className={cn('flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-[10px] font-black uppercase tracking-[0.25em]', isDark ? 'text-white/50' : 'text-muted-foreground')}>
            {pathname !== '/' && (
              <Link href="/" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <ArrowLeft className="w-3 h-3" /> Back to Main Page
              </Link>
            )}
            <button onClick={() => openPolicy('privacy')} className="hover:text-primary transition-colors">Privacy</button>
            <button onClick={() => openPolicy('terms')} className="hover:text-primary transition-colors">Terms</button>
            <button onClick={() => openPolicy('security')} className="hover:text-primary transition-colors">Security</button>
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
