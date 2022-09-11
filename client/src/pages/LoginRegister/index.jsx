import '../../styles/LoginRegisterStyle.css';

import Form from '../../components/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

import PasswordChecklist from "react-password-checklist";

function LoginRegister() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConfirmPassword, setUserConfirmPassword] = useState("");
    const [userCpf, setUserCpf] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userBirthDate, setUserBirthDate] = useState("");
    const [userGenre, setUserGenre] = useState("");

    const [passwordValid, setPasswordValid] = useState(false);

    const navigate = useNavigate();

    async function handleLogin() {
      await Axios.post("http://localhost:3333/session", {
        email: userEmail,
        password: userPassword,
      })
        .then((res) => {
            if(res.data[0] || res.data.session ){
                console.log("Erro Login")
                return;
            }
            localStorage.setItem("session", res.data.token);
            navigate("/profile");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function handleRegistry() {
        passwordValid &&
        (
            await Axios.post("http://localhost:3333/users", {
            firstName: userFirstName,
            lastName: userLastName,
            birthDate: userBirthDate,
            cpf: userCpf,
            email: userEmail,
            password: userPassword,
            phoneNumber: userPhoneNumber,
            genre: userGenre
            })
        .then((res) => {
            handleLogin();
        })
        .catch((err) => {
            console.log(err.response.data);
        })
        )
    }

    return (
        <div className='form-container'>
            <Form title="login">
                <label className="form-label" htmlFor="loginEmail" >E-mail</label>
                <input className="form-input" type="text" name="loginEmail" id="loginEmail" onChange={(e) => setUserEmail(e.target.value)}/>

                <label className="form-label" htmlFor="loginPassword" >Senha</label>
                <input className="form-input" type="password" name="loginPassword" id="loginPassword" onChange={(e) => setUserPassword(e.target.value)}/>

                <button className="form-btn" type="submit" onClick={handleLogin}>Entrar</button>

                <p className="form-confirmText">
                    <a href="">
                        Esqueci minha senha
                    </a>
                </p >
            </Form>

            <hr className='div-loginRegister'/>

            <Form title="Cadastro">
                <label className="form-label" htmlFor="firstName" >Nome</label>
                <input className="form-input" type="text" name="firstName" id="firstName" onChange={(e) => setUserFirstName(e.target.value)}/>

                <label className="form-label" htmlFor="lastName" >Sobrenome</label>
                <input className="form-input" type="text" name="lastName" id="lastName" onChange={(e) => setUserLastName(e.target.value)}/>

                <label className="form-label" htmlFor="registerEmail" >E-mail</label>
                <input className="form-input" type="text" name="registerEmail" id="registerEmail" onChange={(e) => setUserEmail(e.target.value)}/>

                <label className="form-label" htmlFor="cpf" >CPF</label>
                <input className="form-input" type="text"  placeholder="000.000.000-00" name="cpf" id="cpf" onChange={(e) => setUserCpf(e.target.value)}/>

                <label className="form-label" htmlFor="genre" >Sexo</label>
                <select className="form-select" name="genre" id="genre" onChange={(e) => setUserGenre(e.target.value)}>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                </select>


                <label className="form-label" htmlFor="birthDate" >Data de nascimento</label>
                <input className="form-input" type="date" name="birthDate" id="birthDate" onChange={(e) => setUserBirthDate(e.target.value)}/>

                <label className="form-label" htmlFor="phoneNumber" >Celular</label>
                <input className="form-input" type="text" placeholder="(00) 00000-0000" name="phoneNumber" id="phoneNumber" onChange={(e) => setUserPhoneNumber(e.target.value)}/>

                <label className="form-label" htmlFor="registerPassword" >Senha</label>
                <input className="form-input" type="password" name="registerPassword" id="registerPassword" onChange={(e) => setUserPassword(e.target.value)}/>

                <label className="form-label" htmlFor="confirmPassword" >Confirmar Senha</label>
                <input className="form-input" type="password" name="confirmPassword" id="confirmPassword" onChange={(e) => setUserConfirmPassword(e.target.value)}/>

                <PasswordChecklist
                    rules={[
                        "minLength",
                        "specialChar",
                        "number",
                        "capital",
                        "match",
                    ]}
                    minLength={8}
                    value={userPassword}
                    valueAgain={userConfirmPassword}
                    onChange={(isValid) => {
                        if (isValid) {
                            setPasswordValid(true);
                        }
                    }}
                />

                <p className="form-confirmText">
                    Ao criar uma conta, você concorda com nossas <a href="">políticas de privacidade.</a>
                </p>

                <button className="form-btn" type="submit" onClick={handleRegistry} id="registerBtn">Criar Conta</button>
            </Form>
        </div>
    )
}

export default LoginRegister;