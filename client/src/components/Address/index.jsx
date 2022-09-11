import "../styles/addressStyle.css";

export default function Address({
    title,
    rua,
    numero,
    cidade,
    estado,
    complemento,
    cep,
    principal,
}) {
    return (
        <section className="endereco-container">
            <div className="endereco-title_Desc">
                <div className="endereco-title">
                    <a>{title}</a>
                    <img
                        src="https://via.placeholder.com/24x24"
                        alt="Excluir"
                    />
                </div>

                <div className="endereco-desc">
                    <span className="endereco-isPrincipal">{principal}</span>
                </div>
            </div>

            <div className="endereco-info">
                <span>
                    {rua}, {numero}
                </span>
                <span>
                    {cidade} - {estado}
                </span>
                <span>CEP: {cep}</span>
                <span>{complemento}</span>
            </div>

            <div className="btn-endereco">
                <button className="toPrincipal">Tornar principal</button>
                <button className="toEdit">Editar</button>
            </div>
        </section>
    );
}
