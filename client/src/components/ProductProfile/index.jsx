import "../styles/productProfileStyle.css";
import "remixicon/fonts/remixicon.css";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

export default function ProductProfile({ product, setContent }) {
    const [color, setColor] = useState({ colorName: "Selecione uma cor" });
    const [size, setSize] = useState({ sizeName: "Selecione um tamanho" });

    const { handleAddProductToCart } = useContext(CartContext);

    const findColor = (hex) => {
        for (let index = 0; index < product.color.length; index++) {
            if (hex === product.color[index].colorHex) {
                setColor(product.color[index]);
                return;
            }
        }
    };

    const findSize = (size) => {
        setSize({ sizeName: size });
    };

    return (
        <>
            <button onClick={() => setContent("")}>voltar</button>
            <div className="productProfile-container">
                <img
                    className="productProfile-image"
                    src="https://via.placeholder.com/502x664"
                    alt={product.name}
                ></img>

                <div className="productProfile-info">
                    <div className="productProfile-header">
                        <h1 className="productProfile-name">{product.name}</h1>
                        <i className="ri-heart-line ri-2x"></i>
                    </div>
                    <p className="productProfile-price">
                        R$ {product.price}
                        <span>x2 R$ {product.price / 2}</span>
                    </p>
                    <div className="productProfile-colors">
                        <p>
                            Cor: <span>{color.colorName}</span>
                        </p>
                        <div className="productProfile-colors-container">
                            {product.color.map((color, index) => {
                                return (
                                    <div
                                        id={`productProfile-color-${index}`}
                                        key={index}
                                        className="productProfile-color"
                                        style={{
                                            backgroundColor: color.colorHex,
                                        }}
                                        onClick={() => {
                                            findColor(color.colorHex);
                                        }}
                                    ></div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="productProfile-sizes">
                        <p>Tamanho: {size.sizeName}</p>
                        <div className="productProfile-size-container">
                            {product.size.map((size, index) => {
                                if (size.sizeQty !== 0) {
                                    return (
                                        <div
                                            id={`productProfile-size-${index}`}
                                            key={index}
                                            className="productProfile-size"
                                            onClick={() => {
                                                findSize(size.sizeName);
                                            }}
                                        >
                                            {size.sizeName}
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>

                    <button
                        className="productProfile-buyBtn"
                        onClick={() => {
                            handleAddProductToCart(
                                product.id,
                                product.name,
                                product.price,
                                color,
                                size
                            );
                        }}
                    >
                        Comprar
                    </button>

                    <div className="productProfile-shipping">
                        <p>Calcular frete:</p>
                        <div>
                            <input type="text" />
                            <button>Calcular</button>
                        </div>
                    </div>

                    <div className="productProfile-description">
                        <h1>Descrição</h1>
                        <p>{product.description}</p>
                    </div>

                    <div className="productProfile-composition">
                        <h1>Composição</h1>
                        <p>{product.composition}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
