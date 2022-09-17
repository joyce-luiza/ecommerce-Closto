import Axios from "axios";
import { useEffect, useState } from "react";
import CreditCard from "../CreditCard";
import Form from "../Form";
import ItemList from "../ItemList";

export default function ListUserCreditCards({ showToast }) {
    const [creditCard, setCreditCard] = useState({});
    const [crudCreditCard, setCrudCreditCard] = useState("get");
    const [userCreditCard, setUserCreditCard] = useState([]);

    const deleteCreditCard = async (id) => {
        await Axios.delete("http://localhost:3333/user/cards", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
            data: { id: id },
        })
            .then((res) => {
                showToast("success", "Cartão de crédito removido com sucesso!");
                getCreditCards();
            })
            .catch((err) => {
                showToast("error", "Erro ao remover cartão de crédito!");
                console.log(err);
            });
    };

    const editCreditCard = async () => {
        await Axios.patch("http://localhost:3333/user/cards", creditCard, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })

            .then((res) => {
                showToast("success", "Cartão de crédito editado com sucesso!");
                setCrudCreditCard("get");
            })
            .catch((error) => {
                showToast(
                    "error",
                    "Não foi possível editar o cartão de crédito!"
                );
                console.log(error);
            });
    };

    const addCreditCard = async (e) => {
        await Axios.post(
            "http://localhost:3333/user/cards",
            {
                cardHolderName: creditCard.cardHolderName,
                number: creditCard.number,
                serviceCode: creditCard.serviceCode,
                flag: creditCard.flag,
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("session"),
                },
            }
        )

            .then((res) => {
                showToast("success", "Cartão de crédito inserido com sucesso!");
                setCrudCreditCard("get");
            })
            .catch((error) => {
                showToast(
                    "error",
                    "Não foi possível inserir o cartão de crédito!"
                );
                console.log(error);
            });
    };

    const getCreditCards = async () => {
        await Axios.get("http://localhost:3333/user/cards", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                setUserCreditCard(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getCreditCards();
    }, [crudCreditCard]);

    return (
        <section className="user-content">
            {crudCreditCard === "get" && (
                <ItemList
                    title="Cartões de crédito"
                    showBtn={true}
                    btnText="Novo cartão de crédito"
                    btnFunction={setCrudCreditCard}
                >
                    {userCreditCard.map((creditCard) => {
                        return (
                            <CreditCard
                                key={creditCard.id}
                                creditCard={creditCard}
                                getCreditCards={getCreditCards}
                                showToast={showToast}
                                setCrudCreditCard={setCrudCreditCard}
                                setCreditCard={setCreditCard}
                                deleteCreditCard={deleteCreditCard}
                            />
                        );
                    })}
                </ItemList>
            )}

            {crudCreditCard === "post" && (
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
                            setCreditCard((prevState) => ({
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
                            setCreditCard((prevState) => ({
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
                            setCreditCard((prevState) => ({
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
                            setCreditCard((prevState) => ({
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
                        onClick={() => addCreditCard()}
                    >
                        Adicionar cartão
                    </button>

                    <button
                        className="form-btn"
                        onClick={() => setCrudCreditCard("get")}
                    >
                        Voltar
                    </button>
                </Form>
            )}

            {crudCreditCard === "patch" && (
                <Form title="Novo cartão de crédito">
                    <label className="form-label" htmlFor="cardHolderName">
                        Nome impresso
                    </label>
                    <input
                        defaultValue={creditCard.cardHolderName}
                        className="form-input"
                        type="text"
                        name="cardHolderName"
                        id="cardHolderName"
                        placeholder=""
                        onChange={(e) =>
                            setCreditCard((prevState) => ({
                                ...prevState,
                                cardHolderName: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="number">
                        Número
                    </label>
                    <input
                        defaultValue={creditCard.number}
                        className="form-input"
                        type="text"
                        name="number"
                        id="number"
                        placeholder=""
                        onChange={(e) =>
                            setCreditCard((prevState) => ({
                                ...prevState,
                                number: e.target.value,
                            }))
                        }
                    />

                    <label className="form-label" htmlFor="serviceCode">
                        CVV
                    </label>
                    <input
                        defaultValue={creditCard.serviceCode}
                        className="form-input"
                        type="text"
                        name="serviceCode"
                        id="serviceCode"
                        placeholder=""
                        onChange={(e) =>
                            setCreditCard((prevState) => ({
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
                        defaultValue={creditCard.flag}
                        onChange={(e) =>
                            setCreditCard((prevState) => ({
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
                        onClick={() => editCreditCard()}
                    >
                        Salvar alterações
                    </button>

                    <button
                        className="form-btn"
                        onClick={() => setCrudCreditCard("get")}
                    >
                        Voltar
                    </button>
                </Form>
            )}
        </section>
    );
}
