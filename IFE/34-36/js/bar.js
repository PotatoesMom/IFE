/* eslint-disable indent,no-unused-vars */
// eslint-disable-next-line indent

function drawHistogram(data) {

    const areaHeight = 360;
    const areaWidth = 400;
    const shaftHeight = 355;
    const shaftWidth = 390;
    const columnWidth = 20;
    const intervalWidth = 10; //间隔宽度
    const columnColor = "#2b94e3";
    const axisColor = "black";

    const svg = document.querySelectorAll("svg")[0];
    svg.setAttribute("width",areaWidth.toString());
    svg.setAttribute("height",areaHeight.toString());

    let histogram = "";
    histogram += "<line x1='10' y1='357.5' x2=" + (shaftWidth + 10).toString() + " y2='357.5' stroke-width='1' stroke=" + axisColor + " />" +
        "<line x1='10' y1="+ (shaftHeight + 2.5).toString() +" x2='10' y2='2.5' stroke-width='1' stroke=" + axisColor + " />" ;
    svg.innerHTML = histogram;

    for (let i = 0; i < data[0].length; i++) {
        let node = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        node.setAttribute("x", (20 + i * (columnWidth + intervalWidth)).toString());
        node.setAttribute("y", (357.5 - data[0][i] / 2).toString());
        node.setAttribute("height", (data[0][i] / 2).toString());
        node.setAttribute("width", columnWidth.toString());
        node.setAttribute("fill", columnColor);
        node.setAttribute("stroke", columnColor);
        node.setAttribute("stroke-width", "1");
        svg.appendChild(node);
    }
}