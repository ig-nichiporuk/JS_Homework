// Task 1
let {a, b, ...obj} =  {a: 1, b: 5, c: 3, d: 4};
console.log([a, b, obj]);


// Task 2
let name = prompt('Введите ваше имя');
const obj = {
	name,
	sayHi () {
		return `Hi, ${this.name}!`
	}
}
console.log(obj.sayHi());


// Task 3
function result({a : x, b : y}, z = 1) {
	return x**y*z
}
result({a: 2, b: 3}, 2);


// Task 4
function user(name, age) {
	return `Hello, I'm ${name} and I'm ${age} years old.`
}
user(...['Igor', 30]);


// Task 5
function numbers(...nums) {
	for (const num of nums) console.log(num);
}
numbers(...[1, 22, 6, 9]);


// Task 6
function countVowelLetters(text) {
	const vowelLetters = ['а', 'я', 'ы', 'и', 'о', 'ё', 'у', 'ю', 'э', 'е', 'a', 'e', 'i', 'o', 'u', 'y'];
	let counter = 0;

	[...text.toLowerCase()].forEach(letter => vowelLetters.includes(letter) && counter++);

	return counter;
}
countVowelLetters('Шла Саша по шоссе И сосала сУшку'); // 12


// Task 7
function f(arr) {
	const obj = {};
	obj['Пользователи младше 40:'] = [];
	arr.forEach(el => {
		if(el.age < 40) {
			obj['Пользователи младше 40:'].push(el);
		}
		if(el.name.startsWith('Fedor')) {
			obj['Пользователь с именем Федор'] = el;
		}
	});
	return obj;
}
f([
	{name: 'Vasya Pupkin', age: 25},
	{name: 'Ivan Petrov', age: 30},
	{name: 'Fedor Ivanov', age: 42}
]);


// Task 8
function f(arr) {
	const obj = {};
	arr.forEach((el, i) => obj[`Пользователь ${++i}`] = el);
	return obj;
}
f(['Вася', 'Петя']);


// Task 9
function f(arr) {
	return arr.reduce((currentEl, nextEl) => Object.assign(currentEl, nextEl));
}
f([
	{name: 'Vasya'},
	{name: 'Piotr', age: 25},
	{salary: '2000$'}
]);


//Task 10
class Animal {
	constructor(name) {
		this.name = name;
		this._foodAmount = 50;
	}

	_formatFoodAmount() {
		return this._foodAmount + ' гр.';
	}
	dailyNorm(amount) {
		if (!arguments.length) return this._formatFoodAmount();

		if (amount < 50 || amount > 500) {
			return 'Недопустимое количество корма.';
		}

		this._foodAmount = amount;
	}
	feed() {
		console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
	}
}

class Cat extends Animal {
	feed() {
		super.feed();
		console.log('Кот доволен ^_^');
		return this;
	}
	stroke() {
		console.log('Гладим кота.');
		return this;
	}
}


let barsik = new Cat('Барсик');

barsik.dailyNorm(250);
console.log(barsik.feed().stroke().stroke().feed());

barsik = null;


//Task 11
function showRange(a, b) {
	if (a > b) [a, b] = [b, a];
	return new Promise((resolve, reject) => {
		let interval = setInterval(() => {
			if(Number.isInteger(a) && Number.isInteger(b)){
				if(a == b){
					clearInterval(interval);
					resolve(a);
				}
				console.log(a++);
			} else {
				reject('введено не целое число');
			}
		}, 1000);
	});
}

showRange(5,2)
	.then(b => console.log(`Последнее число диапазона: ${b}`))
	.catch(error => console.log(`Возникла ошибка: ${error}`))
	.finally(() => console.log('Работа промиса завершена'));

