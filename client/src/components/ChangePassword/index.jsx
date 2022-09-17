import { useState } from "react";
import Form from "../Form";
import PasswordChecklist from "react-password-checklist";
import bcrypt from "bcryptjs";
import Axios from 'axios';

export default function ChangePassword({user, handleContent, showToast }) {
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [passwordValid, setPasswordValid] = useState(false);

    async function handlePassword() {
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
                    showToast("success", "Senha alterada com sucesso!")
                    handleContent("");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            showToast("error", "Não foi possível alterar a senha!");
        }
    }

    return (
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
    )
}