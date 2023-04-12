import { useContext, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Profile from "./components/Profile";
import "./App.css";

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
    )
};
