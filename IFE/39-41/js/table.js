/* eslint-disable indent,no-undef,no-unused-vars,no-console */

// eslint-disable-next-line indent

/* 生成表格内容 */
function renderingTable(regionValue, productValue) {
    let list = "<th>一月</th><th>二月</th><th>三月</th><th>四月</th><th>五月</th><th>六月</th><th>七月</th><th>八月</th>" +
        "<th>九月</th><th>十月</th><th>十一月</th><th>十二月</th></tr>";
    if (regionValue.length === 1 && productValue.length > 1) {
        list = "<table><tr><th>地区</th><th>商品</th>" + list;
        for (let i = 0; i < productValue.length; i++) {
            secondMode(regionValue[0], productValue[i]);
        }
    } else if (productValue.length === 1 && regionValue.length > 1) {
        list = "<table><tr><th>商品</th><th>地区</th>" + list;
        for (let i = 0; i < regionValue.length; i++) {
            firstMode(regionValue[i], productValue[0]);
        }
    } else if (regionValue.length > 1 && regionValue.length > 1) {
        list = "<table><tr><th>商品</th><th>地区</th>" + list;
        for (let i = 0; i < productValue.length; i++) {
            for (let j = 0; j < regionValue.length; j++) {
                firstMode(regionValue[j], productValue[i]);
            }
        }
    } else if (regionValue.length === 1 && productValue.length === 1) {
        list = "<table><tr><th>商品</th><th>地区</th>" + list;
        firstMode(regionValue[0], productValue[0]);
    }


    function firstMode(regionData, productData) {
        list += "<tr>";
        list += "<td>" + productData + "</td>";
        list += "<td>" + regionData + "</td>";
        if (window.localStorage && localStorage.getItem(regionData + productData + "一月") || localStorage.getItem(productData + regionData + "一月")) {
            const month = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
            if (localStorage.getItem(regionData + productData + "一月")) {
                for (let i = 0; i < month.length; i++) {
                    list += "<td> <span class='value'>" + localStorage.getItem(regionData + productData + month[i]) + " </span> <span class='icon'> <i class=\"far fa-edit\"></i></i> </span>" + "</td>";
                }
            } else if (localStorage.getItem(productData + regionData + "一月")) {
                for (let i = 0; i < month.length; i++) {
                    list += "<td> <span class='value'>" + localStorage.getItem(productData + regionData + month[i]) + " </span> <span class='icon'> <i class=\"far fa-edit\"></i></i> </span>" + "</td>";
                }
            }
        } else {
            for (let i = 0; i < sourceData.length; i++) {
                if (regionData === sourceData[i].region && productData === sourceData[i].product) {
                    for (let j = 0; j < 12; j++) {
                        list += "<td> <span class='value'>" + sourceData[i].sale[j].toString() + " </span> <span class='icon'><i class=\"far fa-edit\"></i></span>" + "</td>";
                    }
                }
            }
        }
        list += "</tr>";
    }

    function secondMode(regionData, productData) {
        list += "<tr>";
        list += "<td>" + regionData + "</td>";
        list += "<td>" + productData + "</td>";
        if (window.localStorage && localStorage.getItem(regionData + productData + "一月") || localStorage.getItem(productData + regionData + "一月")) {
            const month = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
            if (localStorage.getItem(regionData + productData + "一月")) {
                for (let i = 0; i < month.length; i++) {
                    list += "<td> <span class='value'>" + localStorage.getItem(regionData + productData + month[i]) + " </span> <span class='icon'> <i class=\"far fa-edit\"></i> </span>" + "</td>";
                }
            } else if (localStorage.getItem(productData + regionData + "一月")) {
                for (let i = 0; i < month.length; i++) {
                    list += "<td> <span class='value'>" + localStorage.getItem(productData + regionData + month[i]) + " </span> <span class='icon'><i class=\"far fa-edit\"></i> </span>" + "</td>";
                }
            }

        } else {
            for (let i = 0; i < sourceData.length; i++) {
                if (regionData === sourceData[i].region && productData === sourceData[i].product) {
                    for (let j = 0; j < 12; j++) {
                        list += "<td> <span class='value'>" + sourceData[i].sale[j].toString() + " </span> <span class='icon'> <i class=\"far fa-edit\"></i></span>" + "</td>";
                    }
                }
            }
        }
        list += "</tr>";
    }

    list += "</table>";

    list += "<button id='button'>保存</button>";

    return list;
}



