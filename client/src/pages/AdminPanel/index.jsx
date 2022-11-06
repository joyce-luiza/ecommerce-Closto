import Axios from "axios";
import { useState } from "react";
import ProfileOptions from "../../components/ProfileOptions";
import { ToastContainer } from "react-toastify";
import "../../styles/AdminProfileStyle.css";
import Table from "../../components/Table";
import { useEffect } from "react";
import EditProduct from "../../components/EditProduct";
import EditOrder from "../../components/EditOrder";
import ExchangeProfile from "../../components/ExchangeProfile";

function AdminPanel() {
    const [admin, setAdmin] = useState({});
    const [content, setContent] = useState("");
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});
    const [data, setData] = useState(false);
    const [exchanges, setExchanges] = useState([]);
    const [exchange, setExchange] = useState({});

    async function getAdminInfo() {
        await Axios.get("http://localhost:3333/users", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },
        })
            .then((res) => {
                setAdmin(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleContent(content) {
        setContent(content);
        return;
    }

    async function getProducts() {
        await Axios.post(
            "http://localhost:3333/admin/consult",
            { table: "/products" },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("session"),
                },
            }
        )
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async function getOrders() {
        await Axios.post(
            "http://localhost:3333/admin/consult",
            { table: "/orders" },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("session"),
                },
            }
        )
            .then((res) => {
                setOrders(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function getExchanges() {
        await Axios.post(
            "http://localhost:3333/admin/consult",
            { table: "/exchanges" },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("session"),
                },
            }
        )
            .then((res) => {
                setExchanges(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getProducts();
        getOrders();
        getAdminInfo();
        getExchanges();
    }, [data]);

    async function deleteObj(id, type) {
        await Axios.delete("http://localhost:3333/admin", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("session"),
            },

            data: { id: id, table: `/${type}` },
        })
            .then((res) => {
                setData(!data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="admin-container">
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
                data={admin}
                type="admin"
            />

            {content === "" && (
                <Table
                    user="admin"
                    type="products"
                    data={products}
                    deleteObj={deleteObj}
                    setContent={setContent}
                    setData={setProduct}
                ></Table>
            )}

            {content === "product" && (
                <EditProduct
                    product={product}
                    setContent={setContent}
                ></EditProduct>
            )}

            {content === "Pedidos" && (
                <Table
                    user="admin"
                    type="orders"
                    data={orders}
                    deleteObj={deleteObj}
                    setContent={setContent}
                    setData={setOrder}
                ></Table>
            )}

            {content === "order" && (
                <EditOrder
                    userType={"admin"}
                    order={order}
                    setContent={setContent}
                ></EditOrder>
            )}

            {content === "Trocas" && (
                <Table
                    user="admin"
                    type="exchanges"
                    data={exchanges}
                    deleteObj={[]}
                    setContent={setContent}
                    setData={setExchange}
                ></Table>
            )}

            {content === "Perfil da Troca" && (
                <ExchangeProfile
                    user={"admin"}
                    exchange={exchange}
                    setContent={setContent}
                ></ExchangeProfile>
            )}
        </div>
    );
}

export default AdminPanel;
