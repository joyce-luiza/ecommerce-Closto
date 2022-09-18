import "../styles/productProfileStyle.css";
import "remixicon/fonts/remixicon.css";
import { useState } from "react";

export default function ProductProfile({ product, setContent }) {
    const [color, setColor] = useState("Selecione uma cor");

    const findColor = (hex) => {
        for (const color in product.color[0]) {
            if (hex === product.color[0][color]) {
                setColor(color);
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
                            Cor: <span>{color}</span>
                        </p>
                        <div className="productProfile-colors-container">
                            {product.color.map((color) => {
                                return Object.values(color).map((hex) => {
                                    return (
                                        <div
                                            className="productProfile-color"
                                            style={{ backgroundColor: hex }}
                                            onClick={() => findColor(hex)}
                                        ></div>
                                    );
                                });
                            })}
                            <div className="productProfile-color color-1"></div>
                            <div className="productProfile-color color-2"></div>
                        </div>
                    </div>
                    <div className="productProfile-sizes">
                        <p>Tamanho:</p>
                        <div className="productProfile-size-container">
                            <div className="productProfile-size">XP</div>
                            <div className="productProfile-size">P</div>
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
