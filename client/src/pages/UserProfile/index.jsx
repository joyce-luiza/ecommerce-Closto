import "../../styles/UserProfileStyle.css";

import Form from "../../components/Form";
import Item from "../../components/Item";
import Address from "../../components/Address";
import Order from "../../components/Order";
import ItemList from "../../components/ItemList";

import { useState } from "react";

function UserProfile() {
    const [content, setContent] = useState("");

    function handleContent(content) {
        setContent(content);
        return;
    }

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
                        <p className="user-name">OLÁ, user.name</p>
                        <a>useremail@gmail.com</a>
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
                        <label className="form-label" htmlFor="fullname">
                            Nome completo
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            name="fullname"
                            id="fullname"
                        />

                        <label className="form-label" htmlFor="registerEmail">
                            E-mail
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            name="registerEmail"
                            id="registerEmail"
                        />

                        <label className="form-label" htmlFor="sex">
                            Sexo
                        </label>
                        <select className="form-select" name="sex" id="sex">
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
                        />

                        <label className="form-label" htmlFor="birthDate">
                            Data de nascimento
                        </label>
                        <input
                            className="form-input"
                            type="date"
                            name="birthDate"
                            id="birthDate"
                        />

                        <button className="form-btn" type="submit">
                            Salvar Alterações
                        </button>
                        <button className="form-btn" type="submit">
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
        </div>
    );
}

export default UserProfile;
