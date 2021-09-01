/*************
  MOUSE-OVER
*************/

var parentContainersWithMouseOver = document.getElementsByClassName('mouseover');

for (var i = 0; i < parentContainersWithMouseOver.length; i++) {
    parentContainersWithMouseOver[i].onmouseover = function() {
        console.log('Parent Container MouseOver Event');
    };
}

var childContainerWithMouseOver = document.getElementsByClassName('mouseover__child')[0];

childContainerWithMouseOver.onmouseover = function() {
    console.log('Child Container MouseOver Event');
};

/************
  MOUSE-OUT
************/

var parentContainersWithMouseOut = document.getElementsByClassName('mouseout');

for (var j = 0; j < parentContainersWithMouseOut.length; j++) {
    parentContainersWithMouseOut[j].onmouseout = function() {
        console.log('Parent Container MouseOut Event');
    };
}

var childContainerWithMouseOut = document.getElementsByClassName('mouseout__child')[0];

childContainerWithMouseOut.onmouseout = function() {
    console.log('Child Container MouseOut Event');
};

/**************
  MOUSE-ENTER
**************/

var parentContainersWithMouseEnter = document.getElementsByClassName('mouseenter');

for (var k = 0; k < parentContainersWithMouseEnter.length; k++) {
    parentContainersWithMouseEnter[k].onmouseenter = function() {
        console.log('Parent Container MouseEnter Event');
    };
}

var childContainerWithMouseEnter = document.getElementsByClassName('mouseenter__child')[0];

childContainerWithMouseEnter.onmouseenter = function() {
    console.log('Child Container MouseEnter Event');
};

/**************
  MOUSE-LEAVE
**************/

var parentContainersWithMouseLeave = document.getElementsByClassName('mouseleave');

for (var n = 0; n < parentContainersWithMouseLeave.length; n++) {
    parentContainersWithMouseLeave[n].onmouseleave = function() {
        console.log('Parent Container MouseLeave Event');
    };
}

var childContainerWithMouseLeave = document.getElementsByClassName('mouseleave__child')[0];

childContainerWithMouseLeave.onmouseleave = function() {
    console.log('Child Container MouseLeave Event');
};