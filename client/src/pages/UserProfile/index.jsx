import "../../styles/UserProfileStyle.css";
import Axios from "axios";

import { useEffect, useState } from "react";
import ListUserAddresses from "../../components/ListUserAddresses";
import EditUser from "../../components/EditUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePassword from "../../components/ChangePassword";
import ListUserCreditCard from "../../components/ListUserCreditCards";
import ProfileOptions from "../../components/ProfileOptions";
import Table from "../../components/Table";
import EditOrder from "../../components/EditOrder";
import NewExchange from "../../components/NewExchange";
import ExchangeProfile from "../../components/ExchangeProfile";

function UserProfile2() {
    const [user, setUser] = useState({});
    const [updatedUser, setUpdatedUser] = useState({});
    const [orders, setOrders] = useState([]);
    const [exchanges, setExchanges] = useState([]);
    const [exchange, setExchange] = useState([]);
    const [exchangeableOrders, setExchangeableOrders] = useState([]);
    const [coupons, setCoupons] = useState([]);

    const [order, setOrder] = useState({});
    const [content, setContent] = useState("");

    function handleContent(content) {
        setContent(content);
        return;
    }

    const showToast = (type, text) => {
        if (type === "success") {
            return toast.success(text, {
                className: "SuccessToast",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        if (type === "error") {
            return toast.error(text, {
                className: "ErrorToast",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        return;
    };

    async function getUserInfo() {
        await Axios.get("http://localhost:3333/users", {
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

    async function getUserOrders() {
        await Axios.get("http://localhost:3333/user/orders", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                setOrders(res.data);
                setExchangeableOrders(
                    res.data.filter((orders) => orders.status === "Enviado")
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function getUserExchanges() {
        await Axios.get("http://localhost:3333/user/exchanges", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                setExchanges(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function getUserCoupons() {
        await Axios.get("http://localhost:3333/user/coupons", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                setCoupons(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getUserInfo();
        getUserOrders();
        getUserExchanges();
        getUserCoupons();
    }, []);

    return (
        <div className="user-container">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />

            <ProfileOptions
                handleContent={handleContent}
                data={user}
                type="user"
            />

            {content === "" && (
                <EditUser
                    user={user}
                    setUser={setUser}
                    updatedUser={updatedUser}
                    setUpdatedUser={setUpdatedUser}
                    handleContent={handleContent}
                    showToast={showToast}
                />
            )}

            {content === "Alterar Senha" && (
                <ChangePassword
                    handleContent={handleContent}
                    user={user}
                    showToast={showToast}
                />
            )}

            {content === "Endereços" && (
                <ListUserAddresses showToast={showToast} />
            )}

            {content === "Cartões de crédito" && (
                <ListUserCreditCard showToast={showToast} />
            )}

            {content === "Meus Pedidos" && (
                <Table
                    user="user"
                    type="orders"
                    data={orders}
                    deleteObj={[]}
                    setContent={setContent}
                    setData={setOrder}
                ></Table>
            )}

            {content === "Pedido" && (
                <EditOrder
                    userType={"user"}
                    order={order}
                    setContent={setContent}
                ></EditOrder>
            )}

            {content === "Trocas" && (
                <div>
                    <h1>Trocas</h1>
                    <button
                        onClick={() => {
                            setContent("Pedidos Trocáveis");
                        }}
                    >
                        Solicitar troca
                    </button>
                    <Table
                        user="user"
                        type="exchanges"
                        data={exchanges}
                        deleteObj={[]}
                        setContent={setContent}
                        setData={setExchange}
                    ></Table>
                </div>
            )}

            {content === "Pedidos Trocáveis" && (
                <div>
                    <h1>Nova Troca</h1>
                    <button
                        onClick={() => {
                            setContent("Trocas");
                        }}
                    >
                        Voltar
                    </button>
                    <p>Selecione o pedido a ser trocado</p>
                    <Table
                        user="user"
                        type="exchangeableOrders"
                        data={exchangeableOrders}
                        deleteObj={[]}
                        setContent={setContent}
                        setData={setOrder}
                    ></Table>
                </div>
            )}

            {content === "Nova Troca" && (
                <NewExchange
                    order={order}
                    setContent={setContent}
                ></NewExchange>
            )}

            {content === "Perfil da Troca" && (
                <ExchangeProfile
                    user={"user"}
                    exchange={exchange}
                    setContent={setContent}
                ></ExchangeProfile>
            )}

            {content === "Cupons" && (
                <Table
                    user="user"
                    type="coupons"
                    data={coupons}
                    deleteObj={[]}
                    setContent={setContent}
                    setData={setOrder}
                ></Table>
            )}
        </div>
    );
}

export default UserProfile2;
