/* eslint-disable indent,no-undef,no-unused-vars,no-console,no-inner-declarations */

/* 实现LocalStorage存储 */
function addLocalStorage() {

    const icon = document.querySelectorAll(".icon");
    const value = document.querySelectorAll(".value");
    let data = [];
    for (let i = 0; i < icon.length; i++) {
        data[i] = value[i].innerHTML;
        document.getElementsByClassName("far fa-edit")[i].addEventListener("click", click);

        function click() {
            for(let j = 0; j < icon.length; j++) {
                if (j !== i) {
                    value[j].innerHTML = data[j] ;
                }
            }
            value[i].innerHTML = "<input id='data' type=\"text\" value=" + data[i] + ">";
            value[i].innerHTML += "<button id='yes'>确定</button>" + "<button id='no'>取消</button>";
            document.querySelector("#data").focus();

            document.querySelector("#data").addEventListener("keydown", function (e) {
                if (e.code === "Escape") {
                    value[i].innerHTML = data[i];
                } else if (e.code === "Enter") {
                    if (isNaN(document.querySelector("#data").value)) {
                        alert("请输入数字");
                        value[i].innerHTML = "<input id='data' type=\"text\" value=" + data[i] + ">";
                    }
                    value[i].innerHTML = document.querySelector("#data").value;
                }
            });

            let flag = false;
            document.querySelector("#yes").addEventListener("click", function () {
                flag = true;
                if (isNaN(document.querySelector("#data").value)) {
                    alert("请输入数字");
                    value[i].innerHTML = "<input id='data' type=\"text\" value=" + data[i] + ">";
                }
                data[i] = document.querySelector("#data").value;
                value[i].innerHTML = document.querySelector("#data").value;

            });

            document.querySelector("#no").addEventListener("click", function () {
                flag = true;
                value[i].innerHTML = data[i];
            });

            document.querySelector("#data").addEventListener("blur", function () {
                document.querySelectorAll("body")[0].addEventListener("click", function (e) {
                    console.log(e.target)
                    console.log()
                    if (e.target && e.target.id !== "yes" && e.target.id !== "no" && !flag && e.target.className !== "far fa-edit" && e.target.id !== "button") {
                        value[i].innerHTML = data[i];
                    }
                });
            });
        }
    }


    const button = document.querySelector("#button");
    const tr = document.querySelectorAll("tr");
    button.addEventListener("click", function () {
        localStorage.clear();
        for (let i = 1; i < tr.length; i++) {
            for (let j = 2; j < tr[i].childNodes.length; j++) {
                let key = tr[i].childNodes[0].innerHTML + tr[i].childNodes[1].innerHTML + tr[0].childNodes[j].innerHTML;
                let value = tr[i].childNodes[j].childNodes[1].innerHTML;
                localStorage.setItem(key, value);
            }
        }
    });
}



