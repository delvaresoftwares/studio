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
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { saveContactInfoAction } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

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
    const handleAutofill = (e: any) => {
      const message = e.detail?.message;
      if (message) {
        form.setValue('message', message);
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('delvare:autofill' as any, handleAutofill);
    return () => window.removeEventListener('delvare:autofill' as any, handleAutofill);
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
    <section id="contact" className="w-full relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Have a project in mind or just want to say hi? We'd love to hear from you.
          </p>
        </div>
        <Card className={cn(
          "max-w-xl mx-auto glass-card transition-all duration-300",
          "hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)]"
        )}>
          <CardContent className="p-8">
            {isSubmitted ? (
              <div className="text-center animate-fade-in-up">
                <CheckCircle className="mx-auto h-16 w-16 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">Thanks for reaching out. We'll get back to you soon.</p>
                <Button onClick={resetForm}>
                  Send another message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl><Input className="bg-transparent" placeholder="John Doe" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl><Input className="bg-transparent" type="email" placeholder="you@example.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input className="bg-transparent" type="tel" placeholder="(123) 456-7890" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl><Textarea className="bg-transparent" placeholder="Tell us about your project..." {...field} rows={5} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Send Message
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
