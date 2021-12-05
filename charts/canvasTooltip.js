function drawTriangle(x, y, width, height, placement, context) {

    switch (placement) {
        case 'left': {
            context.beginPath();
            context.moveTo(x - 7, (y + height / 4 + height / 8) + height / 8);
            context.lineTo(x, (y + height / 4 + height / 8) + height / 4);
            context.lineTo(x, (y + height / 4 + height / 8));
            context.fill();
            break
        }
        case 'right': {
            context.beginPath();
            context.moveTo(x + width + 7, (y + height / 4 + height / 8) + height / 8);
            context.lineTo(x + width, (y + height / 4 + height / 8) + height / 4);
            context.lineTo(x + width, (y + height / 4 + height / 8));
            context.fill();
            break
        }
        case 'top': {
            context.beginPath();
            context.moveTo((x + width / 4 + width / 8) + width / 8, y - 7);
            context.lineTo((x + width / 4 + width / 8) + width / 4, y);
            context.lineTo((x + width / 4 + width / 8), y);
            context.fill();
            break
        }
        case 'bottom': {
            context.beginPath();
            context.moveTo((x + width / 4 + width / 8) + width / 8, y + height + 7);
            context.lineTo((x + width / 4 + width / 8) + width / 4, y + height);
            context.lineTo((x + width / 4 + width / 8), y + height);
            context.fill();
            break
        }
    }

}

export default function canvasTooltip(point, color, event, placement, draw) {
    const {x, y, width, height, axis, axisLabel, value, valueLabel} = point
    const {align, justify, variant} = placement

    draw()

    let tooltipWidth = value.toString().length * 8 + valueLabel.length * 8 + 16
    const tooltipHeight = 50
    if (variant === 'rect') {
        this.fillStyle = color
        let overflownX, overflownY
        let tooltipX, tooltipY
        switch (align) {
            case 'start': {
                if (y - tooltipHeight - 10 < 0) {
                    tooltipY = y + 10
                    overflownY = true
                } else
                    tooltipY = y - tooltipHeight - 10
                break
            }
            case 'end':
                tooltipY = y + height
                break
            default:
                tooltipY = y + height / 2 - tooltipHeight / 2
                break
        }
        switch (justify) {
            case 'start': {
                tooltipX = x
                break
            }
            case 'end':
                if (x + width + tooltipWidth / 2 > this.canvas.width) {
                    overflownX = true
                    tooltipX = x + width - tooltipWidth - 10
                } else
                    tooltipX = x + width + 10
                break
            default:
                tooltipX = x + width / 2 - tooltipWidth / 2
                break
        }


        this.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 5).fill()
        if (align === 'end' || overflownY)
            drawTriangle(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 'top', this)
        else if (align === 'start' && !overflownY)
            drawTriangle(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 'bottom', this)

        if (justify === 'end' && !overflownX)
            drawTriangle(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 'left', this)
        else if (justify === 'start' || overflownX)
            drawTriangle(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 'right', this)

        this.fillStyle = 'white'
        this.font = "600 14px Roboto";
        this.fillText(`${axis}`, tooltipX + 6, tooltipY + 20)
        this.defaultFont('white')
        this.fillText(`${valueLabel}: ${value}`, tooltipX + 6, tooltipY + 40)
    } else {

    }

}