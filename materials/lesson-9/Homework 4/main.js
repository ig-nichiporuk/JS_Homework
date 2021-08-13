function treeSum(arr) {
    var sum = 0;

    for (var i = 0; i < arr.length; i++) {
        var numberOrArr = arr[i];

        if ((typeof numberOrArr === 'number') && numberOrArr) {
            sum += numberOrArr;
        } else if (typeof numberOrArr === 'object' && numberOrArr && numberOrArr.length) {
            sum += treeSum(numberOrArr);
        }

    //  if (numberOrArr) {
    //      if (typeof numberOrArr === 'number') {
    //          sum += numberOrArr;
    //      } else if (typeof numberOrArr === 'object' && numberOrArr.length) {
    //          sum += treeSum(numberOrArr);
    //      }
    //  }
    }

    return sum;
}

treeSum([
    5, 7,
    [4, [2], 8, [1, 3], 2],
    [9, []],
    1, 8
]); // 50