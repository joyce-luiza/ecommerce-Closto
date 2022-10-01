import { useEffect } from "react";
import { useContext, useState } from "react"
import { CartContext } from "../../contexts/CartContext"
import Axios from 'axios';

function CartItem({product, index}) {
    const [productDetails, setProductDetails] = useState({})
    const {cart, handleRemoveProductOfCart, handleAddProductToCart} = useContext(CartContext)

    const getProductsDetails = (async () => {
        await Axios.post("http://localhost:3333/product", {
            id: product.id
        })
        .then((res) => {
            res.data.color = product.color;
            res.data.size = product.size;
            setProductDetails(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    });

    useEffect(() => {
        getProductsDetails();
    }, [])

    return (
        <div key={index} className="productCard">
            <div className="productName">
                <h3>{productDetails.name} • {product.color.colorName} • {product.size.sizeName}</h3>
            </div>

            <span className="productUnitPrice">
                R$ {product.price}
            </span>

            <div className="cartOperations">

                <div className="cartOperation_quantity">
                    <span>Quantidade: {cart[index].qtd}</span>
                    <button onClick={() => handleAddProductToCart(product.id, product.price, product.color, product.size)}> + </button>
                    <button onClick={() => handleRemoveProductOfCart(product.id, product.color, product.size, productDetails.category   )}> - </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem;