import "../../styles/HomeStyle.css";
import Product from "../../components/Product";
import ProductProfile from "../../components/ProductProfile";
import { useState, useEffect } from "react";
import Axios from "axios";

function Home() {
    const [content, setContent] = useState("");
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
        // updateCart(product);
    };

    const updateCart = async (product) => {
        await Axios.patch("http://localhost:3333/user/cart", product, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                setCart(res.data);
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getCart = async (cart) => {
        await Axios.get("http://localhost:3333/user/cart", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                // console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getProducts = async () => {
        await Axios.get("http://localhost:3333/products", {})
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getProducts();
        getCart();
    }, [content]);

    return (
        <section className="product-content">
            {content === "" && (
                <>
                    <h1>Products</h1>
                    <p>algum texto</p>
                    <section className="products">
                        {products.map((product) => {
                            return (
                                <Product
                                    key={product.id}
                                    product={product}
                                    setContent={setContent}
                                    setProduct={setProduct}
                                    addToCart={addToCart}
                                />
                            );
                        })}
                    </section>
                </>
            )}

            {content === "productProfile" && (
                <ProductProfile
                    product={product}
                    setContent={setContent}
                    addToCart={addToCart}
                />
            )}
        </section>
    );
}

export default Home;
