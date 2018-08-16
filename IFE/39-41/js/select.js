/* eslint-disable indent,no-undef,no-unused-vars,no-console */

// eslint-disable-next-line indent


/* 检查多选框，将选中内容进行提取，传给'renderingTable()' 函数 */
function retrieveData() {
    let productValue = [],
        regionValue = [];
    let hash = "";
    for (let i = 1, j = 0, k = 0; i < 4; i++) {
        if (document.querySelector("#region-radio-wrapper").childNodes[i * 2].checked === true) {
            hash += i;
            regionValue[j] = document.querySelector("#region-radio-wrapper").childNodes[i * 2].value;
            j++;
        }
        if (document.querySelector("#product-radio-wrapper").childNodes[i * 2].checked === true) {
            hash += String.fromCharCode(i + 96);
            productValue[k] = document.querySelector("#product-radio-wrapper").childNodes[i * 2].value;
            k++;
        }
    }
    location.hash = hash;
    document.querySelector("#table").innerHTML = renderingTable(regionValue, productValue);
    addLocalStorage();
}
