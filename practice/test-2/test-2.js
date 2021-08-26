//Task - 1
function Person(name, age) {
	this.name = name;
	var personAge = age;

	function getFormattedAge() {
		return personAge + ' лет';
	}

	var self = this;
	this.showInfo = function () {
		console.log('Привет, меня зовут ' + self.name + ', мне ' + getFormattedAge() + '.');
	};
}


function Employee(name, age, salary) {
	Person.apply(this, arguments);

	this.salary = salary;

	var personShowInfo = this.showInfo;
	this.showInfo = function () {
		personShowInfo();
		console.log('Моя зарплата ' + this.salary + '$');
	};
}


var employee = new Employee('Igor', 25, 2000);
console.log(employee);
employee.showInfo();


//Task - 2
function Person(name, age) {
	this.name = name;
	this._personAge = age;
}

Person.prototype._getFormattedAge = function () {
	return this._personAge + ' лет';
};

Person.prototype.showInfo = function () {
	console.log('Привет, меня зовут ' + this.name + ', мне ' + this._getFormattedAge() + '.');
};

function Employee(name, age, salary) {
	Person.apply(this, arguments);

	this.salary = salary;
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.construct = Employee;

Employee.prototype.showInfo = function () {
	Person.prototype.showInfo.apply(this, arguments);
	console.log('Моя зарплата ' + this.salary + '$');
};

var employee = new Employee('Igor', 25, 2000);
console.log(employee);
employee.showInfo();
