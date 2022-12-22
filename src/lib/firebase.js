// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "$lib/config";

// Firebase functions
export function getErrorMessage(error) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists.';
    case 'auth/user-not-found':
      return 'No user found with this email address.'
    case 'auth/invalid-email':
      return 'The email address is invalid.';
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed.';
    case 'auth/weak-password':
      return 'The password is too weak.';
    default:
      return 'An error occurred. Please try again.';
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
