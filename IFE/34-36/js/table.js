/* eslint-disable indent,no-undef,no-unused-vars,no-console */

function retrieveData() {
    let productValue = [],
        regionValue = [];
    for (let i = 1, j = 0, k = 0; i < 4; i++) {
        if (document.querySelector("#region-radio-wrapper").childNodes[i * 2].checked === true) {
            regionValue[j] = document.querySelector("#region-radio-wrapper").childNodes[i * 2].value;
            j++;
        }
        if (document.querySelector("#product-radio-wrapper").childNodes[i * 2].checked === true) {
            productValue[k] = document.querySelector("#product-radio-wrapper").childNodes[i * 2].value;
            k++;
        }
    }
    document.querySelector("#table").innerHTML = renderingTable(regionValue, productValue);

    for (let j = 0; j < 10; j++) {
        for (let i = 0; i < document.querySelectorAll("tr").length; i++) {
            if (document.querySelectorAll("tr")[i].innerHTML === "") {
                document.querySelectorAll("tr")[i].parentNode.removeChild(document.querySelectorAll("tr")[i]);
            }
        }
    }

    //将表格中所有数据全部显示在折线图中
    let listAll = [];
    for (let i = 1; i < document.querySelectorAll("tr").length; i++) {
        listAll[i - 1] = [];
        for (let j = 2; j < document.querySelectorAll("tr")[i].childNodes.length; j++) {
            listAll[i - 1][j - 2] = document.querySelectorAll("tr")[i].childNodes[j].innerHTML;
        }
    }
    drawLineChart(listAll);
    drawHistogram(listAll);

    //显示鼠标停留行的数据
    let list = [[]],
        number = 0;
    document.querySelector("#table").addEventListener("mouseover", function (e) {
        if (e.target && e.target.tagName.toUpperCase() === "TD") {
            for (let i = 2, j = 0; i < e.target.parentNode.childNodes.length; i++) {
                list[0][j] = e.target.parentNode.childNodes[i].innerHTML;
                j++;
            }
            for (let i = 0; i < document.querySelectorAll("tbody")[0].childNodes.length; i++) {
                if (e.target.parentNode === document.querySelectorAll("tbody")[0].childNodes[i]) {
                    number = i;
                }
            }
            drawHistogram(list);
            drawLineChart(list, number);
        }
    });

    document.querySelector("#table").addEventListener("mouseout", function () {
            drawLineChart(listAll);
    });
}

function renderingTable(regionValue, productValue) {
    let list = "<th>一月</th><th>二月</th><th>三月</th><th>四月</th><th>五月</th><th>六月</th><th>七月</th><th>八月</th>" +
        "<th>九月</th><th>十月</th><th>十一月</th><th>十二月</th></tr>";
    if (regionValue.length === 1 && productValue.length > 1) {
        list = "<tr><th>地区</th><th>商品</th>" + list;
        for (let i = 0; i < productValue.length; i++) {
            secondMode(regionValue[0], productValue[i]);
        }
        // document.querySelector("#table").innerHTML = list;
        // console.log(document.querySelector("#table").childNodes);
        // for (let i = 0; i < document.querySelector("#table").childNodes.length; i++) {
        //     if (document.querySelector("#table").childNodes[i].innerHTML === "地区") {
        //         document.querySelector("#table").childNodes[i].
        //     }
    } else if (productValue.length === 1 && regionValue.length > 1) {
        list = "<tr><th>商品</th><th>地区</th>" + list;
        for (let i = 0; i < regionValue.length; i++) {
            firstMode(regionValue[i], productValue[0]);
        }
    } else if (regionValue.length > 1 && regionValue.length > 1) {
        list = "<tr><th>商品</th><th>地区</th>" + list;
        for (let i = 0; i < productValue.length; i++) {
            for (let j = 0; j < regionValue.length; j++) {
                firstMode(regionValue[j], productValue[i]);
            }
        }
    } else if (regionValue.length === 1 && productValue.length === 1) {
        list = "<tr><th>商品</th><th>地区</th>" + list;
        firstMode(regionValue[0], productValue[0]);
    }

// eslint-disable-next-line indent
    function firstMode(regionData, productData) {
        for (let i = 0; i < sourceData.length; i++) {
            list += "<tr>";
            if (regionData === sourceData[i].region && productData === sourceData[i].product) {
                list += "<td>" + sourceData[i].product + "</td>";
                list += "<td>" + sourceData[i].region + "</td>";
                for (let j = 0; j < 12; j++) {
                    list += "<td>" + sourceData[i].sale[j] + "</td>";
                }
            }
            list += "</tr>";
        }
    }

    function secondMode(regionData, productData) {
        for (let i = 0; i < sourceData.length; i++) {
            list += "<tr>";
            if (regionData === sourceData[i].region && productData === sourceData[i].product) {
                list += "<td>" + sourceData[i].region + "</td>";
                list += "<td>" + sourceData[i].product + "</td>";
                for (let j = 0; j < 12; j++) {
                    list += "<td>" + sourceData[i].sale[j] + "</td>";
                }
            }
            list += "</tr>";
        }
    }

    return list;
}