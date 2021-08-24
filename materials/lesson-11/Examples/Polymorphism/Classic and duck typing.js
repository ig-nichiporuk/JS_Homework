// Конструктор супер-класса Person
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Метод класса Person
Person.prototype.changeName = function(name) {
    this.name = 'New ' + name;
};

// Конструктор класса Editor
function Editor() {}

// Полиморфный метод класса Editor, предназначен для редактирования имени и возраста в объекте
Editor.prototype.editPersonInfo = function(person) {
    person.changeName(person.name);
    person.age++;

    return person;
};

// Создаем объекты обоих классов
var person = new Person('Alesya', 25);
var editor = new Editor();

// Передаем ожидаемый объект класса Person в метод класса Editor "editPersonInfo()", который работает со свойством "age"
// и методом "changeName()" нашего person
console.log(editor.editPersonInfo(person)); // Person {name: "New Alesya", age: 24} - редактирование прошло успешно

// Конструктор под-класса Employee, наследует свойства класса Person и добавляет новое - свое собственное
function Employee(name, age, salary) {
    Person.apply(this, arguments);

    this.salary = salary;
}

// Класс Employee наследует методы класса Person и сохраняет конструктор
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

// Переопределяет поведение метода "changeName()"
Employee.prototype.changeName = function(name) {
    this.name = 'Old ' + name;
};

// И добавляет новый метод в прототип - свой собственный
Employee.prototype.growSalary = function() {
    return this.salary + 100;
};

// Создаем объект класса Employee
var employee = new Employee('Vasya', 41, 2000);

// Передаем неожидаемый объект класса Employee в метод класса Editor "editPersonInfo()", который работает со свойством
// "age" и методом "changeName()" теперь уже нашего employee - при этом ничего не ломается.
// Таким образом и реализован классический полиморфизм. Класс Editor ожидает принимать объекты класса Person,
// но способен принимать и корректно работать с объектом отнаследованного класса, поскольку у него есть нужные для
// работы свойства/методы.
console.log(editor.editPersonInfo(employee)); // Employee {name: "Old Vasya", age: 42, salary: 2000} - редактирование прошло успешно

// Создаем простой объект duck, не являющийся объектом класса
var duck = {
    name: 'Duck',
    age: 2,
    changeName: function(name) {
        this.name = 'Little ' + name;
    }
};

// Передаем неожидаемый объект duck в метод класса Editor "editPersonInfo()", который работает со свойством
// "age" и методом "changeName()" теперь уже нашего duck - при этом ничего не ломается.
// Таким образом и реализована "утиная типизация". Класс Editor ожидает принимать объекты класса Person,
// но если передать ему объект другого класса (не отнаследованного от него) или вообще обычный объект, обладающий
// нужными для работы метода свойствами и методами - все гарантированно будет работать.
console.log(editor.editPersonInfo(duck)); // {name: "Little Duck", age: 3, changeName: ƒ} - редактирование прошло успешно