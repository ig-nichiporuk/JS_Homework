var id = localStorage.getItem('id');

if (id) {
    showSuccessMessage(id);
} else {
    var form = document.querySelector('[name="register-form"]'),
        inputs = form.getElementsByTagName('input'),
        errorContainer = form.getElementsByClassName('error')[0];

    form.onsubmit = function() {
        event.preventDefault();

        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'https://reqres.in/api/register');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify({
            email: inputs.email.value,
            password: inputs.password.value
        }));

        xhr.onload = function() {
            var statusType = Math.round(this.status / 100),
                response = JSON.parse(this.response);

            if (statusType === 2 && response.id) {
                localStorage.setItem('id', response.id);

                showSuccessMessage(response.id);
            } else {
                showErrorMessage(response.error);
            }
        };
    };
}

function showSuccessMessage(id) {
    document.body.innerHTML = '<div>User ' + id + ' has been successfully registered</div>';
}

function showErrorMessage(error) {
    for (var i = 0; i < inputs.length; i++) {
     // form.reset();
        inputs[i].value = '';
        inputs[i].classList.add('invalid');
    }

    errorContainer.innerHTML = error;
}