import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
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
import { db } from "../utils/firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

export default function CollegeCard({ college }) {
    const { currentUser } = useContext(AuthContext);
    const userId = (currentUser.uid).toString();
    const collegeId = (college.id).toString();
    // Set the default value of clicked to false
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        // Initialize save state with the saved college data from localStorage or an empty object
        const userSaveState = JSON.parse(localStorage.getItem("userSaveState")) || {};
        // Grab clicked value
        const save = userSaveState[collegeId];

        // If clicked's value is true setClicked
        if (save) {
            setClicked(JSON.parse(save));
        }
    }, [collegeId]);

   
    useEffect(() => {
        // Initialize save state with the saved college data from localStorage or an empty object
        const userSaveState = JSON.parse(localStorage.getItem("userSaveState")) || {};

         // If clicked is true update the clicked value for the college
        if (clicked) {
            userSaveState[collegeId] = clicked;
        } else {
            // If not delete the college
            delete userSaveState[collegeId];
        }

        // Add the save state to localStorage
        localStorage.setItem("userSaveState", JSON.stringify(userSaveState));
    }, [clicked, collegeId]);

    const handleSave = () => {
        if(clicked) {
            deleteCollegeDocument();
            setClicked(false);
        } else {
            addCollegeDocument();
            setClicked(true);
        }
    };

    const addCollegeDocument = async () => {
        
        try {
            if (!currentUser) throw new Error("User not authenticated");
            
            await setDoc(doc(db, "colleges", collegeId), {
                admissionRate: college.admissionRate,
                calculator: college.calculator,
                city: college.city,
                costAttendance: college.costAttendance,
                debt: college.debt,
                fedLoanRate: college.fedLoanRate,
                name: college.name,
                netPrice: college.netPrice,
                pellGrantRate: college.pellGrantRate,
                state: college.state,
                studentSize: college.studentSize,
                url: college.url,
                addedBy: userId,
            });
          
            console.log("Document written with ID: ", collegeId);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const deleteCollegeDocument = async () => {
      try  {
          if (!currentUser) throw new Error("User not authenticated");
        
          await deleteDoc(doc(db, "colleges", collegeId));
          console.log("Document deleted");
      } catch(error) {
          console.error("Error deleting document: ", error);
      }
    };
    
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
                    variant={clicked ? "filled" : "outline"}
                    color="blue" 
                    radius="md" 
                    size={36}
                    onClick={handleSave}
                >
                    <IconDeviceFloppy size="1.1rem" stroke={1.5} />
                </ActionIcon>
            </Group>
        </Card>
    );
};