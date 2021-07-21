result = ((a + b) < 4) ? 'Мало' : 'Много';

var a = +prompt('a?');
switch(a) {
	case 0:
		alert(0);
		break;
	case 1:
		alert(1);
		break;
	case 2:
	case 3:
		alert('2,3');
		break;
}


if(browser === 'IE') {
	alert('О, да у вас IE');
} else if (browser === 'Chrome' || browser === 'Firefox' || browser === 'Safari' || browser === 'Opera') {
	alert('Да, и эти браузеры мы поддерживаем');
} else {
	alert('Мы надеемся что и в вашем браузере все ок!');
}

goods[(goods.length - 1)];

goods[goods.length] = 'комп';

var arr = [5, 7, 69, 120];
for (var i = 0; i < arr.length; i++) {
	console.log(arr[i]);
}
var i = 0;
while (i < 3) {
	alert('number' + i + '!');
	i++;
}
