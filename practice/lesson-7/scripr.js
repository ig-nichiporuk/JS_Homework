/*
Задание 1:
Написать функцию фильтрации массивов. Функция должна принимать массив с числами и возвращать новый массив только с
положительными числами. Метод push() и ему подобные использовать запрещено.

	Задание 2:
Напишите функцию преобразования ключей и значений объектов. Функция должна из полученного объекта вида, например,
	{name: 'Vasya'} вернуть объект вида {name_length: 5}. К ключам добавляется приставка '_length', значение - длина
предыдущего значения (предполагается, что функция принимает объект со строковыми значениями). У строки, для получения
её длины, так же, как и у массивов, есть свойство .length.
	Новых объектов не создавать.
*/

/*// Task-1
var arrNumbers = [3, 5, -14, 0, 7, -40],
	arrPositiveNumbers = [];

function showPositiveNumbers(arr) {
	var i = 0;
	outer: for (key in arr) {
		if (arr[key] <= 0) continue outer;
		if (arr[key] > 0) {
			arrPositiveNumbers[i++] = arr[key];
		}
	}
	return arrPositiveNumbers;
}

console.log(showPositiveNumbers(arrNumbers));


// Task-2
var userData = {
	name : 'Igor',
	city : 'Brest',
	country : 'Belarus'
}

function changeData(obj) {
	for (key in obj) {
		obj[key + '_length'] = obj[key].length;
		delete obj[key];
	}
	return obj;
}

console.log(changeData(userData));*/


// Task-3
var userData = {
	name : 'Igor',
	name1 : 'Igor',
	city : 'Brest',
	country : 'Belarus',
	country_tr : 'Belarus',
	country_tr1 : 'Belarus'
}

function changeData(obj) {
	var arrValues = [],
		duplicate = {};
	for (key in obj) {
		arrValues.push(obj[key]);
		obj[key + '_length'] = obj[key].length;
		delete obj[key];
	}
	for(var i = 0; i < arrValues.length; i++) {
		var counter = 0;
		for (var k = 0; k < arrValues.length; k++) {
			if(arrValues[i] === arrValues[k]) {
				++counter;
				if(counter > 1) {
					duplicate[arrValues[i]] = counter + ' items'

				}
			}
		}
	}
	obj['Duplicated values'] = duplicate;
	return obj;
}

console.log(changeData(userData));

