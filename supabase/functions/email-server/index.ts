// supabase/functions/email-server/index.ts

// No withSupabase wrapper — direct fetch handler for simplicity & reliability.

interface Enquiry {
  full_name: string;
  phone: string;
  email: string;
  title: string;
  subject: string;
}

const RESEND_API_KEY = Deno.env.get("resend");

const FROM_EMAIL = "Delvare <noreply@delvare.in>";
const ADMIN_EMAIL = "admin@delvare.in";

function json(data: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    },
  });
}

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyTo?: string,
) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `Resend API error (${response.status})`);
  }

  return data;
}

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  try {
    if (req.method !== "POST") {
      return json({ error: "POST method required" }, 405);
    }

    if (!RESEND_API_KEY) {
      console.error("[email-server] RESEND_API_KEY (secret name: 'resend') is not set in Supabase Edge Function secrets.");
      return json({ error: "Email service is not configured" }, 500);
    }

    const body: Enquiry = await req.json();
    const { full_name, phone, email, title, subject } = body;

    if (!full_name || !phone || !email || !title || !subject) {
      return json(
        { error: "full_name, phone, email, title and subject are required" },
        400,
      );
    }

    // Email to admin
    const adminHtml = `
      <div style="font-family:Arial,sans-serif">
        <h2>New Enquiry</h2>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <h3>Contact Details</h3>
        <p><strong>Name:</strong> ${full_name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr>
        <p>This enquiry was submitted through the Delvare website.</p>
      </div>
    `;

    // Confirmation email to customer
    const customerHtml = `
      <div style="font-family:Arial,sans-serif">
        <h2>We received your message</h2>
        <p>Hello ${full_name},</p>
        <p>We have received your message regarding <strong>${title}</strong>.</p>
        <p>Our team will review your enquiry and contact you using the phone number or email address you provided.</p>
        <br>
        <p>Thank you for contacting Delvare.</p>
        <p>Regards,<br><strong>Delvare Team</strong></p>
      </div>
    `;

    // Send both emails
    const [adminResult, customerResult] = await Promise.all([
      sendEmail(ADMIN_EMAIL, `New Enquiry: ${title}`, adminHtml, email),
      sendEmail(email, `We received your message`, customerHtml),
    ]);

    console.log(`[email-server] Emails sent — admin: ${adminResult.id}, customer: ${customerResult.id}`);

    return json({
      success: true,
      message: "Enquiry submitted successfully",
      admin_email_id: adminResult.id,
      customer_email_id: customerResult.id,
    });
  } catch (error) {
    console.error("[email-server] Error:", error);
    return json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      500,
    );
  }
});
