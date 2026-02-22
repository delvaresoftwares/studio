'use server'

import { db, app } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Timestamp } from 'firebase/firestore';
import { revalidatePath } from "next/cache";

// --- START of New Cost Calculation Logic ---

// Input and Output types, consistent with the frontend
export type ProjectCostEstimatorInput = {
  projectType: 'website' | 'mobile' | 'billing';
  projectDescription: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  complexity: 'simple' | 'medium' | 'complex';
};

export type ProjectCostEstimatorOutput = {
  estimatedCost: number;
  currency: 'USD' | 'INR' | 'EUR';
  costJustification: string;
};

// Pricing data structure
const pricingData = {
  USD: {
    website: { simple: 4999, medium: 19999, complex: 29999, type: 'One-Time Fee' },
    mobile: { simple: 25999, medium: 75999, complex: 99999, type: 'One-Time Fee' },
    billing: { simple: 299, medium: 2999, complex: 9999, type: 'Monthly Subscription' },
    features: { api: 1500, cloud: 2000, auth: 1000, admin: 2500, database: 1200 }
  },
  INR: {
    website: { simple: 9999, medium: 49999, complex: 99999, type: 'One-Time Fee' },
    mobile: { simple: 39999, medium: 149999, complex: 249999, type: 'One-Time Fee' },
    billing: { simple: 4999, medium: 24999, complex: 74999, type: 'Monthly Subscription' },
    features: { api: 15000, cloud: 20000, auth: 10000, admin: 25000, database: 12000 }
  },
  EUR: {
    website: { simple: 4600, medium: 18000, complex: 28000, type: 'One-Time Fee' },
    mobile: { simple: 24000, medium: 70000, complex: 95000, type: 'One-Time Fee' },
    billing: { simple: 275, medium: 2750, complex: 9000, type: 'Monthly Subscription' },
    features: { api: 1400, cloud: 1800, auth: 900, admin: 2300, database: 1100 }
  }
};

const europeanCountries = ['albania', 'andorra', 'armenia', 'austria', 'belarus', 'belgium', 'bosnia', 'bulgaria', 'croatia', 'cyprus', 'czech', 'denmark', 'estonia', 'finland', 'france', 'georgia', 'germany', 'greece', 'hungary', 'iceland', 'ireland', 'italy', 'latvia', 'liechtenstein', 'lithuania', 'luxembourg', 'malta', 'moldova', 'monaco', 'montenegro', 'netherlands', 'norway', 'poland', 'portugal', 'romania', 'russia', 'san marino', 'serbia', 'slovakia', 'slovenia', 'spain', 'sweden', 'switzerland', 'ukraine', 'united kingdom', 'vatican city'];

function calculateProjectCost(input: ProjectCostEstimatorInput): ProjectCostEstimatorOutput {
  const { projectType, projectDescription, location, complexity } = input;
  const description = projectDescription.toLowerCase();
  const loc = location.toLowerCase();

  // Determine Currency
  let currency: 'USD' | 'INR' | 'EUR' = 'USD';
  if (loc.includes('india')) {
    currency = 'INR';
  } else if (europeanCountries.some(country => loc.includes(country))) {
    currency = 'EUR';
  }

  const prices = pricingData[currency];
  const projectPricing = prices[projectType];
  let estimatedCost = projectPricing[complexity];

  let justification = `The estimate is based on the following selections:\n`;
  justification += `- Project Type: ${projectType.charAt(0).toUpperCase() + projectType.slice(1)}\n`;
  justification += `- Complexity: ${complexity.charAt(0).toUpperCase() + complexity.slice(1)}\n`;
  justification += `- Payment Model: ${projectPricing.type}\n`;
  justification += `\nBase cost: ${estimatedCost.toLocaleString()} ${currency}\n`;

  // Feature detection
  const detectedFeatures: string[] = [];
  let featureCost = 0;

  const featureKeywords = {
    api: ['api', 'integration', 'connect'],
    cloud: ['cloud', 'aws', 'azure', 'gcp', 'hosting'],
    auth: ['auth', 'login', 'signup', 'user account'],
    admin: ['admin panel', 'dashboard', 'manage content'],
    database: ['database', 'storage', 'sql', 'mongodb'],
  };

  for (const [feature, keywords] of Object.entries(featureKeywords)) {
    if (keywords.some(keyword => description.includes(keyword))) {
      const cost = prices.features[feature as keyof typeof prices.features];
      featureCost += cost;
      detectedFeatures.push(`${feature.charAt(0).toUpperCase() + feature.slice(1)} (+${cost.toLocaleString()} ${currency})`);
    }
  }

  if (detectedFeatures.length > 0) {
    justification += `\nDetected Features:\n- ${detectedFeatures.join('\n- ')}\n`;
  }

  estimatedCost += featureCost;

  justification += `\nTotal Estimated Cost: ${estimatedCost.toLocaleString()} ${currency}. This is an initial estimate; a final quote will be provided after a detailed consultation.`

  return { estimatedCost, currency, costJustification: justification };
}


export async function getProjectCostEstimateAction(input: ProjectCostEstimatorInput): Promise<ProjectCostEstimatorOutput | { error: string }> {
  try {
    const result = calculateProjectCost(input);

    // Save the estimation to Firestore as well
    if (app.options.projectId) {
      try {
        const estimationsCollection = collection(db, 'estimations');
        await addDoc(estimationsCollection, {
          ...input,
          ...result,
          createdAt: serverTimestamp(),
          read: false,
        });
      } catch (dbError) {
        console.error("Error saving estimation to Firestore:", dbError);
        // We don't fail the whole action if just saving fails, 
        // but we log it.
      }
    }

    return result;
  } catch (error) {
    console.error("Error calculating project cost:", error);
    return { error: "Failed to calculate cost estimate. Please check your inputs and try again." };
  }
}

// --- END of New Cost Calculation Logic ---


export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  type?: 'contact' | 'career';
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: string;
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
      type: formData.type || 'contact',
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
  console.log("getContactsAction started");
  console.log("Firebase Config Project ID:", app.options.projectId);

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
        type: data.type || 'contact',
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
    return { error: `Failed to fetch contacts: ${error.message}` };
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

export type Estimation = {
  id: string;
  projectType: string;
  projectDescription: string;
  location: string;
  urgency: string;
  complexity: string;
  estimatedCost: number;
  currency: string;
  costJustification: string;
  createdAt: string;
  read: boolean;
}

// Action to get all estimations from Firestore
export async function getEstimationsAction(): Promise<{ estimations?: Estimation[]; error?: string }> {
  if (!app.options.projectId) {
    return { error: "Firebase is not configured on the server." };
  }

  try {
    const estimationsCollection = collection(db, 'estimations');
    const q = query(estimationsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const estimations = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const createdAt = data.createdAt as Timestamp;
      return {
        id: doc.id,
        projectType: data.projectType,
        projectDescription: data.projectDescription,
        location: data.location,
        urgency: data.urgency,
        complexity: data.complexity,
        estimatedCost: data.estimatedCost,
        currency: data.currency,
        costJustification: data.costJustification,
        createdAt: createdAt ? new Date(createdAt.seconds * 1000).toLocaleString() : 'N/A',
        read: data.read || false,
      }
    });

    return { estimations };
  } catch (error: any) {
    console.error("Error fetching estimations:", error);
    return { error: "Failed to fetch estimations from the database." };
  }
}

// Action to mark an estimation as read
export async function markEstimationAsReadAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const estimationRef = doc(db, 'estimations', id);
    await updateDoc(estimationRef, { read: true });
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error("Error marking estimation as read:", error);
    return { success: false, error: "Failed to update estimation status." };
  }
}

// Action to delete an estimation
export async function deleteEstimationAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const estimationRef = doc(db, 'estimations', id);
    await deleteDoc(estimationRef);
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting estimation:", error);
    return { success: false, error: "Failed to delete estimation." };
  }
}

