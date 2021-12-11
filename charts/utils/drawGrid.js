export default function drawGrid({
                                    layer,
                                    strokeStyle,
                                    iterations,
                                    labelPadding,
                                    data,
                                    axisKey,

                                    color,
                                    width,
                                    offset,
                                    variant,
                                    height
                                }) {

    layer.strokeStyle = strokeStyle

    layer.beginPath();
    layer.moveTo(labelPadding * 1.35, 0);
    layer.lineTo(labelPadding * 1.35, layer.canvas.height - labelPadding);
    layer.stroke();

    data.forEach((d, index) => {
        let x, y
        switch (variant) {
            case 'vertical': {
                layer.beginPath();
                x = (index * Math.abs(width) + labelPadding * 1.25 + offset * (index + 1)) + width / 2

                layer.moveTo(x + width / 2 + offset / 2, 0);
                layer.lineTo(x + width / 2 + offset / 2, layer.canvas.height - labelPadding);
                layer.stroke();

                layer.fillStyle = color
                layer.fillText(d[axisKey], x - (d[axisKey].length * 8) / 2, layer.canvas.height - 16);
                layer.closePath()
                break
            }
            case 'horizontal': {
                layer.beginPath();
                y = (index + 1) * (height + offset) - offset / 2
                layer.moveTo(labelPadding, y);
                layer.lineTo(layer.canvas.width - labelPadding * .40, y);
                layer.stroke();

                layer.fillStyle = color
                layer.fillText(d[axisKey], 0, y - height / 2 + 2);
                layer.closePath()
                break
            }
            case 'line': {
                layer.beginPath();
                x = (index * ((layer.canvas.width - labelPadding * 1.75 - 4) / (data.length - 1))) + labelPadding * 1.35
                if (index > 0) {
                    layer.moveTo(x, 0);
                    layer.lineTo(x, layer.canvas.height - labelPadding);
                    layer.stroke();
                }


                layer.fillStyle = color
                layer.fillText(d[axisKey], x - (d[axisKey].length * 8) / 2, layer.canvas.height - 16);
                layer.closePath()
                break
            }
            default:
                break
        }

    })

    iterations.forEach((i, index) => {
        switch (variant) {
            case 'horizontal': {
                const x = (index * ((layer.canvas.width - labelPadding * 1.75) / (iterations.length - 1))) + labelPadding * 1.35
                const value = iterations[iterations.length - (index + 1)]
                layer.beginPath();

                layer.moveTo(x, 0);
                layer.lineTo(x, layer.canvas.height - labelPadding);
                layer.stroke();


                layer.fillStyle = color
                layer.fillText(value, x - value.toString().length * 4, layer.canvas.height - 12);
                layer.closePath()
                break
            }

            default: {

                layer.beginPath();
                const y = (index * ((layer.canvas.height - labelPadding * 1.35) / (iterations.length - 1))) + labelPadding * .35
                layer.moveTo(labelPadding, y);
                layer.lineTo(layer.canvas.width, y);
                layer.stroke();

                layer.fillStyle = color

                layer.fillText(i, 0, (y + 4));
                layer.closePath()
                break
            }
        }
    })
}
