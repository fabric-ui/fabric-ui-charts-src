import Slice from "./Slice";
import randomColor from "../../utils/color/randomColor";

export default class Circle {
    slices = []
    linkedTo = []
    constructor(onSliceCreation, radius, toRemoveRadius, valueIndex, valueObj,totals, data, cx, cy, ctx) {
        this.radius = radius
        this.toRemoveRadius = toRemoveRadius
        this.valueIndex = valueIndex
        this.ctx = ctx

        this.cx = cx
        this.cy = cy

        let startAngle = 0

        data.forEach((point, index) => {
            let endAngle = (point.data[valueObj.field] / totals[valueIndex]) * (Math.PI * 2) + startAngle
            const n = new Slice(radius, index, point.color, startAngle, endAngle, cx, cy, ctx, point.data)

            this.slices.push(n)
            onSliceCreation(n)

            startAngle = endAngle
        })
    }
    handleSliceHover(index){
        this.slices.forEach((s, i) => {
            if(!s.endedHover && index !== i)
                s.init(0)
            else if(index === i)
                s.hover()
        })
        this.linkedTo.forEach(link => {
            link.draw(true)
        })
    }
    handleHoverExit(){
        this.slices.forEach(s => {
            if(!s.endedHover)
                s.init(0)
        })
        this.linkedTo.forEach(link => {
            link.draw(true)
        })
    }
    draw(isHoverEvent){
        // if(isHoverEvent)
        this.slices.forEach(s => s.init(isHoverEvent ? 0 : 500))
        if(this.valueIndex === 1)
            console.log('IM HERE')
        this.ctx.clearArc(this.cx, this.cy, this.toRemoveRadius, 0, Math.PI * 2)

        this.linkedTo.forEach(link => {
            link.draw(isHoverEvent)
        })
    }
}