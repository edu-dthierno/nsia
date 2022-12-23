import { PUBLIC_FIREBASE_API_KEY, PUBLIC_AUTH_DOMAIN, PUBLIC_PROJECT_ID, PUBLIC_STRORAGE_BUCKET, PUBLIC_MESSAGING_SENDER_ID, PUBLIC_APP_ID } from '$env/static/public'

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: PUBLIC_AUTH_DOMAIN,
  projectId: PUBLIC_PROJECT_ID,
  storageBucket: PUBLIC_STRORAGE_BUCKET,
  messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
  appId: PUBLIC_APP_ID,
};