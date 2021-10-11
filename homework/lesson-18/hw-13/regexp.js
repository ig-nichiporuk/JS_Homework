//Task-1
// var regexp = /^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@(?=[a-z\d])(?=[\.\-]*?[a-z\d])[a-z\d\.\-]{2,20}(?<![\.\-]).com$/gim;  //поиск в строке
// var regexp = /[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@(?=[a-z\d])(?=[\.\-]*?[a-z\d])[a-z\d\.\-]{2,20}(?<![\.\-]).com/gim;       //поиск совпадения


var regexp = /^@(?=[a-z\d])[\.]?(?=[a-z\d])[a-z\d\.\-]{2,20}$/gim;
console.log(regexp.test('@12345678901234567.9'));
// console.log(str.match(regexp));


/*

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
*/







