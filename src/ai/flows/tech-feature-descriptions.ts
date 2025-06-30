'use server';

/**
 * @fileOverview AI-powered generation of IT tech feature descriptions.
 *
 * - generateTechFeatureDescription - A function to generate descriptions for IT tech features.
 * - TechFeatureDescriptionInput - The input type for the generateTechFeatureDescription function.
 * - TechFeatureDescriptionOutput - The return type for the generateTechFeatureDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TechFeatureDescriptionInputSchema = z.object({
  featureName: z.string().describe('The name of the IT tech feature to describe (e.g., Cyber Security, Digital Marketing).'),
});
export type TechFeatureDescriptionInput = z.infer<typeof TechFeatureDescriptionInputSchema>;

const TechFeatureDescriptionOutputSchema = z.object({
  description: z.string().describe('A clear, concise, and engaging description of the IT tech feature.'),
});
export type TechFeatureDescriptionOutput = z.infer<typeof TechFeatureDescriptionOutputSchema>;

export async function generateTechFeatureDescription(
  input: TechFeatureDescriptionInput
): Promise<TechFeatureDescriptionOutput> {
  return techFeatureDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'techFeatureDescriptionPrompt',
  input: {schema: TechFeatureDescriptionInputSchema},
  output: {schema: TechFeatureDescriptionOutputSchema},
  prompt: `You are an expert in explaining IT tech features in a clear, concise, and engaging way.

  Generate a description for the following tech feature:
  {{featureName}}
  `,
});

const techFeatureDescriptionFlow = ai.defineFlow(
  {
    name: 'techFeatureDescriptionFlow',
    inputSchema: TechFeatureDescriptionInputSchema,
    outputSchema: TechFeatureDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
