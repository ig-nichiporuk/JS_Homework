/*

Написать единый геттер-сеттер dailyNorm для установки/получения количества корма (foodAmount).
Оно не должно быть меньше 50 и больше 500 грамм. В случае некорректного количества возвращать сообщение об ошибке.
Если функция вызывается как геттер - она должна возвращать уже отформатированное значение foodAmount.
Протестировать метод dailyNorm с разными значениями параметра и без него. Метод feed должен оперировать актуальной
информацией (использовать внутри метода вызов геттера).

Создать класс Animal. Перенести в него все свойства и методы. Отнаследоваться внутри Cat от Animal.
Расширить метод feed для кошек. Теперь он должен выводить в консоль информацию вида:
"Насыпаем в миску (количество гр.) корма.
Кот доволен ^_^"
Использовать вызов родительского метода вида animalFeed() и сохранение контекста this через переменную.
Все вызовы, которые работали ранее, должны по-прежнему работать корректно.

Добавить публичный метод stroke, который будет выводить в консоль информацию "Гладим кота.".
Доделать метод feed таким образом, чтобы можно было цепочкой вызывать его и метод stroke в любой
последовательности и сколько угодно раз.
(Лишние логи можно убрать, делать всё в том же задании).

*/


function Animals(name, dailyMax) {

	var foodAmount = 50;
	this._name = name;
	this._dailyMax = dailyMax;

	this.dailyNorm = function (amount) {
		if (!arguments.length) {
			return foodAmount;
		}
		if (!(typeof amount === 'number') || !isFinite(amount)) {
			throw new Error('Вы сыпете что-то не понятное!');
		}
		if ((typeof amount === 'number') && isFinite(amount) && amount < foodAmount) {
			throw new Error('Кота вы точно не порадовали! Насыпте не меньше ' + foodAmount + ' гр.');
		}
		if ((typeof amount === 'number') && isFinite(amount) && amount > 500) {
			throw new Error('Кот станет толстым! Не сыпте больше ' + 500 + ' гр.');
		}
		foodAmount = amount;
	};
	this.stroke = function () {
		console.log('Гладим кота.');
		return this;
	}
	var self = this;
	this.feed = function () {
		var message = 'Насыпаем в миску ' + self.dailyNorm() + ' гр. корма.';
		console.log(message);
	};

}


function Cat(name, dailyMax) {
	Animals.apply(this, arguments);

	var parentFeed = this.feed;

	this.feed = function() {
		parentFeed();
		console.log('Кот доволен ^_^');
		return this;
	}
}

var cat = new Cat('Vasya', 500);
cat.dailyNorm(20);
// console.log(cat.name);
console.log(cat.feed());
// cat = null;
