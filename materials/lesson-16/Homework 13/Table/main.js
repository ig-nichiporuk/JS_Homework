var tBody = document.getElementsByTagName('tbody')[0];

tBody.addEventListener('click', tdClickHandler);
function tdClickHandler() {
    var target = event.target;

    if (target.tagName === 'TD') {
        if (target.id === 'addRow') {
            var newRow = document.createElement('tr'),
                firstRow = tBody.firstElementChild;

            newRow.innerHTML = '<td></td><td></td><td></td>';
            tBody.insertBefore(newRow, firstRow);

            // tBody.insertAdjacentHTML('afterBegin', '<tr><td></td><td></td><td></td></tr>');
        } else {
            var text = target.innerText;
            target.innerHTML = '<input type="text" onblur="setTextInTd()">';
            var input = tBody.getElementsByTagName('input')[0];
            input.focus();
            input.value = text;
        }
    }
}

function setTextInTd() {
    var target = event.currentTarget;
    target.parentNode.innerHTML = target.value;
}

tBody.onkeypress = function() {
    (event.key === 'Enter') && tBody.getElementsByTagName('input')[0].blur();
};