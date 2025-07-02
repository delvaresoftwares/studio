'use server'

import { generateTechFeatureDescription } from "@/ai/flows/tech-feature-descriptions"
import { estimateProjectCost } from "@/ai/flows/project-cost-estimator"
import type { ProjectCostEstimatorInput, ProjectCostEstimatorOutput } from "@/ai/flows/project-cost-estimator"

import { db, app } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Timestamp } from 'firebase/firestore';
import { revalidatePath } from "next/cache";

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

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  read: boolean;
}

// Action to save contact info to Firestore
export async function saveContactInfoAction(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
  // 1. Validate that Firebase was initialized correctly
  if (!app.options.projectId) {
    console.error("Firebase config is not set up. Please create and populate a .env.local file for local development, and ensure production secrets are set.");
    return { 
      success: false, 
      error: "The contact form is not yet configured. Please follow the instructions in the README." 
    };
  }
  
  // 2. Save data to Firestore
  try {
    const contactsCollection = collection(db, 'contacts');
    await addDoc(contactsCollection, {
      ...formData,
      createdAt: serverTimestamp(),
      read: false, // Default to unread
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error saving to Firestore:", error);
    // Provide a more specific error message if it's a permission issue
    if (error.code === 'permission-denied') {
        return { 
            success: false, 
            error: "Failed to submit: Permission denied. Please check your Firestore security rules as per the README." 
        };
    }
    return { 
        success: false, 
        error: "An error occurred while saving your message. Please try again." 
    };
  }
}

// Action to get all contacts from Firestore
export async function getContactsAction(): Promise<{ contacts?: Contact[]; error?: string }> {
  if (!app.options.projectId) {
    return { error: "Firebase is not configured on the server." };
  }

  try {
    const contactsCollection = collection(db, 'contacts');
    const q = query(contactsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const contacts = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const createdAt = data.createdAt as Timestamp;
        return {
            id: doc.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
            createdAt: createdAt ? new Date(createdAt.seconds * 1000).toLocaleString() : 'N/A',
            read: data.read || false,
        }
    });
    
    return { contacts };
  } catch (error: any) {
    console.error("Error fetching contacts:", error);
     if (error.code === 'permission-denied') {
        return { error: "Could not fetch contacts: Permission denied. Ensure your Firestore security rules are deployed correctly." };
    }
    return { error: "Failed to fetch contacts from the database." };
  }
}

// Action to mark a contact as read
export async function markAsReadAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const contactRef = doc(db, 'contacts', id);
    await updateDoc(contactRef, { read: true });
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error("Error marking as read:", error);
    return { success: false, error: "Failed to update contact status." };
  }
}

// Action to delete a contact
export async function deleteContactAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const contactRef = doc(db, 'contacts', id);
    await deleteDoc(contactRef);
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting contact:", error);
    return { success: false, error: "Failed to delete contact." };
  }
}
