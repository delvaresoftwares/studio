
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
  projectType: z
    .enum(['website', 'mobile', 'billing'])
    .describe('The type of project.'),
  projectDescription: z
    .string()
    .describe('A detailed description of the custom software project.'),
  location: z
    .string()
    .describe('The location of the customer (e.g., city, state, country).'),
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
    .describe('The estimated cost of the project. This must be a raw number without any currency symbols, commas, or other formatting.'),
  currency: z
    .enum(['USD', 'INR', 'EUR'])
    .describe('The currency for the estimated cost (e.g., USD, INR, EUR).'),
  costJustification: z
    .string()
    .describe(
      'A detailed breakdown of why the project will cost this much, including estimates of time and resources required. Clearly state if it is a one-time fee or a monthly subscription.'
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
  prompt: `You are an expert project cost estimator for "Delvare Software Solutions". Your task is to provide an accurate cost estimate based on the user's inputs. You must strictly adhere to the output format.

**CRITICAL INSTRUCTIONS:**
1.  **Project Type:** The project type is '{{projectType}}'.
    *   If '{{projectType}}' is 'website', use the "Custom Websites" pricing.
    *   If '{{projectType}}' is 'mobile', use the "Mobile Apps" pricing.
    *   If '{{projectType}}' is 'billing', use the "Billing & Inventory Software" pricing.
2.  **Determine Currency:** Based on the user's \`location\`:
    *   If the location is "India" or a city in India, use **INR**.
    *   If the location is in Europe, use **EUR**.
    *   For all other locations, including the "USA", use **USD**.
3.  **Calculate Cost:** Based on the project type, \`complexity\`, and the determined currency, select the correct price from the guidelines below.
4.  **Format Output:**
    *   \`estimatedCost\`: This MUST be a raw number. DO NOT include currency symbols, commas, or any text. For example, for $4,999, the value must be \`4999\`.
    *   \`currency\`: Set this to the correct three-letter code: 'USD', 'INR', or 'EUR'.
    *   \`costJustification\`: Provide a brief explanation based on the project description. Mention the project type, the selected plan (based on complexity), and whether it's a one-time fee or a monthly subscription.

**PRICING GUIDELINES:**
The price is determined by \`complexity\` (simple, medium, complex).

**USA (USD):**
*   **Custom Websites (One-Time Fee):**
    *   simple: 4999
    *   medium: 19999
    *   complex: 29999
*   **Mobile Apps (One-Time Fee):**
    *   simple: 25999
    *   medium: 75999
    *   complex: 99999
*   **Billing & Inventory Software (Monthly Subscription):**
    *   simple: 299
    *   medium: 2999
    *   complex: 9999

**India (INR):**
*   **Custom Websites (One-Time Fee):**
    *   simple: 9999
    *   medium: 49999
    *   complex: 99999
*   **Mobile Apps (One-Time Fee):**
    *   simple: 39999
    *   medium: 149999
    *   complex: 249999
*   **Billing & Inventory Software (Monthly Subscription):**
    *   simple: 4999
    *   medium: 24999
    *   complex: 74999

**Europe (EUR):**
*   **Custom Websites (One-Time Fee):**
    *   simple: 4600
    *   medium: 18000
    *   complex: 28000
*   **Mobile Apps (One-Time Fee):**
    *   simple: 24000
    *   medium: 70000
    *   complex: 95000
*   **Billing & Inventory Software (Monthly Subscription):**
    *   simple: 275
    *   medium: 2750
    *   complex: 9000

**Billing & Inventory Software Feature Tiers:**
*   **Simple Plan:** Admin panel, billing, accounting, returns, sales, purchases, inventory, stock management, and SKU tracking.
*   **Medium Plan:** All Simple features + support for 2 store locations and up to 10 employees.
*   **Complex Plan:** All Medium features + unlimited store locations and unlimited employees.

**USER INPUT:**
*   Project Type: {{projectType}}
*   Project Description: {{{projectDescription}}}
*   Location: {{{location}}}
*   Urgency: {{{urgency}}}
*   Complexity: {{{complexity}}}

Briefly mention in the justification how urgency might influence the final quote, but base your primary estimate strictly on the pricing tables.
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
    if (!output) {
      throw new Error('The AI model failed to generate a valid estimate. The output was null.');
    }
    return output;
  }
);
