import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import LoginRegister from './pages/LoginRegister';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import UserProfile from './pages/UserProfile';
import Cart from './pages/Cart';
import CompletedOrder from './pages/CompletedOrder/index.';

function RoutesApp() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<LoginRegister />} />
				<Route path="/profile" element={<UserProfile />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/admin" element={<AdminPanel />} />
				<Route path="/cart/order/:id" element={<CompletedOrder />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}
export default RoutesApp;
