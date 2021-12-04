export default function drawGrid({ctx, iterations, labelPadding, data, axisKey, element, color, width, offset}) {
    ctx.strokeStyle = '#e0e0e0'

    ctx.beginPath();
    ctx.moveTo(labelPadding * 1.35, 0);
    ctx.lineTo(labelPadding * 1.35, element.height - labelPadding);
    ctx.stroke();

    data.forEach((d, index) => {
        ctx.beginPath();
        let x = (index * Math.abs(width) + labelPadding * 1.25 + offset * (index + 1)) + width / 2

        ctx.moveTo(x + width / 2 + offset / 2, 0);
        ctx.lineTo(x + width / 2 + offset / 2, element.height - labelPadding);
        ctx.stroke();

        ctx.fillStyle = color
        ctx.fillText(d[axisKey], x - (d[axisKey].length * 8) / 2, element.height - 16);
    })

    iterations.forEach((i, index) => {
        ctx.beginPath();
        const y = (index * ((element.height - labelPadding) / (iterations.length - 1)))
        ctx.moveTo(labelPadding, y);
        ctx.lineTo(element.width , y);
        ctx.stroke();

        ctx.fillStyle = color

        ctx.fillText(i, 0, index === 0 ? 10 : (y + 4));
    })
}
