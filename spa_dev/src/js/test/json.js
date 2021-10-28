const generateID = () => {
	return Math.random().toString(36).substr(2, 10);
};

class Orders {
	constructor(num, type, code, dataCreate, dateClose, user, autoType, autoNum, total, status) {
		this.id = generateID();
		this.num = num;
		this.type = type;
		this.code = code;
		this['date-create'] = dataCreate;
		this['date-close'] = dateClose;
		this.user = user;
		this['auto-type'] = autoType;
		this['auto-num'] = autoNum;
		this.total = total;
		this.status = status;
	}
}

const order1 = new Orders('AC000002',1,  'КС', '09.03.2021', '-', 'Ничипорук И.А.', 'Renault', '0201 ЕК-1', '500', 'Новый');
const order2 = new Orders('AC000002',2,  'КС', '22.03.2021', '-', 'Ничипорук И.А.', 'Renault', '0201 ЕК-1', '500', 'Новый');
const order3 = new Orders('AC000002',1,  'БШ', '12.03.2021', '-', 'Ничипорук И.А.', 'Renault', '0201 ЕК-1', '500', 'Новый');
const order4 = new Orders('AC000002',2,  'БШ', '28.04.2019', '-', 'Ничипорук И.А.', 'Renault', '0201 ЕК-1', '500', 'Новый');
const order5 = new Orders('AC000002',1,  'КС', '28.10.1999', '-', 'Ничипорук И.А.', 'Renault', '0201 ЕК-1', '500', 'Новый');

const arr = [order1, order2, order3, order4, order5];


//По дате создания
const sortByDate = (arr, flag) => {
	return arr.sort((current, next) => {
		if(current.dataCreate.split('.').reverse().join('.') < next.dataCreate.split('.').reverse().join('.')) return flag ? 1 : -1;
		if(current.dataCreate.split('.').reverse().join('.') > next.dataCreate.split('.').reverse().join('.')) return flag ? -1 : 1;
	});
}


//По месяцу
const filterByMonth = (arr, month) => {
	return arr.filter((obj) => {
		if(obj.dataCreate.split('.')[1] == (month < 10 ? +`0${month}` : month) && obj.dataCreate.split('.')[2] == new Date().getFullYear()) return obj;
	});
}




console.log(arr);
