import React, { useContext, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { AppShell, Header, Navbar, Text } from '@mantine/core';
import Navi from "./components/Navi";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Profile from "./components/Profile";

export default function App() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Check if current user exists on initial render
    useEffect(() => {
        if (currentUser) {
            navigate("/profile");
        }
    }, [currentUser]);
  
    return (
        <AppShell
            padding="md"
            navbar={<Navi />}
            header={
                <Header height={50} fw={500} p="xs">
                    {<Text fz="xl" color="blue" pl="sm">AffordU</Text>}
                </Header>
            }
            styles={(theme) => ({ 
                main: { 
                    backgroundColor: 
                        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0] 
                },
            })}
            navbarOffsetBreakpoint="sm"
        >
            <Routes>
                <Route path="/" element={<Login />} />
                <Route 
                    path="profile" 
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AppShell>
    );
};
