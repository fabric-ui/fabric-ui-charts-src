import React from 'react'
import Row from "./Row";

export default class Bar {
    bars = []

    constructor(direction, width, height, x, y, index, values, data, ctx, biggest, offset, onRowCreation) {

        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.ctx = ctx
        this.dataIndex = index

        values.forEach((valueObj, vi) => {
            let barH, barW, x, y
            const pVariation = (data[valueObj.field] * 100) / biggest
            if (direction === 'width') {
                x = this.x * 1.35
                barW = (pVariation * (ctx.canvas.width - this.x * 1.75)) / 100
                barH = height / values.length
                y = index * (height + offset) + (vi * (barH + 1))
            } else {
                barW = (width) / values.length
                x = index * (width + offset) +this. y * 1.35 + (vi * (barW + 1)) + offset / (values.length + 1)
                barH = (pVariation * (ctx.canvas.height - this.y * 1.35)) / 100
                y = ctx.canvas.height - barH - this.y
            }

            const n = new Row(x, y, barW, barH, valueObj.hexColor, index, vi, direction, ctx)
            this.bars.push(n)
            onRowCreation(n)
        })
    }

    handleHover(valueIndex) {

        this.bars.forEach(s => {
            if (!s.endedHover && s.valueIndex !== valueIndex)
                s.draw(0)
            else if (s.valueIndex === valueIndex)
                s.hover()
        })
    }

    handleHoverExit() {
        this.bars.forEach(s => {
            if (!s.endedHover)
                s.draw(0)
        })
    }
    cancelAnimations(){
        this.bars.forEach(s => {
            if (s.animationID)
                cancelAnimationFrame(s.animationID)
        })
    }
    draw() {
        console.log(this.width)
        this.ctx.clearRect(this.x, this.y, this.width, this.height)
        this.bars.forEach(b => {
            b.draw(500)
        })
    }
}
