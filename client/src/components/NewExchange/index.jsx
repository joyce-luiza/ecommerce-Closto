import "../styles/editOrderStyle.css";
import { useState } from "react";
import Form from "../Form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Axios from "axios";
import showToast from "../Toast";

export default function NewExchange({ order, setContent }) {
    const [exchangeProducts, setExchangeProducts] = useState([]);
    const [description, setDescription] = useState("");
    const [updatedOrder, setUpdatedOrder] = useState(order);

    const validateExchange = () => {
        if (exchangeProducts[0]) {
            if (description) {
                createExchange();
            } else {
                showToast("error", "Informe o motivo da troca!");
            }
        } else {
            showToast("error", "Selecione os produtos a serem trocados!");
        }
    };

    const productsValue = () => {
        let totalValue = 0;
        exchangeProducts.map((product) => {
            return (totalValue += product.price);
        });
        return totalValue;
    };

    const addExchangeProduct = (product, checked) => {
        if (checked) {
            product.checked = checked;
            setExchangeProducts([...exchangeProducts, product]);
            console.log(exchangeProducts);
        } else {
            product.checked = checked;
            const filteredExchangeProducts = exchangeProducts.filter(
                (prod) => prod.id !== product.id
            );
            setExchangeProducts(filteredExchangeProducts);
            console.log(exchangeProducts);
        }
    };

    const createExchange = async () => {
        setUpdatedOrder({ ...updatedOrder, status: "Em troca" });
        await Axios.post(
            "http://localhost:3333/user/exchanges",
            {
                order_id: order.id,
                products: exchangeProducts,
                status: "Pedido de troca recebido",
                coupon: {},
                description: description,
                value: productsValue(),
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("session"),
                },
            }
        )
            .then((res) => {
                showToast("success", "Pedido de troca realizado com sucesso!");
            })
            .catch((error) => {
                showToast(
                    "error",
                    "Não foi possível realizar o pedido de troca!"
                );
            });
        await Axios.patch("http://localhost:3333/user/orders", updatedOrder, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        });
    };

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />
            <h1>Nova Troca</h1>
            <button
                onClick={() => {
                    setContent("Pedidos Trocáveis");
                }}
            >
                Voltar
            </button>
            <div className="order-header-info">
                <p>
                    <span>Número do pedido:</span> {order.id}
                </p>
                <p>
                    <span>Data:</span>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                    <span>Valor: </span>
                    R$ {order.total}
                </p>
            </div>
            <div className="order-items">
                <label className="order-label">Produtos</label>
                {order.products.map((product, index) => {
                    return (
                        <div className="order-item">
                            <div className="item-info">
                                <h1 className="order-item-name">
                                    {product.name}
                                </h1>
                                <span className="order-item-color">
                                    {product.color.colorName}
                                </span>
                                <span className="order-item-size">
                                    {product.size.sizeName}
                                </span>
                            </div>
                            <span className="order-item-qty">
                                Qtd. {product.qtd}
                            </span>
                            <input
                                type="checkbox"
                                id={`product-${product.id}`}
                                name={`product-${product.id}`}
                                onChange={(e) => {
                                    addExchangeProduct(
                                        product,
                                        e.target.checked
                                    );
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <Form>
                <label className="form-label" htmlFor="description">
                    Informe o motivo da troca
                </label>
                <textarea
                    className="form-input"
                    type="text"
                    name="description"
                    id="description"
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        validateExchange();
                    }}
                >
                    Solicitar troca
                </button>
            </Form>
        </div>
    );
}
