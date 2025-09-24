# Firebase Setup Guide

This guide will help you set up Firebase for The Nerdy Network project. Follow these steps to configure your Firebase project and integrate it with the frontend.

## Prerequisites

- Node.js 18+ installed
- A Google account
- Firebase CLI installed globally: `npm install -g firebase-tools`

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `nerdy-network` (or your preferred name)
4. Enable Google Analytics (optional but recommended)
5. Choose your Google Analytics account
6. Click "Create project"

## Step 2: Enable Firebase Services

### Authentication
1. In the Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable the following providers:
   - Email/Password
   - Google (optional)
   - GitHub (optional)
3. Configure authorized domains if needed

### Firestore Database
1. Go to **Firestore Database**
2. Click "Create database"
3. Choose "Start in test mode" (we'll configure security rules later)
4. Select a location close to your users
5. Click "Done"

### Storage
1. Go to **Storage**
2. Click "Get started"
3. Choose "Start in test mode"
4. Select the same location as your Firestore
5. Click "Done"

### Cloud Functions (Optional)
1. Go to **Functions**
2. Click "Get started"
3. Follow the setup instructions if you plan to use server-side logic

## Step 3: Get Firebase Configuration

1. In the Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (`</>`)
4. Register your app with a nickname (e.g., "Nerdy Network Web")
5. Copy the Firebase configuration object

## Step 4: Configure Your Application

1. Open `src/lib/firebase.js` in your project
2. Replace the placeholder configuration with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

## Step 5: Set Up Firestore Security Rules

1. In the Firebase Console, go to **Firestore Database** > **Rules**
2. Replace the default rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null; // Allow authenticated users to read other profiles
    }
    
    // Projects are readable by all authenticated users
    match /projects/{projectId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == resource.data.authorId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.authorId;
    }
    
    // Hub projects are only accessible by the owner and members
    match /hub_projects/{projectId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.ownerId;
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/hub_projects/$(projectId)/members/$(request.auth.uid));
    }
    
    // Hub project subcollections
    match /hub_projects/{projectId}/{subcollection=**} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == get(/databases/$(database)/documents/hub_projects/$(projectId)).data.ownerId ||
         exists(/databases/$(database)/documents/hub_projects/$(projectId)/members/$(request.auth.uid)));
    }
    
    // Bounties are readable by all, writable by creator
    match /bounties/{bountyId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == resource.data.creatorId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.creatorId;
    }
    
    // Quests and badges are readable by all authenticated users
    match /quests/{questId} {
      allow read: if request.auth != null;
    }
    
    match /badges/{badgeId} {
      allow read: if request.auth != null;
    }
    
    // Stats are readable by all
    match /stats/{document} {
      allow read: if true;
    }
    
    // Contact forms and newsletter subscriptions
    match /contacts/{contactId} {
      allow create: if true; // Allow anyone to submit contact forms
    }
    
    match /newsletter_subscriptions/{subscriptionId} {
      allow create: if true; // Allow anyone to subscribe
    }
    
    // Notifications are readable/writable by the user they belong to
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## Step 6: Set Up Storage Security Rules

1. Go to **Storage** > **Rules**
2. Replace the default rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Users can upload to their own folder
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Project files can be accessed by project members
    match /projects/{projectId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (request.auth.uid == firestore.get(/databases/(default)/documents/projects/$(projectId)).data.authorId ||
         exists(/databases/(default)/documents/hub_projects/$(projectId)/members/$(request.auth.uid)));
    }
    
    // Public assets
    match /public/{allPaths=**} {
      allow read: if true;
    }
  }
}
```

## Step 7: Initialize Sample Data (Optional)

You can add some initial data to your Firestore database:

1. Go to **Firestore Database**
2. Create a document in the `stats` collection with ID `platform`:
   ```json
   {
     "members": 1250,
     "projects": 340,
     "collaborations": 89,
     "countries": 45
   }
   ```

## Step 8: Test Your Setup

1. Start your development server: `pnpm run dev`
2. Open your browser and navigate to `http://localhost:5173`
3. Try creating an account and logging in
4. Check the Firebase Console to see if data is being written correctly

## Step 9: Deploy (Optional)

### Using Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase in your project: `firebase init`
   - Select Hosting
   - Choose your Firebase project
   - Set public directory to `dist`
   - Configure as single-page app: Yes
   - Set up automatic builds with GitHub: Optional
4. Build your project: `pnpm run build`
5. Deploy: `firebase deploy`

## Environment Variables

For production, consider using environment variables for sensitive configuration:

1. Create a `.env` file in your project root:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

2. Update `src/lib/firebase.js` to use environment variables:
   ```javascript
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
     appId: import.meta.env.VITE_FIREBASE_APP_ID
   };
   ```

## Troubleshooting

### Common Issues

1. **Permission Denied**: Check your Firestore security rules
2. **Module Not Found**: Make sure Firebase is installed: `pnpm add firebase`
3. **Authentication Errors**: Verify your Firebase configuration
4. **CORS Errors**: Add your domain to authorized domains in Firebase Console

### Useful Commands

- Check Firebase CLI version: `firebase --version`
- List Firebase projects: `firebase projects:list`
- Check current project: `firebase use`
- View logs: `firebase functions:log`

## Next Steps

1. Customize the UI components to match your design preferences
2. Add more authentication providers if needed
3. Implement additional features like push notifications
4. Set up monitoring and analytics
5. Configure backup and security monitoring

Your Firebase backend is now ready to power The Nerdy Network! The frontend components are already configured to work with these Firebase services.
