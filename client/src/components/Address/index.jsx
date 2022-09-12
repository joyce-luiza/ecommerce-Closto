import "../styles/addressStyle.css";

export default function Address({
    title,
    type,
    publicPlace,
    publicPlaceType,
    residenceType,
    neighborhood,
    number,
    city,
    state,
    country,
    note,
    cep,
    isPrincipal,
}) {
    return (
        <section className="address-container">
            <div className="address-title_Desc">
                <div className="address-title">
                    <a>{title}</a>
                    <img
                        src="https://via.placeholder.com/24x24"
                        alt="Excluir"
                    />
                </div>

                { isPrincipal === true &&
                    <div className="address-desc">
                        <span className="address-isPrincipal">Endereço principal ★</span>
                    </div>
                }

            </div>

            <div className="address-info">
                <span>
                    Tipo: {residenceType} • {type}
                </span>
                <span>
                    {publicPlaceType} {publicPlace} • {neighborhood} • {number}
                </span>
                <span>
                    {city} • {state} • {country}
                </span>
                <span>CEP: {cep}</span>
                <span>{note}</span>
            </div>

            <div className="btn-address">
                <button className="toPrincipal">Tornar principal</button>
                <button className="toEdit">Editar</button>
            </div>
        </section>
    );
}
