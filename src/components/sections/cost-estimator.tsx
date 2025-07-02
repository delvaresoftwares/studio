'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getProjectCostEstimateAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2 } from 'lucide-react';
import type { ProjectCostEstimatorOutput } from '@/ai/flows/project-cost-estimator';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  projectDescription: z.string().min(50, { message: 'Please provide a detailed description of at least 50 characters.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  urgency: z.enum(['low', 'medium', 'high']),
  complexity: z.enum(['simple', 'medium', 'complex']),
});

type FormValues = z.infer<typeof formSchema>;

const CostEstimatorSection = () => {
  const [estimation, setEstimation] = useState<ProjectCostEstimatorOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectDescription: '',
      location: '',
      urgency: 'medium',
      complexity: 'medium',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);
    setEstimation(null);

    const result = await getProjectCostEstimateAction(data);

    if ('error' in result) {
      setError(result.error);
    } else {
      setEstimation(result);
    }
    setIsLoading(false);
  };

  return (
    <section id="estimator" className="w-full py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">AI Project Cost Estimator</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                Fill out the form to get an AI-powered cost estimation for your custom project.
            </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className={cn("glass-card transition-all duration-300",
              "hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)]"
          )}>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="projectDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description</FormLabel>
                        <FormControl>
                          <Textarea className="bg-transparent" placeholder="Describe your project: features, goals, target audience..." {...field} rows={6} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Location</FormLabel>
                          <FormControl>
                            <Input className="bg-transparent" placeholder="e.g., San Francisco, CA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="urgency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Urgency</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="bg-transparent"><SelectValue placeholder="Select urgency" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="complexity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Complexity</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="bg-transparent"><SelectValue placeholder="Select complexity" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="simple">Simple</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="complex">Complex</SelectItem>
                                </SelectContent>
                            </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Estimate Cost
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="h-full lg:sticky top-24">
            <Card className="min-h-full glass-card">
                <CardHeader>
                    <CardTitle>Estimation Result</CardTitle>
                    <CardDescription>Your project cost estimate will appear here.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                            <p>Our AI is crunching the numbers...</p>
                        </div>
                    )}
                    {error && <p className="text-destructive">{error}</p>}
                    {estimation && (
                        <div className="space-y-6 animate-fade-in-up">
                            <div>
                                <h3 className="text-lg font-medium text-muted-foreground">Estimated Cost</h3>
                                <p className="text-5xl font-bold text-primary">
                                    ${estimation.estimatedCost.toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-muted-foreground">Cost Justification</h3>
                                <p className="text-sm whitespace-pre-wrap">{estimation.costJustification}</p>
                            </div>
                        </div>
                    )}
                    {!isLoading && !estimation && !error && (
                       <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                            <Wand2 className="h-12 w-12 text-primary/50 mb-4" />
                            <p>Your estimate is just a click away.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimatorSection;
