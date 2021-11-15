import {closeModal, openModal, formatOrders, generateID, showAlertModal} from '../../helpers/utils';

import Component from '../../views/component';

import OrderInfo from '../../../templates/pages/order.hbs';
import UserInfo from '../../../templates/pages/userInfo.hbs';
import Error404Template from '../../../templates/pages/error404.hbs';
import OrderServicesRow from '../../../templates/pages/orderServicesRow.hbs';

import Orders from '../../models/orders';


class Order extends Component {
	constructor() {
		super();

		this.model = new Orders();
	}

	async getData() {
		try {
			return await this.model.getOrder(this.request.id);
		} catch {
			showAlertModal('alert-modal', {
				title : 'Ошибка!',
				message : 'Не удалось получить данные о заказе!'
			});
		}

	}

	async getServices() {
		try {
			return await this.model.getServicesList();
		} catch {
			showAlertModal('alert-modal', {
				title : 'Ошибка!',
				message : 'Не удалось получить справочник услуг!'
			});
		}
	}

	async setOrderChanges(changesInfo, changesTasks) {
		try {
			return await this.model.setOrderChanges(changesInfo, changesTasks);
		} catch {
			showAlertModal('alert-modal', {
				title : 'Ошибка!',
				message : 'Не удалось сохранить изменения в заказе!'
			});
		}
	}

	async render(data) {
		try {
			const [orderInfo, orderServices] = data,
				request = this.request,
				formatOrderInfo = formatOrders([orderInfo])[0],
				services = await this.getServices();

			const formatOrderServices = this.formatOrderTasksData(orderServices, services);

			const orderTotal = this.formatOrderTotal(formatOrderServices);

			return Object.keys(data).length ? OrderInfo({formatOrderInfo, formatOrderServices, services, request, orderTotal}) : Error404Template();
		} catch (e) {
			showAlertModal('alert-modal', {
				title : 'Ошибка!',
				message : 'Не сформировать страницу!'
			});
		}
	}

	renderTable(table, orderServices, services) {
		const formatOrderServices = this.formatOrderTasksData(orderServices, services),
			orderTotal = this.formatOrderTotal(formatOrderServices);

		table.innerHTML = OrderServicesRow({formatOrderServices, orderTotal});
	}

	formatOrderTasksData(orderServices, sevicesList) {
		return orderServices.map(orderService => {
			const {id, order_id, task_id, amount} = orderService,
				serviceTitle = sevicesList.find(service => service.id === task_id).title,
				servicePrice = sevicesList.find(service => service.id === task_id).price;

			const formatOrder = {
				id,
				order_id,
				task_id : serviceTitle,
				amount,
				task_price : servicePrice,
				task_total : this.formatTotalPrice(servicePrice * amount)
			};

			return formatOrder;
		});
	}

	formatTotalPrice(value) {
		return Math.ceil(value * 100) / 100;
	}

	formatOrderTotal(order) {
		let totalOrder = 0;
		for (let service of order) {
			totalOrder += service.task_total;
		}
		return this.formatTotalPrice(totalOrder);
	}

	disabledSaveBtn(btn) {
		btn.removeAttribute('disabled');
	}

	afterRender() {
		super.afterRender();
		this.setActions();
	}

	async setActions() {
		const userInfoBlock = document.getElementsByClassName('userInfoBlockJs')[0],
			addServiceBtn = document.getElementsByClassName('addServicesBtnJs')[0],
			addServicesList = document.getElementsByClassName('addServicesListJs')[0],
			setUserInfoForm = document.getElementById('editUserForm'),
			setUserInfoInputs = setUserInfoForm.getElementsByTagName('input'),
			servicesTable = document.getElementsByClassName('orderServicesTableBodyJs')[0],
			setStatus = document.getElementsByClassName('orderStatusJs')[0],
			saveChanges = document.getElementsByClassName('saveOrderChanges')[0],
			services = await this.getServices(),
			request = this.request;

		let [orderInfo, orderServices] = await this.getData();


		setUserInfoForm.addEventListener('submit', () => {
			event.preventDefault();

			orderInfo.fio = setUserInfoInputs.editUserName.value ? setUserInfoInputs.editUserName.value.trim() : orderInfo.fio;
			orderInfo.car = setUserInfoInputs.editUserCar.value ? setUserInfoInputs.editUserCar.value.trim() : orderInfo.car;
			orderInfo.reg_number = setUserInfoInputs.editUserCarNum.value ? setUserInfoInputs.editUserCarNum.value.trim() : orderInfo.reg_number;

			const formatOrderInfo = formatOrders([orderInfo])[0];

			userInfoBlock.innerHTML = UserInfo({formatOrderInfo, request});

			for (let  input of setUserInfoInputs) {
				input.value = '';
			}

			closeModal();

			this.disabledSaveBtn(saveChanges);
		});

		setStatus.addEventListener('change', () => {
			const date = new Date();

			switch (setStatus.value) {
				case 'done':
					setStatus.classList.remove('in-process');
					setStatus.classList.add('done');
					orderInfo.status_id = '3';
					orderInfo.closed_at =`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
					break;
				case 'in-process':
					setStatus.classList.remove('done');
					setStatus.classList.add('in-process');
					orderInfo.status_id = '1';
					orderInfo.closed_at = '—';
					break;
			}

			const formatOrderInfo = formatOrders([orderInfo])[0];

			userInfoBlock.innerHTML = UserInfo({formatOrderInfo, request});

			this.disabledSaveBtn(saveChanges);
		});

		servicesTable.addEventListener('click', (e) => {
			const target = e.target,
				serviceRow = target.closest('.serviceRowJs'),
				counterService = serviceRow.querySelectorAll('.counterValueJs'),
				totalSevice = serviceRow.querySelectorAll('.serviceTotalPriceJs'),
				priceService = +(serviceRow.querySelectorAll('.servicePriceJs')[0]).innerText;

			if (target.closest('.counterMinusJs')) {

				if (+target.nextElementSibling.innerText > 1) {
					for (let counter of counterService) {
						counter.innerText = +counter.innerText - 1;

						orderServices.find(task => task.id === serviceRow.dataset.taskId).amount = counter.innerText;

						this.renderTable(servicesTable, orderServices, services);
					}

					this.disabledSaveBtn(saveChanges);
				}
			}
			if (target.closest('.counterPlusJs')) {
				for (let counter of counterService) {
					counter.innerText = +counter.innerText + 1;

					orderServices.find(task => task.id === serviceRow.dataset.taskId).amount = counter.innerText;

					this.renderTable(servicesTable, orderServices, services);
				}

				this.disabledSaveBtn(saveChanges);
			}

			if (target.closest('.removeServiceJs')) {
				event.preventDefault();

				const href = target.closest('.removeServiceJs').getAttribute('href'),
					serviceRowId = serviceRow.dataset.taskId;

				closeModal();
				openModal(href);

				document.body.addEventListener('click', async(e) => {
					const target = e.target;

					if (target.closest('.removeServiceIdJs')) {
						orderServices = orderServices.filter(task => task.id !== serviceRowId);

						this.renderTable(servicesTable, orderServices, services);

						closeModal();

						this.disabledSaveBtn(saveChanges);
					}
				});
			}

			for (let total of totalSevice) {
				total.innerText = this.formatTotalPrice(counterService[0].innerText * priceService);
			}

		});

		addServiceBtn.addEventListener('click', async() => {
			const checkedCheckBoxs = addServicesList.querySelectorAll('input:checked');

			for (let checkbox of checkedCheckBoxs) {
				const serviceInOrder = orderServices.find(task => task.task_id === checkbox.parentElement.dataset.id);

				if (serviceInOrder) {
					const serviceRow = servicesTable.querySelectorAll(`[data-task-id = "${serviceInOrder.id}"]`)[0],
						counterService = serviceRow.querySelectorAll('.counterValueJs'),
						totalSevice = serviceRow.querySelectorAll('.serviceTotalPriceJs'),
						priceService = +(serviceRow.querySelectorAll('.servicePriceJs')[0]).innerText;

					serviceInOrder.amount = `${++serviceInOrder.amount}`;

					for (let counter of counterService) {
						counter.innerText = +counter.innerText + 1;
					}
					for (let total of totalSevice) {
						total.innerText = this.formatTotalPrice(counterService[0].innerText * priceService);
					}

				} else {
					const newServiceInOrder = {};

					newServiceInOrder.id = generateID();
					newServiceInOrder.order_id = orderInfo.id;
					newServiceInOrder.task_id = checkbox.parentElement.dataset.id;
					newServiceInOrder.amount = '1';
					orderServices.push(newServiceInOrder);
				}
			}

			this.renderTable(servicesTable, orderServices, services);

			this.disabledSaveBtn(saveChanges);
		});

		saveChanges.addEventListener('click', (e) => {
			e.preventDefault();

			const target = e.target,
				href = target.getAttribute('href');

			closeModal();
			openModal(href);

			document.body.addEventListener('click', async(e) => {
				const target = e.target;

				if (target.closest('.saveServicesDataJs')) {
					await this.setOrderChanges(orderInfo, orderServices);

					closeModal();

					saveChanges.setAttribute('disabled', 'true');
				}
			});
		});
	}
}

export default Order;
