import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { 
    createStyles, 
    getStylesRef, 
    rem, 
    Navbar, 
    Text, 
    Button, 
    Center 
} from "@mantine/core";
import { 
    IconListSearch, 
    IconListCheck,  
    IconLogout
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    link: {
        ...theme.fn.focusStyles(),
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
      
            [`& .${getStylesRef("icon")}`]: {
                color: theme.colorScheme === "dark" ? theme.white : theme.black,
            },
        },
    },

    linkIcon: {
        ref: getStylesRef("icon"),
        color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
            [`& .${getStylesRef("icon")}`]: {
                color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
            },
        },
    },
}));

const data = [
    { link: "", label: "Explore Colleges Placeholder", icon: IconListSearch },
    { link: "", label: "Saved Colleges Placeholder", icon: IconListCheck },
];

export default function Navi() {
  const { currentUser, signOut } = useContext(AuthContext);
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState("Explore Colleges Placeholder");
  const { classes, cx } = useStyles();

  const links = data.map((item) => (
      <a
        className={cx(classes.link, { [classes.linkActive]: item.label === active })}
        href={item.link}
        key={item.label}
        onClick={(event) => {
            event.preventDefault();
            setActive(item.label);
        }}
      >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
      </a>
  ));

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
                          Welcome, User!
                  </Text>
                  {links}
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
