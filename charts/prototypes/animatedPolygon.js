export default function animatedPolygon(points, color, cx, cy, radius, drawChart, timestamp, fontColor, onHover){
    let step = 2 * Math.PI / points.length,
        shift = (points.length % 2 ? -1 : 1) * (points.length / 2) * Math.PI / points.length
    let lastPoint
    points.map((p, index) => {
        let currentStep = index * step + shift;

        const px = cx + (radius*1.5 ) * Math.cos(currentStep), py =  cy + (radius*1.5 - 32) * Math.sin(currentStep)
        this.fillStyle = fontColor
        this.fillText(p.axis, px - p.axis.length*4, py)

        const {x, y} = {
            x: cx + (radius * p.variation) * Math.cos(currentStep),
            y: cy + (radius * p.variation) * Math.sin(currentStep)
        }

        lastPoint ={x, y}
        this.beginPath()
        if (index > 0)
            this.moveTo(lastPoint.x, lastPoint.y);
        this.lineTo(x, y);
        this.stroke();
        this.closePath()

        this.beginPath()
        this.arc(x, y, onHover === index ? 10 : 4, 0, Math.PI * 2, false)
        this.fillStyle = color
        this.fill()
        this.closePath()
    })
}