import { MouseEvent } from "react";
import { signInWithGoogle } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Flex, Title, Text, Button } from '@mantine/core';

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
        <Flex
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
            h="70%"
        >
            <Title order={1} size="3rem" ta="center">
                Join{' '}
                <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
                AffordU
                </Text>{' '}
                Today
            </Title>
            <Text color="dimmed" fz="lg" ta="center">Search and compare the net prices of colleges, and discover affordable options that meet your academic and financial goals.</Text>
            <Button variant="outline" fz="lg" leftIcon={<FcGoogle />} onClick={handleGoogleLogin}>
                Sign in with Google
            </Button>
        </Flex>
    );
};
