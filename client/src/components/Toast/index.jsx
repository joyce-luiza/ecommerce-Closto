import { toast } from "react-toastify";

export default function showToast(type, text) {
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
}
