import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import LoginRegister from "./pages/LoginRegister";
import Footer from "./components/Footer";
import UserProfile from "./pages/UserProfile";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<LoginRegister />} />
                <Route path="/profile" element={<UserProfile />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default RoutesApp;
