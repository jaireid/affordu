import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Title } from '@mantine/core';

export default function Profile() {
    // const { currentUser } = useContext(AuthContext);
    // Welcome, {currentUser?.displayName}!

    return (
        <Box>
             <Title order={1} align="center">Welcome!</Title>
            <Title order={3}>
                Net price is what you pay after your gift aid is subtracted from the cost of attendance. Knowing the net price of a college can help you make an informed financial decision and lower net prices can mean less student debt after graduation.
            </Title>
            <Title order={3}>
                Compare the average net prices of colleges to find your best fit. Discover affordable colleges that meet your academic and financial goals, and find your dream college without breaking the bank.
            </Title>
            <Title order={3}>
                See which colleges have the best Pell Grant and federal loan rates. Find colleges that offer generous financial aid packages and prioritize making higher education accessible to all students.
            </Title>
        </Box>
    );
};
