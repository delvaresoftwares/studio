'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="w-full bg-secondary/30">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                Have a project in mind or just want to say hi? We'd love to hear from you.
            </p>
        </div>
        <Card className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2">
                <CardContent className="p-8 flex items-center justify-center">
                    {isSubmitted ? (
                        <div className="text-center animate-fade-in-up">
                            <CheckCircle className="mx-auto h-16 w-16 text-primary mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                            <p className="text-muted-foreground mb-6">Thanks for reaching out. We'll get back to you soon.</p>
                            <Button onClick={() => { setIsSubmitted(false); form.reset(); }}>
                                Send another message
                            </Button>
                        </div>
                    ) : (
                      <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                          <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
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
                                  <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
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
                                  <FormControl><Textarea placeholder="Tell us about your project..." {...field} rows={5} /></FormControl>
                                  <FormMessage />
                              </FormItem>
                              )}
                          />
                          <Button type="submit" className="w-full">
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                          </Button>
                          </form>
                      </Form>
                    )}
                </CardContent>
                <div className="hidden md:block">
                  <Image src="https://placehold.co/600x800.png" alt="Contact illustration" width={600} height={800} className="object-cover w-full h-full rounded-r-lg" data-ai-hint="contact us" />
                </div>
            </div>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
