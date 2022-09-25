import "../styles/editProductStyle.css";
import { useEffect } from "react";
import { useState } from "react";
import Form from "../Form";
import Axios from 'axios';

export default function     EditProduct({ product, setContent, editProduct }) {
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [composition, setComposition] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [status, setStatus] = useState();
    const [colorName, setColorName] = useState();
    const [colorHex, setColorHex] = useState();
    const [colors, setColors] = useState(Object.values(product.color));
    const [sizes, setSizes] = useState(Object.values(product.size));
    const [onSale, setOnSale] = useState(product.onSale);
    const [discount, setDiscount] = useState(product.discount);

    const updateProduct = (async () => {

        var quantity = 0;

        Object.values(sizes).forEach((qnt) => {
            quantity += qnt.sizeQty;
        })

        await Axios.patch("http://localhost:3333/admin",{
                table: '/products',
                id: product.id,
                category: category,
                name: name,
                color: colors,
                size: sizes,
                composition: composition,
                price: price,
                quantity: quantity,
                description: description,
                status: status,
                onSale: onSale,
                discount: discount
        } ,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
        .then((res) => {
            console.log(res.data)
            setContent('');
        })
        .catch((error) => {
            console.log(error);
        });
    })

    const insertNewSize = (() => {
        sizes.push({sizeName: "Inserir Tamanho", sizeQty: 0})
        var newSizes = sizes
        setSizes(Object.values(newSizes));
    })

    const updateSizeValue = ((index, newValue) => {
        Object.values(sizes)[index].sizeQty = parseInt(newValue);
    })

    const updateSizeName = ((index, newValue) => {
        Object.values(sizes)[index].sizeName = newValue;
    })

    const removeSize = ((index) => {
        var currentSizes = Object.values(sizes);
        currentSizes.splice(index, 1)
        setSizes(currentSizes);
    })

    const insertNewColor = ((colorName, colorHex) => {
        colors.push({colorName: colorName, colorHex: colorHex})
        var newColors = colors
        setColors(Object.values(newColors));
    })

    const removeColor = ((index) => {
        var currentColors = Object.values(colors);
        currentColors.splice(index, 1)
        setColors(currentColors);
    })

    useEffect(() => {}, [sizes])
    useEffect(() => {}, [colors])
    useEffect(() => {}, [onSale])
    useEffect(() => {}, [discount])

    return (
        <div className="editProduct-container">

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
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />

                <label className="form-label" htmlFor="productCategory">
                    Categoria
                </label>

                <input
                    className="form-input"
                    type="text"
                    name="productCategory"
                    id="productCategory"
                    defaultValue={product.category}
                    onChange={(e) => {
                        setCategory(e.target.value)
                    }}
                />

                <label className="form-label" htmlFor="productColor">
                    Cores
                </label>

                <div className="form-list">
                    {colors.map((color, index) => {
                        return (
                            <div key={index} className="editProduct-colors">
                                <div className="editProduct-colors_color">
                                    <div
                                        className="editProduct-color-circle"
                                        style={{ backgroundColor: color.colorHex }}
                                    ></div>

                                    <p>{color.colorName}</p>
                                </div>

                                <i
                                    className="ri-delete-bin-fill ri-xl"
                                    onClick={() => {
                                        removeColor(index);
                                    }}
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
                        insertNewColor(colorName, colorHex)
                    }}
                >
                    Adicionar cor
                </button>

                <label className="form-label" htmlFor="productSize">
                    Tamanhos
                </label>

                <>
                    {sizes.map((size, index) => {
                        return(
                            <>
                                {size.sizeName !== 'Inserir Tamanho' &&
                                    <>
                                        <div className="form-list">
                                            <div className="size-label">
                                                <label className="form-label" htmlFor="productSizeName">
                                                    {size.sizeName}
                                                </label>

                                                <i
                                                    className="ri-delete-bin-fill ri-xl"
                                                    onClick={() => {
                                                        removeSize(index);
                                                    }}
                                                ></i>
                                            </div>
                                        </div>

                                        <input
                                            className="form-input"
                                            type="number"
                                            name="productSizeQty"
                                            id="productSizeQty"
                                            defaultValue={size.sizeQty}
                                            onChange={((e) => {
                                                updateSizeValue(index, e.target.value)
                                            })}
                                        />
                                    </>
                                }

                                {size.sizeName === 'Inserir Tamanho' &&
                                    <>
                                        <input
                                            className="form-input"
                                            type="text"
                                            name="productSizeName"
                                            id="productSizeName"
                                            placeholder="Insira o indicador de tamanho"
                                            onChange={((e) => {
                                                updateSizeName(index, e.target.value)
                                            })}
                                        />

                                        <input
                                            className="form-input"
                                            type="text"
                                            name="productSizeQty"
                                            id="productSizeQty"
                                            defaultValue={size.sizeQty}
                                            onChange={((e) => {
                                                updateSizeValue(index, e.target.value)
                                            })}
                                        />
                                    </>
                                }
                            </>
                        )
                    })}

                    <button
                        className="form-btn"
                        onClick={() => {insertNewSize()}}
                    >
                        Adicionar Tamanho
                    </button>
                </>

                <label className="form-label" htmlFor="productComposition">
                    Composição
                </label>

                <input
                    className="form-input"
                    type="text"
                    name="productComposition"
                    id="productComposition"
                    defaultValue={product.composition}
                    onChange={(e) => {
                        setComposition(e.target.value)
                    }}
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
                    onChange={(e) => {
                        setPrice(e.target.value)
                    }}
                />

                <label className="form-label" htmlFor="productDescription">
                    Descrição
                </label>

                <input
                    className="form-input"
                    type="text"
                    name="productDescription"
                    id="productDescription"
                    defaultValue={product.description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
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
                        setStatus(e.target.value)
                    }
                >
                    <option value="none" disabled hidden>
                        Selecione uma opção
                    </option>
                    <option value="Disponível">Disponível</option>
                    <option value="Indisponível">Indisponível</option>
                </select>

                <label className="form-label" htmlFor="type">
                    Desconto
                </label>

                <select
                    className="form-select"
                    name="type"
                    id="type"
                    defaultValue={product.onSale}
                    onChange={(e) =>{
                        if(e.target.value === 'true'){
                            setOnSale(true)
                        }
                        if(e.target.value === 'false'){
                            setOnSale(false)
                        }
                    }}
                >
                    <option value="true">Aplicar</option>
                    <option value="false">Não aplicar</option>
                </select>

                {onSale === true &&
                    <input
                        className="form-input"
                        type="number"
                        name="productSale"
                        id="productSale"
                        defaultValue={discount}
                        onChange={(e) => {
                            setDiscount(e.target.value)
                        }}
                    />
                }

                {onSale === false &&
                    <input
                        className="form-input"
                        type="text"
                        name="productSale"
                        id="productSale"
                        placeholder="Promoção não aplicada."
                        disabled
                    />
                }

                <button
                        className="form-btn"
                        onClick={() => {updateProduct()}}
                >
                    Salvar Alterações
                </button>


                <button className="form-btn" onClick={() => {setContent('')}}>
                    Voltar
                </button>
            </Form>
        </div>
    );
}
