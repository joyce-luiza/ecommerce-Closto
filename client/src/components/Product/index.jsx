import "../styles/productStyle.css";

export default function Product({ product, setContent, setProduct }) {
    return (
        <div
            className="product-container"
            onClick={() => {
                setContent("productProfile");
                setProduct(product);
            }}
        >
            <img
                className="product-image"
                src="https://via.placeholder.com/260x400"
                alt={product.name}
            ></img>
            <div className="product-info">
                <h1 className="product-name">{product.name}</h1>
                <p className="product-price">{product.price}</p>
            </div>
        </div>
    );
}
