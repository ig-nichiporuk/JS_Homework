//Task-1
var value,
	plus,
	minus,
	multiply,
	divide,
	total;
value = prompt('Введите любое число?');
while (isNaN(value)) {
	alert('Данные введены неверно!')
	value = prompt('Введите любое число?');
}

plus = prompt('Введите значение, которое хотите прибавить к текущему?');
while (isNaN(plus)) {
	alert('Данные введены неверно!')
	plus = prompt('Введите значение, которое хотите прибавить к текущему?');
}

minus = prompt('Введите значение, которое хотите отнять от к текущего?');
while (isNaN(minus)) {
	alert('Данные введены неверно!')
	minus = prompt('Введите значение, которое хотите отнять от к текущего?');
}

multiply = prompt('Введите значение, на которое хотите умножить текущее?');
while (isNaN(multiply)) {
	alert('Данные введены неверно!')
	multiply = prompt('Введите значение, на которое хотите умножить текущее?');
}

divide = prompt('Введите значение, на которое хотите поделить текущее?');
while (isNaN(divide) || divide == 0) {
	alert('Данные введены неверно или на 0 делить нельзя')
	divide = prompt('Введите значение, на которое хотите поделить текущее?');
}

total = ((+value) + (+plus) - minus) * multiply / divide;

alert('Формула: (' + value + ' + ' + plus + ' - ' + minus + ') * ' + multiply + ' / ' + divide + '\n' + 'Результат: ' + total);


//Task-2
var login,
	password;
login = prompt('Введите логин');
if(login == null) {
	alert('Вход отменён');
}
else {
	while (login !== 'Админ' && login !== null) {
		alert('Я Вас не знаю');
		login = prompt('Введите логин');
	}
	if(login == null) {
		alert('Вход отменен');
	}
	else {
		password = prompt('Введите пароль');
		if(password == null) {
			alert('Вход отменен');
		}
		else {
			while (password !== 'Чёрный Властелин' && password !==null) {
				alert('Пароль неверен');
				password = prompt('Введите пароль');
			}
			if(password == null) {
				alert('Вход отменён');
			}
			else {
				alert('Добро пожаловать!');
			}
		}
	}
}


//Task-4
var firstName,
	surname,
	secondName,
	age,
	ageInDays,
	sex,
	oldAgePensionStatus,
	OLD_AGE_PENSION_MAN = 69,
	OLD_AGE_PENSION_WOMAN = 63;


surname = prompt('Введите вашу фамилию');
while (surname == '' || surname == null || !isNaN(surname)) {
	alert('Данные введены неверно!')
	surname = prompt('Введите вашу фамилию');
}

firstName = prompt('Введите ваше имя');
while (firstName == '' || firstName == null || !isNaN(firstName)) {
	alert('Данные введены неверно!')
	firstName = prompt('Введите ваше имя');
}

secondName = prompt('Введите ваше отчество');
while (secondName == '' || secondName == null || !isNaN(secondName)) {
	alert('Данные введены неверно!')
	secondName = prompt('Введите ваше отчество');
}

age = prompt('Сколько вам лет?');
while (age > 120 || age == 0 || isNaN(age) || age == null) {
	alert('Данные введены неверно!')
	age = prompt('Сколько вам лет?');
}

ageInDays = age * 365;

sex = confirm('Ваш пол мужской?');

if(sex) {
	sex = 'мужской';
	(age >= OLD_AGE_PENSION_MAN) ? oldAgePensionStatus = 'да' : oldAgePensionStatus = 'нет';
}
else {
	sex = 'женский';
	(age >= OLD_AGE_PENSION_WOMAN) ? oldAgePensionStatus = 'да' : oldAgePensionStatus = 'нет';
}

alert('Ваше ФИО: ' + surname + ' ' + firstName + ' ' + secondName +  '\n' + 'Ваш возраст в годах: ' + age + '\n' + 'Ваш возраст в днях: ' + ageInDays + '\n' + 'Через 5 лет вам будет: ' + (age + 5) + '\n' + 'Ваш пол: ' + sex + '\n' + 'Вы на пенсии: ' + oldAgePensionStatus);
