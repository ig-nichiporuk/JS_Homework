// Полиморфный конструктор класса Person
function Person(name, age) {
    if (name) {
        this.name = name;
        this.age = age;
    } else {
        this.name = 'Anonymous';
    }
}

// Метод класса Person
Person.prototype.sayHello = function() {
    return 'Hello, I\'m ' + this.name;
};

// Создаем объект класса Person и передаем имя
var person = new Person('Alesya', 25);
// Вызываем метод класса
console.log(person.sayHello()); // Hello, I'm Alesya

// Создаем объект класса Person и не передаем имя
var noName = new Person();
// Вызываем метод класса
console.log(noName.sayHello()); // Hello, I'm Anonymous