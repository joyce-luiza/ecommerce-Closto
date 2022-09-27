import "../../styles/HomeStyle.css";
import Product from "../../components/Product";
import ProductProfile from "../../components/ProductProfile";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";

function Home() {
    const [content, setContent] = useState("");
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

    const addToCart = ((product) => {
        cartProducts.push(product)
        updateCart();
    });

    const updateCart = async () => {
        console.log(cartProducts)
        await Axios.patch("http://localhost:3333/user/cart", {products: cartProducts}, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                setCartProducts(res.data.products);
                showToast('success', "Produto adicionado com sucesso.")
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getCart = async () => {
        await Axios.get("http://localhost:3333/user/cart", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                if(res.data === null) {
                    return;
                }
                setCartProducts(res.data);
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

    const showToast = (type, text) => {
        if (type === "success") {
            return toast.success(text, {
                className: "SuccessToast",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        if (type === "error") {
            return toast.error(text, {
                className: "ErrorToast",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        return;
    };

    return (
        <section className="product-content">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />

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
