import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CollegeCard from "./CollegeCard";
import { Container, Title, Text, Image, SimpleGrid } from "@mantine/core";

export default function Profile() {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <Title order={2} mb="md" ta="center">
                Find your dream college without breaking the bank
            </Title>
            <Container size="md" px="lg">
                <Text 
                    color="dimmed" 
                    size="sm" 
                    pb="md" 
                    ta={{ sm: "left", lg: "center" }}
                >
                    Net price is what you pay after your gift aid is subtracted from the cost of attendance. Lower net prices can mean less student debt after graduation. Compare the average net prices of colleges to find your best fit.
                </Text>
            </Container>
            <SimpleGrid cols={2} spacing="lg" m="lg">
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
            </SimpleGrid>
        </>
    );
};
