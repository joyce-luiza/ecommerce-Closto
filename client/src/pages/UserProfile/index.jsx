import "../../styles/UserProfileStyle.css";

import Form from "../../components/Form";
import Item from "../../components/Item";
import Address from "../../components/Address";
import Order from "../../components/Order";
import ItemList from "../../components/ItemList";
import Axios from "axios";
import PasswordChecklist from "react-password-checklist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
    const [user, setUser] = useState({});
    const [updatedUser, setUpdatedUser] = useState({});
    const [content, setContent] = useState("");

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [passwordValid, setPasswordValid] = useState(false);

    const navigate = useNavigate();

    function handleContent(content) {
        setContent(content);
        return;
    }

    function handleUser() {
        const successRegister = () =>
            toast.success("Dados alterados com sucesso!", {
                className: "UpdateSuccess",
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        Axios.patch("http://localhost:3333/users", updatedUser, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                successRegister();
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleDeleteUser() {
        const confirmBox = window.confirm("Deseja realmente excluir sua conta?");

        const successDelete = () =>
            toast.success("Conta excluída com sucesso!", {
                className: "DeleteSuccess",
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });

        if(confirmBox){
            Axios.delete("http://localhost:3333/users",{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("session"),
                },
            })
            .then((res) => {
                localStorage.removeItem("session");
                successDelete();
                setTimeout(() => {
                    navigate("/");
                }, 5000);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    function handlePassword() {
        const successUpdateSuccess = () =>
            toast.success("Senha alterada com sucesso!", {
                className: "UpdateSuccess",
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });

        const errorUpdateError = () =>
            toast.error("Não foi possível alterar a senha!", {
                className: "UpdateError",
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        if (passwordValid) {
            console.log(passwordValid)
            Axios.patch(
                "http://localhost:3333/users",
                {
                    password: password,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("session"),
                    },
                }
            )
                .then((res) => {
                    successUpdateSuccess();
                    setPassword();
                    setConfirmPassword();
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            errorUpdateError();
        }
    }

    async function getInfo() {
        await Axios.get("http://localhost:3333/users", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <div className="user-container">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />
            <section className="user-options">
                <div className="user-info">
                    <img
                        className="user-photo"
                        src="https://via.placeholder.com/160x160"
                        alt=""
                    />

                    <div className="user-description">
                        <p className="user-name">OLÁ, {user.firstName}</p>
                        <a>{user.email}</a>
                    </div>
                </div>

                <hr className="div-user-info" />

                <div className="user-menu">
                    <section className="menu">
                        <h3 className="menu-title">Dados</h3>

                        <button
                            className="menu-item"
                            onClick={() => handleContent("")}
                        >
                            Dados Cadastrais
                        </button>
                        <button
                            className="menu-item"
                            onClick={() => handleContent("Lista de Desejos")}
                        >
                            Lista de Desejos
                        </button>
                        <button
                            className="menu-item"
                            onClick={() => handleContent("Endereços")}
                        >
                            Endereços
                        </button>
                        <button
                            className="menu-item"
                            onClick={() => handleContent("Cartões de crédito")}
                        >
                            Cartões de crédito
                        </button>
                    </section>

                    <section className="menu">
                        <h3 className="menu-title">Pedidos</h3>

                        <button
                            className="menu-item"
                            onClick={() => handleContent("Meus Pedidos")}
                        >
                            {" "}
                            Meus Pedidos
                        </button>
                        <button
                            className="menu-item"
                            onClick={() => handleContent("Trocas e Devoluções")}
                        >
                            {" "}
                            Trocas e Devoluções
                        </button>
                    </section>
                </div>
            </section>

            {content === "" && (
                <section className="user-content">
                    <Form title="Dados cadastrais">
                        <label className="form-label" htmlFor="firstName">
                            Nome
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            name="firstName"
                            id="firstName"
                            defaultValue={user.firstName}
                            onChange={(e) =>
                                setUpdatedUser((prevState) => ({
                                    ...prevState,
                                    firstName: e.target.value,
                                }))
                            }
                        />

                        <label className="form-label" htmlFor="lastName">
                            Sobrenome
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            name="lastName"
                            id="lastName"
                            defaultValue={user.lastName}
                            onChange={(e) =>
                                setUpdatedUser((prevState) => ({
                                    ...prevState,
                                    lastName: e.target.value,
                                }))
                            }
                        />

                        <label className="form-label" htmlFor="registerEmail">
                            E-mail
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            name="registerEmail"
                            id="registerEmail"
                            defaultValue={user.email}
                            onChange={(e) =>
                                setUpdatedUser((prevState) => ({
                                    ...prevState,
                                    email: e.target.value,
                                }))
                            }
                        />

                        <label className="form-label" htmlFor="phoneNumber">
                            Celular
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            defaultValue={user.phoneNumber}
                            onChange={(e) =>
                                setUpdatedUser((prevState) => ({
                                    ...prevState,
                                    phoneNumber: e.target.value,
                                }))
                            }
                        />

                        <label className="form-label" htmlFor="genre">
                            Sexo
                        </label>
                        <select
                            className="form-select"
                            name="genre"
                            id="genre"
                            defaultValue={user.genre}
                            onChange={(e) =>
                                setUpdatedUser((prevState) => ({
                                    ...prevState,
                                    genre: e.target.value,
                                }))
                            }
                        >
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                        </select>

                        <label className="form-label" htmlFor="cpf">
                            CPF
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="000.000.000-00"
                            name="cpf"
                            id="cpf"
                            defaultValue={user.cpf}
                            disabled
                        />

                        <label className="form-label" htmlFor="birthDate">
                            Data de nascimento
                        </label>
                        <input
                            className="form-input"
                            type="date"
                            name="birthDate"
                            id="birthDate"
                            defaultValue={user.birthDate}
                            onChange={(e) =>
                                setUpdatedUser((prevState) => ({
                                    ...prevState,
                                    birthDate: e.target.value,
                                }))
                            }
                        />

                        <button
                            id="updateUser"
                            className="form-btn"
                            type="submit"
                            onClick={() => handleUser()}
                        >
                            Salvar Alterações
                        </button>
                        <button
                            id="updatePassword"
                            className="form-btn"
                            onClick={() => handleContent("Alterar Senha")}
                        >
                            Alterar Senha
                        </button>
                        <button
                            id="deleteUser"
                            className="form-secondatyBtn"
                            onClick={() => handleDeleteUser()}
                        >
                            Excluir conta
                        </button>
                    </Form>
                </section>
            )}

            {content === "Lista de Desejos" && (
                <section className="user-content">
                    <ItemList title="Lista de Desejos">
                        <Item name="Exemplo de produto" price="80,00" />
                        <Item name="Exemplo de produto" price="80,00" />
                        <Item name="Exemplo de produto" price="80,00" />
                        <Item name="Exemplo de produto" price="80,00" />
                        <Item name="Exemplo de produto" price="80,00" />
                        <Item name="Exemplo de produto" price="80,00" />
                        <Item name="Exemplo de produto" price="80,00" />
                        <Item name="Exemplo de produto" price="80,00" />
                        <Item name="Exemplo de produto" price="80,00" />
                        <Item name="Exemplo de produto" price="80,00" />
                        <Item name="Exemplo de produto" price="80,00" />
                        <Item name="Exemplo de produto" price="80,00" />
                    </ItemList>
                </section>
            )}
            {content === "Endereços" && (
                <section className="user-content">
                    <ItemList title="Endereços">
                        <Address
                            title="Minha casa"
                            rua="Rua Maria Bertolina de Oliveira"
                            numero="25"
                            cidade="Mogi das Cruzes"
                            estado="SP"
                            cep="08738460"
                            complemento="Sobrado Amarelo"
                            principal="Endereço principal"
                        />
                        <Address
                            title="Minha casa"
                            rua="Rua Maria Bertolina de Oliveira"
                            numero="25"
                            cidade="Mogi das Cruzes"
                            estado="SP"
                            cep="08738460"
                            complemento="Sobrado Amarelo"
                        />
                        <Address
                            title="Minha casa"
                            rua="Rua Maria Bertolina de Oliveira"
                            numero="25"
                            cidade="Mogi das Cruzes"
                            estado="SP"
                            cep="08738460"
                            complemento="Sobrado Amarelo"
                        />
                        <Address
                            title="Minha casa"
                            rua="Rua Maria Bertolina de Oliveira"
                            numero="25"
                            cidade="Mogi das Cruzes"
                            estado="SP"
                            cep="08738460"
                            complemento="Sobrado Amarelo"
                        />
                    </ItemList>
                </section>
            )}
            {content === "Meus Pedidos" && (
                <section className="user-content">
                    <ItemList title="Meus Pedidos">
                        <Order
                            id="1"
                            status="Entregue"
                            date="19/07/2021"
                            price="120,00"
                            btn="Ver detalhes"
                        />
                        <Order
                            id="2"
                            status="Entregue"
                            date="13/11/2021"
                            price="120,00"
                            btn="Ver detalhes"
                        />
                        <Order
                            id="3"
                            status="Entregue"
                            date="20/07/2021"
                            price="120,00"
                            btn="Ver detalhes"
                        />
                        <Order
                            id="4"
                            status="Pendente"
                            date="11/07/2021"
                            price="120,00"
                            btn="Ver detalhes"
                        />
                    </ItemList>
                </section>
            )}
            {content === "Trocas e Devoluções" && (
                <section className="user-content">
                    <ItemList title="Trocas e Devoluções">
                        <Order
                            id="1"
                            status="Entregue"
                            date="19/07/2021"
                            price="120,00"
                            btn="Ver detalhes"
                        />
                        <Order
                            id="2"
                            status="Entregue"
                            date="13/11/2021"
                            price="120,00"
                            btn="Ver detalhes"
                        />
                        <Order
                            id="3"
                            status="Entregue"
                            date="20/07/2021"
                            price="120,00"
                            btn="Ver detalhes"
                        />
                        <Order
                            id="4"
                            status="Pendente"
                            date="11/07/2021"
                            price="120,00"
                            btn="Ver detalhes"
                        />
                    </ItemList>
                </section>
            )}
            {content === "Alterar Senha" && (
                <section className="user-content">
                    <Form title="Alterar Senha">
                        <label
                            className="form-label"
                            htmlFor="registerPassword"
                        >
                            Nova senha
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            name="registerPassword"
                            id="registerPassword"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label className="form-label" htmlFor="confirmPassword">
                            Confirmar nova senha
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {password && (
                            <PasswordChecklist
                                rules={[
                                    "minLength",
                                    "specialChar",
                                    "number",
                                    "capital",
                                    "match",
                                ]}
                                minLength={8}
                                value={password}
                                valueAgain={confirmPassword}
                                onChange={(isValid) => {
                                    console.log(isValid);
                                    setPasswordValid(isValid);
                                }}
                            />
                        )}

                        <button
                            id="submitPassword"
                            className="form-btn"
                            type="submit"
                            onClick={() => handlePassword()}
                        >
                            Alterar Senha
                        </button>

                        <button
                            id="backBtn"
                            className="form-btn"
                            type="submit"
                            onClick={() => handleContent("")}
                        >
                            Voltar
                        </button>
                    </Form>
                </section>
            )}
        </div>
    );
}

export default UserProfile;