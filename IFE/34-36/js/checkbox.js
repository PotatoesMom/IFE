/* eslint-disable indent,no-undef,no-unused-vars */

function generateCheckBox(id, parameter) {
    const container = document.getElementById(id);
    let checkbox = "<input type='checkbox' id='checkAll' value='全选'>全选";
    for (let i = 0; i < parameter.length; i++) {
        checkbox += "<input type='checkbox' id='checkbox' value='" + parameter[i].value + "'>" + parameter[i].text;
    }
    container.innerHTML = checkbox;
    container.childNodes[2].checked = true;
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
        retrieveData();
    });
}

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



