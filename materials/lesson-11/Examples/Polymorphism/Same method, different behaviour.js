// Конструктор супер-класса Person
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Метод класса Person
Person.prototype.getInfo = function() {
    return 'I\'m ' + this.name + ' and I\'m ' + this.age + ' years old.';
};

// Конструктор под-класса Employee, наследует свойства класса Person и добавляет новое - свое собственное
function Employee(name, age, salary) {
    Person.apply(this, arguments);

    this.salary = salary;
}

// Класс Employee наследует методы класса Person и сохраняет конструктор
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

// И переопределяет либо расширяет поведение родительского метода
Employee.prototype.getInfo = function() {
    var parentGetInfoResult = Person.prototype.getInfo.apply(this, arguments);

    return parentGetInfoResult + ' And I earn ' + this.salary + ' $ dollars per month.';
};

// Создаем объекты обоих классов
var person = new Person('Alesya', 25);
var employee = new Employee('Vasya', 41, 2000);

// Методы имеют одно название, но разное поведение
console.log(person.getInfo()); // I'm Alesya and I'm 23 years old.
console.log(employee.getInfo()); // I'm Vasya. I'm 41 years old and I earn 2000 $ dollars per month.