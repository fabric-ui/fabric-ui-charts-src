import hexToRgba from "../utils/hexToRgba";
import getEase from "../utils/getEase";

export default class Bar {
    animated = false
    animationStarted = false
    constructor(animationDirection, width, height, x, y, index, color) {

        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.initialWidth = animationDirection === 'width' ? 0 : width
        this.initialHeight = animationDirection === 'height' ? 0 : height
        this.index = index
        this.color = color
    }

    draw(ctx, onHover = false) {

        if(!this.animationStarted && !this.animated || this.animated && this.animationStarted) {

            this.animationStarted = true
            ctx.clearRect(this.x, this.y, this.width, this.height)
            const timestamp =  this.animated ? 0 : 500

            let start, previousTimeStamp, targetTimestamp = timestamp + this.index * 50
            let currentWidth = timestamp > 0 ? this.initialWidth : this.width, currentHeight = timestamp > 0 ? this.initialHeight : this.height, currentY = this.height - currentHeight + this.y

            const draw = (elapsed) => {
                ctx.clearRect(this.x -1, this.y -1, this.width + 2, this.height+ 2)

                ctx.fillStyle = onHover ?  this.color : hexToRgba( this.color, .65)
                ctx.lineWidth = 1
                ctx.strokeStyle =  this.color


                ctx.fillRect(this.x, currentY, currentWidth, currentHeight)
                // this.strokeRect(x, currentY, currentWidth, currentHeight)
                ctx.stroke()


                currentWidth = this.initialWidth === this.width || elapsed === 0 ? this.width : getEase(elapsed, 0, this.width, targetTimestamp, 5)
                currentHeight = this.initialHeight === this.height ? this.height : getEase(elapsed, 0,this.height, targetTimestamp, 5)

                currentY = this.height - currentHeight + this.y
            }

            const step = (t) => {
                if (start === undefined)
                    start = t;
                const elapsed = t - start;
                if (previousTimeStamp !== t)
                    draw(elapsed)
                if (targetTimestamp > elapsed) {
                    previousTimeStamp = t
                    requestAnimationFrame(step);
                } else {
                    draw(elapsed)
                    this.animated = true
                }
            }
            if (timestamp > 0)
                requestAnimationFrame(step)
            else
                draw(targetTimestamp)
        }
    }
}