localStorage.clear();

var button = document.getElementsByTagName('button')[0];

button.onclick = function() {
    localStorage.setItem('name', 'Vasya');
};

window.onstorage = function() {
    document.body.insertAdjacentHTML('beforeend', '<h1>Hello!</h1>');
};