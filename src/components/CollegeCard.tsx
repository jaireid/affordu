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
    const getClickableLink = link => {
        if (!link) {
            return null;
        }

        return link.startsWith("https://") ?
            link
            : `https://${link}`;
    };

    const removeForwardSlash = link => {
        if (!link) {
            return null;
        }

        return link.slice(0, -1);
    }

    const url = college.url;
    const calculator = college.calculator;

    const updateZeroValues = rate => {
        if(rate == 0) {
            return "N/A";
        }

        return (rate * 100).toFixed(2);
    }
  
    const attend = college.admissionRate;
    const grant = college.pellGrantRate;
    const loan = college.fedLoanRate;
  
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Center>
                <Text weight={500} size="xl" mb="md" ta="center">
                    <Anchor 
                        href={getClickableLink(url)}
                        target="_blank" 
                        underline={false}
                    >
                        {college.name}
                    </Anchor>
                </Text>
            </Center>
            <Center>
                <Image 
                    width={64} 
                    height={64}
                    src={`https://www.google.com/s2/favicons?domain=${removeForwardSlash(url)}&sz=${64}`}
                    alt="College Logo"
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
                        {college.city ? college.city : "N/A"}, {college.state ? college.state : "N/A"}
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Student Size
                    </Text>
                    <Text weight={500} size="sm">
                        {college.studentSize ? college.studentSize : "N/A"}
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Admission Rate
                    </Text>
                    <Text weight={500} size="sm">
                        {attend ? updateZeroValues(attend) + "%" : "N/A"}
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
                        {college.costAttendance ? "$" + college.costAttendance : "N/A"}
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Net Price
                    </Text>
                    <Text weight={500} size="sm">
                        {college.netPrice ? "$" + college.netPrice : "N/A"}
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Pell Grant Rate
                    </Text>
                    <Text weight={500} size="sm">
                        {grant ? updateZeroValues(grant) + "%" : "N/A"}
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Federal Loan Rate
                    </Text>
                    <Text weight={500} size="sm">
                        {loan ? updateZeroValues(loan) + "%" : "N/A"}
                    </Text>
                </div>
                <div>
                    <Text size="xs" color="dimmed">
                        Median Debt
                    </Text>
                    <Text weight={500} size="sm">
                        {college.debt ? "$" + college.debt : "N/A"}
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
                        href={getClickableLink(calculator)} 
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