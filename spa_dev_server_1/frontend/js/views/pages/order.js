import {closeModal, formatOrders, generateID, showAlertModal} from '../../helpers/utils';

import Component from '../../views/component';

import OrderInfo from '../../../templates/pages/order.hbs';
import UserInfo from '../../../templates/pages/userInfoData.hbs';
import Error404Template from '../../../templates/pages/error404.hbs';
import OrderTaskRow from '../../../templates/pages/orderTaskRow.hbs';

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
			showAlertModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось получить данные о заказе!'
			});
		}

	}

	async getServices() {
		try {
			return await this.model.getServicesList();
		} catch {
			showAlertModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось получить справочник услуг!'
			});
		}
	}

	async setOrderChanges(changesInfo, changesTasks) {
		try {
			return await this.model.setOrderChanges(changesInfo, changesTasks);
		} catch {
			showAlertModal('alert-modal', 'alert',  {
				title : 'Ошибка!',
				message : 'Не удалось сохранить изменения в заказе!'
			});
		}
	}

	async render(data) {
		try {
			const [orderInfo, orderTasks] = data,
				request = this.request,
				formatOrderInfo = formatOrders([orderInfo])[0],
				services = await this.getServices(),
				formatOrderTasks = this.formatOrderTasksData(orderTasks, services),
				orderTotal = this.formatOrderTotal(formatOrderTasks);

			return Object.keys(data).length ? OrderInfo({formatOrderInfo, formatOrderTasks, services, request, orderTotal}) : Error404Template();
		} catch (e) {
			showAlertModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось сформировать страницу!'
			});
		}
	}

	renderTable(table, orderTasks, services) {
		const formatOrderTasks = this.formatOrderTasksData(orderTasks, services),
			orderTotal = this.formatOrderTotal(formatOrderTasks);

		table.innerHTML = OrderTaskRow({formatOrderTasks, orderTotal});
	}

	formatOrderTasksData(orderTasks, services) {
		return orderTasks.map(orderTask => {
			const {id, order_id, task_id, amount} = orderTask,
				taskTitle = services.find(service => service.id === task_id).title,
				taskPrice = services.find(service => service.id === task_id).price;

			const formatOrder = {
				id,
				order_id,
				task_id : taskTitle,
				amount,
				task_price : taskPrice,
				task_total : this.formatTotalPrice(taskPrice * amount)
			};

			return formatOrder;
		});
	}

	formatTotalPrice(value) {
		return +value.toFixed(2);
	}

	formatOrderTotal(order) {
		let totalOrder = 0;
		for (let task of order) {
			totalOrder += task.task_total;
		}
		return totalOrder.toFixed(2);
	}

	async afterRender() {
		super.afterRender();
		await this.setActions();
	}

	async setActions() {
		const userInfoBlock = document.getElementsByClassName('userInfoBlockJs')[0],
			openUserInfoBlock = document.getElementsByClassName('openChangeInfoModalJs')[0],
			addTaskBtn = document.getElementsByClassName('addTaskBtnJs')[0],
			addTasksList = document.getElementsByClassName('addTasksListJs')[0],
			tasksTable = document.getElementsByClassName('orderTasksTableBodyJs')[0],
			setStatus = document.getElementsByClassName('orderStatusJs')[0],
			saveChanges = document.getElementsByClassName('saveOrderChanges')[0],
			services = await this.getServices(),
			request = this.request;

		let [orderInfo, orderTasks] = await this.getData();

		openUserInfoBlock.addEventListener('click', (e) => {
			e.preventDefault();

			const href = openUserInfoBlock.getAttribute('href');

			showAlertModal(href, 'edit-data', {
				fio : orderInfo.fio,
				userCar : orderInfo.car,
				userCarNum : orderInfo.reg_number
			});

			document.body.addEventListener('submit', async(e) => {
				const target = e.target;

				if (target.closest('#userForm')) {
					event.preventDefault();

					const userInfoForm = target.closest('#userForm'),
						userInfoInputs = userInfoForm.getElementsByTagName('input');

					let fio = userInfoInputs.userName.value.trim(),
						car = userInfoInputs.userCar.value.trim(),
						carNum = userInfoInputs.userCarNum.value.trim();

					orderInfo.fio = fio ? fio : orderInfo.fio;
					orderInfo.car = car ? car : orderInfo.car;
					orderInfo.reg_number = carNum ? carNum : orderInfo.reg_number;

					const formatOrderInfo = formatOrders([orderInfo])[0];

					userInfoBlock.innerHTML = UserInfo({formatOrderInfo, request});

					saveChanges.removeAttribute('disabled');

					closeModal();
				}
			});
		});

		setStatus.addEventListener('change', () => {
			const date = new Date(),
				gYear = date.getFullYear(),
				gMonth = date.getMonth() + 1,
				gData = date.getDate(),
				gHours = date.getHours(),
				gMin = date.getMinutes(),
				gSec = date.getSeconds();


			switch (setStatus.value) {
				case 'done':
					setStatus.classList.remove('in-process');
					setStatus.classList.add('done');
					orderInfo.status_id = '3';
					orderInfo.closed_at =`${gYear}-${gMonth}-${gData} ${gHours}:${gMin}:${gSec}`;
					break;
				case 'in-process':
					setStatus.classList.remove('done');
					setStatus.classList.add('in-process');
					orderInfo.status_id = '1';
					orderInfo.closed_at = '—';
					break;
				case 'cancel':
					setStatus.classList.remove('done');
					setStatus.classList.remove('in-process');
					orderInfo.status_id = '2';
					orderInfo.closed_at = `${gYear}-${gMonth}-${gData} ${gHours}:${gMin}:${gSec}`;
					break;
			}

			const formatOrderInfo = formatOrders([orderInfo])[0];

			userInfoBlock.innerHTML = UserInfo({formatOrderInfo, request});

			saveChanges.removeAttribute('disabled');
		});

		tasksTable.addEventListener('click', (e) => {
			const target = e.target,
				taskRow = target.closest('.taskRowJs'),
				counterTask = taskRow.querySelectorAll('.counterValueJs'),
				totalTask = taskRow.querySelectorAll('.taskTotalPriceJs'),
				priceTask = +(taskRow.querySelectorAll('.taskPriceJs')[0]).innerText;

			if (target.closest('.counterMinusJs')) {

				if (+target.nextElementSibling.innerText > 1) {
					for (let counter of counterTask) {
						counter.innerText = +counter.innerText - 1;

						orderTasks.find(task => task.id === taskRow.dataset.taskId).amount = counter.innerText;

						this.renderTable(tasksTable, orderTasks, services);
					}

					saveChanges.removeAttribute('disabled');
				}
			}

			if (target.closest('.counterPlusJs')) {
				for (let counter of counterTask) {
					counter.innerText = +counter.innerText + 1;

					orderTasks.find(task => task.id === taskRow.dataset.taskId).amount = counter.innerText;

					this.renderTable(tasksTable, orderTasks, services);
				}

				saveChanges.removeAttribute('disabled');
			}

			if (target.closest('.removeTaskJs')) {
				event.preventDefault();

				const href = target.closest('.removeTaskJs').getAttribute('href'),
					taskRowId = taskRow.dataset.taskId;

				showAlertModal(href, 'remove-task', {});


				document.body.addEventListener('click', async(e) => {
					const target = e.target;

					if (target.closest('.removeTaskIdJs')) {
						orderTasks = orderTasks.filter(task => task.id !== taskRowId);

						this.renderTable(tasksTable, orderTasks, services);

						saveChanges.removeAttribute('disabled');

						closeModal();
					}
				});
			}

			for (let total of totalTask) {
				total.innerText = this.formatTotalPrice(counterTask[0].innerText * priceTask);
			}

		});

		addTaskBtn.addEventListener('click', async() => {
			const checkedCheckBoxs = addTasksList.querySelectorAll('input:checked');

			for (let checkbox of checkedCheckBoxs) {
				const taskInOrder = orderTasks.find(task => task.task_id === checkbox.parentElement.dataset.id);

				if (taskInOrder) {
					const taskRow = tasksTable.querySelectorAll(`[data-task-id = "${taskInOrder.id}"]`)[0],
						counterTask = taskRow.querySelectorAll('.counterValueJs'),
						totalTask = taskRow.querySelectorAll('.taskTotalPriceJs'),
						priceTask = +(taskRow.querySelectorAll('.taskPriceJs')[0]).innerText;

					taskInOrder.amount = `${++taskInOrder.amount}`;

					for (let counter of counterTask) {
						counter.innerText = +counter.innerText + 1;
					}
					for (let total of totalTask) {
						total.innerText = this.formatTotalPrice(counterTask[0].innerText * priceTask);
					}

				} else {
					const newTaskInOrder = {};

					newTaskInOrder.id = generateID();
					newTaskInOrder.order_id = orderInfo.id;
					newTaskInOrder.task_id = checkbox.parentElement.dataset.id;
					newTaskInOrder.amount = '1';
					orderTasks.push(newTaskInOrder);
				}
			}

			this.renderTable(tasksTable, orderTasks, services);

			saveChanges.removeAttribute('disabled');
		});

		saveChanges.addEventListener('click', (e) => {
			e.preventDefault();

			const target = e.target,
				href = target.getAttribute('href');

			showAlertModal(href, 'change-service', {});

			document.body.addEventListener('click', async(e) => {
				const target = e.target;

				if (target.closest('.saveTasksDataJs')) {
					await this.setOrderChanges(orderInfo, orderTasks);

					saveChanges.setAttribute('disabled', 'true');

					closeModal();
				}
			});
		});
	}
}

export default Order;
