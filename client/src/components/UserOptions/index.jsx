export default function UserOptions({ handleContent, user }) {
    return (
        <section className="user-options">
            <div className="user-info">
                <img
                    className="user-photo"
                    src="https://via.placeholder.com/160x160"
                    alt=""
                />

                <div className="user-description">
                    <p className="user-name">OLÁ, {user.firstName}</p>
                    <span>{user.email}</span>
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
                        onClick={() => handleContent("Trocas")}
                    >
                        {" "}
                        Trocas
                    </button>
                </section>
            </div>
        </section>
    );
}
