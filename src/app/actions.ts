'use server'

import { generateTechFeatureDescription } from "@/ai/flows/tech-feature-descriptions"
import { estimateProjectCost } from "@/ai/flows/project-cost-estimator"
import type { ProjectCostEstimatorInput, ProjectCostEstimatorOutput } from "@/ai/flows/project-cost-estimator"

export async function getTechFeatureDescriptionAction(featureName: string): Promise<string> {
  try {
    const result = await generateTechFeatureDescription({ featureName });
    return result.description;
  } catch (error) {
    console.error("Error generating tech feature description:", error);
    return "Could not load description at this time. Please try again later.";
  }
}

export async function getProjectCostEstimateAction(input: ProjectCostEstimatorInput): Promise<ProjectCostEstimatorOutput | { error: string }> {
  try {
    const result = await estimateProjectCost(input);
    return result;
  } catch (error) {
    console.error("Error estimating project cost:", error);
    return { error: "Failed to get cost estimation. There might be an issue with the service." };
  }
}
