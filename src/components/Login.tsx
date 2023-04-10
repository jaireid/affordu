import { MouseEvent } from "react";
import { signInWithGoogle } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
    const navigate = useNavigate();
  
    const handleGoogleLogin = async (event: MouseEvent<HTMLButtonElement>) => {
        // Prevent default button click behavior
        event.preventDefault();
        try {
            // Sign in with Google and get user credentials
            const userCredential = await signInWithGoogle();
            // Navigate to the profile page if user credentials are returned
            if(userCredential) {
                navigate("/profile");
            }
        } catch (error:any) {
            console.log(error.message);
        }
  	};

    return (
        <>
            <h2>Join AffordU Today</h2>
            <div>
                <h3>Sign in with one of our providers</h3>
                <button onClick={handleGoogleLogin}>
                    <FcGoogle /> Sign in with Google
                </button>
            </div>
      </>
    );
};
