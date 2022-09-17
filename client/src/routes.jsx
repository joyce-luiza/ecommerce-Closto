import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import LoginRegister from "./pages/LoginRegister";
import Footer from "./components/Footer";
import UserProfile from "./pages/UserProfile";
import UserProfile2 from "./pages/UserProfile2";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<LoginRegister />} />
                <Route path="/profile2" element={<UserProfile />} />
                <Route path="/profile" element={<UserProfile2 />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default RoutesApp;
