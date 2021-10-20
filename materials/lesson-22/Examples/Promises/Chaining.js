function createFirstPromise(result) {
    return new Promise((resolve, reject) => {
        console.log('Промис 1 запущен');

        setTimeout(() => {
            if (result > 0) {
                console.log('Промис 1 решен');

                resolve(result);
            }

            reject('число отрицательное');
        }, 3000);
    });
}

function createSecondPromise(result) {
    return new Promise((resolve, reject) => {
        console.log('Промис 2 запущен');

        setTimeout(() => {
            if (result < 0) {
                console.log('Промис 2 решен');

                resolve(result);
            }

            reject('число положительное');
        }, 1000);
    });
}

// Цепочка промисов используется тогда, когда нас интересует четко последовательное выполнение функций
createFirstPromise(5)
    .then(result => {
        console.log(`Результат промиса 1: ${result}`);

        // Вовзращаем второй промис
        // В данном случае будет возвращен не сам объект-промис, а его результат
        return createSecondPromise(-5);
    })
    .then(result => console.log(`Результат промиса 2: ${result}`))
    // Если ошибка возникла в первом промисе, сразу сработает catch(), то есть работы цепочки не произойдет
    .catch(error => console.log(`Возникла ошибка в промисе: ${error}`))
    .finally(() => console.log('Работа промисов завершена'));