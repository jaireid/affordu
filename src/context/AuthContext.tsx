import { User } from "firebase/auth";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { SignOutUser, userStateListener } from "../utils/firebase";

// Define the expected props for the AuthProvider component
interface Props {
    children?: ReactNode
}

// Context that will hold the authenticated user
export const AuthContext = createContext({
    currentUser: {} as User | null, // Initialize current user to null
    setCurrentUser: (_user:User) => {},  // Initialize the function that sets the current user to an empty function
    signOut: () => {}
});

// Component that provides the authentication context
export const AuthProvider = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);  // Declare state for the authenticated user and initialize it to null
    const navigate = useNavigate();

    // Listen for changes in user authentication state
    useEffect(() => {
        const unsubscribe = userStateListener((user) => {
            // If there is a user, set the current user state to the user
            if(user) {
                setCurrentUser(user);
            }
        });

        // Return unsubscribe function to clean up the effect hook
        return unsubscribe;
    }, [setCurrentUser]);
  
    // Redirect to the Login page when user is set to null
    const signOut = () => {
        SignOutUser();
        // Set the current user state to null after sign out
        setCurrentUser(null);
        // Redirect user to login page
        navigate('/');
    }

    // Define the context value that will be passed down to child components
    const value = {
        currentUser,
        setCurrentUser,
        signOut,
    }

    // Return the context provider with the value and children components
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
