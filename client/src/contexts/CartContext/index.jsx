import { createContext, useState } from 'react';

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	const handleAddProductToCart = (id, name, price, color, size, category) => {
		const cartCopy = [...cart];

		const product = cartCopy.find(
			(product) =>
				product.id === id &&
				product.name === name &&
				product.color.colorName === color.colorName &&
				product.size.sizeName === size.sizeName
		);

		if (!product) {
			cartCopy.push({
				id: id,
				name: name,
				price: price,
				color: color,
				size: size,
				category: category,
				qtd: 1,
			});
		} else {
			product.qtd += 1;
		}

		setCart(cartCopy);
	};

	const handleRemoveProductOfCart = (id, color, size) => {
		const cartCopy = [...cart];

		const product = cartCopy.find(
			(product) =>
				product.id === id &&
				product.color.colorName === color.colorName &&
				product.size.sizeName === size.sizeName
		);

		if (product && product.qtd > 1) {
			product.qtd -= 1;
			setCart(cartCopy);
		} else {
			const filteredCart = cartCopy.filter((product) => {
				if (
					(product.id !== id) |
					(product.color.colorName !== color.colorName) |
					(product.size.sizeName !== size.sizeName)
				) {
					return product;
				}
			});
			setCart(filteredCart);
		}
	};

	const clearCart = (product, value) => {
		setCart([]);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				handleAddProductToCart,
				handleRemoveProductOfCart,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
