import hexToRgba from "../utils/hexToRgba";
import getEase from "../utils/getEase";

export default class Radar {
    animated = false
    animationStarted = false
    points = []

    constructor({
                    dataLength,
                    axisKey,
                    axisLabel,
                    biggest,
                    cx,
                    cy,
                    radius,
                    valuesLength
                }) {

        this.shift = (dataLength % 2 ? -1 : 1) * (dataLength / 2) * Math.PI / dataLength
        this.step = 2 * Math.PI / dataLength

        this.axisKey = axisKey
        this.axisLabel = axisLabel

        this.biggest = biggest

        this.cx = cx
        this.cy = cy
        this.radius = radius
        this.valuesLength = valuesLength
    }

    polygon({vi, data, context, onHover, radius, valueKey, valueColor, valueLabel, points}) {
        let before
        data.forEach((point, index) => {
            context.strokeStyle = valueColor
            const pVariation = (point[valueKey]) / this.biggest
            let currentStep = index * this.step + this.shift;
            const axisAttr = point[this.axisKey]

            const {x, y} = {
                x: this.cx + (radius * pVariation) * Math.cos(currentStep),
                y: this.cy + (radius * pVariation) * Math.sin(currentStep)
            }


            const newPoint = {
                x: x, y: y, width: 20, height: 20,
                axis: axisAttr,
                value: point[valueKey],
                axisLabel: this.axisLabel,
                valueLabel: valueLabel,
                color: valueColor
            }
            points.push(newPoint)
            context.beginPath()
            if (before)
                context.moveTo(before.x, before.y);
            context.lineTo(x, y);
            context.stroke();
            context.closePath()

            const isOnHover =  onHover?.axis === point[this.axisKey] && onHover.value === point[valueKey]

            context.beginPath()
            context.arc(x, y, isOnHover ? 10 : 4, 0, Math.PI * 2, false)
            context.fillStyle = valueColor
            context.fill()
            context.closePath()
            before = newPoint
        })
    }

    draw(ctx, data, values, onHover, resetAnimation, setPoints) {


        if (!this.animationStarted && !this.animated || this.animated && this.animationStarted) {
            this.animationStarted = true
            if(this.animated && resetAnimation)
                this.animated = false
            const timestamp = this.animated ? 0 : 500

            let start, previousTimeStamp, currentRadius = 0

            const d = (elapsed) => {
                ctx.clearAll()
                let allPoints = []
                values.forEach((valueObj, vi) => {
                    let points = []
                    this.polygon({
                        data: data,
                        radius: elapsed === -1 ? this.radius : currentRadius,
                        onHover: onHover,
                        context: ctx,
                        valueKey: valueObj.field,
                        valueLabel: valueObj.label,
                        valueColor: valueObj.hexColor,
                        points: points,
                        vi: vi
                    })

                    // FILL
                    ctx.beginPath()
                    ctx.fillStyle = hexToRgba(valueObj.hexColor, .3)
                    points.forEach(p => {
                        ctx.lineTo(p.x, p.y);
                    })
                    ctx.fill()
                    ctx.closePath()
                    // FILL

                    // CONNECT-LAST-LINE
                    ctx.beginPath()
                    ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
                    ctx.lineTo(points[0].x, points[0].y);
                    ctx.stroke();
                    ctx.closePath()
                    // CONNECT-LAST-LINE

                    allPoints.push(...points)
                })
                if (elapsed === -1) {
                    this.points = allPoints
                    setPoints(allPoints)
                }
                currentRadius = getEase(elapsed, 0, this.radius, timestamp, 5)
            }

            const step = (t) => {
                if (start === undefined)
                    start = t;
                const elapsed = t - start;
                if (previousTimeStamp !== t)
                    d(elapsed)
                if (timestamp > elapsed) {
                    previousTimeStamp = t
                    requestAnimationFrame(step);
                } else {
                    d(-1)
                    this.animated = true
                }
            }
            if (timestamp > 0)
                requestAnimationFrame(step)
            else
                d(-1)
        }

    }
}