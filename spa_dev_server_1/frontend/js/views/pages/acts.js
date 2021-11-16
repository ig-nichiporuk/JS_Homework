import {closeModal, showAlertModal} from '../../helpers/utils';

import Component from '../../views/component';

import ActsTemplate from '../../../templates/pages/acts.hbs';


import Acts from '../../models/acts';
import ActsTableTemplate from '../../../templates/pages/actsTable.hbs';


class OrdersList extends Component {
	constructor() {
		super();

		this.model = new Acts();
	}

	async getData() {
		return await this.model.getActsList();
	}

	async getActsNum(num) {
		return await this.model.getActsNum(num);
	}

	async removeActs(num) {
		return await this.model.removeAct(num);
	}

	async render(acts) {
		const request = this.request;

		console.log(acts);

		return ActsTemplate({acts, request});
	}

	async afterRender() {
		super.afterRender();
		await this.setActions();
	}

	async setActions() {
		const tableActs = document.getElementsByClassName('actsTableBodyJs')[0],
			actsForm = document.getElementById('actsForm'),
			inputActs = actsForm.getElementsByTagName('input')[0],
			actsData = await this.getData();

		actsForm.addEventListener('submit', async(e) => {
			e.preventDefault();

			if (inputActs.value.trim()) {
				const acts = [await this.getActsNum(inputActs.value)];

				tableActs.innerHTML = ActsTableTemplate({acts});
			} else {
				const acts = await this.getData();

				tableActs.innerHTML = ActsTableTemplate({acts});
			}
		});


		tableActs.addEventListener('click', (e) => {
			const target = e.target,
				taskRow = target.closest('.actsRowJs');

			if (target.closest('.removeActsJs')) {
				event.preventDefault();

				const href = target.closest('.removeActsJs').getAttribute('href'),
					actRowCode = taskRow.dataset.code;

				showAlertModal(href, 'remove-act', {
					actCode : actRowCode
				});

				document.body.addEventListener('click', async(e) => {
					const target = e.target;

					if (target.closest('.removeActsFromDBJs')) {

						const acts = actsData.filter(act => act.code_1c !== actRowCode);

						await this.removeActs(actRowCode);

						tableActs.innerHTML = ActsTableTemplate({acts});

						closeModal();
					}
				});
			}

		});
	}
}

export default OrdersList;
