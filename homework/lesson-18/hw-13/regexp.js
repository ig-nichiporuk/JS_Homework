/*
//Task-1

// var regexp = /^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@[a-z0-9]{1,9}([\.-])?[a-z0-9]{1,10}.com$/;                   //по середине
// var regexp = /^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@(?=[a-z\d])(?=[\.]*?[a-z\d])[a-z\d\.]{2,20}(?<!\.).com$/gim  //поиск в строке
var regexp = /[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@(?=[a-z\d])(?=[\.]*?[a-z\d])[a-z\d\.]{2,20}(?<!\.).com/gim       //поиск совпадения

var str = '' +
	'igor_nichiporuk-1234@gmail.com' +
	' igor_nichiporuk@gmail.com' +
	' igor_nichiporukgmail.com' +
	' igor_nichiporuk@gmail' +
	' igo_nic@gmail.com' +
	' ig_nic@gmail.com' +
	' igo_ni@gmail.com' +
	' igonic@gmail.com' +
	' igor_nichiporukk-1234@gmail.com' +
	' igor_nichiporuk@qwertyuiopqwertyui20.com' +
	' igor_nichiporuk@qwertyuiopqwertyuio21.com' +
	' igor_nichiporuk@1.com' +
	' igor_nichiporuk@.wertyuiopqwertyui20.com' +
	' igor_nichiporuk@q.ertyuiopqwertyui20.com' +
	' igor_nichiporuk@qw.rtyuiopqwertyui20.com' +
	' igor_nichiporuk@qwe.tyuiopqwertyui20.com' +
	' igor_nichiporuk@qwer.yuiopqwertyui20.com' +
	' igor_nichiporuk@qwert.uiopqwertyui20.com' +
	' igor_nichiporuk@qwerty.iopqwertyui20.com' +
	' igor_nichiporuk@qwertyu.opqwertyui20.com' +
	' igor_nichiporuk@qwertyui.pqwertyui20.com' +
	' igor_nichiporuk@qwertyuio.qwertyui20.com' +
	' igor_nichiporuk@qwertyuiop.wertyui20.com' +
	' igor_nichiporuk@qwertyuiopq.ertyui20.com' +
	' igor_nichiporuk@qwertyuiopqw.rtyui20.com' +
	' igor_nichiporuk@qwertyuiopqwe.tyui20.com' +
	' igor_nichiporuk@qwertyuiopqwer.yui20.com' +
	' igor_nichiporuk@qwertyuiopqwerty.i20.com' +
	' igor_nichiporuk@qwertyuiopqwertyu.20.com' +
	' igor_nichiporuk@qwertyuiopqwertyi20..com'

// console.log(regexp.test('igor_nichiporuk-1234@gmail.com'));
console.log(str.match(regexp));
*/



/*
Написать функцию, которая с помощью регулярного выражения будет тестировать на соответствие строки вида:
	+375-25-777-77-77
375299999999
8-044-444-44-44
8033-6666666
и возвращать boolean.

	Условия:
- + перед 375 - опциональный
- номер может начинаться с 375 (без 0) либо с 80
- номер должен содержать один из кодов - 25, 29, 33, 44 либо 17
- основная часть номера не может начинаться с 0
- некоторые или все тире могут быть пропущены, но расположение тех, которые пропущены не будут, может быть только
таким, как в примерах 1 и 3

Перед отправкой постараться максимально оптимизировать своё решение и убрать все лишнее.*/


function isPhone(phone){
	var regexp = /^(\+?375\-?|8\-?0)(2[5|9]|33|44|17)-?[1-9]{3}-?\d{2}-?\d{2}$/;
	console.log(regexp.test(phone));
}
isPhone('8-044-444-44-44');