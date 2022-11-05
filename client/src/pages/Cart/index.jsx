import '../../styles/Cart.css';
import { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import CartItem from '../../components/CartItem';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Form from '../../components/Form';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
	const { cart, clearCart } = useContext(CartContext);
	const [userCreditCards, setUserCreditCards] = useState([]);
	const [userAddresses, setUserAddresses] = useState([]);
	const [shippingAddress, setShippingAddress] = useState({});
	const [newAddress, setNewAddress] = useState({});
	const [orderValue, setOrderValue] = useState(0);
	const [coupon, setCoupon] = useState('');
	const [discount, setDiscount] = useState(0);
	var finalValue = 0;

	const [paymentCards, setPaymentCards] = useState([]);
	const [newCreditCard, setNewCreditCard] = useState({});
	const [content, setContent] = useState('');

	const navigate = useNavigate();

	const finishOrder = async () => {
		console.log(finalValue);
		await Axios.post(
			'http://localhost:3333/orders',
			{
				products: cart,
				total: finalValue,
				status: 'Pedido realizado',
				shipping: 0,
				discount: discount,
				coupon: coupon,
				paymentMethod: 'CreditCard',
				payment: [paymentCards],
				shippingAddress: shippingAddress,
			},
			{
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('session'),
				},
			}
		)
			.then((res) => {
				navigate(`order/${res.data.id}`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getOrderSubTotalValue = () => {
		var total = 0;

		for (let index = 0; index < cart.length; index++) {
			total += cart[index].price * cart[index].qtd;
		}

		setOrderValue(total);
	};

	const validateCoupon = (coupon) => {
		const date = new Date().toISOString();
		if (
			coupon.expiresIn < date ||
			coupon.active === false ||
			coupon.quantity < 1
		) {
			return showToast('error', 'Cupom expirado!');
		} else if (coupon.minValue > orderValue) {
			return showToast('error', 'Cupom inválido para essa compra!');
		} else {
			if (coupon.discountValue < 1) {
				setDiscount(orderValue * coupon.discountValue);
			} else {
				setDiscount(coupon.discountValue);
			}
		}
	};

	const removeCoupon = () => {
		setCoupon('');
		setDiscount(0);
		return showToast('success', 'Cupom removido');
	};

	const getCoupon = async () => {
		await Axios.post(
			'http://localhost:3333/coupons',
			{ code: coupon },
			{
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('session'),
				},
			}
		)
			.then((res) => {
				validateCoupon(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const addCardToPayment = (creditCard, checked) => {
		if (checked) {
			creditCard.checked = checked;
			setPaymentCards([...paymentCards, creditCard]);
		} else {
			creditCard.checked = checked;
			const filteredPaymentCards = paymentCards.filter(
				(card) => card.id !== creditCard.id
			);
			setPaymentCards(filteredPaymentCards);
		}
	};

	const addValueToCardToPayment = (creditCard, value) => {
		creditCard.toPay = value;
	};

	const getFinalValue = () => {
		var value = 0;

		for (let index = 0; index < paymentCards.length; index++) {
			if (paymentCards[index].checked) {
				value = value + paymentCards[index].toPay;
			}
		}

		if (value === orderValue - discount) {
			finalValue = value;
			setContent('');
			finishOrder();
			clearCart();
			return;
		} else {
			showToast('error', 'Valor inválido, insira novamente.');
		}
	};

	const getCreditCards = async () => {
		await Axios.get('http://localhost:3333/user/cards', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('session'),
			},
		})
			.then((res) => {
				setUserCreditCards(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getAddresses = async () => {
		await Axios.get('http://localhost:3333/user/addresses', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('session'),
			},
		})
			.then((res) => {
				setUserAddresses(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const addCreditCard = async (e) => {
		await Axios.post(
			'http://localhost:3333/user/cards',
			{
				cardHolderName: newCreditCard.cardHolderName,
				number: newCreditCard.number,
				serviceCode: newCreditCard.serviceCode,
				flag: newCreditCard.flag,
			},
			{
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('session'),
				},
			}
		)

			.then((res) => {
				showToast('success', 'Cartão de crédito inserido com sucesso!');
				setContent('CreditCards');
			})
			.catch((error) => {
				showToast('error', 'Não foi possível inserir o cartão de crédito!');
				console.log(error);
			});
	};

	const addNeWAddress = async (e) => {
		await Axios.post(
			'http://localhost:3333/user/addresses',
			{
				title: newAddress.title,
				type: newAddress.type,
				residenceType: newAddress.residenceType,
				cep: newAddress.cep,
				publicPlaceType: newAddress.publicPlaceType,
				publicPlace: newAddress.publicPlace,
				number: newAddress.number,
				neighborhood: newAddress.neighborhood,
				city: newAddress.city,
				state: newAddress.state,
				country: newAddress.country,
				note: newAddress.note,
				isPrincipal: newAddress.isPrincipal,
			},
			{
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('session'),
				},
			}
		)

			.then((res) => {
				showToast('success', 'Endereço inserido com sucesso!');
				setContent('Addresses');
			})
			.catch((error) => {
				showToast('error', 'Não foi possível inserir o endereço!');
				console.log(error);
			});
	};

	const showToast = (type, text) => {
		if (type === 'success') {
			return toast.success(text, {
				className: 'SuccessToast',
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
		}

		if (type === 'error') {
			return toast.error(text, {
				className: 'ErrorToast',
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
		}

		return;
	};

	useEffect(() => {
		getCreditCards();
		getAddresses();
	}, [content]);

	useEffect(() => {
		getOrderSubTotalValue();
	}, [cart]);

	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				draggable
			/>

			<section className="cart-container">
				<div className="cart-params">
					{content === '' && (
						<div className="cartContent">
							<div className="cart-itens">
								<div className="cart-itens_title">
									<h1>MEU CARRINHO</h1>
									<button onClick={clearCart}>Limpar</button>
								</div>
								{cart.map((product, index) => {
									return (
										<div className="cart-itens_item">
											<CartItem key={index} product={product} index={index} />
										</div>
									);
								})}
							</div>

							<div className="cart-next">
								<button
									className="cart-next_btn"
									onClick={() => {
										if (cart.length > 0) {
											setContent('Addresses');
										}
									}}
								>
									Selecionar endereço
								</button>
							</div>
						</div>
					)}
					{content === 'Addresses' && (
						<div className="cartAddresses">
							<div className="cart-itens_title">
								<h1>ENDEREÇO DE ENTREGA</h1>
								<button
									onClick={() => {
										setContent('newAddress');
									}}
								>
									Adicionar novo endereço
								</button>
							</div>

							<div className="addressCard">
								{userAddresses.map((address) => {
									return (
										<div className="addressCard-radioBtn">
											<input
												type="radio"
												id={`address-${address.id}`}
												name={`address-name`}
												value={address}
												onClick={() => {
													setShippingAddress(address);
												}}
											/>
											<div className="addressCard-radioBtn_label">
												<label for={`address-${address.id}`}>
													{address.title} • {address.publicPlaceType}{' '}
													{address.publicPlace} • nº {address.number}
												</label>
											</div>
										</div>
									);
								})}

								<div className="cart-next">
									<button
										className="cart-next_btn"
										onClick={() => {
											if (shippingAddress.id) {
												setContent('CreditCards');
											}
										}}
									>
										Selecionar forma de pagamento
									</button>
								</div>
							</div>
						</div>
					)}
					{content === 'newAddress' && (
						<Form title="Novo endereço">
							<label className="form-label" htmlFor="title">
								Título
							</label>
							<input
								className="form-input"
								type="text"
								name="title"
								id="title"
								placeholder="Casa na praia, Apartamento 404..."
								onChange={(e) =>
									setNewAddress((prevState) => ({
										...prevState,
										title: e.target.value,
									}))
								}
							/>

							<label className="form-label" htmlFor="type">
								Tipo de endereço
							</label>
							<select
								className="form-select"
								name="type"
								id="type"
								defaultValue="none"
								onChange={(e) =>
									setNewAddress((prevState) => ({
										...prevState,
										type: e.target.value,
									}))
								}
							>
								<option value="none" disabled hidden>
									Selecione uma opção
								</option>
								<option value="Entrega">Entrega</option>
								<option value="Cobrança">Cobrança</option>
							</select>

							<label className="form-label" htmlFor="residenceType">
								Tipo residência
							</label>
							<input
								className="form-input"
								type="text"
								name="residenceType"
								id="residenceType"
								placeholder="Casa, apartamento, etc..."
								onChange={(e) =>
									setNewAddress((prevState) => ({
										...prevState,
										residenceType: e.target.value,
									}))
								}
							/>

							<label className="form-label" htmlFor="cep">
								CEP
							</label>
							<input
								className="form-input"
								type="text"
								name="cep"
								id="cep"
								placeholder="00000-000"
								onChange={(e) =>
									setNewAddress((prevState) => ({
										...prevState,
										cep: e.target.value,
									}))
								}
							/>

							<label className="form-label" htmlFor="publicPlaceType">
								Tipo logradouro
							</label>
							<input
								className="form-input"
								type="text"
								name="publicPlaceType"
								id="publicPlaceType"
								placeholder="Rua, Avenida, etc..."
								onChange={(e) =>
									setNewAddress((prevState) => ({
										...prevState,
										publicPlaceType: e.target.value,
									}))
								}
							/>

							<label className="form-label" htmlFor="publicPlace">
								Logradouro
							</label>
							<input
								className="form-input"
								type="text"
								name="publicPlace"
								id="publicPlace"
								onChange={(e) =>
									setNewAddress((prevState) => ({
										...prevState,
										publicPlace: e.target.value,
									}))
								}
							/>

							<label className="form-label" htmlFor="neighborhood">
								Bairro
							</label>
							<input
								className="form-input"
								type="text"
								name="neighborhood"
								id="neighborhood"
								onChange={(e) =>
									setNewAddress((prevState) => ({
										...prevState,
										neighborhood: e.target.value,
									}))
								}
							/>

							<label className="form-label" htmlFor="number">
								Número
							</label>
							<input
								className="form-input"
								type="text"
								name="number"
								id="number"
								onChange={(e) =>
									setNewAddress((prevState) => ({
										...prevState,
										number: e.target.value,
									}))
								}
							/>

							<label className="form-label" htmlFor="city">
								Cidade
							</label>
							<input
								className="form-input"
								type="text"
								name="city"
								id="city"
								onChange={(e) =>
									setNewAddress((prevState) => ({
										...prevState,
										city: e.target.value,
									}))
								}
							/>

							<label className="form-label" htmlFor="state">
								Estado
							</label>
							<input
								className="form-input"
								type="text"
								name="state"
								id="state"
								onChange={(e) =>
									setNewAddress((prevState) => ({
										...prevState,
										state: e.target.value,
									}))
								}
							/>

							<label className="form-label" htmlFor="country">
								País
							</label>
							<input
								className="form-input"
								type="text"
								name="country"
								id="country"
								onChange={(e) =>
									setNewAddress((prevState) => ({
										...prevState,
										country: e.target.value,
									}))
								}
							/>

							<label className="form-label" htmlFor="note">
								Observações
							</label>
							<input
								className="form-input"
								type="text"
								name="note"
								id="note"
								onChange={(e) =>
									setNewAddress((prevState) => ({
										...prevState,
										note: e.target.value,
									}))
								}
							/>

							<label className="form-label" htmlFor="isPrincipal">
								Deseja que este seja seu endereço principal?
							</label>
							<select
								className="form-select"
								name="isPrincipal"
								id="isPrincipal"
								defaultValue="none"
								onChange={(e) =>
									setNewAddress((prevState) => ({
										...prevState,
										isPrincipal: e.target.value,
									}))
								}
							>
								<option value="none" disabled hidden>
									Selecione uma opção
								</option>
								<option value="true">Sim</option>
								<option value="false">Não</option>
							</select>

							<button
								id="submitNewAddress"
								className="form-btn"
								type="submit"
								onClick={() => {
									addNeWAddress(newAddress);
								}}
							>
								Adicionar endereço
							</button>

							<button
								className="form-btn"
								onClick={() => setContent('Addresses')}
							>
								Voltar
							</button>
						</Form>
					)}
					{content === 'CreditCards' && (
						<div className="cartCreditCards">
							<div className="cart-itens_title">
								<h1>CARTÕES CADASTRADOS</h1>
								<button
									onClick={() => {
										setContent('newCreditCard');
									}}
								>
									Adicionar novo cartão
								</button>
							</div>

							<div className="creditCard-info">
								{userCreditCards.map((creditCard) => {
									return (
										<div className="creditCard-card">
											<div className="cardCheckbox">
												<label for={`card-${creditCard.id}`}>
													{creditCard.number}
												</label>
												<input
													type="checkbox"
													id={`card-${creditCard.id}`}
													name={`card-${creditCard.id}`}
													onChange={(e) => {
														addCardToPayment(creditCard, e.target.checked);
														creditCard.installments = 1;
													}}
												/>
											</div>

											{creditCard.checked && (
												<>
													<label for="valueToPay">
														Insira o valor a ser cobrado:{' '}
													</label>
													<input
														type="number"
														name="valueToPay"
														id="valueToPay"
														onChange={(e) => {
															if (parseFloat(e.target.value) >= 10) {
																addValueToCardToPayment(
																	creditCard,
																	parseFloat(e.target.value)
																);
															} else {
																showToast(
																	'error',
																	'Valor mínimo por cartão: R$10'
																);
															}
														}}
													/>

													<select
														name="installments"
														id="installments"
														defaultValue={1}
														onChange={(e) => {
															creditCard.installments = parseInt(
																e.target.value
															);
														}}
													>
														<option value={1}>1x</option>
														<option value={2}>2x</option>
														<option value={3}>3x</option>
														<option value={4}>4x</option>
														<option value={5}>5x</option>
														<option value={6}>6x</option>
														<option value={7}>7x</option>
														<option value={8}>8x</option>
														<option value={9}>9x</option>
														<option value={10}>10x</option>
														<option value={11}>11x</option>
														<option value={12}>12x</option>
													</select>
												</>
											)}
										</div>
									);
								})}
							</div>

							<div className="cart-next">
								<button
									className="cart-next_btn"
									onClick={() => {
										if (paymentCards.length > 0) {
											getFinalValue();
										}
									}}
								>
									Finalizar Compra
								</button>
							</div>
						</div>
					)}
					{content === 'newCreditCard' && (
						<Form title="Novo cartão de crédito">
							<label className="form-label" htmlFor="cardHolderName">
								Nome impresso
							</label>
							<input
								className="form-input"
								type="text"
								name="cardHolderName"
								id="cardHolderName"
								placeholder=""
								onChange={(e) =>
									setNewCreditCard((prevState) => ({
										...prevState,
										cardHolderName: e.target.value,
									}))
								}
							/>

							<label className="form-label" htmlFor="number">
								Número
							</label>
							<input
								className="form-input"
								type="text"
								name="number"
								id="number"
								placeholder=""
								onChange={(e) =>
									setNewCreditCard((prevState) => ({
										...prevState,
										number: e.target.value,
									}))
								}
							/>

							<label className="form-label" htmlFor="serviceCode">
								CVV
							</label>
							<input
								className="form-input"
								type="text"
								name="serviceCode"
								id="serviceCode"
								placeholder=""
								onChange={(e) =>
									setNewCreditCard((prevState) => ({
										...prevState,
										serviceCode: e.target.value,
									}))
								}
							/>

							<label className="form-label" htmlFor="flag">
								Bandeira
							</label>
							<select
								className="form-select"
								name="flag"
								id="flag"
								defaultValue="none"
								onChange={(e) =>
									setNewCreditCard((prevState) => ({
										...prevState,
										flag: e.target.value,
									}))
								}
							>
								<option value="none" disabled hidden>
									Selecione uma opção
								</option>
								<option value="visa">Visa</option>
								<option value="mastercard">Mastercard</option>
								<option value="elo">Elo</option>
							</select>

							<button
								id="submitNewCreditCard"
								className="form-btn"
								type="submit"
								onClick={() => {
									addCreditCard(newCreditCard);
								}}
							>
								Adicionar cartão
							</button>

							<button
								className="form-btn"
								onClick={() => setContent('CreditCards')}
							>
								Voltar
							</button>
						</Form>
					)}
				</div>

				<div className="order-summary">
					<h1 className="order-summary_title">RESUMO DA COMPRA</h1>

					<div className="order-item">
						<span className="order-item_title">subtotal</span>
						<span className="order-item_value">R$ {orderValue}</span>
					</div>

					<div className="order-item">
						<span className="order-item_title">frete</span>
						<span className="order-item_value">A calcular</span>
					</div>

					<div className="order-item">
						<span className="order-item_title">desconto</span>
						<span className="order-item_value">R$ {discount}</span>
					</div>

					<div className="order-item">
						<h4>TOTAL</h4>
						<div className="order-total_value">
							<span className="total-value">R$ {orderValue - discount}</span>
							<span className="installment">
								10x de R$ {(orderValue - discount) / 10}
							</span>
						</div>
					</div>

					<h1 className="order-summary_title">CALCULAR FRETE</h1>

					<div className="order-item">
						<input type="text" name="shipping-tax" id="shipping-tax" />
						<button>Calcular</button>
					</div>

					<h1 className="order-summary_title">CUPOM DE DESCONTO</h1>

					<div className="order-item">
						<input
							type="text"
							name="coupon"
							id="coupon"
							onChange={(e) => setCoupon(e.target.value)}
						/>
						<button
							onClick={() => {
								removeCoupon();
							}}
						>
							Remover cupom
						</button>
						<button
							onClick={() => {
								getCoupon();
							}}
						>
							Aplicar
						</button>
					</div>
				</div>
			</section>
		</>
	);
}

export default Cart;
