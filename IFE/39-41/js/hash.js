/* eslint-disable indent,no-undef,no-unused-vars,no-console */

// eslint-disable-next-line indent

function renderBrowsingHistory() {
    let content = parseHash();
    if (content !== "") {
        let productValue = [],
            regionValue = [];
        for (let i = 0; i < content.length; i++) {
            switch (content[i]) {
                case "1":
                    regionValue.push("华东");
                    break;
                case "2":
                    regionValue.push("华南");
                    break;
                case "3":
                    regionValue.push("华北");
                    break;
                case "a":
                    productValue.push("手机");
                    break;
                case "b":
                    productValue.push("笔记本");
                    break;
                case "c":
                    productValue.push("智能音箱");
                    break;
            }
        }
        document.querySelector("#table").innerHTML = renderingTable(regionValue, productValue);

        for (let i = 1, j = 0, k = 0; i < 4; i++) {
            if (document.querySelector("#region-radio-wrapper").childNodes[i * 2].value === regionValue[j]) {
                document.querySelector("#region-radio-wrapper").childNodes[i * 2].checked = true;
                j++;
            }
            if (document.querySelector("#product-radio-wrapper").childNodes[i * 2].value === productValue[k]) {
                document.querySelector("#product-radio-wrapper").childNodes[i * 2].checked = true;
                k++;
            }
            if (j === 3) {
                document.querySelector("#region-radio-wrapper").childNodes[0].checked = true;
            }
            if (k === 3) {
                document.querySelector("#product-radio-wrapper").childNodes[0].checked = true;
            }
        }

        addLocalStorage();

    }
}

function parseHash() { //解析Hash，获取状态参数
    return location.hash;//取到需要的值，并返回
}

window.onhashchange = renderBrowsingHistory;

renderBrowsingHistory();


