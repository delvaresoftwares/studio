# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Production Readiness

To make your application ready for production with a persistent database, follow these two crucial steps:

### 1. Configure Firebase Environment Variables

Your project uses Firebase for the contact form's database. You must configure it with your own Firebase project credentials.

Create a `.env.local` file by copying the contents of the `.env` file and replace the placeholder values with your actual Firebase project keys. You can find these in your Firebase project settings.

```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
```

**Note:** Never commit your `.env.local` file or other files containing secrets to a public repository.

### 2. Deploy Firestore Security Rules

For security, your database needs rules that define who can access your data. I have created a `firestore.rules` file with secure defaults for your contact form. These rules allow anyone to submit the form (`create`) but prevent anyone from reading, updating, or deleting contact information from the client side.

You must deploy these rules to your Firebase project. You can do this from the Firebase console:
1.  Go to your Firestore Database page.
2.  Click on the "Rules" tab.
3.  Copy the content from `firestore.rules` and paste it into the editor.
4.  Click "Publish".

With these steps completed, your contact form will be connected to a secure, persistent database and ready for production!
