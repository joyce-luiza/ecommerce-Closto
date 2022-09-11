import "../styles/footerStyle.css";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="logo">
                <p className="title">CLOSTO</p>
                <p className="slogan">Um slogan legal.</p>
            </div>

            <div className="pagamento">
                <p className="footer-menu-title">Formas de pagamento</p>

                <div className="flags">
                    <i class="ri-visa-line ri-2x"></i>
                    <i class="ri-mastercard-line ri-2x"></i>
                    <i class="ri-bank-card-line ri-2x"></i>
                </div>
            </div>

            <div className="contact">
                <p className="footer-menu-title">Canais de atendimento</p>

                <div className="contact-form">
                    <i class="ri-phone-line ri-2x"></i>
                    <p className="info">(00) 00000-0000</p>
                </div>

                <div className="contact-form">
                    <i class="ri-mail-line ri-2x"></i>
                    <p className="info">closto.suporte@closto.com</p>
                </div>
            </div>

            <div className="support">
                <p className="footer-menu-title">Ajuda e Suporte</p>

                <div className="support-links">
                    <Link className="support-item" to="/">
                        Políticas de privacidade
                    </Link>
                    <Link className="support-item" to="/">
                        Prazo de entrega
                    </Link>
                    <Link className="support-item" to="/">
                        Políticas de troca e devolução
                    </Link>
                </div>
            </div>
        </footer>
    );
}
