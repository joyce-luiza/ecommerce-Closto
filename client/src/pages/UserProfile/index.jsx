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
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import UserOptions from "../../components/UserOptions";

function UserProfile() {
    const [user, setUser] = useState({});
    const [updatedUser, setUpdatedUser] = useState({});
    const [content, setContent] = useState("");

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [passwordValid, setPasswordValid] = useState(false);

    const [userAddresses, setUserAddresses] = useState([]);

    const navigate = useNavigate();

    function handleContent(content) {
        setContent(content);
        return;
    }

    function handleUser() {
        const errorUpdate = (error) => {
            for (let index = 0; index < error.length; index++) {
                const message = error[index];
                toast.error(message, {
                    className: "UpdateError",
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        };
        const successUpdate = () =>
            toast.success("Dados alterados com sucesso!", {
                className: "UpdateSuccess",
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        Axios.patch("http://localhost:3333/users", updatedUser, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                if (res.data[0]) {
                    errorUpdate(res.data);
                    return;
                }
                successUpdate();
                setUser(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const confirmDeleteUser = () => {
        confirmAlert({
            title: "Delete your account?",
            message: "Are you sure you want to delete your account?.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => handleDeleteUser(),
                },
                {
                    label: "No",
                    onClick: () => onclose,
                },
            ],
        });
    };

    function handleDeleteUser() {
        const successDelete = () =>
            toast.success("Conta excluída com sucesso!", {
                className: "DeleteSuccess",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        Axios.delete("http://localhost:3333/users", {
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
                return;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function handlePassword() {
        const successUpdateSuccess = () =>
            toast.success("Senha alterada com sucesso!", {
                className: "UpdateSuccess",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        const errorUpdateError = () =>
            toast.error("Não foi possível alterar a senha!", {
                className: "UpdateError",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        if (
            passwordValid &&
            !bcrypt.compareSync(password, user.password_hash)
        ) {
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
                    setContent("");
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
    }

    useEffect(() => {
        getInfo();
    }, [updatedUser]);

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

            <UserOptions
                user={user}
                handleContent={handleContent}
            />

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
                            onClick={() => confirmDeleteUser()}
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
                    <ItemList
                        title="Endereços"
                        showBtn={true}
                        btnText="Novo endereço"
                    >
                        {userAddresses.map((address) => {
                            return (
                                <Address
                                    key={address.id}
                                    id={address.id}
                                    title={address.title}
                                    type={address.type}
                                    publicPlace={address.publicPlace}
                                    publicPlaceType={address.publicPlaceType}
                                    number={address.number}
                                    neighborhood={address.neighborhood}
                                    city={address.city}
                                    state={address.state}
                                    country={address.country}
                                    cep={address.cep}
                                    note={address.note}
                                    residenceType={address.residenceType}
                                    isPrincipal={address.isPrincipal}
                                />
                            );
                        })}
                    </ItemList>
                </section>
            )}

            {content === "Cartões de crédito" && (
                <section className="user-content">
                    <ItemList
                        title="Cartões de crédito"
                        showBtn={true}
                        btnText="Novo cartão"
                    ></ItemList>
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
