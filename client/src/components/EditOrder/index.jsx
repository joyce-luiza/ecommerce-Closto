import "../styles/editOrderStyle.css";
import { useState } from "react";
import Form from "../Form";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Axios from "axios";

export default function EditOrder({ order, setContent }) {
    const [updatedStatus, setUpdatedStatus] = useState();
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

    function handleStatus() {
        Axios.patch(
            "http://localhost:3333/admin",
            {
                table: "/orders",
                id: order.id,
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
        <Form title={`Pedido #${order.id}`}>
            <div className="order-header-info">
                <p>
                    <span>Status:</span> {order.status}
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

            <label className="form-label " htmlFor="orderStatus">
                ATUALIZAR STATUS DO PEDIDO
            </label>
            <select
                className="form-select"
                name="orderStatus"
                id="orderStatus"
                defaultValue={order.status}
                onChange={(e) => setUpdatedStatus(e.target.value)}
            >
                <option value="none" disabled hidden>
                    Selecione uma opção
                </option>
                <option value="Pedido realizado">Pedido realizado</option>
                <option value="Pagamento confirmado">
                    Pagamento confirmado
                </option>
                <option value="Enviado">Enviado</option>
                <option value="Em troca">Em troca</option>
                <option value="Em devolução">Em devolução</option>
                <option value="Cancelado">Cancelado</option>
            </select>
            <div className="order-address">
                <label className="order-label">Endereço de entrega</label>
                {/* <h1>{order.shippingAddress.title}</h1> */}
                <p>
                    {order.shippingAddress.publicPlace},{" "}
                    {order.shippingAddress.number}
                </p>
                <p>{order.shippingAddress.note}</p>
                <p>
                    {order.shippingAddress.city} - {order.shippingAddress.state}
                    , CEP: {order.shippingAddress.cep}
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
                        </div>
                    );
                })}
            </div>
            <div className="order-payment">
                <label className="order-label">Valor da compra</label>
                <div className="order-items-value">
                    <h1>Produtos</h1>
                    <p>R$ {order.total - order.shipping}</p>
                </div>
                <div className="order-items-shipping">
                    <h1>Frete</h1>
                    <p>R$ {order.shipping}</p>
                </div>
                <hr></hr>
                <div className="order-items-total">
                    <h1>Total</h1>
                    <p>R$ {order.total}</p>
                </div>
            </div>
            <div className="order-payment-method">
                <label className="order-label">Método de pagamento</label>
                {order.paymentMethod === "CreditCard" && (
                    <div className="order-credit-cards">
                        {order.payment.map((cards) => {
                            return cards.map((card, index) => {
                                return (
                                    <div className="order-credit-card-info">
                                        <div>
                                            <p> {card.number}</p>
                                            <p>{card.flag}</p>
                                        </div>
                                        <div>
                                            <p>R$ {card.toPay}</p>
                                            <p>{`${card.installments}x R$${
                                                card.toPay / card.installments
                                            }`}</p>
                                        </div>
                                    </div>
                                );
                            });
                        })}
                    </div>
                )}
            </div>
            <button
                className="form-btn"
                onClick={() => {
                    handleStatus();
                }}
            >
                Salvar Alterações
            </button>
            <button className="form-btn" onClick={() => setContent("Pedidos")}>
                Voltar
            </button>
        </Form>
    );
}
