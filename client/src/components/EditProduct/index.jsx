import { useState } from "react";
import Form from "../Form";
import "../styles/editProductStyle.css";

export default function EditProduct({ product, setContent, editProduct }) {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [colorName, setColorName] = useState();
    const [colorHex, setColorHex] = useState();
    const [updatedSize, setUpdatedSize] = useState(product.size);
    const [qtdSize, setQtdSize] = useState();

    return (
        <div className="editProduct-container">
            <button className="editProduct-back" onClick={() => setContent("")}>
                voltar
            </button>
            <Form title={`Produto #${product.id}`}>
                <label className="form-label" htmlFor="productName">
                    Nome
                </label>
                <input
                    className="form-input"
                    type="text"
                    name="productName"
                    id="productName"
                    defaultValue={product.name}
                    onChange={(e) =>
                        setUpdatedProduct((prevState) => ({
                            ...prevState,
                            name: e.target.value,
                        }))
                    }
                />
                <label className="form-label" htmlFor="productColor">
                    Cores
                </label>
                <div className="editProduct-colors-container">
                    {product.color.map((color, index) => {
                        return (
                            <div key={index} className="editProduct-colors">
                                <div
                                    className="editProduct-color-circle"
                                    style={{ backgroundColor: color.colorHex }}
                                ></div>
                                <p>{color.colorName}</p>
                                <i
                                    className="ri-delete-bin-fill ri-xl"
                                    onClick={() => {}}
                                ></i>
                            </div>
                        );
                    })}
                </div>
                <h3>Adicionar nova cor</h3>
                <label className="form-label" htmlFor="productNewColor">
                    Nome da cor
                </label>
                <input
                    className="form-input"
                    type="text"
                    name="productNewColor"
                    id="productNewColor"
                    onChange={(e) => setColorName(e.target.value)}
                />
                <label className="form-label" htmlFor="productColorHex">
                    Hexadecimal
                </label>
                <input
                    className="form-input"
                    type="color"
                    name="productColorHex"
                    id="productColorHex"
                    onChange={(e) => setColorHex(e.target.value)}
                ></input>
                <button
                    className="form-btn"
                    onClick={() => {
                        setUpdatedProduct((prevState) => ({
                            ...prevState,
                            color: [
                                ...prevState.color,
                                {
                                    colorName: colorName,
                                    colorHex: colorHex,
                                },
                            ],
                        }));
                    }}
                >
                    Adicionar cor
                </button>
                {/* onChange=
                {(e) =>
                    setUpdatedProduct((prevState) => ({
                        ...prevState,
                        size: [
                            ...prevState.size,
                            {
                                size: size,
                                qtdSize: qtdSize,
                            },
                        ],
                    }))
                } */}
                <h3>Editar tamanhos</h3>
                <div className="editProduct-size-container">
                    {product.size.map((size, index) => {
                        return (
                            <div key={index} className="editProduct-sizes">
                                <label>{size.sizeName}</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    name="productQtdSize"
                                    defaultValue={size.sizeQty}
                                    id="productQtdSize"
                                    onChange={(e) => {
                                        console.log(updatedSize);
                                        setUpdatedSize((prevState) => ({
                                            size: [
                                                ...prevState,
                                                {
                                                    sizeName: size.sizeName,
                                                    sizeQty: e.target.value,
                                                },
                                            ],
                                        }));
                                        console.log(updatedSize);
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
                <button className="form-btn" onClick={() => {}}>
                    Adicionar tamanho
                </button>
                <label className="form-label" htmlFor="productComposition">
                    Composição
                </label>
                <input
                    className="form-input"
                    type="text"
                    name="productComposition"
                    id="productComposition"
                    defaultValue={product.composition}
                    onChange={(e) =>
                        setUpdatedProduct((prevState) => ({
                            ...prevState,
                            composition: e.target.value,
                        }))
                    }
                />
                <label className="form-label" htmlFor="productPrice">
                    Preço
                </label>
                <input
                    className="form-input"
                    type="text"
                    name="productPrice"
                    id="productPrice"
                    defaultValue={product.price}
                    onChange={(e) =>
                        setUpdatedProduct((prevState) => ({
                            ...prevState,
                            price: e.target.value,
                        }))
                    }
                />
                <label className="form-label" htmlFor="productDescription">
                    Descrição
                </label>
                <textarea
                    className="form-input"
                    type="text"
                    name="productDescription"
                    id="productDescription"
                    defaultValue={product.description}
                    onChange={(e) =>
                        setUpdatedProduct((prevState) => ({
                            ...prevState,
                            description: e.target.value,
                        }))
                    }
                />
                <label className="form-label" htmlFor="type">
                    Status
                </label>
                <select
                    className="form-select"
                    name="type"
                    id="type"
                    defaultValue={product.status}
                    onChange={(e) =>
                        setUpdatedProduct((prevState) => ({
                            ...prevState,
                            status: e.target.value,
                        }))
                    }
                >
                    <option value="none" disabled hidden>
                        Selecione uma opção
                    </option>
                    <option value="Disponível">Disponível</option>
                    <option value="Indisponível">Indisponível</option>
                </select>
                <button
                    id="submitUpdatedProduct"
                    className="form-btn"
                    type="submit"
                    onClick={() => editProduct(updatedProduct.id, "products")}
                >
                    Salvar alterações
                </button>
            </Form>
        </div>
    );
}
