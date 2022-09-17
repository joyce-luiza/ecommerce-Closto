import Axios from "axios";
import "../styles/addressStyle.css";

export default function Address({ address, getAddresses, setCrudAddress, setAddress, deleteAddress }) {

    async function toPrincipal() {
        await Axios.patch('http://localhost:3333/user/addresses', {
            id: address.id,
            title: address.title,
            type: address.type,
            publicPlace: address.publicPlace,
            publicPlaceType: address.publicPlaceType,
            residenceType: address.residenceType,
            neighborhood: address.neighborhood,
            number: address.number,
            city: address.city,
            state: address.state,
            country: address.country,
            note: address.note,
            cep: address.cep,
            isPrincipal: true
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
        .then((res) => {
            getAddresses();
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    return (
        <section className="address-container">
            <div className="address-title_Desc">
                <div className="address-title">
                    <a>{address.title}</a>
                    <img
                        className="adddress-delete"
                        src="https://via.placeholder.com/24x24"
                        alt="Excluir"
                        onClick={() => deleteAddress(address.id)}
                    />
                </div>

                { address.isPrincipal === true &&
                    <div className="address-desc">
                        <span className="address-isPrincipal">Endereço principal ★</span>
                    </div>
                }

            </div>

            <div className="address-info">
                <span>
                    Tipo: {address.residenceType} • {address.type}
                </span>
                <span>
                    {address.publicPlaceType} {address.publicPlace} • {address.neighborhood} • {address.number}
                </span>
                <span>
                    {address.city} • {address.state} • {address.country}
                </span>
                <span>CEP: {address.cep}</span>
                <span>{address.note}</span>
            </div>

            <div className="btn-address">
                <button className="toPrincipal" onClick={() => toPrincipal(address.id)}>Tornar principal</button>
                <button
                    className="toEdit"
                    onClick={() => {
                        setCrudAddress("patch");
                        setAddress(address);
                    }}
                >
                    Editar
                </button>
            </div>
        </section>
    );
}
