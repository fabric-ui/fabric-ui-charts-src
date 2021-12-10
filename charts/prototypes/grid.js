import PropTypes from "prop-types";

export default function grid({
    strokeStyle,
                                 iterations,
                                 labelPadding,
                                 data,
                                 axisKey,
                                 element,
                                 color,
                                 width,
                                 offset,
                                 variant,
                                 height
                             }) {

    this.strokeStyle = strokeStyle

    this.beginPath();
    this.moveTo(labelPadding * 1.35, 0);
    this.lineTo(labelPadding * 1.35, element.height - labelPadding);
    this.stroke();

    data.forEach((d, index) => {
        let x, y
        switch (variant) {
            case 'vertical': {
                this.beginPath();
                x = (index * Math.abs(width) + labelPadding * 1.25 + offset * (index + 1)) + width / 2

                this.moveTo(x + width / 2 + offset / 2, 0);
                this.lineTo(x + width / 2 + offset / 2, element.height - labelPadding);
                this.stroke();

                this.fillStyle = color
                this.fillText(d[axisKey], x - (d[axisKey].length * 8) / 2, element.height - 16);
                this.closePath()
                break
            }
            case 'horizontal': {
                this.beginPath();
                y = (index + 1) * (height + offset) - offset / 2
                this.moveTo(labelPadding, y);
                this.lineTo(element.width - labelPadding * .40, y);
                this.stroke();

                this.fillStyle = color
                this.fillText(d[axisKey], 0, y - height / 2 + 2);
                this.closePath()
                break
            }
            case 'line': {
                this.beginPath();
                x = (index * ((element.width - labelPadding * 1.75 - 4) / (data.length - 1))) + labelPadding * 1.35
                if (index > 0) {
                    this.moveTo(x, 0);
                    this.lineTo(x, element.height - labelPadding);
                    this.stroke();
                }


                this.fillStyle = color
                this.fillText(d[axisKey], x - (d[axisKey].length * 8) / 2, element.height - 16);
                this.closePath()
                break
            }
            default:
                break
        }

    })

    iterations.forEach((i, index) => {
        switch (variant) {
            case 'horizontal': {
                const x = (index * ((element.width - labelPadding * 1.75) / (iterations.length - 1))) + labelPadding * 1.35
                const value = iterations[iterations.length - (index + 1)]
                this.beginPath();

                this.moveTo(x, 0);
                this.lineTo(x, element.height - labelPadding);
                this.stroke();


                this.fillStyle = color
                this.fillText(value, x - value.toString().length * 4, element.height - 12);
                this.closePath()
                break
            }

            default: {

                this.beginPath();
                const y = (index * ((element.height - labelPadding * 1.35) / (iterations.length - 1))) + labelPadding * .35
                this.moveTo(labelPadding, y);
                this.lineTo(element.width, y);
                this.stroke();

                this.fillStyle = color

                this.fillText(i, 0, (y + 4));
                this.closePath()
                break
            }
        }
    })
}
