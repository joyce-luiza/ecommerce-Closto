import { CartProvider } from "./contexts/CartContext";
import RoutesApp from "./routes";

function App() {
  return (
    <CartProvider>
      <RoutesApp />
    </CartProvider>
  )
}
export default App;