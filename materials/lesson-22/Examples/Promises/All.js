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

// Метод all() используется тогда, когда нам не важно, в каком порядке выполняются функции, помещенные в метод, но
// важно, что должно выполниться по заверешении работы всех этих функций в совокупности
Promise.all([createFirstPromise(5), createSecondPromise(-5)])
    // Результаты выполнения всех промисов запишутся последовательно (так же, как вызывались промисы) в массив result
    .then(result => {
        console.log(`Результат 2-х промисов: ${result}`);
        console.log(`Сумма результатов: ${result[0] + result[1]}`);
    })
    // Если ошибка возникает в любом из промисов - сразу попадаем в catch(), т.е. никакие resolve/reject больше вызваны
    // не будут, однако могут выполниться остаточные действия, которые лежали в WebAPI
    .catch(error => console.log(`Возникла ошибка в промисе: ${error}`))
    .finally(() => console.log('Работа промисов завершена'));