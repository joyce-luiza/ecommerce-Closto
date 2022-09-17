import Axios from "axios";
import { useEffect, useState } from "react";
import Address from "../Address";
import Form from "../Form";
import ItemList from "../ItemList";

export default function ListUserAddresses({showToast}) {

    const [address, setAddress] = useState({});
    const [crudAddress, setCrudAddress] = useState('get');
    const [userAddresses, setUserAddresses] = useState([]);

    const deleteAddress = (async (id) =>{
        await Axios.delete('http://localhost:3333/user/addresses',{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
            data: {id: id}
        })
        .then((res) => {
            showToast("success", "Endereço removido com sucesso!")
            getAddresses();
        })
        .catch((err) => {
            showToast("error", "Erro ao remover endereço!")
            console.log(err);
        })
    })

    const editAddress = (async () => {
        await Axios.patch("http://localhost:3333/user/addresses", address,
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            }
        })

        .then((res) => {
            showToast("success", "Endereço editado com sucesso!")
            setCrudAddress("get");
        })
        .catch((error) => {
            showToast("error", "Não foi possível editar o endereço!")
            console.log(error);
        });
    });

    const addNeWAddress = (async (e) => {
        await Axios.post("http://localhost:3333/user/addresses", {
            title: address.title,
            type: address.type,
            residenceType: address.residenceType,
            cep: address.cep,
            publicPlaceType: address.publicPlaceType,
            publicPlace: address.publicPlace,
            number: address.number,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            country: address.country,
            note: address.note,
            isPrincipal: address.isPrincipal,
        },
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })

        .then((res) => {
            showToast("success", "Endereço inserido com sucesso!")
            setCrudAddress("get");
        })
        .catch((error) => {
            showToast("error", "Não foi possível inserir o endereço!")
            console.log(error);
        });
    });

    const getAddresses = (async () => {
        await Axios.get("http://localhost:3333/user/addresses", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
        .then((res) => {
            setUserAddresses(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    })


    useEffect(() => {
        getAddresses();
    }, [crudAddress])


    return (
        <section className="user-content">
            {crudAddress === "get" &&
                <ItemList
                    title="Endereços"
                    showBtn={true}
                    btnText="Novo endereço"
                    btnFunction={setCrudAddress}
                >
                    {userAddresses.map((address) => {
                        return (
                            <Address
                                key={address.id}
                                address={address}
                                getAddresses={getAddresses}
                                showToast={showToast}
                                setCrudAddress={setCrudAddress}
                                setAddress={setAddress}
                                deleteAddress={deleteAddress}
                            />
                        );
                    })}
                </ItemList>
            }

            {crudAddress === "post" &&
                <Form title="Novo endereço">
                    <label
                        className="form-label"
                        htmlFor="title"
                    >
                        Título
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Casa na praia, Apartamento 404..."
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                title: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="type"
                    >
                        Tipo de endereço
                    </label>
                    <select
                        className="form-select"
                        name="type"
                        id="type"
                        defaultValue="none"
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                type: e.target.value,
                            }))
                        }
                    >
                        <option
                            value="none"
                            disabled
                            hidden
                        >
                            Selecione uma opção
                        </option>
                        <option
                            value="Entrega"
                        >
                            Entrega
                        </option>
                        <option
                            value="Cobrança"
                        >
                            Cobrança
                        </option>
                    </select>

                    <label
                        className="form-label"
                        htmlFor="residenceType"
                    >
                        Tipo residência
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="residenceType"
                        id="residenceType"
                        placeholder="Casa, apartamento, etc..."
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                residenceType: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="cep"
                    >
                        CEP
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="cep"
                        id="cep"
                        placeholder="00000-000"
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                cep: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="publicPlaceType"
                    >
                        Tipo logradouro
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="publicPlaceType"
                        id="publicPlaceType"
                        placeholder="Rua, Avenida, etc..."
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                publicPlaceType: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="publicPlace"
                    >
                        Logradouro
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="publicPlace"
                        id="publicPlace"
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                publicPlace: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="neighborhood"
                    >
                        Bairro
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="neighborhood"
                        id="neighborhood"
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                neighborhood: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="number"
                    >
                        Número
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="number"
                        id="number"
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                number: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="city"
                    >
                        Cidade
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="city"
                        id="city"
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                city: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="state"
                    >
                        Estado
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="state"
                        id="state"
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                state: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="country"
                    >
                        País
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="country"
                        id="country"
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                country: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="note"
                    >
                        Observações
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="note"
                        id="note"
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                note: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="isPrincipal"
                    >
                        Deseja que este seja seu endereço principal?
                    </label>
                    <select
                        className="form-select"
                        name="isPrincipal"
                        id="isPrincipal"
                        defaultValue="none"
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                isPrincipal: e.target.value,
                            }))
                        }
                    >
                        <option
                            value="none"
                            disabled
                            hidden
                        >
                            Selecione uma opção
                        </option>
                        <option
                            value="true"
                        >
                            Sim
                        </option>
                        <option
                            value="false"
                        >
                            Não
                        </option>
                    </select>

                    <button
                        id="submitNewAddress"
                        className="form-btn"
                        type="submit"
                        onClick={() => addNeWAddress()}
                    >
                        Adicionar endereço
                    </button>

                    <button
                        className="form-btn"
                        onClick={() => setCrudAddress('get')}
                    >
                        Voltar
                    </button>
                </Form>
            }

            {crudAddress === "patch" &&
                <Form title="Editar endereço">
                    <label
                        className="form-label"
                        htmlFor="title"
                    >
                        Título
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Casa na praia, Apartamento 404..."
                        defaultValue={address.title}
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                title: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="type"
                    >
                        Tipo de endereço
                    </label>
                    <select
                        className="form-select"
                        name="type"
                        id="type"
                        defaultValue={address.type}
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                type: e.target.value,
                            }))
                        }
                    >
                        <option
                            value="none"
                            disabled
                            hidden
                        >
                            Selecione uma opção
                        </option>
                        <option
                            value="Entrega"
                        >
                            Entrega
                        </option>
                        <option
                            value="Cobrança"
                        >
                            Cobrança
                        </option>
                    </select>

                    <label
                        className="form-label"
                        htmlFor="residenceType"
                    >
                        Tipo residência
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="residenceType"
                        id="residenceType"
                        placeholder="Casa, apartamento, etc..."
                        defaultValue={address.residenceType}
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                residenceType: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="cep"
                    >
                        CEP
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="cep"
                        id="cep"
                        placeholder="00000-000"
                        defaultValue={address.cep}
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                cep: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="publicPlaceType"
                    >
                        Tipo logradouro
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="publicPlaceType"
                        id="publicPlaceType"
                        placeholder="Rua, Avenida, etc..."
                        defaultValue={address.publicPlaceType}
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                publicPlaceType: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="publicPlace"
                    >
                        Logradouro
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="publicPlace"
                        id="publicPlace"
                        defaultValue={address.publicPlace}
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                publicPlace: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="neighborhood"
                    >
                        Bairro
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="neighborhood"
                        id="neighborhood"
                        defaultValue={address.neighborhood}
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                neighborhood: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="number"
                    >
                        Número
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="number"
                        id="number"
                        defaultValue={address.number}
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                number: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="city"
                    >
                        Cidade
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="city"
                        id="city"
                        defaultValue={address.city}
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                city: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="state"
                    >
                        Estado
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="state"
                        id="state"
                        defaultValue={address.state}
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                state: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="country"
                    >
                        País
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="country"
                        id="country"
                        defaultValue={address.country}
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                country: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="note"
                    >
                        Observações
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="note"
                        id="note"
                        defaultValue={address.note}
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                note: e.target.value,
                            }))
                        }
                    />

                    <label
                        className="form-label"
                        htmlFor="isPrincipal"
                    >
                        Deseja que este seja seu endereço principal?
                    </label>
                    <select
                        className="form-select"
                        name="isPrincipal"
                        id="isPrincipal"
                        defaultValue={address.isPrincipal}
                        onChange={(e) =>
                            setAddress((prevState) => ({
                                ...prevState,
                                isPrincipal: e.target.value,
                            }))
                        }
                    >
                        <option
                            value="none"
                            disabled
                            hidden
                        >
                            Selecione uma opção
                        </option>
                        <option
                            value="true"
                        >
                            Sim
                        </option>
                        <option
                            value="false"
                        >
                            Não
                        </option>
                    </select>

                    <button
                        id="submitNewAddress"
                        className="form-btn"
                        type="submit"
                        onClick={() => editAddress()}
                    >
                        Salvar alterações
                    </button>

                    <button
                        className="form-btn"
                        onClick={() => setCrudAddress('get')}
                    >
                        Voltar
                    </button>
                </Form>
            }
        </section>
    )
}