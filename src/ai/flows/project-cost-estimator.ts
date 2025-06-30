// src/ai/flows/project-cost-estimator.ts
'use server';

/**
 * @fileOverview An AI-powered project cost estimator.
 *
 * - estimateProjectCost - A function that estimates the project cost.
 * - ProjectCostEstimatorInput - The input type for the estimateProjectCost function.
 * - ProjectCostEstimatorOutput - The return type for the estimateProjectCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectCostEstimatorInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A detailed description of the custom software project.'),
  location: z
    .string()
    .describe('The location of the customer (e.g., city, state).'),
  urgency: z
    .string()
    .describe(
      'The desired urgency of the project (e.g., high, medium, low).'
    ),
  complexity: z
    .string()
    .describe('The complexity of the project (e.g., simple, medium, complex).'),
});
export type ProjectCostEstimatorInput = z.infer<typeof ProjectCostEstimatorInputSchema>;

const ProjectCostEstimatorOutputSchema = z.object({
  estimatedCost: z
    .number()
    .describe('The estimated cost of the project in USD.'),
  costJustification: z
    .string()
    .describe(
      'A detailed breakdown of why the project will cost this much, including estimates of time and resources required.'
    ),
});
export type ProjectCostEstimatorOutput = z.infer<typeof ProjectCostEstimatorOutputSchema>;

export async function estimateProjectCost(
  input: ProjectCostEstimatorInput
): Promise<ProjectCostEstimatorOutput> {
  return estimateProjectCostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'projectCostEstimatorPrompt',
  input: {schema: ProjectCostEstimatorInputSchema},
  output: {schema: ProjectCostEstimatorOutputSchema},
  prompt: `You are an expert project cost estimator for custom software development projects.

You will receive a detailed project description, the customer's location, the project's urgency, and its complexity.
Based on this information, you will provide an estimated cost in USD and a detailed justification for that cost.

Project Description: {{{projectDescription}}}
Location: {{{location}}}
Urgency: {{{urgency}}}
Complexity: {{{complexity}}}

Respond with the estimated cost and justification.
`,
});

const estimateProjectCostFlow = ai.defineFlow(
  {
    name: 'estimateProjectCostFlow',
    inputSchema: ProjectCostEstimatorInputSchema,
    outputSchema: ProjectCostEstimatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
