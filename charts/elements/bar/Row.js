import React from 'react'
import hexToRgba from "../../utils/color/hexToRgba";
import ease from "../../utils/animations/ease";

export default class Row{
    endedHover=true
    animationID = null
    constructor(x, y, width, height, color, dataIndex, valueIndex, direction, ctx){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.index = dataIndex + valueIndex
        this.dataIndex = dataIndex
        this.valueIndex = valueIndex
        this.ctx = ctx

        this.initialWidth = direction === 'width' ? 0 : width
        this.initialHeight = direction === 'height' ? 0 : height
    }
    _paint(currentY, currentHeight, currentWidth, color){
        this.ctx.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2)

        this.ctx.fillStyle = color
        this.ctx.lineWidth = 1
        this.ctx.strokeStyle = this.color


        this.ctx.fillRect(this.x, currentY, currentWidth, currentHeight)
        // this.strokeRect(x, currentY, currentWidth, currentHeight)
        this.ctx.stroke()

    }
    hover(){
        this.endedHover = false
        this._paint(this.y, this.height, this.width, this.color)
    }
    draw(ts){
        this.ctx.clearRect(this.x, this.y, this.width, this.height)
        const timestamp = ts

        let start, previousTimeStamp, targetTimestamp = timestamp + this.index * 50
        let currentWidth = timestamp > 0 ? this.initialWidth : this.width,
            currentHeight = timestamp > 0 ? this.initialHeight : this.height,
            currentY = this.height - currentHeight + this.y

        const draw = (elapsed) => {
            this._paint(currentY, currentHeight, currentWidth, hexToRgba(this.color, .75))

            currentWidth = this.initialWidth === this.width || elapsed === 0 ? this.width : ease(elapsed, 0, this.width, targetTimestamp, 5)
            currentHeight = this.initialHeight === this.height ? this.height : ease(elapsed, 0, this.height, targetTimestamp, 5)

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
