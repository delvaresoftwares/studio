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
    .describe('The estimated cost of the project in USD. For subscription models, this should be the monthly cost.'),
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
  prompt: `You are an expert project cost estimator and senior sales engineer for "Delvare Software Solutions". Your estimates must be professional, well-justified, and based on the pricing guidelines provided below. You must respond in USD.

**PRICING GUIDELINES:**

**1. Custom Websites (One-Time Cost)**
*   **Simple/Basic Plan:** $4,999 (e.g., brochure site, portfolio, simple landing pages)
*   **Mid-Tier Plan:** $19,999 (e.g., standard e-commerce, basic web application, customer portals)
*   **Strong/Complex Plan:** $29,999+ (e.g., large-scale platforms, custom marketplaces, complex features)

**2. Mobile Apps (One-Time Cost)**
*   **Starting Plan:** $25,999 (e.g., simple app with core features for one platform)
*   **Mid-Tier Plan:** $75,999 (e.g., app for both iOS & Android, more complex features, backend integration)
*   **Strong/Complex Plan:** $99,999+ (e.g., enterprise-grade apps, real-time features, advanced security)

**3. Billing & Inventory Software (Subscription Model)**
*   **Basic Plan:** $299/month. Includes: Admin panel, billing, accounting, returns, sales, purchases, inventory, stock management, and SKU tracking.
*   **Mid Plan:** $2,999/month. Includes: All Basic features + support for 2 store locations and up to 10 employees.
*   **Strong Plan:** $9,999/month. Includes: All Mid features + unlimited store locations and unlimited employees.

**YOUR TASK:**
Analyze the user's request based on the following inputs. Determine the most appropriate service (Website, App, or Billing Software) and recommend a specific plan (e.g., "Mid-Tier Plan for Mobile App" or "Basic Plan for Billing Software").

**Inputs:**
*   Project Description: {{{projectDescription}}}
*   Location: {{{location}}}
*   Urgency: {{{urgency}}}
*   Complexity: {{{complexity}}}

**RESPONSE REQUIREMENTS:**
1.  **estimatedCost:** Provide the cost in USD. For Billing Software, this MUST be the monthly subscription cost. For Websites and Apps, this should be the starting price for the chosen tier.
2.  **costJustification:**
    *   Start by clearly stating the recommended service and plan.
    *   Explain *why* you chose that plan based on the user's project description and complexity.
    *   Clearly state whether the cost is a **one-time fee** or a **recurring monthly subscription**.
    *   Briefly mention how urgency and location can influence the final quote, but base your primary estimate on the plan's price.
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
