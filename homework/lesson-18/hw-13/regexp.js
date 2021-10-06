//Task-1
var regexp = /^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@(?=[a-z\d])(?=[\.\-]*?[a-z\d])[a-z\d\.\-]{2,20}(?<![\.\-]).com$/gim;  //поиск в строке
// var regexp = /[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@(?=[a-z\d])(?=[\.\-]*?[a-z\d])[a-z\d\.\-]{2,20}(?<![\.\-]).com/gim;       //поиск совпадения

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
	' igor_nichiporuk@qwertyuio-qwertyui20.com' +
	' igor_nichiporuk@qwertyuiop.wertyui20.com' +
	' igor_nichiporuk@qwertyuiopq.ertyui20.com' +
	' igor_nichiporuk@qwertyuiopqw.rtyui20.com' +
	' igor_nichiporuk@qwertyuiopqwe.tyui20.com' +
	' igor_nichiporuk@qwertyuiopqwer-yui20.com' +
	' igor_nichiporuk@qwertyuiopqwerty.i20.com' +
	' igor_nichiporuk@qwertyuiopqwertyu.20.com' +
	' igor_nichiporuk@qwertyuiopqwertyu-20.com' +
	' igor_nichiporuk@qwer-yuiopqwertyu-20.com' +
	' igor_nichiporuk@qwertyuiopqwertyi20..com';

console.log(regexp.test('igor_nichiporuk@qwer-yuiopqwertyu-20.com'));
// console.log(str.match(regexp));



//Task-2
function isPhone(phone){
	var regexp = /^(\+?375\-?|8\-?0)(2[5|9]|33|44|17)-?[1-9]{3}-?\d{2}-?\d{2}$/;
	console.log(regexp.test(phone));
}
isPhone('8-044-444-44-44');



//Task-3
function countVowelLetters(text) {
	try{
		return text.match(/[аяыиоёуюэеaeiouy]/ig).length;
	}
	catch (err) {
		console.error('Result incorrect ' + err);
	}
}
countVowelLetters('Шла Саша по шоссе И сосала сУшку'); // 12
// countVowelLetters('Шл Сш п шсс ссл сшк');


function countVowelLetters(text) {
	try{
		return text.replace(/[^аяыиоёуюэеaeiouy]/ig, '').length;
	}
	catch (err) {
		console.error('Result incorrect ' + err);
	}
}
countVowelLetters('Шла Саша по шоссе И сосала сУшку'); // 12
// countVowelLetters('Шл Сш п шсс ссл сшк');


function countVowelLetters(text) {
	var vowelLetters = /[аяыиоёуюэеaeiouy]/ig;
	var counter = 0;
	while(vowelLetters.exec(text)) {
		++counter;
	}
	return counter;
}
countVowelLetters('Шла Саша по шоссе И сосала сУшку'); // 12
// countVowelLetters('Шл Сш п шсс ссл сшк');







