const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Delvare <noreply@delvare.in>';
const ADMIN_EMAIL = process.env.CONTACT_TO_EMAIL || 'admin@delvare.in';

export type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Sends an email through Resend from the server.
 * Caller is responsible for validating inputs before calling this.
 */
export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.error('[resend] RESEND_API_KEY is not set. Email was not sent.');
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
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
      console.error('[resend] Failed to send email:', data?.message || `Resend API error (${response.status})`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[resend] Unexpected error sending email:', error);
    return false;
  }
}

export type EnquiryEmailData = {
  name: string;
  email: string;
  phone: string;
  title: string;
  subject: string;
};

/**
 * Sends the admin notification + customer confirmation for a website enquiry.
 * Replaces the previous Supabase edge-function path with a direct server call.
 */
export async function sendEnquiryEmails(data: EnquiryEmailData): Promise<boolean> {
  const safe = (value: string) => String(value).replace(/[\r\n]+/g, ' ').trim();
  const name = escapeHtml(safe(data.name));

  const adminHtml = `
    <div style="font-family:Arial,sans-serif">
      <h2>New Enquiry</h2>
      <p><strong>Title:</strong> ${escapeHtml(safe(data.title))}</p>
      <p><strong>Subject:</strong> ${escapeHtml(safe(data.subject))}</p>
      <hr>
      <h3>Contact Details</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${escapeHtml(safe(data.phone))}</p>
      <p><strong>Email:</strong> ${escapeHtml(safe(data.email))}</p>
      <hr>
      <p>This enquiry was submitted through the Delvare website.</p>
    </div>
  `;

  const customerHtml = `
    <div style="font-family:Arial,sans-serif">
      <h2>We received your message</h2>
      <p>Hello ${name},</p>
      <p>We have received your message regarding <strong>${escapeHtml(safe(data.title))}</strong>.</p>
      <p>Our team will review your enquiry and contact you using the phone number or email address you provided.</p>
      <br>
      <p>Thank you for contacting Delvare.</p>
      <p>Regards,<br><strong>Delvare Team</strong></p>
    </div>
  `;

  const [adminOk, customerOk] = await Promise.all([
    sendEmail({ to: ADMIN_EMAIL, subject: `New Enquiry: ${safe(data.title)}`, html: adminHtml, replyTo: data.email }),
    sendEmail({ to: data.email, subject: 'We received your message', html: customerHtml }),
  ]);

  return adminOk && customerOk;
}