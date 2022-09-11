import { Routes, Route, BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<h1>Hello world</h1>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default RoutesApp;
