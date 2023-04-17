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
import { IconDeviceFloppy } from '@tabler/icons-react';

export default function CollegeCard() {
    const [saved, setSaved] = useState(false);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Center>
                <Text weight={500} size="xl" mb="md" ta="center">
                    <Anchor 
                        href="https://www.rice.edu/" 
                        target="_blank" 
                        underline={false}
                    >
                        Rice University
                    </Anchor>
                </Text>
            </Center>
            <Center>
                <Image 
                    width={75} 
                    height={75} 
                    src="https://icons.duckduckgo.com/ip3/www.rice.edu.ico" 
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
                        Houston, Texas
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Student Size
                    </Text>
                    <Text weight={500} size="sm">
                        4,300
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Admission Rate
                    </Text>
                    <Text weight={500} size="sm">
                        9%
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
                        71,745
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Net Price
                    </Text>
                    <Text weight={500} size="sm">
                        16,076
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Pell Grant Rate
                    </Text>
                    <Text weight={500} size="sm">
                        70%
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Federal Loan Rate
                    </Text>
                    <Text weight={500} size="sm">
                        30%
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Median Debt
                    </Text>
                    <Text weight={500} size="sm">
                        12,000
                    </Text>
                </div>
            </Group>
            <Group 
                spacing="md" 
                position="center" 
                my="md" 
                ta="center"
            >
                <Box w={{ sm: 200, lg: 300 }}>
                    <Button 
                        fullWidth
                        component="a"
                        variant="outline" 
                        href="https://www.rice.edu/" 
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