
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, User, Send, CheckCircle2, Loader2, Sparkles, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string | React.ReactNode;
  options?: { label: string; value: string }[];
  type?: 'text' | 'options' | 'input' | 'result';
};

const pricingBase = {
  website: { base: 5000, label: 'Custom Website' },
  app: { base: 25000, label: 'Mobile App' },
  software: { base: 15000, label: 'Custom Software' },
};

const complexityMultipliers = {
  mvp: 1,
  standard: 1.5,
  enterprise: 2.5,
};

const urgencyMultipliers = {
  normal: 1,
  urgent: 1.3,
};

const locationMultipliers = {
  usa: 1,
  europe: 0.9,
  india: 0.4,
  other: 0.8,
};

const CostEstimatorSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I'm Delvare's AI Estimator. I can help you calculate the cost for your next big project. Let's get started!",
    },
    {
      id: '2',
      sender: 'ai',
      text: "First, what type of project are you looking to build?",
      type: 'options',
      options: [
        { label: "Custom Website", value: "website" },
        { label: "Mobile App", value: "app" },
        { label: "Custom Software", value: "software" },
      ],
    },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<any>({});
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollChatToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollChatToBottom();
  }, [messages, isTyping]);

  const handleOptionClick = (value: string, label: string) => {
    // Add user response
    const newMessages = [
      ...messages,
      { id: Date.now().toString(), sender: 'user' as const, text: label },
    ];
    setMessages(newMessages);
    setSelections({ ...selections, [getStepKey(currentStep)]: value });

    // Trigger next AI step
    processNextStep(currentStep + 1, value, newMessages);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessages = [
      ...messages,
      { id: Date.now().toString(), sender: 'user' as const, text: inputValue },
    ];
    setMessages(newMessages);
    const stepKey = getStepKey(currentStep);
    setSelections({ ...selections, [stepKey]: inputValue });
    setInputValue("");

    processNextStep(currentStep + 1, inputValue, newMessages);
  };

  const getStepKey = (step: number) => {
    switch (step) {
      case 0: return 'type';
      case 1: return 'complexity';
      case 2: return 'urgency';
      case 3: return 'location';
      case 4: return 'discount';
      default: return 'unknown';
    }
  };

  const processNextStep = (nextStep: number, lastValue: string, currentMessages: Message[]) => {
    setCurrentStep(nextStep);
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse: Message | null = null;

      switch (nextStep) {
        case 1:
          aiResponse = {
            id: Date.now().toString(),
            sender: 'ai',
            text: "Great choice. How complex do you envision this project?",
            type: 'options',
            options: [
              { label: "MVP (Core Features)", value: "mvp" },
              { label: "Standard (Fully Featured)", value: "standard" },
              { label: "Enterprise (Large Scale)", value: "enterprise" },
            ],
          };
          break;
        case 2:
          aiResponse = {
            id: Date.now().toString(),
            sender: 'ai',
            text: "Understood. What is your timeline preference?",
            type: 'options',
            options: [
              { label: "Standard Timeline", value: "normal" },
              { label: "Urgent Delivery", value: "urgent" },
            ],
          };
          break;
        case 3:
          aiResponse = {
            id: Date.now().toString(),
            sender: 'ai',
            text: "And where is your business primarily located?",
            type: 'options',
            options: [
              { label: "USA / North America", value: "usa" },
              { label: "Europe", value: "europe" },
              { label: "India", value: "india" },
              { label: "Other Region", value: "other" },
            ],
          };
          break;
        case 4:
          aiResponse = {
            id: Date.now().toString(),
            sender: 'ai',
            text: "Almost there! Do you have a discount code? If not, just type 'skip'.",
            type: 'input',
          };
          break;
        case 5:
          // Calculate Result
          const finalSelections = { ...selections, [getStepKey(4)]: lastValue }; // Ensure last value is captured
          const result = calculateCost(finalSelections);
          aiResponse = {
            id: Date.now().toString(),
            sender: 'ai',
            text: result,
            type: 'result',
          };
          break;
      }

      setIsTyping(false);
      if (aiResponse) {
        setMessages([...currentMessages, aiResponse]);
      }
    }, 1500);
  };

  const calculateCost = (finalSelections: any) => {
    const type = finalSelections.type as keyof typeof pricingBase;
    const complexity = finalSelections.complexity as keyof typeof complexityMultipliers;
    const urgency = finalSelections.urgency as keyof typeof urgencyMultipliers;
    const location = finalSelections.location as keyof typeof locationMultipliers;
    const discountCode = finalSelections.discount?.toLowerCase().trim();

    let baseCost = pricingBase[type].base;
    let multiplier = complexityMultipliers[complexity] * urgencyMultipliers[urgency] * locationMultipliers[location];

    let total = baseCost * multiplier;
    let discountApplied = false;

    if (discountCode === 'delvare2026') {
      total = total * 0.9;
      discountApplied = true;
    }

    const currency = location === 'india' ? 'INR' : location === 'europe' ? 'EUR' : 'USD';
    const finalAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(total);

    return (
      <div className="w-full max-w-sm mx-auto bg-card border border-border rounded-xl overflow-hidden mt-4 shadow-2xl animate-in zoom-in-95 duration-500">
        <div className="bg-primary/10 p-4 border-b border-primary/10 flex justify-between items-center">
          <span className="font-bold text-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Estimate Ready
          </span>
          <Badge variant="outline" className="bg-background text-xs">AI Generated</Badge>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Project Base</span>
            <span>{pricingBase[type].label}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Complexity</span>
            <span className="capitalize">{complexity}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Speed</span>
            <span className="capitalize">{urgency}</span>
          </div>
          {discountApplied && (
            <div className="flex justify-between text-sm font-bold text-emerald-500">
              <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Discount</span>
              <span>-10% Applied</span>
            </div>
          )}
          <div className="pt-4 border-t border-border mt-4">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-muted-foreground">Est. Total</span>
              <span className="text-3xl font-black text-foreground">{finalAmount}</span>
            </div>
          </div>
          <Button
            className="w-full font-bold mt-4"
            size="lg"
            onClick={() => {
              const message = `I just used the AI Estimator for a ${pricingBase[type].label}. \n\nDetails:\n- Project: ${pricingBase[type].label}\n- Complexity: ${complexity.charAt(0).toUpperCase() + complexity.slice(1)}\n- Estimate: ${finalAmount}\n\nI would like to discuss this project further.`;
              window.dispatchEvent(new CustomEvent('delvare:autofill', { detail: { message } }));
            }}
          >
            Book Consultation
          </Button>
        </div>
      </div>
    );
  };

  return (
    <section id="estimator" className="w-full py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10 max-w-3xl">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-primary/10 text-primary mb-4">
            <Bot className="w-6 h-6" />
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight">AI Cost Estimator</h2>
          <p className="text-lg text-muted-foreground">
            Chat with our intelligent agent to get an instant quote for your project.
          </p>
        </div>

        <Card className="min-h-[600px] flex flex-col glass-card border-foreground/10 dark:border-white/10 shadow-2xl relative overflow-hidden">
          {/* Chat Area */}
          <div ref={chatContainerRef} className="flex-grow p-6 space-y-4 overflow-y-auto h-[500px] scrollbar-hide scroll-smooth">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex gap-3", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-5 h-5 text-emerald-500" />
                  </div>
                )}
                <div className={cn(
                  "max-w-[80%] p-4 rounded-2xl text-sm md:text-base shadow-sm",
                  msg.sender === 'ai' ? "bg-secondary text-secondary-foreground rounded-tl-none" : "bg-primary text-primary-foreground rounded-tr-none"
                )}>
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start animate-fade-in-up">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="bg-secondary text-secondary-foreground p-4 rounded-2xl rounded-tl-none flex items-center gap-1 h-12">
                  <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-background/50 backdrop-blur-md">
            {messages[messages.length - 1]?.type === 'options' && !isTyping ? (
              <div className="flex flex-wrap gap-2 justify-center">
                {messages[messages.length - 1].options?.map((opt) => (
                  <Button
                    key={opt.value}
                    variant="outline"
                    className="rounded-full border-primary/20 hover:bg-primary/10 hover:border-primary"
                    onClick={() => handleOptionClick(opt.value, opt.label)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            ) : messages[messages.length - 1]?.type === 'input' && !isTyping ? (
              <form onSubmit={handleInputSubmit} className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type here..."
                  className="bg-background border-primary/20 focus-visible:ring-primary"
                />
                <Button type="submit" size="icon" className="shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            ) : null}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CostEstimatorSection;
