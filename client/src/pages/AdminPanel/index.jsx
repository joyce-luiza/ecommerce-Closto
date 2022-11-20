import Axios from 'axios';
import { useState } from 'react';
import ProfileOptions from '../../components/ProfileOptions';
import { ToastContainer } from 'react-toastify';
import '../../styles/AdminProfileStyle.css';
import Table from '../../components/Table';
import { useEffect } from 'react';
import EditProduct from '../../components/EditProduct';
import EditOrder from '../../components/EditOrder';
import ExchangeProfile from '../../components/ExchangeProfile';
import showToast from '../../components/Toast';
import Graph from '../../components/Graph';
import _ from 'lodash';

function AdminPanel() {
	const [admin, setAdmin] = useState({});
	const [content, setContent] = useState('');
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState({});
	const [orders, setOrders] = useState([]);
	const [order, setOrder] = useState({});
	const [data, setData] = useState(false);
	const [exchanges, setExchanges] = useState([]);
	const [exchange, setExchange] = useState({});
	const [graphCategoryData, setCategoryData] = useState([]);
	const [graphValuesData, setValuesData] = useState([]);

	const getOrdersInfo = async () => {
		await Axios.post(
			'http://localhost:3333/admin/consult',
			{ table: '/orders' },
			{
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('session'),
				},
			}
		)
			.then(async (res) => {
				prepareCategoryData(res.data);
				prepareValuesData(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const prepareCategoryData = (ordersData) => {
		const orders = ordersData;

		var products = [];

		orders.forEach((order) => {
			for (let index = 0; index < order.products.length; index++) {
				products.push(order.products[index]);
			}
		});

		products = _.groupBy(products, (product) => {
			return product.category;
		});

		const result = _.map(products, (product, key) => {
			return [key, _.sumBy(products[key], (p) => p.qtd)];
		});

		setCategoryData(result);
	};

	const prepareValuesData = (ordersData) => {
		const orders = _.groupBy(ordersData, (order) => {
			if (order.total <= 200) {
				return '0 - 200';
			} else if (order.total <= 400) {
				return '200 - 400';
			} else if (order.total <= 600) {
				return '400 - 600';
			} else if (order.total <= 800) {
				return '600 - 800';
			} else if (order.total <= 800) {
				return '800 - 1000';
			} else if (order.total > 1000) {
				return '1000+';
			}
		});

		const result = _.map(orders, (order, key) => {
			return [key, _.sumBy(orders[key], () => 1)];
		});

		console.log(result);

		setValuesData(result);
	};

	async function getAdminInfo() {
		await Axios.get('http://localhost:3333/users', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('session'),
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
			'http://localhost:3333/admin/consult',
			{ table: '/products' },
			{
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('session'),
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
			'http://localhost:3333/admin/consult',
			{ table: '/orders' },
			{
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('session'),
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
			'http://localhost:3333/admin/consult',
			{ table: '/exchanges' },
			{
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('session'),
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
		getOrdersInfo();
		getProducts();
		getOrders();
		getAdminInfo();
		getExchanges();
	}, [data]);

	async function deleteObj(id, type) {
		await Axios.delete('http://localhost:3333/admin', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('session'),
			},

			data: { id: id, table: `/${type}` },
		})
			.then((res) => {
				showToast('success', 'Objeto deletado com sucesso!');
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
			<ProfileOptions handleContent={handleContent} data={admin} type="admin" />

			{content === '' && (
				<Table
					user="admin"
					type="products"
					data={products}
					deleteObj={deleteObj}
					setContent={setContent}
					setData={setProduct}
				></Table>
			)}

			{content === 'product' && (
				<EditProduct product={product} setContent={setContent}></EditProduct>
			)}

			{content === 'Pedidos' && (
				<Table
					user="admin"
					type="orders"
					data={orders}
					deleteObj={deleteObj}
					setContent={setContent}
					setData={setOrder}
				></Table>
			)}

			{content === 'order' && (
				<EditOrder
					userType={'admin'}
					order={order}
					setContent={setContent}
				></EditOrder>
			)}

			{content === 'Trocas' && (
				<Table
					user="admin"
					type="exchanges"
					data={exchanges}
					deleteObj={deleteObj}
					setContent={setContent}
					setData={setExchange}
				></Table>
			)}

			{content === 'Relatório' && (
				<>
					<Graph
						graphData={graphCategoryData}
						graphOptions={{
							title: 'Vendas por categoria de produto',
							is3D: true,
							slices: {
								0: { color: '#221d21' },
								1: { color: '#433d3d' },
								2: { color: '#e33c08' },
								3: { color: '#f77014' },
								4: { color: '#ffa927' },
							},
						}}
					/>
					<Graph
						graphData={graphValuesData}
						graphOptions={{
							title: 'Valor por pedido (R$)',
							is3D: false,
							pieHole: 0.3,
							slices: {
								0: { color: '#5b1d99' },
								1: { color: '#0074b4' },
								2: { color: '#00b34c' },
								3: { color: '#ffd41f' },
								4: { color: '#fc6e3d' },
							},
						}}
					/>
				</>
			)}

			{content === 'Perfil da Troca' && (
				<ExchangeProfile
					user={'admin'}
					exchange={exchange}
					setContent={setContent}
				></ExchangeProfile>
			)}
		</div>
	);
}

export default AdminPanel;
