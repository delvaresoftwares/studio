# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Production Readiness

To make your application ready for production with a persistent database, follow these two crucial steps:

### 1. Configure Firebase Environment Variables

Your project uses Firebase for the contact form's database. You must configure it with your own Firebase project credentials.

**How to find your Firebase credentials:**
1. Go to the [Firebase Console](https://console.firebase.google.com/) and select your project (`delvare-software-solutions`).
2. Click the gear icon next to "Project Overview" in the top-left corner and select **Project settings**.
3. In the "General" tab, scroll down to the "Your apps" section.
4. If you haven't created a web app yet, click the `</>` (Web) icon to create one.
5. In your web app's settings, under **SDK setup and configuration**, select the **Config** option.
6. You will see a `firebaseConfig` object. Copy all the key-value pairs from this object.

**How to use your credentials:**
Create a `.env.local` file in the root of your project by copying the contents of the `.env` file. Then, replace the placeholder values with the actual values you just copied from your Firebase project.

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

**Before you deploy rules, ensure you have created a Firestore database in your project:**
1. In the Firebase Console, go to the **Build** section and click on **Firestore Database**.
2. Click **Create database** and follow the prompts to create it in **Native mode**. Choose a location close to your users.

**How to deploy the rules:**
1.  Go to your Firestore Database page in the Firebase Console.
2.  Click on the "Rules" tab.
3.  Copy the content from `firestore.rules` in this project and paste it into the editor.
4.  Click "Publish".

With these steps completed, your contact form will be connected to a secure, persistent database and ready for production!
