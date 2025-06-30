# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Production Readiness: Contact Form

To make your contact form ready for production, it needs to be connected to a service that can send you emails. This project is configured to use **Resend**.

Follow these steps to get it working:

### 1. Create a Resend Account and API Key

1.  Go to [resend.com](https://resend.com/) and sign up for a free account.
2.  In your Resend dashboard, navigate to the **API Keys** section from the side menu.
3.  Click **Create API Key**. Give it a name (e.g., "Delvare Contact Form") and set the permission to **Sending access**.
4.  Copy the generated API key. **You will only see this key once, so save it somewhere safe.**

### 2. Configure Your Environment

1.  In your project, create a new file named `.env.local` by copying the contents of the `.env` file.
2.  In `.env.local`, replace the placeholder `YOUR_RESEND_API_KEY` with the actual key you just copied from Resend.

```bash
# .env.local
RESEND_API_KEY="YOUR_RESEND_API_KEY"
```

### 3. Set Your Email Address

1.  Open the file `src/app/actions.ts`.
2.  Find the `saveContactInfoAction` function.
3.  On the line `const toEmail = 'you@example.com';`, change `'you@example.com'` to the email address where you want to receive the contact form submissions.

### 4. (Optional but Recommended) Verify Your Domain

For testing, Resend allows sending emails from `onboarding@resend.dev`. For production, you should send emails from your own domain.

1.  In your Resend dashboard, go to the **Domains** section.
2.  Click **Add Domain** and follow the instructions to verify your domain.
3.  Once verified, you can update the `from` field in `src/app/actions.ts` to use an address like `'contact@yourdomain.com'`.

With these steps completed, your contact form will send submissions directly to your email inbox!
