/* eslint-disable indent,no-unused-vars */
// eslint-disable-next-line indent

function drawLineChart(data) {
    const areaHeight = 720;
    const areaWidth = 400;
    const shaftHeight = 710;
    const shaftWidth = 390;
    const diameter = 4;
    const pointColor = ["#2b94e3", "#fbdd8c", "#a463b4", "#B2F511", "#c95e00", "#002D4B", "aqua", "crimson", "#e0aeb7"];
    const lineColor = ["#2b94e3", "#fbdd8c", "#a463b4", "#B2F511", "#c95e00", "#002D4B", "aqua", "crimson", "#e0aeb7"];
    const lineWidth = 1;
    const separationDistance = 30;

    const canvas = document.querySelector("#canvas");
    canvas.setAttribute("width", areaWidth.toString());
    canvas.setAttribute("height", areaHeight.toString());

    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");

        // 绘制横轴及纵轴
        const horizontalAxis = new Path2D();
        horizontalAxis.moveTo(10, 715);
        horizontalAxis.lineTo(10, 715 - shaftHeight);
        ctx.stroke(horizontalAxis);
        const verticalAxis = new Path2D();
        verticalAxis.moveTo(10,715);
        verticalAxis.lineTo(10 + shaftWidth, 715);
        ctx.stroke(verticalAxis);

        for (let num = 0; num < data.length; num++) { //将表格的每一行数据作为参数传入

            //定义循环内需要的上一个节点的位置参数
            let previousPointX = 0;
            let previousPointY = 0;

            for (let i = 0; i < data[num].length; i++) {
                let positionX = 40 + i * separationDistance;
                let positionY = 715 - data[num][i];

                //绘制数据点
                const point = new Path2D();
                point.moveTo(positionX, positionY);
                point.arc(positionX, positionY, diameter / 2, 0, Math.PI * 2, true);
                ctx.fillStyle = pointColor[num];
                ctx.fill(point);

                //绘制连线
                if (i !== 0) {
                    const line = new Path2D();
                    line.moveTo(positionX, positionY);
                    line.lineTo(previousPointX, previousPointY);
                    ctx.lineWidth = lineWidth;
                    ctx.strokeStyle = lineColor[num];
                    ctx.stroke(line);
                }
                previousPointX = positionX;
                previousPointY = positionY;
            }

        }


    }
}