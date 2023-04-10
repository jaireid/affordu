import { useContext } from "react";
import { AuthProvider } from "../context/AuthContext";

export default function Profile() {
    const { currentUser, signOut } = useContext(AuthContext);

    return (
        <>
            <h2>Welcome, {user.displayName}!</h2>
            <p>This is your home page.</p>
            <button onClick={signOut}>Sign Out</button>
        </>
    );
};
