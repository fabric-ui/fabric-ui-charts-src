export default function drawGrid ({ctx, iterations, labelPadding, data, axisKey, element, color}){
    ctx.strokeStyle = '#e0e0e0'
    ctx.setLineDash([0])
    data.forEach((d, index) => {
        ctx.beginPath();
        let x
        x = (index * ((element.width - labelPadding * 2) / (data.length - 1))) + labelPadding * 1.5
        ctx.moveTo(x, labelPadding);
        ctx.lineTo(x, element.height - labelPadding );
        ctx.stroke();


        ctx.fillStyle = color
        ctx.fillText(d[axisKey], x - (d[axisKey].length * 8) / 2, element.height - 16);
    })
    iterations.forEach((i, index) => {
        ctx.beginPath();
        const y = (index * (element.height / iterations.length)) + labelPadding
        ctx.moveTo(labelPadding , y);
        ctx.lineTo(element.width - labelPadding/2, y);
        ctx.stroke();

        ctx.fillStyle = color
        ctx.fillText(i, 0, y + 4);
    })
}
