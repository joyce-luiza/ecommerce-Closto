import "../styles/headerStyle.css";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="transaction-info">
                <a>
                    <i class="ri-arrow-left-right-line ri-2x"></i>
                    <span>Devolução e troca em até 30 dias</span>
                </a>
                <a>
                    <i class="ri-bank-card-line ri-2x"></i>
                    <span>10x sem juros</span>
                </a>
                <a>
                    <i class="ri-truck-line ri-2x"></i>
                    <span>Frete grátis</span>
                </a>
            </div>

            <div className="search">
                <div className="header-logo">
                    <Link to="/">
                        <span>CLOSTO</span>
                    </Link>
                </div>

                <div className="header-search">
                    <div className="header-search-inputBtn">
                        <input
                            className="header-search-input"
                            type="text"
                            name="search"
                            id="search"
                            placeholder="O que você procura?"
                        />
                        <button className="header-search-btn">
                            <i class="ri-search-line ri-2x"></i>
                        </button>
                    </div>
                </div>

                <div className="header-icons">
                    <div className="header-icon_search">
                        <img src="/icons/search.svg" alt="Procurar" />
                    </div>

                    <div className="header-icon">
                        <Link to="/profile">
                            <i class="ri-user-line ri-2x"></i>
                        </Link>
                    </div>

                    <div className="header-icon">
                        <i class="ri-heart-line ri-2x"></i>
                    </div>

                    <div className="header-icon">
                        <i class="ri-shopping-bag-line ri-2x"></i>
                    </div>
                </div>
            </div>

            <div className="categories">
                <Link to="/categorias/novidades">
                    <span>NOVIDADES</span>
                </Link>

                <Link to="/categorias/acessorios">
                    <span>ACESSÓRIOS</span>
                </Link>

                <Link to="/categorias/roupas">
                    <span>ROUPAS</span>
                </Link>

                <Link to="/categorias/jeans">
                    <span>JEANS</span>
                </Link>

                <Link to="/categorias/calcados">
                    <span>CALÇADOS</span>
                </Link>

                <Link to="/categorias/fitness">
                    <span>FITNESS</span>
                </Link>
            </div>
        </header>
    );
}

export default Header;
