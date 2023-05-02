import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { 
    rem, 
    Navbar, 
    Text, 
    Button
} from "@mantine/core";
import { 
    IconListSearch, 
    IconListCheck,  
    IconLogout
} from "@tabler/icons-react";

export default function Navi() {
    const { currentUser, signOut } = useContext(AuthContext);
    const [opened, setOpened] = useState(false);
    const [active, setActive] = useState("explore");

    const styles = {
        textDecoration: "none",
    }

    return (
        <>
          {currentUser ? (
            <Navbar 
                p="md" 
                hiddenBreakpoint="sm" 
                hidden={!opened} 
                width={{ sm: 300, lg: 300 }}
            >
                <Navbar.Section grow mt="md">
                    <Text 
                        weight={500} 
                        size="lg" 
                        mb="xs" 
                        align="center"
                    >
                        Welcome, {currentUser?.displayName}!
                    </Text>
                    <Link to="/profile?type=explore" style={styles}>
                        <Button 
                            fullWidth 
                            ta="right"
                            mb="md"
                            variant={active === "explore" ? "light" : "outline"}
                            leftIcon={<IconListSearch size="1.2rem"/>}
                            onClick={() => setActive("explore")}
                        >
                            Explore Colleges
                        </Button>
                    </Link>
                    <Link to="/profile?type=saved" style={styles}>
                        <Button 
                            fullWidth
                            ta="right"
                            variant={active === "saved" ? "light" : "outline"}
                            leftIcon={<IconListCheck size="1.2rem" />}
                            onClick={() => setActive("saved")}
                        >
                            Saved Colleges
                        </Button>
                    </Link>
                </Navbar.Section>
                <Navbar.Section>
                    <Button 
                        fullWidth
                        leftIcon={
                            <IconLogout 
                                size="1.2rem"
                                stroke={1.5}
                            />
                        }
                        onClick={signOut}
                    >
                        <Text>Logout</Text>
                    </Button>
                </Navbar.Section>
            </Navbar>
          ) : (
            <></>
          )}
      </>
    );  
}
