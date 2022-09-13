import { useNavigate } from "react-router-dom";
import "../styles/itemListStyle.css";

function ItemList({ title, children, showBtn, btnText }) {
    const navigate = useNavigate();

    function handleNewRegistry() {
        switch (title) {
            case "Endereços":
                navigate("/");
                break;
            case "Cartões de crédito":
                navigate("/");
                break;
            default:
                break;
        }
    }

    return (
        <div className="list-container">
            <div className="list-container_top">
                <span className="list-title">{title}</span>
                { showBtn === true &&
                    <button onClick={() => handleNewRegistry()}>{btnText}</button>
                }
            </div>


            <div className="list-children">{children}</div>
        </div>
    );
}

export default ItemList;
