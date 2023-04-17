import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Title, Text, Image } from '@mantine/core';

export default function Profile() {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <Container padding="xl" tt="capitalize" size={{ sm: "xs", lg: "sm" }}>
                <Title order={2} mb="md" ta="center">Find your dream college without breaking the bank</Title>
                <Text color="dimmed" size={{ sm: "sm", lg: "md" }} ta={{ sm: "left", lg: "center" }}>
                    Net price is what you pay after your gift aid is subtracted from the cost of attendance. Lower net prices can mean less student debt after graduation. Compare the average net prices of colleges to find your best fit.
                </Text>
            </Container>
        </>
    );
};
