import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import LoginRegister from "./pages/LoginRegister";
import Footer from "./components/Footer";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<LoginRegister/>} />
                </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default RoutesApp;
