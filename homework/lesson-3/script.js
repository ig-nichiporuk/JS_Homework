//Task-1
var styles = ['Джаз', 'Блюз'];
styles.push('Рок-н-Ролл');
styles[styles.length - 2] = 'Классика';
alert(styles.shift());
styles.unshift('Рэп', 'Регги');


//Task-2
var arr = [];
for (var i = 2; i <= 10; i += 2) {
	arr.push(i);
}
console.log(arr);

var arr = [];
for (var i = 2; i <= 10; i++) {
	if (i % 2 == 0) {
		arr.push(i);
	}
}
console.log(arr);

var arr = [];
for (var i = 2; i <= 10; i++) {
	if (i % 2 != 0) continue;
	arr.push(i);
}
console.log(arr);


//Task-3
var arr = [],
	sum = 0,
	value;
while (true) {
	value = prompt('Введите число');
	if (value == '' || isNaN(value) || value == null) break;
	arr.push(+value);
}
for (var i = 0; i < arr.length; i++) {
	sum = sum + arr[i];
}


//Task-4
var arr = [];
outer: for (var i = 2; i <= 50; i++) {
	for (var j = 2; j < i; j++) {
		if (i % j == 0) continue outer;
	}
	arr.push(i);
}
console.log(arr);

