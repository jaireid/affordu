import { useState } from "react";
import { 
    Card, 
    Image, 
    Text, 
    Group, 
    Center, 
    Anchor, 
    Box, 
    Button,
    ActionIcon
} from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function CollegeCard({ college }) {
    const [saved, setSaved] = useState(false);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Center>
                <Text weight={500} size="xl" mb="md" ta="center">
                    <Anchor 
                        href={college.url} 
                        target="_blank" 
                        underline={false}
                    >
                        {college.name}
                    </Anchor>
                </Text>
            </Center>
            <Center>
                <Image 
                    width={75} 
                    height={75} 
                    src={"https://icons.duckduckgo.com/ip3/" + college.url} 
                    alt=""
                />
            </Center>
            <Group 
                spacing="lg" 
                position="center" 
                my="md" 
                ta="center"
            >
                <div>
                    <Text size="xs" color="dimmed">
                        City, State
                    </Text>
                    <Text weight={500} size="sm">
                        {college.city}, {college.state}
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Student Size
                    </Text>
                    <Text weight={500} size="sm">
                        {college.size}
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Admission Rate
                    </Text>
                    <Text weight={500} size="sm">
                        {college.admissionRate}%
                    </Text>
                </div>
            </Group>
            <Group 
                spacing="lg" 
                position="center" 
                my="md" 
                ta="center"
            >
                <div>
                    <Text size="xs" color="dimmed">
                        Cost of Attendence
                    </Text>
                    <Text weight={500} size="sm">
                        ${college.costAttendance}
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Net Price
                    </Text>
                    <Text weight={500} size="sm">
                        ${college.netPrice}
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Pell Grant Rate
                    </Text>
                    <Text weight={500} size="sm">
                        {college.pellGrantRate}%
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Federal Loan Rate
                    </Text>
                    <Text weight={500} size="sm">
                        {college.fedLoanRate}%
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Median Debt
                    </Text>
                    <Text weight={500} size="sm">
                        ${college.debt}
                    </Text>
                </div>
            </Group>
            <Group 
                spacing="md" 
                position="center" 
                my="md" 
                ta="center"
            >
                <Box w={300}>
                    <Button 
                        fullWidth
                        component="a"
                        variant="outline" 
                        href={college.calculator} 
                        target="_blank"
                    >
                        Net Price Calculator
                    </Button>
                </Box>
                <ActionIcon 
                    variant={saved ? "filled" : "outline"}
                    color="blue" 
                    radius="md" 
                    size={36}
                    onClick={() => setSaved(!saved)}
                >
                    <IconDeviceFloppy size="1.1rem" stroke={1.5} />
                </ActionIcon>
            </Group>
        </Card>
    );
};