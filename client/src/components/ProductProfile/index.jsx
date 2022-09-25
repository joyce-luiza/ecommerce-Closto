import "../styles/productProfileStyle.css";
import "remixicon/fonts/remixicon.css";
import { useState } from "react";

export default function ProductProfile({ product, setContent }) {
    const [color, setColor] = useState("Selecione uma cor");

    const findColor = (hex) => {
        for (let index = 0; index < product.color.length; index++) {
            if(hex === product.color[index].colorHex){
                setColor(product.color[index])
            }
        }
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
                        <i class="ri-heart-line ri-2x"></i>
                    </div>
                    <p className="productProfile-price">
                        {product.price}
                        <span>x2 R${product.price / 2}</span>
                    </p>
                    <div className="productProfile-colors">
                        <p>
                            Cor: <span>{color.colorName}</span>
                        </p>
                        <div className="productProfile-colors-container">
                            {product.color.map((color, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="productProfile-color"
                                        style={{ backgroundColor: color.colorHex }}
                                        onClick={() => findColor(color.colorHex)}
                                    ></div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="productProfile-sizes">
                        <p>Tamanho:</p>
                        <div className="productProfile-size-container">
                            {product.size.map((size, index) => {
                                if (size.sizeQty !== 0) {
                                    return (
                                        <div
                                            key={index}
                                            className="productProfile-size"
                                        >
                                            {size.sizeName}
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>

                    <button className="productProfile-buyBtn">Comprar</button>

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
