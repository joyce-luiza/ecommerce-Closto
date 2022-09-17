import "../../styles/UserProfileStyle.css";
import Axios from "axios";

import { useEffect, useState } from "react";
import UserOptions from "../../components/UserOptions";
import ListUserAddresses from "../../components/ListUserAddresses";
import EditUser from "../../components/EditUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePassword from "../../components/ChangePassword";


function UserProfile2() {
    const [user, setUser] = useState({});
    const [updatedUser, setUpdatedUser] = useState({});
    const [content, setContent] = useState("");

    function handleContent(content) {
        setContent(content);
        return;
    }

    const showToast = ((type, text) => {

        if (type === "success"){
            return toast.success(text, {
                className: "SuccessToast",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        }

        if (type === "error"){
            return toast.error(text, {
                className: "ErrorToast",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        }

        return;
    })


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

    useEffect(() => {
        getUserInfo();
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

            <UserOptions
                user={user}
                handleContent={handleContent}
            />

            {content === "" &&
                <EditUser
                    user={user}
                    setUser={setUser}
                    updatedUser={updatedUser}
                    setUpdatedUser={setUpdatedUser}
                    handleContent={handleContent}
                    showToast={showToast}
                />
            }

            {content === "Alterar Senha" &&
                <ChangePassword
                    handleContent={handleContent}
                    user={user}
                    showToast={showToast}
                />
            }

            {content === "Endereços" &&
                <ListUserAddresses
                    showToast={showToast}
                />
            }

        </div>
    );
}

export default UserProfile2;
