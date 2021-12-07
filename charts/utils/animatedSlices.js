export default function animatedSlices(points, clear, timestamp, setFirstRender, onBeforeDraw, radius, cx, cy, onHover) {
    let start, previousTimeStamp
    let newPoints = [...points].map(p => {
        return {...p, radius: 0}
    })

    // points.forEach((p, i) => {
    //     animateSlice()
    //
    // })

    const draw = (elapsed) => {
        clear()
        points.forEach((p, i) => {
            const r = onHover === i ? newPoints[i].radius * 1.05 : newPoints[i].radius
            onBeforeDraw(p, r)
            this.fillStyle = p.color
            this.lineWidth = 2

            this.beginPath()

            this.moveTo(cx, cy)
            this.arc(cx, cy, r, newPoints[i].startAngle, newPoints[i].endAngle, false)
            this.lineTo(cx, cy)
            this.fill()
            this.stroke()

            this.closePath()

            newPoints[i].radius = radius * ((elapsed) / (timestamp ))
        })
    }
    const step = (t) => {
        if (start === undefined)
            start = t;
        const elapsed = t - start;
        if (previousTimeStamp !== t)
            draw(elapsed)
        if (timestamp > elapsed) {
            previousTimeStamp = t
            requestAnimationFrame(step);
        } else {
            draw(elapsed)
            setFirstRender()
        }
    }

    if (timestamp > 0)
        requestAnimationFrame(step)
    else {
        newPoints = newPoints.map(e => {
            return {
                ...e,
                radius: radius
            }
        })
        draw(timestamp)
    }
}


function animateSlice(slice, cx, cy, ctx, onBeforeDraw){
    const {startAngle, endAngle, color, radius} = slice
    ctx.clearArc()

    const r = onHover === i ? newPoints[i].radius * 1.05 : newPoints[i].radius
    onBeforeDraw(slice, radius)
    this.fillStyle = p.color
    this.lineWidth = 2

    this.beginPath()

    this.moveTo(cx, cy)
    this.arc(cx, cy, r, newPoints[i].startAngle, newPoints[i].endAngle, false)
    this.lineTo(cx, cy)
    this.fill()
    this.stroke()

    this.closePath()
}