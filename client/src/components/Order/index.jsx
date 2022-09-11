import "../styles/orderStyle.css";
import { Link } from "react-router-dom";

export default function Order({ id, status, date, price, btn }) {
    return (
        <section className="pedido-container">
            <div className="pedido-number">
                <span className="title">Numero do pedido</span>
                <span>
                    <Link className="parameter" to="/">
                        #000000000{id}
                    </Link>
                </span>
            </div>

            <div className="pedido-info">
                <span className="title">Status</span>
                <span className="parameter">{status}</span>
            </div>

            <div className="pedido-info">
                <span className="title">Data</span>
                <span className="parameter">{date}</span>
            </div>

            <div className="pedido-info">
                <span className="title">Pagamento</span>
                <span className="parameter">R${price}</span>
            </div>

            <div className="btn-pedido">
                <button>{btn}</button>
            </div>
        </section>
    );
}
