// /* eslint-disable no-console,indent,no-const-assign */
// // eslint-disable-next-line indent
// // eslint-disable-next-line no-const-assign
// const postfixList = ["163.com", "gmail.com", "126.com", "qq.com", "263.net"];
//
// document.querySelector("#email-input").oninput = function () {
//     controlState();
//     addContent();
// };
//
// function getInput() {
//     return document.querySelector("#email-input").value.trim();
// }
//
// function generateContent() {
//     let input = getInput(),
//         content = "",
//         splice = "",
//         match = "",
//         flag = 1;
//     if (-1 !== input.indexOf("@")) {
//         splice = input.slice(0, input.indexOf("@"));
//         match = input.slice((input.indexOf("@") + 1));
//     }
//     for (let i = 0; i < postfixList.length; i++) {
//         if (0 === postfixList[i].indexOf(match) && "" !== match) {//可以匹配的情况
//             flag = 0;
//             content += "<li>" + splice + "@" + postfixList[i] + "</li>";
//         }
//     }
//     for (let j = 0; j < postfixList.length; j++) {
//         if ("" === splice && 1 === flag) {//没有@
//             content += "<li>" + input + "@" + postfixList[j] + "</li>";
//         }
//         else if (0 !== postfixList[j].indexOf(match) && "" !== match && 1 === flag) {//无法匹配的情况
//             content += "<li>" + splice + "@" + postfixList[j] + "</li>";
//         }
//         else if ("" === match && "" !== splice && 1 === flag) { //@后没有内容的情况
//             content += "<li>" + splice + "@" + postfixList[j] + "</li>";
//         }
//     }
//     return content;
// }
//
// function addContent() {
//     document.querySelector("#email-sug-wrapper").innerHTML = generateContent();
// }
//
// function controlState() {
//     if ("" === getInput()) {
//         hiddenPromptBox();
//     } else {
//         displayPromptBox();
//     }
// }
//
// function hiddenPromptBox() {
//     document.querySelector("#email-sug-wrapper").style.display = "none";
// }
//
// function displayPromptBox() {
//     document.querySelector("#email-sug-wrapper").style.display = "block";
// }
//
//

/* eslint-disable no-console,indent,no-const-assign */
// eslint-disable-next-line indent
// eslint-disable-next-line no-const-assign
const postfixList = ["163.com", "gmail.com", "126.com", "qq.com", "263.net"];

document.querySelector("#email-input").addEventListener("input", function (e) {
    controlState();
    addContent();
});

document.querySelector("#email-input").addEventListener("keyup", function (e) {
    console.log(e.key);
    if ("ArrowUp" !== e.key && "ArrowDown" !== e.key && "Enter" !== e.key) {
        resetSelected();
    } else if ("ArrowUp" === e.key) {
        if ("selected" === document.querySelector("#email-sug-wrapper").firstChild.className) {
            document.querySelector("#email-sug-wrapper").lastChild.className = "selected";
            document.querySelector("#email-sug-wrapper").firstChild.className = "unchecked";
        } else {
            document.querySelectorAll(".selected")[0].previousSibling.className = "selected";
            document.querySelectorAll(".selected")[0].nextSibling.className = "unchecked";
        }
    } else if ("ArrowDown" === e.key) {
        if ("selected" === document.querySelector("#email-sug-wrapper").lastChild.className) {
            console.log("1");
            document.querySelector("#email-sug-wrapper").firstChild.className = "selected";
            document.querySelector("#email-sug-wrapper").lastChild.className = "unchecked";
        } else {
            document.querySelectorAll(".selected")[0].nextSibling.className = "selected";
            document.querySelectorAll(".selected")[1].previousSibling.className = "unchecked";
        }
    } else if ("Enter" === e.key) {
        console.log("3");
        document.querySelector("#email-input").value = document.querySelectorAll(".selected")[0].innerHTML;
        hiddenPromptBox();
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
    document.querySelector("#email-sug-wrapper").firstChild.className = "selected";
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
    if (select !== document.querySelector("#email-sug-wrapper").firstChild) {
        select.className = "unchecked";
        document.querySelector("#email-sug-wrapper").firstChild.className = "selected";
    }
}

