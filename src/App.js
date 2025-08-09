import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./components/Home/Home";
import { SnackbarProvider } from "notistack";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import "./styles.css";

const App = () => {
  return (
    // ye notification ke liye hai
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Container className="background" maxWidth="lg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </SnackbarProvider>
  );
};
export default App;
