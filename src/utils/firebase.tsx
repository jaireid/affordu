// Import functions from SDKs
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
    User,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    NextOrObserver
} from "firebase/auth";

// Initialize Firebase
const app = initializeApp(getFirebaseConfig());
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

 export const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } 
        catch (err) {
            console.error(err);
        }
};

 // Firebase method that adds an observer for changes to the user's sign-in state
 export const userStateListener = (callback:NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback);
};

 export const SignOutUser = async () => {
    try {
        await signOut(auth);
    } 
    catch (err) {
        console.error(err);
    }
};
