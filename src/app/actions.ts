'use server'

import { generateTechFeatureDescription } from "@/ai/flows/tech-feature-descriptions"
import { estimateProjectCost } from "@/ai/flows/project-cost-estimator"
import type { ProjectCostEstimatorInput, ProjectCostEstimatorOutput } from "@/ai/flows/project-cost-estimator"
import { Resend } from 'resend';

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
  // 1. Validate environment variables
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "YOUR_RESEND_API_KEY") {
    console.error("Resend API key is not set up. Please create and populate a .env.local file.");
    return { 
      success: false, 
      error: "The contact form is not yet configured. Please follow the instructions in the README to set up Resend." 
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const toEmail = 'you@example.com'; // IMPORTANT: Replace with your email address in src/app/actions.ts

  // 2. Send the email
  try {
    await resend.emails.send({
      from: 'Delvare Contact Form <onboarding@resend.dev>', // This is a default for testing. See README.
      to: toEmail,
      subject: `New Contact Form Submission from ${formData.name}`,
      reply_to: formData.email,
      html: `
        <h1>New Contact Submission</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      `,
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error sending email with Resend:", error);
    return { success: false, error: "An error occurred while sending your message. Please check your Resend configuration and try again." };
  }
}
