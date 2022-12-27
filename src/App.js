import React from "react";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./components/theme";
import { AuthProvider } from "./contexts/authContext";
import Router from "./routes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
