var counter = 1;

var timer = setInterval(function() {
    (counter === 5) && clearInterval(timer);

    console.log(counter++);
}, 2000);