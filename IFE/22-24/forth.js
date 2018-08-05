var menuArr = [
    [1, "Area1", -1],
    [2, "Area2", -1],
    [3, "Area1-1", 1],
    [4, "Area1-2", 1],
    [5, "Area2-1", 2],
    [6, "Area2-2", 2],
    [7, "Area1-2-3", 4],
    [8, "Area2-2-1", 6],
];

var obj = {};
for (var i = 0; i < menuArr.length; i++) {
    if (menuArr[i][2] < 0) {
        f2(obj, menuArr[i]);
    } else {
        InsertNode(obj, menuArr[i]);
    }
}

function f2(x, menuArr) {
    x[menuArr[0]] = {};
    x[menuArr[0]].name = menuArr[1];
}

function InsertNode(x, menuArr) {
    if (x) {
        for (let j = 0; j < Object.keys(x).length; j++) {
            var index = parseInt(Object.keys(x)[j]);
            if (index === menuArr[2]) {
                if ("undefined" === typeof (x[Object.keys(x)[j]].subMenu)) {
                    x[Object.keys(x)[j]].subMenu = {};
                    f2(x[Object.keys(x)[j]].subMenu, menuArr);
                } else {
                    f2(x[Object.keys(x)[j]].subMenu, menuArr);
                }
            } else {
                InsertNode(x[Object.keys(x)[j]].subMenu, menuArr);
            }
        }
    }
}

console.log(obj);
