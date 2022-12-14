import '../styles/headerStyle.css';
import 'remixicon/fonts/remixicon.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

function Header() {
	const [login, setLogin] = useState('');
	var test = '';

	async function isLogged() {
		if (window.localStorage.getItem('session')) {
			setLogin(
				<Link className="header-icon_link" to="/profile">
					<i className="ri-user-line ri-2x"></i>
				</Link>
			);
		} else {
			setLogin(
				<Link className="header-icon_link" to="/login">
					<i className="ri-user-line ri-2x"></i>
				</Link>
			);
		}
	}

	useEffect(() => {
		isLogged();
	}, []);

	return (
		<header>
			<div className="transaction-info">
				<a>
					<i className="ri-arrow-left-right-line ri-2x"></i>
					<span>Devolução e troca em até 30 dias</span>
				</a>
				<a>
					<i className="ri-bank-card-line ri-2x"></i>
					<span>10x sem juros</span>
				</a>
				<a>
					<i className="ri-truck-line ri-2x"></i>
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
							<i className="ri-search-line ri-2x"></i>
						</button>
					</div>
				</div>

				<div className="header-icons">
					<div className="header-icon_search">
						<img src="/icons/search.svg" alt="Procurar" />
					</div>

					<div
						id="profile-icon"
						className="header-icon"
						onClick={() => {
							isLogged();
						}}
					>
						{login}
					</div>

					<div className="header-icon">
						<i className="ri-heart-line ri-2x"></i>
					</div>

					<div id="cart-icon" className="header-icon">
						<Link className="header-icon_link" to="/cart">
							<i className="ri-shopping-bag-line ri-2x"></i>
						</Link>
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
