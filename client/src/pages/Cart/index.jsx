import "../../styles/Cart.css";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import CartItem from "../../components/CartItem";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Form from "../../components/Form";

import { useEffect } from "react";

function Cart() {
    const { cart, clearCart } = useContext(CartContext);
    const [userCreditCards, setUserCreditCards] = useState([]);
    const [userAddresses, setUserAddresses] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({});
    const [newAddress, setNewAddress] = useState({});

    const [paymentCards, setPaymentCards] = useState([]);
    const [newCreditCard, setNewCreditCard] = useState({});
    const [content, setContent] = useState("");

    const addCardToPayment = (creditCard, checked) => {
        if (checked) {
            creditCard.checked = checked;
            setPaymentCards([...paymentCards, creditCard]);
        } else {
            creditCard.checked = checked;
            const filteredPaymentCards = paymentCards.filter(
                (card) => card.id !== creditCard.id
            );
            setPaymentCards(filteredPaymentCards);
        }
    };

    const addValueToCardToPayment = (creditCard, value) => {
        creditCard.toPay = value;
    };

    const getCreditCards = async () => {
        await Axios.get("http://localhost:3333/user/cards", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                setUserCreditCards(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAddresses = async () => {
        await Axios.get("http://localhost:3333/user/addresses", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                setUserAddresses(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addCreditCard = async (e) => {
        await Axios.post(
            "http://localhost:3333/user/cards",
            {
                cardHolderName: newCreditCard.cardHolderName,
                number: newCreditCard.number,
                serviceCode: newCreditCard.serviceCode,
                flag: newCreditCard.flag,
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("session"),
                },
            }
        )

            .then((res) => {
                showToast("success", "Cartão de crédito inserido com sucesso!");
                setContent("");
            })
            .catch((error) => {
                showToast(
                    "error",
                    "Não foi possível inserir o cartão de crédito!"
                );
                console.log(error);
            });
    };

    const addNeWAddress = async (e) => {
        await Axios.post(
            "http://localhost:3333/user/addresses",
            {
                title: newAddress.title,
                type: newAddress.type,
                residenceType: newAddress.residenceType,
                cep: newAddress.cep,
                publicPlaceType: newAddress.publicPlaceType,
                publicPlace: newAddress.publicPlace,
                number: newAddress.number,
                neighborhood: newAddress.neighborhood,
                city: newAddress.city,
                state: newAddress.state,
                country: newAddress.country,
                note: newAddress.note,
                isPrincipal: newAddress.isPrincipal,
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("session"),
                },
            }
        )

            .then((res) => {
                showToast("success", "Endereço inserido com sucesso!");
                setContent("");
            })
            .catch((error) => {
                showToast("error", "Não foi possível inserir o endereço!");
                console.log(error);
            });
    };

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

    useEffect(() => {
        getCreditCards();
        getAddresses();
    }, [content]);

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
            {content === "" && (
                <section className="cart-container">
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        draggable
                    />
                    <div>
                        <div className="cartContent">
                            <div className="cartContent-title">
                                <h1>Meu carrinho</h1>
                                <button onClick={clearCart}>Limpar</button>
                            </div>
                            {cart.map((product, index) => {
                                return (
                                    <CartItem
                                        key={index}
                                        product={product}
                                        index={index}
                                    />
                                );
                            })}
                        </div>

                        <div className="cartCreditCards">
                            <h1>Cartões cadastrados</h1>
                            <button
                                onClick={() => {
                                    setContent("newCreditCard");
                                }}
                            >
                                Adicionar novo cartão
                            </button>

                            {userCreditCards.map((creditCard) => {
                                return (
                                    <>
                                        <div className="cardCheckbox">
                                            <label
                                                for={`card-${creditCard.id}`}
                                            >
                                                {creditCard.number}
                                            </label>
                                            <input
                                                type="checkbox"
                                                id={`card-${creditCard.id}`}
                                                name={`card-${creditCard.id}`}
                                                onChange={(e) => {
                                                    addCardToPayment(
                                                        creditCard,
                                                        e.target.checked
                                                    );
                                                    console.log(creditCard);
                                                }}
                                            />
                                        </div>

                                        {creditCard.checked && (
                                            <>
                                                <label for="valueToPay">
                                                    Insira o valor a ser
                                                    cobrado:{" "}
                                                </label>
                                                <input
                                                    type="number"
                                                    name="valueToPay"
                                                    id="valueToPay"
                                                    onChange={(e) => {
                                                        addValueToCardToPayment(
                                                            creditCard,
                                                            parseFloat(
                                                                e.target.value
                                                            )
                                                        );
                                                    }}
                                                />
                                            </>
                                        )}
                                    </>
                                );
                            })}
                        </div>

                        <div className="cartAddresses">
                            <h1>Endereço de entrega</h1>
                            <button
                                onClick={() => {
                                    setContent("newAddresses");
                                }}
                            >
                                Adicionar novo endereço
                            </button>

                            <fieldset>
                                {userAddresses.map((address) => {
                                    return (
                                        <>
                                            <input
                                                type="radio"
                                                id={`address-${address.id}`}
                                                name={`address-name`}
                                                value={address}
                                                onClick={(e) => {
                                                    setShippingAddress(
                                                        e.target.value
                                                    );
                                                    console.log(
                                                        shippingAddress
                                                    );
                                                }}
                                            />
                                            <label
                                                for={`address-${address.id}`}
                                            >
                                                {address.title} •{" "}
                                                {address.publicPlaceType}{" "}
                                                {address.publicPlace}
                                            </label>
                                        </>
                                    );
                                })}
                            </fieldset>
                        </div>
                    </div>
                </section>
            )}
            {content === "newCreditCard" && (
                <Form title="Novo cartão de crédito">
                    <label className="form-label" htmlFor="cardHolderName">
                        Nome impresso
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="cardHolderName"
                        id="cardHolderName"
                        placeholder=""
                        onChange={(e) =>
                            setNewCreditCard((prevState) => ({
                                ...prevState,
                                cardHolderName: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="number">
                        Número
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="number"
                        id="number"
                        placeholder=""
                        onChange={(e) =>
                            setNewCreditCard((prevState) => ({
                                ...prevState,
                                number: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="serviceCode">
                        CVV
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="serviceCode"
                        id="serviceCode"
                        placeholder=""
                        onChange={(e) =>
                            setNewCreditCard((prevState) => ({
                                ...prevState,
                                serviceCode: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="flag">
                        Bandeira
                    </label>
                    <select
                        className="form-select"
                        name="flag"
                        id="flag"
                        defaultValue="none"
                        onChange={(e) =>
                            setNewCreditCard((prevState) => ({
                                ...prevState,
                                flag: e.target.value,
                            }))
                        }
                    >
                        <option value="none" disabled hidden>
                            Selecione uma opção
                        </option>
                        <option value="visa">Visa</option>
                        <option value="mastercard">Mastercard</option>
                        <option value="elo">Elo</option>
                    </select>

                    <button
                        id="submitNewCreditCard"
                        className="form-btn"
                        type="submit"
                        onClick={() => {
                            addCreditCard(newCreditCard);
                        }}
                    >
                        Adicionar cartão
                    </button>

                    <button className="form-btn" onClick={() => setContent("")}>
                        Voltar
                    </button>
                </Form>
            )}
            {content === "newAddresses" && (
                <Form title="Novo endereço">
                    <label className="form-label" htmlFor="title">
                        Título
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Casa na praia, Apartamento 404..."
                        onChange={(e) =>
                            setNewAddress((prevState) => ({
                                ...prevState,
                                title: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="type">
                        Tipo de endereço
                    </label>
                    <select
                        className="form-select"
                        name="type"
                        id="type"
                        defaultValue="none"
                        onChange={(e) =>
                            setNewAddress((prevState) => ({
                                ...prevState,
                                type: e.target.value,
                            }))
                        }
                    >
                        <option value="none" disabled hidden>
                            Selecione uma opção
                        </option>
                        <option value="Entrega">Entrega</option>
                        <option value="Cobrança">Cobrança</option>
                    </select>

                    <label className="form-label" htmlFor="residenceType">
                        Tipo residência
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="residenceType"
                        id="residenceType"
                        placeholder="Casa, apartamento, etc..."
                        onChange={(e) =>
                            setNewAddress((prevState) => ({
                                ...prevState,
                                residenceType: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="cep">
                        CEP
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="cep"
                        id="cep"
                        placeholder="00000-000"
                        onChange={(e) =>
                            setNewAddress((prevState) => ({
                                ...prevState,
                                cep: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="publicPlaceType">
                        Tipo logradouro
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="publicPlaceType"
                        id="publicPlaceType"
                        placeholder="Rua, Avenida, etc..."
                        onChange={(e) =>
                            setNewAddress((prevState) => ({
                                ...prevState,
                                publicPlaceType: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="publicPlace">
                        Logradouro
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="publicPlace"
                        id="publicPlace"
                        onChange={(e) =>
                            setNewAddress((prevState) => ({
                                ...prevState,
                                publicPlace: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="neighborhood">
                        Bairro
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="neighborhood"
                        id="neighborhood"
                        onChange={(e) =>
                            setNewAddress((prevState) => ({
                                ...prevState,
                                neighborhood: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="number">
                        Número
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="number"
                        id="number"
                        onChange={(e) =>
                            setNewAddress((prevState) => ({
                                ...prevState,
                                number: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="city">
                        Cidade
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="city"
                        id="city"
                        onChange={(e) =>
                            setNewAddress((prevState) => ({
                                ...prevState,
                                city: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="state">
                        Estado
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="state"
                        id="state"
                        onChange={(e) =>
                            setNewAddress((prevState) => ({
                                ...prevState,
                                state: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="country">
                        País
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="country"
                        id="country"
                        onChange={(e) =>
                            setNewAddress((prevState) => ({
                                ...prevState,
                                country: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="note">
                        Observações
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="note"
                        id="note"
                        onChange={(e) =>
                            setNewAddress((prevState) => ({
                                ...prevState,
                                note: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="isPrincipal">
                        Deseja que este seja seu endereço principal?
                    </label>
                    <select
                        className="form-select"
                        name="isPrincipal"
                        id="isPrincipal"
                        defaultValue="none"
                        onChange={(e) =>
                            setNewAddress((prevState) => ({
                                ...prevState,
                                isPrincipal: e.target.value,
                            }))
                        }
                    >
                        <option value="none" disabled hidden>
                            Selecione uma opção
                        </option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>

                    <button
                        id="submitNewAddress"
                        className="form-btn"
                        type="submit"
                        onClick={() => {
                            addNeWAddress(newAddress);
                        }}
                    >
                        Adicionar endereço
                    </button>

                    <button className="form-btn">Voltar</button>
                </Form>
            )}
        </div>
    );
}

export default Cart;
