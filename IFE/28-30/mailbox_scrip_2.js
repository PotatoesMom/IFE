/* eslint-disable no-console,indent,no-const-assign */
// eslint-disable-next-line indent
// eslint-disable-next-line no-const-assign
// 增加一个变量，用于存储当前选中的提示Li的序号
var nowSelectTipIndex = 0;

const postfixList = ["163.com", "gmail.com", "126.com", "qq.com", "263.net"];

function focus() {
    document.querySelector("#email-input").focus();
}

window.onload = focus();

document.querySelector("#email-input").addEventListener("input", function (e) {
    controlState();
    addContent();
});

document.querySelector("#email-input").addEventListener("keyup", function (e) {
    if ("ArrowUp" !== e.key && "ArrowDown" !== e.key && "Enter" !== e.key) {
        resetSelected();
    } else if ("ArrowUp" === e.key) {
        if ("selected" === document.querySelector("#email-sug-wrapper").childNodes[0].className) {
            nowSelectTipIndex = postfixList.length - 1;
            document.querySelector("#email-sug-wrapper").childNodes[nowSelectTipIndex].className = "selected";
            document.querySelector("#email-sug-wrapper").childNodes[0].className = "unchecked";
        } else {
            document.querySelector("#email-sug-wrapper").childNodes[nowSelectTipIndex - 1].className = "selected";
            document.querySelector("#email-sug-wrapper").childNodes[nowSelectTipIndex].className = "unchecked";
            nowSelectTipIndex -= 1;
        }
    } else if ("ArrowDown" === e.key) {
        if ("selected" === document.querySelector("#email-sug-wrapper").childNodes[postfixList.length - 1].className) {
            nowSelectTipIndex = 0;
            document.querySelector("#email-sug-wrapper").childNodes[nowSelectTipIndex].className = "selected";
            document.querySelector("#email-sug-wrapper").childNodes[postfixList.length - 1].className = "unchecked";
        } else {
            document.querySelector("#email-sug-wrapper").childNodes[nowSelectTipIndex + 1].className = "selected";
            document.querySelector("#email-sug-wrapper").childNodes[nowSelectTipIndex].className = "unchecked";
            nowSelectTipIndex += 1;
        }
    } else if ("Enter" === e.key) {
        document.querySelector("#email-input").value = document.querySelector("#email-sug-wrapper").childNodes[nowSelectTipIndex].innerHTML;
        hiddenPromptBox();
    }
    if ("Escape" === e.key) {
        document.querySelector("#email-input").select();
    }
});

function getInput() {
    return document.querySelector("#email-input").value.trim();
}

function generateContent() {
    let input = getInput(),
        splice = "",
        match = "",
        flag = false;
    input = input.replace(/&/g, "&amp;");
    input = input.replace(/</g, "&lt;");
    input = input.replace(/>/g, "&gt;");
    input = input.replace(/ /g, "&nbsp;");
    input = input.replace(/\'/g, "&#39;");
    input = input.replace(/\"/g, "&quot;");
    if (-1 !== input.indexOf("@")) {
        splice = input.split("@")[0];
        match = input.slice((input.indexOf("@") + 1));
    }
    let content = "";
    let noncontent = "";
    for (let i = 0; i < postfixList.length; i++) {
        if (0 === postfixList[i].indexOf(match) && "" !== match) {
            flag = true;
            content += "<li>" + splice + "@" + postfixList[i] + "</li>";
        }
        else {
            noncontent += "<li>" + input.split("@")[0] + "@" + postfixList[i] + "</li>";
        }
    }
    return flag ? content : noncontent;
}

function addContent() {
    document.querySelector("#email-sug-wrapper").innerHTML = generateContent();
    document.querySelector("#email-sug-wrapper").childNodes[nowSelectTipIndex].className = "selected";
}

function controlState() {
    if ("" === getInput()) {
        hiddenPromptBox();
    } else {
        displayPromptBox();
    }
}

function hiddenPromptBox() {
    document.querySelector("#email-sug-wrapper").style.display = "none";
}

function displayPromptBox() {
    document.querySelector("#email-sug-wrapper").style.display = "block";
}

document.querySelector("#email-sug-wrapper").addEventListener("click", function (e) {
    if (e.target && e.target.nodeName.toUpperCase() == "LI") {
        let str = e.target.innerHTML;
        str = str.replace(/&amp;/g, "&");
        str = str.replace(/&lt;/g, "<");
        str = str.replace(/&gt;/g, ">");
        str = str.replace(/&nbsp;/g, " ");
        str = str.replace(/&#39;/g, "\'");
        str = str.replace(/&quot;/g, "\"");
        document.querySelector("#email-input").value = str;
        hiddenPromptBox();
    }
    focus();
});

document.querySelector("#email-sug-wrapper").addEventListener("mouseover", function (e) {
    if (e.target && e.target.nodeName.toUpperCase() == "LI") {
        e.target.style.backgroundColor = "#b3d0de";
    }
});

document.querySelector("#email-sug-wrapper").addEventListener("mouseout", function (e) {
    if (e.target && e.target.nodeName.toUpperCase() == "LI" && "selected" === e.target.className) {
        e.target.style.backgroundColor = "#e0aeb7";
    } else if (e.target && e.target.nodeName.toUpperCase() == "LI") {
        e.target.style.backgroundColor = "#ffffff";
    }
});

function resetSelected() {
    const select = document.querySelectorAll(".selected")[0];
    if (select !== document.querySelector("#email-sug-wrapper").childNodes[0]) {
        select.className = "unchecked";
        document.querySelector("#email-sug-wrapper").childNodes[0].className = "selected";
    }
}

