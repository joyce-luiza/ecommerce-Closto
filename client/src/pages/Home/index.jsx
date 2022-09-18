import "../../styles/HomeStyle.css";
import Product from "../../components/Product";
import ProductProfile from "../../components/ProductProfile";
import { useState, useEffect } from "react";
import Axios from "axios";

function Home() {
    const [content, setContent] = useState("");
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        await Axios.get("http://localhost:3333/products", {})
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const productSample = { name: "product", price: "$20" };

    useEffect(() => {
        getProducts();
    }, []);

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
                                />
                            );
                        })}
                    </section>
                </>
            )}

            {content === "productProfile" && (
                <ProductProfile product={product} setContent={setContent} />
            )}
        </section>
    );
}

export default Home;
