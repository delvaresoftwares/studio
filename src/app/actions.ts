'use server'

import { generateTechFeatureDescription } from "@/ai/flows/tech-feature-descriptions"
import { estimateProjectCost } from "@/ai/flows/project-cost-estimator"
import type { ProjectCostEstimatorInput, ProjectCostEstimatorOutput } from "@/ai/flows/project-cost-estimator"
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export async function saveContactInfoAction(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID === "YOUR_PROJECT_ID") {
    console.error("Firebase credentials are not set up. Please create and populate a .env.local file.");
    return { 
      success: false, 
      error: "The contact form is not yet configured. Please follow the instructions in the README to set up your Firebase project." 
    };
  }

  try {
    await addDoc(collection(db, 'contacts'), {
      ...formData,
      submittedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error saving contact info to Firestore:", error);
    let errorMessage = "An unknown error occurred while sending your message.";
    if (error.code) {
        switch (error.code) {
            case 'permission-denied':
                errorMessage = "Submission failed due to a permissions issue. Have you deployed the firestore.rules file to your project?";
                break;
            case 'unauthenticated':
                errorMessage = "Submission failed because the request was unauthenticated. Please check your Firebase configuration.";
                break;
            case 'not-found':
                 errorMessage = "Could not connect to the database. Have you created a Firestore database in your Firebase project?";
                 break;
            default:
                errorMessage = `A Firebase error occurred: ${error.code}. Please check your configuration and security rules.`;
        }
    }
    return { success: false, error: errorMessage };
  }
}
