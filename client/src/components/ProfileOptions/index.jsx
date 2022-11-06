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
                        <button
                            className="menu-item"
                            onClick={() => handleContent("Cupons")}
                        >
                            Cupons
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
                    </section>

                    <section className="menu">
                        <h3 className="menu-title">Clientes</h3>

                        <button
                            className="menu-item"
                            onClick={() => handleContent("Clientes")}
                        >
                            {" "}
                            Clientes
                        </button>
                        <button
                            className="menu-item"
                            onClick={() => handleContent("Pedidos")}
                        >
                            {" "}
                            Pedidos
                        </button>
                        <button
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
