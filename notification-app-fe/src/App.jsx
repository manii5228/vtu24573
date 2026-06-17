import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

export default function App() {
    return (
        <BrowserRouter>
            <CssBaseline />
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}