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
import _, { forEach } from 'lodash';

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
	const [graphData, setGraphData] = useState([]);

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
				getGraphData(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	async function getGraphData(data) {
		const orders = data;
		const total = [];
		const dates = [];
		const totalOrders = [];

		orders.forEach((order) => {
			const createdAt = new Date(order.createdAt);
			const formattedDate = `${
				createdAt.getUTCMonth() + 1
			}/${createdAt.getUTCDate()}/${createdAt.getFullYear()}`;
			dates.push(formattedDate);
		});

		const filteredDates = [...new Set(dates)];

		filteredDates.forEach((day) => {
			var valuePerDay = 0;
			var totalOrdersPerDay = 0;

			orders.forEach((order) => {
				const createdAt = new Date(order.createdAt);
				const formattedDate = `${
					createdAt.getUTCMonth() + 1
				}/${createdAt.getUTCDate()}/${createdAt.getFullYear()}`;
				if (day === formattedDate) {
					valuePerDay += order.total;
					totalOrdersPerDay += 1;
				}
			});

			total.push(valuePerDay);
			totalOrders.push(totalOrdersPerDay);
		});

		const categoriesData = prepareCategoryData(data);

		const result = {
			values: [
				{
					name: 'Valor total (R$)',
					data: total,
				},
				{
					name: 'Pedidos',
					data: totalOrders,
				},
				...categoriesData,
			],
			x: filteredDates,
		};

		setGraphData(result);
	}

	const prepareCategoryData = (ordersData) => {
		const orders = ordersData;
		const productsCategories = [];

		orders.forEach((order) => {
			const createdAt = new Date(order.createdAt);
			const formattedDate = `${
				createdAt.getUTCMonth() + 1
			}/${createdAt.getUTCDate()}/${createdAt.getFullYear()}`;

			order.createdAt = formattedDate;
		});

		var ordersPerDay = _.groupBy(orders, (order) => order.createdAt);

		var categoriesPerDay = [];

		_.forEach(ordersPerDay, (orders, key) => {
			var categories = [];
			orders.forEach((order) => {
				order.products.forEach((product) => {
					productsCategories.push(product.category);
					for (let index = 0; index < product.qtd; index++) {
						categories.push(product.category);
					}
				});
			});
			categoriesPerDay.push(categories);
		});

		const treatedCategories = [];
		const treatedCatValues = [];

		categoriesPerDay.forEach((day) => {
			treatedCategories.push(countCategories(day));
		});

		const filteredCategories = [...new Set(productsCategories)];
		const catValues = [];

		for (let index = 0; index < treatedCategories.length; index++) {
			filteredCategories.forEach((filteredCategory, key) => {
				catValues.push([]);
				var values = 0;
				Object.keys(treatedCategories[index]).forEach((cat, catIndex) => {
					if (cat === filteredCategory) {
						var catValue = treatedCategories[index];
						values += catValue[cat];
					}
				});
				catValues[key].push(values);
			});
		}

		for (let index = 0; index < filteredCategories.length; index++) {
			treatedCatValues.push(catValues[index]);
		}

		const result = [];

		treatedCatValues.forEach((values, key) => {
			result.push({
				name: filteredCategories[key],
				data: values,
			});
		});

		console.log(result);
		return result;
	};

	function countCategories(arr) {
		const map = Object.create(null);
		for (const str of arr) {
			if (map[str]) {
				map[str] += 1;
			} else {
				map[str] = 1;
			}
		}

		return map;
	}

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
					<Graph graphData={graphData} />
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
