import nodemailer, { type Transporter } from 'nodemailer';

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'admin@delvare.in';

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (transporter) return transporter;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 465);

  if (!user || !pass) {
    console.error(
      '[mailer] SMTP_USER / SMTP_PASS are not set. Enquiries will be saved to the database but no email will be delivered. ' +
      'Configure these environment variables (e.g. Gmail app password or your domain mailbox SMTP credentials) to enable email notifications.'
    );
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

export type EnquiryEmailData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  type?: string;
};

export async function sendEnquiryEmail(data: EnquiryEmailData): Promise<boolean> {
  const transport = getTransporter();
  if (!transport) return false;

  const kind = data.type === 'career' ? 'Career Application' : 'Website Enquiry';
  const safe = (value: string) => String(value).replace(/[\r\n]+/g, ' ').trim();

  try {
    await transport.sendMail({
      from: `"${safe(data.name)} via delvare.in" <${process.env.SMTP_USER}>`,
      replyTo: data.email,
      to: TO_EMAIL,
      subject: `[${kind}] ${safe(data.name)} — delvare.in`,
      text: [
        `You have a new ${kind.toLowerCase()}:`,
        '',
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        '',
        'Message:',
        data.message,
        '',
        `Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
      ].join('\n'),
      html: [
        `<h2 style="margin:0 0 12px;font-family:Arial,sans-serif;">New ${kind}</h2>`,
        `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;">`,
        `<tr><td style="padding:4px 12px 4px 0;color:#666;"><b>Name</b></td><td>${escapeHtml(data.name)}</td></tr>`,
        `<tr><td style="padding:4px 12px 4px 0;color:#666;"><b>Email</b></td><td>${escapeHtml(data.email)}</td></tr>`,
        `<tr><td style="padding:4px 12px 4px 0;color:#666;"><b>Phone</b></td><td>${escapeHtml(data.phone)}</td></tr>`,
        `</table>`,
        `<p style="font-family:Arial,sans-serif;font-size:14px;margin:16px 0 4px;"><b>Message</b></p>`,
        `<div style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px;">${escapeHtml(data.message)}</div>`,
      ].join('\n'),
    });
    return true;
  } catch (error) {
    console.error('[mailer] Failed to send enquiry email:', error);
    return false;
  }
}

export type EstimationEmailData = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  urgency: string;
  complexity: string;
  estimatedCost: number;
  currency: string;
};

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
