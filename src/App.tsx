import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import Cart from "./pages/cart";
import Login from "./pages/login";
import ProtectedRoute from "./pages/privateRoute";
import Dashboard from "./pages/dashboard";
import { useEffect, useState } from "react";
import { logout } from "./services/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const [token, setToken] = useState<boolean>(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setToken(true);
    }
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem("authToken", token);
    setToken(true);
  };

  const handleLogout = () => {
    logout();
    setToken(false);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#b47150",
      },
      secondary: {
        main: "#8f5335",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header token={token} onLogout={handleLogout} />
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              {/* <Route path="/signup" element={<SignUpForm />} /> */}
              <Route path="/carrinho" element={<Cart />} />
              {/* <Route path="*" element={<NotFound/>}> </Route>   */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </>

          {/* <Footer /> */}
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
