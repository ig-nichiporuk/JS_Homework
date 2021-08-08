//Task-1
var obj = {name : 25};
function isEmpty(obj) {
	for(var key in obj) {
		return false;
	}
	return true;
}
isEmpty(obj);


//Task-2
var x = prompt('Введите число которое хотите возвести в степень'),
	n = prompt('Введите степень');
while(isNaN(n) || n < 0 || (n % parseInt(n) !==0)) {
	alert('Степень возведения должна быть натуральным числом');
	n = prompt('Введите степень');
}
function pow(x, n) {
	if(isNaN(x) || x === 0) {
		return false;
	}
	if(n === 1) {
		return x;
	} else {
		return x * pow(x, --n);
	}
}
console.log(pow(x, n));



//Task-3
/*'Среднячок'. Несколько итераций, на кождой меняется итоговое значение.
По завершению цикл выдаёт решение*/
function sumTo(n) {
	var sum = 0;
	if(+n && n > 0) {
		while(n > 0) {
			sum = sum + (n--);
		}
		return sum;
	}
	return false;
}
sumTo(3);

/*самый медленный, так как выполняется несколько рекурсий,
 доходит до условия выхода из рекурсии, возвращает значение,
 а потом возвращает значение из каждой рекурсии.
 Т. е. как я понял происходит накидывание функций для выполнения в корзину,
 как только дошло до того, что функция выполнилась(что то вернула) начинаем вытаскивать из
 корзины функции и с каждой получать значение

 sumTo(100000) не посчитает, так как в браузере стоит ограничение на <= 10000 вложенных рекурсий
 */
function sumTo(n) {
	if(+n && n > 0) {
		return (n === 1) ? n : n + sumTo(--n);
	}
	return false;
}
sumTo(3);

/*Самый быстрый. Просто вычесление функции, работа с числами, ничего не запоминается, ничего
* не накапливается*/
function sumTo(n) {
	if(+n && n > 0) {
		return (1 + n) * n / 2;
	}
	return false;
}
sumTo(3);


//Task-4
function treeSum(arr, sum) {
	for(var key in arr) {
		if( typeof(arr[key]) === 'number' && isFinite(arr[key]) ) {
			sum += arr[key];
		}
		if( arr[key] !== null && typeof(arr[key]) === 'object' && arr[key].length ) {
			sum += treeSum(arr[key], 0);
		}
	}
	return sum;
}
console.log(treeSum([
	5, 7, 'ffdf', '', 0, null, undefined, true, false, {}, {name: 'ddd'}, NaN, Infinity,
	[4, [2], 8, [1, 3], 2],
	[9, []],
	1, 8
], 0));













