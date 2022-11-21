export default function ProfileOptions({ handleContent, data, type }) {
    return (
        <section className={`${type}-options`}>
            <div className={`${type}-info`}>
                <img
                    className={`${type}-photo`}
                    src="https://via.placeholder.com/160x160"
                    alt=""
                />

                <div className={`${type}-description`}>
                    <p className={`${type}-name`}>OLÁ, {data.firstName}</p>
                    <span>{data.email}</span>
                </div>
            </div>
            <hr className={`div-${type}-info`} />

            {type === "user" && (
                <div className="user-menu">
                    <section className="menu">
                        <h3 className="menu-title">Dados</h3>

                        <button
                            id="link-dados-cadastrais"
                            className="menu-item"
                            onClick={() => handleContent("")}
                        >
                            Dados Cadastrais
                        </button>
                        <button
                            id="link-lista-de-desejos"
                            className="menu-item"
                            onClick={() => handleContent("Lista de Desejos")}
                        >
                            Lista de Desejos
                        </button>
                        <button
                            id="link-enderecos"
                            className="menu-item"
                            onClick={() => handleContent("Endereços")}
                        >
                            Endereços
                        </button>
                        <button
                            id="link-cartao-credito"
                            className="menu-item"
                            onClick={() => handleContent("Cartões de crédito")}
                        >
                            Cartões de crédito
                        </button>
                        <button
                            id="link-cupons"
                            className="menu-item"
                            onClick={() => handleContent("Cupons")}
                        >
                            Cupons
                        </button>
                    </section>

                    <section className="menu">
                        <h3 className="menu-title">Pedidos</h3>

                        <button
                            id="link-pedidos"
                            className="menu-item"
                            onClick={() => handleContent("Meus Pedidos")}
                        >
                            {" "}
                            Meus Pedidos
                        </button>
                        <button
                            id="link-trocas"
                            className="menu-item"
                            onClick={() => handleContent("Trocas")}
                        >
                            {" "}
                            Trocas
                        </button>
                    </section>
                </div>
            )}

            {type === "admin" && (
                <div className={`${type}-menu`}>
                    <section className="menu">
                        <h3 className="menu-title">Loja</h3>

                        <button
                            className="menu-item"
                            onClick={() => handleContent("")}
                        >
                            Produtos
                        </button>
                        <button
                            className="menu-item"
                            onClick={() => handleContent("Promoções")}
                        >
                            Promoções
                        </button>
                        <button
                            className="menu-item"
                            onClick={() => handleContent("Relatório")}
                        >
                            Relatório
                        </button>
                    </section>

                    <section className="menu">
                        <h3 className="menu-title">Clientes</h3>

                        <button
                            id="link-clientes"
                            className="menu-item"
                            onClick={() => handleContent("Clientes")}
                        >
                            {" "}
                            Clientes
                        </button>
                        <button
                            id="link-pedidos"
                            className="menu-item"
                            onClick={() => handleContent("Pedidos")}
                        >
                            {" "}
                            Pedidos
                        </button>
                        <button
                            id="link-trocas"
                            className="menu-item"
                            onClick={() => handleContent("Trocas")}
                        >
                            {" "}
                            Trocas
                        </button>
                    </section>
                </div>
            )}
        </section>
    );
}
