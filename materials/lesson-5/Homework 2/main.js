// Задание 1
var number = +prompt('Введите любое число');
var numberToSubtract = +prompt('Сколько отнять от предыдущего результата?');
var numberToIncrease = +prompt('Сколько прибавить к предыдущему результату?');
var numberToMultiply = +prompt('На сколько умножить предыдущий результат?');
var numberToDivide = +prompt('На сколько разделить предыдущий результат?');

alert(
	'Формула: (' + number +
	' - ' + numberToSubtract +
	' + ' + numberToIncrease +
	') * ' + numberToMultiply +
	' / ' + numberToDivide +
	'\nРезультат: ' +
	(number - numberToSubtract + numberToIncrease) *
	numberToMultiply / numberToDivide
);

// Задание 4 *
var lastName,
	firstName,
	patronymic,
	age;

while(true) {
	lastName = prompt('Ваша фамилия?');

	if (!lastName) {
		alert('Введите фамилию!');
	} else break;
}

// lastName = prompt('Ваша фамилия?');
// while(!lastName) {
//     alert('Введите фамилию!');
//     lastName = prompt('Ваша фамилия?');
// }

while(true) {
	firstName = prompt('Ваше имя?');

	if (!firstName) {
		alert('Введите имя!');
	} else break;
}

while(true) {
	patronymic = prompt('Ваше отчество?');

	if (!patronymic) {
		alert('Введите отчество!');
	} else break;
}

while(true) {
	age = +prompt('Ваш возраст в годах?');

	if (!age || age < 6 || age > 90) {
		alert('Введите корректный возраст!');
	} else break;
}

var isMale = confirm('Ваш пол - мужской?');

alert(
	'Ваше ФИО: ' + lastName + ' ' + firstName + ' ' + patronymic + '\n' +
	'Ваш возраст в годах: ' + age + '\n' +
	'Ваш возраст в днях: ' + (age * 365) + '\n' +
	'Через 5 лет вам будет: ' + (age + 5) + '\n' +
	'Ваш пол: ' + (isMale ? 'мужской' : 'женский') + '\n' +
	'Вы на пенсии: ' + ((age >= 63) || !isMale && (age >= 58) ? 'да' : 'нет')
	// ((isMale && (age >= 63)) || (!isMale && (age >= 58)) ? 'да' : 'нет')
);