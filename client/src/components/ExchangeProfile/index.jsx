import "../styles/editOrderStyle.css";
import Form from "../Form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Axios from "axios";
import showToast from "../Toast";
import "../styles/exchangeProfileStyle.css";
import bcrypt from "bcryptjs";

export default function ExchangeProfile({ user, exchange, setContent }) {
    const [updatedStatus, setUpdatedStatus] = useState();
    const [couponValue, setCouponValue] = useState();
    const [couponCode, setCouponCode] = useState();

    const createCouponCode = (string) => {
        let code = bcrypt.hashSync(string, 8);
        setCouponCode(code);
    };

    const productsValue = () => {
        let totalValue = 0;
        exchange.products.map((product) => {
            return (totalValue += product.price);
        });
        setCouponValue(totalValue);
    };

    const createCoupon = async () => {
        createCouponCode(`${exchange.user_id}${exchange.createdAt}`);
        productsValue();
        await Axios.post(
            "http://localhost:3333/admin",
            {
                table: "/coupons",
                code: couponCode,
                couponType: "Troca",
                discountType: "Valor",
                discountValue: couponValue,
                minValue: couponValue,
                quantity: 1,
                active: true,
                userId: exchange.user_id,
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("session"),
                },
            }
        )
            .then((res) => {
                if (res.data[0]) {
                    showToast("error", "Não foi possível criar o cupom!");
                }
                console.log(res);
                showToast("success", "Cupom criado com sucesso");
            })
            .catch((error) => {
                console.log(error);
            });
        await Axios.patch(
            "http://localhost:3333/admin",
            {
                table: "/exchanges",
                id: exchange.id,
                status: "Cupom gerado",
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("session"),
                },
            }
        );
    };

    function handleStatus() {
        Axios.patch(
            "http://localhost:3333/admin",
            {
                table: "/exchanges",
                id: exchange.id,
                status: updatedStatus,
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("session"),
                },
            }
        )
            .then((res) => {
                if (res.data[0]) {
                    showToast(
                        "error",
                        "Não foi possível atualizar as informações!"
                    );
                    return;
                }
                showToast("success", "Informações atualizadas com sucesso");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="container">
            <button
                className="btn btn-secondary"
                onClick={() => {
                    setContent("Trocas");
                }}
            >
                Voltar
            </button>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />
            <h1>Pedido de Troca</h1>

            <div className="exchange-header-info">
                <div className="exchange-info">
                    <p>
                        <span>Número do pedido:</span> {exchange.id}
                    </p>
                    <p>
                        <span>Data:</span>{" "}
                        {new Date(exchange.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                        <span>Valor: </span>
                        R$ {exchange.total}
                    </p>
                    {user === "user" && (
                        <p>
                            <span>Status: </span>
                            {exchange.status}
                        </p>
                    )}
                </div>
                {user === "admin" && (
                    <>
                        <div className="exchange-status">
                            <div>
                                <label
                                    className="form-label "
                                    htmlFor="exchangeStatus"
                                >
                                    ATUALIZAR STATUS DA TROCA
                                </label>
                                <select
                                    name="exchangeStatus"
                                    id="exchangeStatus"
                                    defaultValue={exchange.status}
                                    onChange={(e) =>
                                        setUpdatedStatus(e.target.value)
                                    }
                                >
                                    <option value="none" disabled hidden>
                                        Selecione uma opção
                                    </option>
                                    <option value="Pedido de troca realizado">
                                        Pedido de troca realizado
                                    </option>
                                    <option value="Aguardando envio dos produtos">
                                        Aguardando envio dos produtos
                                    </option>
                                    <option value="Produtos recebidos">
                                        Produtos recebidos
                                    </option>
                                    <option value="Cupom gerado">
                                        Cupom gerado
                                    </option>
                                    <option value="Pedido recusado">
                                        Pedido recusado
                                    </option>
                                </select>
                            </div>
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    createCoupon();
                                }}
                            >
                                Gerar cupom
                            </button>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                handleStatus();
                            }}
                        >
                            Salvar Alterações
                        </button>
                    </>
                )}
            </div>
            <div className="exchange-items">
                <label className="order-label">Produtos</label>
                {exchange.products.map((product, index) => {
                    return (
                        <div className="exchange-item">
                            <div className="item-info">
                                <h1 className="exchange-item-name">
                                    {product.name}
                                </h1>
                                <span className="exchange-item-color">
                                    {product.color.colorName}
                                </span>
                                <span className="exchange-item-size">
                                    {product.size.sizeName}
                                </span>
                            </div>
                            <span className="order-item-qty">
                                Qtd. {product.qtd}
                            </span>
                        </div>
                    );
                })}
            </div>
            <Form>
                <label className="form-label" htmlFor="description">
                    Motivo da troca
                </label>
                <p>{exchange.description}</p>
            </Form>
        </div>
    );
}
