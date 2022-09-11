import "../../styles/UserProfileStyle.css";

import Form from "../../components/Form";
import Item from "../../components/Item";
import Address from "../../components/Address";
import Order from "../../components/Order";
import ItemList from "../../components/ItemList";
import Axios from 'axios';

import { useEffect, useState } from "react";

function UserProfile() {

    const [user, setUser] = useState({})
    const [content, setContent] = useState("");

    const [password, setPassword] = useState()
    const [confirmpassword, setConfirmPassword] = useState()

    function handleContent(content) {
        setContent(content);
        return;
    }

    function handlePassword() {
        if(password === confirmpassword) {
            Axios.patch("http://localhost:3333/users", {
                password: password
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("session"),
                },
            })
            .then((res) => {
               console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }
        else {
            console.log("As senhas não são iguais")
        }
    }

    function getInfo(){
        Axios
        .get("http://localhost:3333/users", {
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
      console.log(user);
    }, [])

    return (
        <div className="user-container">
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
                        />

                        <label className="form-label" htmlFor="phoneNumber" >
                            Celular
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            defaultValue={user.phoneNumber}
                        />


                        <label className="form-label" htmlFor="genre">
                            Sexo
                        </label>
                        <select className="form-select" name="genre" id="genre">
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
                        />

                        <button className="form-btn" type="submit">
                            Salvar Alterações
                        </button>
                        <button className="form-btn" type="submit" onClick={() => handleContent("Alterar Senha")}>
                            Alterar Senha
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
                        <label className="form-label" htmlFor="registerPassword" >Nova senha</label>
                        <input className="form-input" type="password" name="registerPassword" id="registerPassword" onChange={(e) => setPassword(e.target.value)}/>

                        <label className="form-label" htmlFor="confirmPassword" >Confirmar nova senha</label>
                        <input className="form-input" type="password" name="confirmPassword" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}/>

                        <button className="form-btn" type="submit"  onClick={() => handlePassword()}>
                            Alterar Senha
                        </button>

                        <button className="form-btn" type="submit" onClick={() => handleContent("")}>
                            Voltar
                        </button>
                    </Form>
                </section>
            )}
        </div>
    );
}

export default UserProfile;
