var btnGet = document.getElementsByTagName('button')[0],
    mainBlock = document.getElementsByClassName('main-block')[0],
    usersTabs = mainBlock.getElementsByClassName('users-tabs')[0],
    infoBlocks = mainBlock.getElementsByClassName('info-blocks')[0];

btnGet.onclick = function() {
    var usersData = JSON.parse(localStorage.getItem('usersData'));

    if (usersData) {
        drawTabs(usersData);
    } else {
        var ajaxRequest = new XMLHttpRequest();

        ajaxRequest.open('GET', 'https://reqres.in/api/users?page=2');

        ajaxRequest.onload = function() {
            try {
                var usersData = JSON.parse(this.response).data;

                if (usersData.length) {
                    localStorage.setItem('usersData', JSON.stringify(usersData));

                    drawTabs(usersData);
                } else {
                    showError();
                }
            } catch {
                showError();
            }
        };

        ajaxRequest.onerror = function() {
            showError();
        };

        ajaxRequest.send();
    }
};

function drawTabs(usersData) {
    usersTabs.innerHTML = '';
    infoBlocks.innerHTML = '';

    usersData.forEach(function(user, i) {
        usersTabs.innerHTML +=
            '<div class="user-tab ' + (!i ? 'active' : '') + '" id="' + i + '">' +
                'User ' + (i + 1) +
            '</div>';

        infoBlocks.innerHTML +=
            '<div class="info-block ' + (!i ? 'active' : '') + '">' +
                '<img src="' + user.avatar + '">' +
                '<p>' +
                    'First Name: ' + user.first_name + '<br>' +
                    'Last Name: ' + user.last_name +
                '</p>' +
            '</div>';
    });

    usersTabs.onclick = setActiveTabAndInfo;
}

function setActiveTabAndInfo() {
    var target = event.target,
        targetClassList = target.classList;

    if (targetClassList.contains('user-tab') && !targetClassList.contains('active')) {
        usersTabs.getElementsByClassName('active')[0].classList.remove('active');
        infoBlocks.getElementsByClassName('active')[0].classList.remove('active');

        targetClassList.add('active');
        infoBlocks.getElementsByClassName('info-block')[target.id].classList.add('active');
    }
}

function showError() {
    mainBlock.innerHTML = '<div class="error">An error occured while loading data.</div>';
}