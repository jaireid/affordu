// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Returns firebaseConfig object
export function getFirebaseConfig() {
  // Verify firebaseConfig is not empty and contains an API key
    if(!firebaseConfig || !firebaseConfig.apiKey) {
        throw new Error("No firebase configuration");
    } else {
        return firebaseConfig;
    }
}
