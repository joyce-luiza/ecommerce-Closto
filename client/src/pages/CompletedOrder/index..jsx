import '../../styles/CompletedOrderStyle.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';

function CompletedOrder() {
	const orderId = useParams().id;
	const [orderInfo, setOrderInfo] = useState();

	const getOrderInfo = async () => {
		await Axios.post(
			'http://localhost:3333/order',
			{
				id: orderId,
			},
			{
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('session'),
				},
			}
		)
			.then((res) => {
				setOrderInfo(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});

		return;
	};

	useEffect(() => {
		getOrderInfo();
	}, []);

	return (
		<section className="order-container">
			<div className="order-body">
				<div className="thanks-container">
					<h1>Agradecemos pela preferência!</h1>
					<span>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar
						neque sed metus sagittis malesuada facilisi ante. Lorem ipsum dolor
						sit amet, consectetur adipiscing elit.
					</span>
				</div>

				<div className="order-status_container">
					{orderInfo && (
						<>
							<h1>Pedido #{orderId}</h1>
							<span> Status: {orderInfo.status}</span>
							<span>
								O pedido será enviado em até 3 dias após a confirmação do
								pagamento.
							</span>
							<button>Acompanhar Pedido</button>
						</>
					)}
				</div>

				<div className="order-details_container">
					<div className="order-resume_values">
						<h1>Resumo da compra</h1>

						<div className="detailed-values">
							{orderInfo && (
								<>
									<div className="detailed-value_row">
										<span>Frete</span>
										<span>R$ {orderInfo.shipping}</span>
									</div>

									<div className="detailed-value_row">
										<span>Desconto</span>
										<span>R$ {orderInfo.discount}</span>
									</div>

									<div className="detailed-value_row">
										<span>Produto</span>
										<span>
											R${' '}
											{orderInfo.total +
												orderInfo.discount -
												orderInfo.shipping}
										</span>
									</div>

									<div className="detailed-value_row">
										<span>Total</span>
										<span>R$ {orderInfo.total}</span>
									</div>
								</>
							)}
						</div>
					</div>

					<div className="order-resume_userInfos">
						<div className="order-address">
							<h1>Endereços</h1>
							<div className="address-details">
								{orderInfo && (
									<>
										<h3>{orderInfo.shippingAddress.title}</h3>
										<span>
											{orderInfo.shippingAddress.publicPlaceType}{' '}
											{orderInfo.shippingAddress.publicPlace}
											{', '}
											{orderInfo.shippingAddress.number}{' '}
										</span>

										<span>
											{orderInfo.shippingAddress.city}{' '}
											{orderInfo.shippingAddress.state} CEP:{' '}
											{orderInfo.shippingAddress.cep}
										</span>
									</>
								)}
							</div>
						</div>

						<div className="order-payment-method">
							<h1>Forma de pagamento</h1>
							<div className="card-number">
								<h3>Cartão de crédito</h3>
								{orderInfo &&
									orderInfo.payment[0].map((card) => {
										return (
											<div key={card.id}>
												<span>{card.number}</span>
											</div>
										);
									})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CompletedOrder;
