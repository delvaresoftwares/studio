'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle, Loader2, Mail, MessageSquare } from 'lucide-react';
import { saveContactInfoAction } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]\d{3}[)])?[\s-]?\d{3}[\s-]?\d{4}$/
);

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().regex(phoneRegex, { message: 'Please enter a valid phone number.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  });

  useEffect(() => {
    const handleAutofill = (e: Event) => {
      const message = (e as CustomEvent<{ message?: string }>).detail?.message;
      if (message) {
        form.setValue('message', message);
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('delvare:autofill', handleAutofill as EventListener);
    return () => window.removeEventListener('delvare:autofill', handleAutofill as EventListener);
  }, [form]);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const result = await saveContactInfoAction(data);
      if (result.success) {
        setIsSubmitted(true);
      } else {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: result.error || "An unknown error occurred.",
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "Could not send message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    form.reset();
  }

  return (
    <section id="contact" className="w-full relative py-32 sm:py-48 bg-primary text-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/[0.05] blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">

          {/* Narrative Content */}
          <div className="flex-1 space-y-12">
            <div className="animate-fade-in-up">
              <Badge variant="outline" className="mb-8 border-white/20 py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-white/60">
                Inquiry
              </Badge>
              <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter mb-8 text-white leading-none">
                Let's Begin the <br />
                <span className="text-white/40 font-light italic tracking-tight">Deployment.</span>
              </h2>
              <p className="max-w-xl text-lg md:text-xl text-white/60 leading-relaxed font-medium">
                Whether you require <strong className="text-white">AI Strategy</strong>, <strong className="text-white">Enterprise Software</strong>, or high-tier <strong className="text-white">SLA Maintenance</strong>, our engineering core is ready to assist.
              </p>
            </div>

            <div className="space-y-8 animate-fade-in-up [animation-delay:200ms]">
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-all duration-500">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Executive Email</span>
                  <span className="text-xl font-black tracking-tight text-white hover:text-white/80 transition-colors cursor-default">admin@delvare.in</span>
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-all duration-500">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Response Time</span>
                  <span className="text-xl font-black tracking-tight text-white">&lt; 24 Hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="flex-1 w-full max-w-xl animate-fade-in-up [animation-delay:400ms]">
            <Card className="border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] rounded-[2.5rem] overflow-hidden bg-white">
              <CardContent className="p-10 md:p-14">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-8 shadow-sm">
                      <CheckCircle className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-3xl font-black mb-4 tracking-tight text-brand-dark">Transmission Received.</h3>
                    <p className="text-muted-foreground mb-10 text-lg font-medium italic">"Our engineering lead will prioritize your inquiry shortly."</p>
                    <Button onClick={resetForm} size="lg" variant="outline" className="h-14 px-10 rounded-xl font-bold border-border hover:bg-secondary">
                      Send New Message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Identity</FormLabel>
                              <FormControl>
                                <Input className="h-14 bg-secondary/30 border-border focus:ring-primary/20 rounded-xl font-semibold" placeholder="Enter Full Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email</FormLabel>
                                <FormControl>
                                  <Input className="h-14 bg-secondary/30 border-border focus:ring-primary/20 rounded-xl font-semibold" type="email" placeholder="you@company.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Contact</FormLabel>
                                <FormControl>
                                  <Input className="h-14 bg-secondary/30 border-border focus:ring-primary/20 rounded-xl font-semibold" type="tel" placeholder="+1 (000) 000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Brief Description</FormLabel>
                              <FormControl>
                                <Textarea className="bg-secondary/30 border-border focus:ring-primary/20 rounded-xl min-h-[140px] font-bold p-5" placeholder="Outline your requirements or inquiry details..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit" className="w-full h-16 text-lg font-black bg-primary text-white rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-3 h-6 w-6 animate-spin" /> : <Send className="mr-3 h-6 w-6" />}
                        Execute Inquiry
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
