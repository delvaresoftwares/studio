const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export type EnquiryPayload = {
    full_name: string;
    phone: string;
    email: string;
    title: string;
    subject: string;
};

export const submitEnquiry = async (
    payload: EnquiryPayload
): Promise<{ success: boolean; message?: string }> => {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
        throw new Error('Enquiry service is not configured.');
    }

    const res = await fetch(`${SUPABASE_URL}/functions/v1/enquiry`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SUPABASE_KEY}`,
            apikey: SUPABASE_KEY,
        },
        body: JSON.stringify(payload),
    });

    const raw = await res.text();
    let data: { success?: boolean; message?: string; error?: string } | null = null;
    try {
        data = JSON.parse(raw);
    } catch {
        data = null;
    }

    if (!res.ok || data?.success === false) {
        throw new Error(data?.error || `Enquiry service error (${res.status})`);
    }

    return { success: true, message: data?.message };
};
