# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Production Readiness: Contact Form & Database

To make your contact form ready for production, it needs to be connected to your Firebase project and your database needs to be secured.

Follow these steps to get it working:

### 1. Create a `.env.local` File (For Local Development)

Your Firebase project's unique identifiers (API keys) are needed to connect the app to your Firebase services when running on your local machine.

1.  Create a new file in the root of your project named `.env.local`.
2.  Copy the entire content of the `.env` file into your new `.env.local` file.
3.  The values in `.env` are from the project you created. If you switch to a different Firebase project, you'll need to update these values. You can find them in your Firebase project settings under the "General" tab, in the "Your apps" section.

### 2. Enable Firestore

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Select your project (`delvare-software-solutions`).
3.  In the left-hand menu under "Build", click on **Firestore Database**.
4.  Click **Create database**.
5.  Choose **Start in production mode**. This is crucial for security.
6.  Select a location for your database (choose one close to your users) and click **Enable**.

### 3. Deploy Firestore Security Rules

To protect your data, you must deploy security rules. The rules in this project allow anyone to submit the contact form but prevent anyone from reading, updating, or deleting the data from the client-side.

1.  Make sure you have the Firebase CLI installed. If not, run `npm install -g firebase-tools`.
2.  Log in to Firebase by running `firebase login`.
3.  Set your project alias by running `firebase use --add delvare-software-solutions`. Select the correct project when prompted.
4.  Deploy the rules by running the following command in your project's root directory:
    ```bash
    firebase deploy --only firestore:rules
    ```

### 4. Configure Production Secrets for AI Features

To ensure the AI-powered features (like the Cost Estimator) work in your deployed application, you need to provide the necessary API key to the production environment.

1.  **Get your API Key:** Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and create a new API key.
2.  **Store the Secret:** Go to the [Google Cloud Secret Manager](https://console.cloud.google.com/security/secret-manager) for your project (`delvare-software-solutions`).
3.  Click **Create Secret**.
4.  Name the secret `GOOGLE_API_KEY`.
5.  In the "Secret value" field, paste your API key.
6.  Click **Create Secret**.

The `apphosting.yaml` file is already configured to use this secret in production. With these steps completed, your contact form will securely save submissions to your Firestore database, and you can view them on the `/admin` page!
