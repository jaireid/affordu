// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID
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
