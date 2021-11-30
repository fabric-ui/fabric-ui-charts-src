export default function drawGrid({ctx, iterations, labelPadding, data, axisKey, element, color, width, offset}) {
    ctx.strokeStyle = '#e0e0e0'

    ctx.beginPath();
    ctx.moveTo(labelPadding * 1.35, labelPadding);
    ctx.lineTo(labelPadding * 1.35, element.height - labelPadding);
    ctx.stroke();

    data.forEach((d, index) => {
        ctx.beginPath();
        let x = (index * Math.abs(width) + labelPadding * 1.25 + offset * (index + 1)) + width / 2

        ctx.moveTo(x + width / 2 + offset/2, labelPadding );
        ctx.lineTo(x + width / 2 + offset/2, element.height - labelPadding);
        ctx.stroke();

        ctx.fillStyle = color
        ctx.fillText(d[axisKey], x - (d[axisKey].length * 8) / 2, element.height - 16);
    })

    iterations.forEach((i, index) => {
        ctx.beginPath();
        const y = (index * (element.height / iterations.length)) + labelPadding - 2
        ctx.moveTo(labelPadding, y);
        ctx.lineTo(element.width - labelPadding*.35, y);
        ctx.stroke();

        ctx.fillStyle = color
        ctx.fillText(i.value, 0, y + 4);
    })
}
