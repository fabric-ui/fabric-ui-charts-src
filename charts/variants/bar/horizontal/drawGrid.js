

export default function drawGrid({ctx, iterations, labelPadding, data, axisKey, element, color, height, offset}) {
    ctx.strokeStyle = '#e0e0e0'

    ctx.beginPath();
    ctx.moveTo(labelPadding * 1.35, labelPadding);
    ctx.lineTo(labelPadding * 1.35, element.height - labelPadding);
    ctx.stroke();

    data.forEach((d, index) => {
        ctx.beginPath();
        let y = (index + 1) * (height + offset) - offset/2

        ctx.moveTo(labelPadding, y );
        ctx.lineTo(element.width -  labelPadding * .40, y);
        ctx.stroke();

        ctx.fillStyle = color
        ctx.fillText(d[axisKey], 0, y - height/2 + 2);
    })

    iterations.forEach((i, index) => {
        const x = ((iterations.length - 1 - index)  * ((element.width - labelPadding * 1.75) / (iterations.length -1 ))) + labelPadding * 1.35

        ctx.beginPath();

        ctx.moveTo(x, 0);
        ctx.lineTo(x, element.height - labelPadding);
        ctx.stroke();


        ctx.fillStyle = color
        ctx.fillText(i, x - i.toString().length * 4, element.height - 12);
    })
}
