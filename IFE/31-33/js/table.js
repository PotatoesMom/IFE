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