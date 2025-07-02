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
    .describe('The estimated cost of the project in the appropriate local currency (e.g., USD, INR, EUR). For subscription models, this should be the monthly cost.'),
  costJustification: z
    .string()
    .describe(
      'A detailed breakdown of why the project will cost this much, including estimates of time and resources required. Clearly state if it is a one-time fee or a monthly subscription, and mention the currency (e.g., USD, INR, EUR).'
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
  prompt: `You are an expert project cost estimator and senior sales engineer for "Delvare Software Solutions". Your estimates must be professional, well-justified, and based on the pricing guidelines provided below.

**YOUR PRIMARY TASK:**
1.  **Determine Currency:** Analyze the user's \`location\` input.
    *   If the location is in or is "India", use **INR**.
    *   If the location is in or is "Europe", use **EUR**.
    *   For "USA" or any other location, use **USD**.
2.  **Estimate Cost:** Based on the user's request and the pricing for the determined currency, provide an \`estimatedCost\`. The output number should NOT contain any currency symbols or commas.
3.  **Justify Cost:** In the \`costJustification\`, clearly state the recommended service, plan, and currency (e.g., "Mid-Tier Plan for Mobile App in INR"). Explain your choice and whether it's a one-time fee or monthly subscription.

**PRICING GUIDELINES (per location):**

**USA (USD):**
*   **Custom Websites (One-Time Cost):**
    *   Simple/Basic: $4,999
    *   Mid-Tier: $19,999
    *   Strong/Complex: $29,999+
*   **Mobile Apps (One-Time Cost):**
    *   Starting: $25,999
    *   Mid-Tier: $75,999
    *   Strong/Complex: $99,999+
*   **Billing & Inventory Software (Subscription):**
    *   Basic: $299/month
    *   Mid: $2,999/month
    *   Strong: $9,999/month

**India (INR):**
*   **Custom Websites (One-Time Cost):**
    *   Simple/Basic: ₹9,999
    *   Mid-Tier: ₹49,999
    *   Strong/Complex: ₹99,999+
*   **Mobile Apps (One-Time Cost):**
    *   Starting: ₹39,999
    *   Mid-Tier: ₹1,49,999
    *   Strong/Complex: ₹2,49,999+
*   **Billing & Inventory Software (Subscription):**
    *   Basic: ₹4,999/month
    *   Mid: ₹24,999/month
    *   Strong: ₹74,999/month

**Europe (EUR):**
*   **Custom Websites (One-Time Cost):**
    *   Simple/Basic: €4,600
    *   Mid-Tier: €18,000
    *   Strong/Complex: €28,000+
*   **Mobile Apps (One-Time Cost):**
    *   Starting: €24,000
    *   Mid-Tier: €70,000
    *   Strong/Complex: €95,000+
*   **Billing & Inventory Software (Subscription):**
    *   Basic: €275/month
    *   Mid: €2,750/month
    *   Strong: €9,000/month

**Billing & Inventory Software Feature Tiers (Same for all regions):**
*   **Basic Plan:** Admin panel, billing, accounting, returns, sales, purchases, inventory, stock management, and SKU tracking.
*   **Mid Plan:** All Basic features + support for 2 store locations and up to 10 employees.
*   **Strong Plan:** All Mid features + unlimited store locations and unlimited employees.

**Analyze the following user inputs:**
*   Project Description: {{{projectDescription}}}
*   Location: {{{location}}}
*   Urgency: {{{urgency}}}
*   Complexity: {{{complexity}}}

Briefly mention how urgency and location can influence the final quote, but base your primary estimate on the plan's price for the determined region.
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
