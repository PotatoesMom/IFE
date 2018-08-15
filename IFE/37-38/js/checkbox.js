/* eslint-disable indent,no-undef,no-unused-vars */

function generateCheckBox(id, parameter) { //此函数完成两个区域多选框的生成
    const container = document.getElementById(id);
    let checkbox = "<input type='checkbox' id='checkAll' value='全选'>全选";
    for (let i = 0; i < parameter.length; i++) {
        checkbox += "<input type='checkbox' id='checkbox' value='" + parameter[i].value + "'>" + parameter[i].text;
    }

    container.innerHTML = checkbox;

    container.addEventListener("click", function (e) {

        if (e.target && e.target.type === "checkbox") {
            let id = e.target.id;
            if ("checkAll" === id) {
                for (let i = 0; i < e.target.parentNode.childNodes.length; i += 2) {
                    e.target.parentNode.childNodes[i].checked = true;
                }
            } else {
                let count = 0; //判断点击的这个内容是不是唯一一个被勾选的
                for (let i = 0; i < e.target.parentNode.childNodes.length; i += 2) {
                    if (true === e.target.parentNode.childNodes[i].checked) {
                        count++;
                    }
                }
                if (0 === count) {
                    e.target.checked = true;
                } else if (3 === count && e.target.parentNode.childNodes[0].checked === false) {
                    e.target.parentNode.childNodes[0].checked = true;
                } else if (3 === count && e.target.parentNode.childNodes[0].checked === true) {
                    e.target.parentNode.childNodes[0].checked = false;
                }
            }
        }
        judgement();
    });
}
/* 判断两个多选区域是否都有内容被选中，如果都有内容被选中，生成表格 */
function judgement() {
    let flagRegion = false,//判断地区的所有选项中，是否有被选中的内容
        flagProduct = false;//判断产品的所有选项中，是否有被选中的内容
    for (let i = 0; i < document.querySelectorAll("input").length; i++) {
        if (document.querySelectorAll("input")[i].checked === true && i < 4) {
            flagRegion = true;
        } else if (document.querySelectorAll("input")[i].checked === true && i > 3 ) {
            flagProduct = true;
        }
    }
    if (flagRegion === true && flagProduct === true) {
        retrieveData();
        addLocalStorage();
    }
}

/* 为两个多选区域传值 */
generateCheckBox("region-radio-wrapper", [{
    value: "华东",
    text: "华东"
}, {
    value: "华南",
    text: "华南"
}, {
    value: "华北",
    text: "华北"
}]);

generateCheckBox("product-radio-wrapper", [{
    value: "手机",
    text: "手机"
}, {
    value: "笔记本",
    text: "笔记本"
}, {
    value: "智能音箱",
    text: "智能音箱"
}]);



