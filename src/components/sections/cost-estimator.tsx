'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, User, Send, Download, Share2, Cloud, Brain, Code, Hammer, RefreshCcw, Layout, FileText, CheckCircle, Loader2, Calculator, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { generatePDF } from '@/lib/pdf-generator';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string | React.ReactNode;
  options?: { label: string; value: string; icon?: any }[];
  type?: 'text' | 'options' | 'input' | 'result';
};

const pricingBase = {
  ai: { base: 25000, label: 'AI/ML Ecosystem', icon: Brain, desc: 'Neural network training and proprietary model tuning.' },
  cloud: { base: 12000, label: 'Cloud Architecture', icon: Cloud, desc: 'Enterprise infrastructure and high-availability automation.' },
  software: { base: 15000, label: 'Product Development', icon: Code, desc: 'High-performance Next.js and cross-device platforms.' },
  maintenance: { base: 5000, label: 'SLA Maintenance', icon: Hammer, desc: '24/7 technical oversight and performance optimization.' },
  migration: { base: 8000, label: 'Legacy Modernization', icon: RefreshCcw, desc: 'Architectural transformation of mature software assets.' },
};

const complexityMultipliers = { basic: 1, advanced: 1.6, complex: 2.8 };
const urgencyMultipliers = { standard: 1, express: 1.4 };
const regionMultipliers = { global: 1.2, regional: 1, local: 0.8 };

const CostEstimatorSection = ({ onQuoteGenerated }: { onQuoteGenerated?: (data: any) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "ACCESS GRANTED. Welcome to the Delvare AI Core. I am your technical helper. Let's calculate the precision investment for your next venture.",
    },
    {
      id: '2',
      sender: 'ai',
      text: "Select your primary technical domain:",
      type: 'options',
      options: [
        { label: "AI & Neural Systems", value: "ai", icon: Brain },
        { label: "Cloud Ecosystem", value: "cloud", icon: Cloud },
        { label: "Software Product", value: "software", icon: Code },
        { label: "Technical Maintenance", value: "maintenance", icon: Hammer },
        { label: "Legacy Migration", value: "migration", icon: RefreshCcw },
      ],
    },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<any>({});
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('open-estimator', handleOpen);
    return () => window.removeEventListener('open-estimator', handleOpen);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleOptionClick = (value: string, label: string) => {
    const newMessages = [...messages, { id: Date.now().toString(), sender: 'user' as const, text: label }];
    setMessages(newMessages);
    const updatedSelections = { ...selections, [getStepKey(currentStep)]: value };
    setSelections(updatedSelections);
    processNextStep(currentStep + 1, value, newMessages, updatedSelections);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newMessages = [...messages, { id: Date.now().toString(), sender: 'user' as const, text: inputValue }];
    setMessages(newMessages);
    const updatedSelections = { ...selections, [getStepKey(currentStep)]: inputValue };
    setSelections(updatedSelections);
    setInputValue("");
    processNextStep(currentStep + 1, inputValue, newMessages, updatedSelections);
  };

  const getStepKey = (step: number) => {
    const keys = ['domain', 'complexity', 'speed', 'scale', 'clientName', 'clientEmail', 'clientPhone'];
    return keys[step] || 'unknown';
  };

  const processNextStep = (nextStep: number, lastValue: string, currentMessages: Message[], latestSelections: any) => {
    setCurrentStep(nextStep);
    setIsTyping(true);
    setTimeout(() => {
      let aiResponse: Message | null = null;
      switch (nextStep) {
        case 1:
          aiResponse = {
            id: Date.now().toString(), sender: 'ai', text: "Analyzing domain requirements... How complex is the architecture?", type: 'options', options: [
              { label: "MVP / Basic", value: "basic" },
              { label: "Standard Business", value: "advanced" },
              { label: "Enterprise / Custom", value: "complex" },
            ]
          };
          break;
        case 2:
          aiResponse = {
            id: Date.now().toString(), sender: 'ai', text: "Requirement received. Deployment velocity required?", type: 'options', options: [
              { label: "Standard Pace", value: "standard" },
              { label: "Express Deployment", value: "express" },
            ]
          };
          break;
        case 3:
          aiResponse = {
            id: Date.now().toString(), sender: 'ai', text: "Calculated speed vectors. Anticipated user scale?", type: 'options', options: [
              { label: "Local / Small", value: "local" },
              { label: "Regional / Growth", value: "regional" },
              { label: "Global / High Load", value: "global" },
            ]
          };
          break;
        case 4:
          aiResponse = { id: Date.now().toString(), sender: 'ai', text: "Data points verified. Who is the Lead Architect (Your Name)?", type: 'input' };
          break;
        case 5:
          aiResponse = { id: Date.now().toString(), sender: 'ai', text: `Registered, ${lastValue}. Communication channel (Email)?`, type: 'input' };
          break;
        case 6:
          aiResponse = { id: Date.now().toString(), sender: 'ai', text: "Final step: Preferred direct contact (Phone Number)?", type: 'input' };
          break;
        case 7:
          aiResponse = { id: Date.now().toString(), sender: 'ai', text: calculateCost(latestSelections), type: 'result' };
          break;
      }
      setIsTyping(false);
      if (aiResponse) setMessages([...currentMessages, aiResponse]);
    }, 1200);
  };

  const calculateCost = (finalSelections: any) => {
    const domain = finalSelections.domain as keyof typeof pricingBase;
    const complexity = finalSelections.complexity as keyof typeof complexityMultipliers;
    const speed = finalSelections.speed as keyof typeof urgencyMultipliers;
    const scale = finalSelections.scale as keyof typeof regionMultipliers;
    const total = pricingBase[domain].base * complexityMultipliers[complexity] * urgencyMultipliers[speed] * regionMultipliers[scale];
    const finalAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(total);
    const Icon = pricingBase[domain].icon;

    return (
      <Card className="w-full max-w-lg mx-auto overflow-hidden mt-10 border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl rounded-[3rem] animate-fade-in-up">
        <div className="p-10 space-y-8">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary bg-primary/10 py-1 px-4 text-[9px] font-black uppercase tracking-widest">
                AI Blueprint Ready
              </Badge>
              <h3 className="text-3xl font-black tracking-tighter text-white">Project Costing</h3>
              <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Architect: {finalSelections.clientName}</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/10">
              <Icon className="w-8 h-8" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-[9px] text-white/40 font-black uppercase tracking-widest mb-1 block">Domain</span>
              <p className="font-bold text-sm leading-tight text-white">{pricingBase[domain].label}</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-[9px] text-white/40 font-black uppercase tracking-widest mb-1 block">Complexity</span>
              <p className="font-bold text-sm text-white uppercase">{complexity}</p>
            </div>
          </div>

          <div className="py-8 border-y border-white/10">
            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-2">Investment Projection</p>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black text-primary tracking-tighter">{finalAmount}</span>
              <span className="text-xs font-black text-white/20 italic tracking-widest">+ Tax</span>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full h-16 text-lg font-black bg-primary text-white rounded-2xl shadow-xl hover:shadow-[0_0_30px_-5px_hsl(var(--primary))] transition-all"
              onClick={() => {
                const msg = `AI CORE INQUIRY: ${finalSelections.clientName} project.\nEstimate: ${finalAmount}\nDomain: ${pricingBase[domain].label}`;
                window.open(`https://wa.me/919426372026?text=${encodeURIComponent(msg)}`, '_blank');
              }}
            >
              Confirm Blueprint
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 h-14 rounded-xl border-white/10 bg-white/5 text-white font-bold text-sm hover:bg-white/10" onClick={() => generatePDF('catalog-pdf-template', 'Delvare_Full_Catalog')}>
                Full Catalog
              </Button>
              <Button variant="outline" className="flex-1 h-14 rounded-xl border-white/10 bg-white/5 text-white font-bold text-sm hover:bg-white/10" onClick={() => generatePDF('catalog-pdf-template', 'Portfolio_Asset')}>
                Asset Deck
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <>
      {/* Fullscreen Modal Content */}
      <div className={cn(
        "fixed inset-0 z-[10000] bg-black transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-y-auto",
        isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      )}>
        <section id="estimator" className="min-h-screen py-20 relative overflow-hidden bg-primary">
          {/* Immersive Green Atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-emerald-950/20 to-primary" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-white/[0.08] blur-[180px] rounded-full pointer-events-none motion-safe:animate-pulse-glow" />

          {/* Hex Grid Background */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="mb-24">
              <Badge variant="outline" className="mb-8 border-primary text-primary py-2 px-6 text-[10px] font-black tracking-[0.4em] uppercase bg-primary/5">
                AI CORE PROCESSING
              </Badge>
              <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter mb-10 text-white leading-none">
                Precision <br />
                <span className="text-primary italic font-light tracking-tight">Estimator.</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 leading-relaxed font-medium italic">
                "Enter the AI Interface to communicate your technical requirements directly to our core logic system."
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="flex flex-col border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] rounded-[3rem] overflow-hidden bg-white/5 backdrop-blur-xl min-h-[750px] transition-all">
                <div className="flex items-center justify-between px-10 py-6 border-b border-white/10 bg-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                  </div>
                  <div className="text-[10px] font-black text-primary/40 uppercase tracking-[0.5em]">
                    DELVARE / AI-INTERFACE / V5.0
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/5 text-white hover:bg-white/10 hover:text-primary transition-all"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <div ref={chatContainerRef} className="flex-grow p-10 space-y-10 overflow-y-auto h-[500px] scrollbar-hide">
                  {messages.map((msg) => (
                    <div key={msg.id} className={cn("flex gap-6 animate-fade-in-up", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                      {msg.sender === 'ai' && (
                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-[0_0_20px_-5px_hsl(var(--primary))] mt-1">
                          <Layout className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div className={cn(
                        "max-w-[80%] p-8 rounded-[2.5rem] text-[17px] font-semibold leading-relaxed transition-all",
                        msg.sender === 'ai'
                          ? "bg-white/5 text-white/90 rounded-tl-none border border-white/10 shadow-sm italic"
                          : "bg-primary text-white rounded-tr-none shadow-xl"
                      )}>
                        {msg.text}
                      </div>
                      {msg.sender === 'user' && (
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 mt-1">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-6 justify-start animate-pulse">
                      <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      </div>
                      <div className="bg-white/5 px-10 rounded-[2rem] rounded-tl-none flex items-center gap-3 h-20 border border-white/10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">Processing Matrix...</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-10 border-t border-white/10 bg-white/5">
                  {messages[messages.length - 1]?.type === 'options' && !isTyping ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {messages[messages.length - 1].options?.map((opt) => (
                        <Button
                          key={opt.value}
                          variant="outline"
                          className="rounded-2xl border-white/10 bg-white/5 text-white/80 hover:bg-primary hover:text-white hover:border-primary h-16 text-sm font-black uppercase tracking-widest transition-all hover:-translate-y-1 shadow-sm"
                          onClick={() => handleOptionClick(opt.value, opt.label)}
                        >
                          {opt.icon && <opt.icon className="w-5 h-5 mr-4" />}
                          {opt.label}
                        </Button>
                      ))}
                    </div>
                  ) : messages[messages.length - 1]?.type === 'input' && !isTyping ? (
                    <form onSubmit={handleInputSubmit} className="flex gap-4">
                      <input
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Provide architecture details..."
                        className="bg-white/5 border border-white/10 text-white focus:ring-primary/20 h-16 flex-1 px-8 text-lg rounded-2xl font-bold shadow-inner"
                      />
                      <Button type="submit" size="icon" className="shrink-0 h-16 w-16 rounded-2xl bg-primary text-white shadow-xl hover:shadow-[0_0_20px_-5px_hsl(var(--primary))] transition-all">
                        <Send className="w-6 h-6" />
                      </Button>
                    </form>
                  ) : null}
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CostEstimatorSection;
