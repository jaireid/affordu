import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <App />
        </MantineProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
