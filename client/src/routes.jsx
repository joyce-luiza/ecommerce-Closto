import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import LoginRegister from "./pages/LoginRegister";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";

import UserProfile from "./pages/UserProfile";
import UserProfile2 from "./pages/UserProfile2";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginRegister />} />
                <Route path="/profile2" element={<UserProfile />} />
                <Route path="/profile" element={<UserProfile2 />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default RoutesApp;
