import Form from "../Form";
import Axios from 'axios';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";


export default function EditUser({ user, setUser, updatedUser, setUpdatedUser, handleContent, showToast}) {

    const navigate = useNavigate();

    function handleDeleteUser() {
        Axios.delete("http://localhost:3333/users", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                localStorage.removeItem("session");
                showToast("success", "Usuário excluído com sucesso");
                setTimeout(() => {
                    navigate("/");
                }, 5000);
                return;
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

    function handleUser() {
        Axios.patch("http://localhost:3333/users", updatedUser, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                if (res.data[0]) {
                    showToast("error", "Não foi possível atualizar as informações!");
                    return;
                }
                showToast("success", "Informações atualizadas com sucesso");
                setUser(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <section className="user-content">
                    <Form title="Dados cadastrais 2">
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
    )
}