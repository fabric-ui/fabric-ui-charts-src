import PropTypes from "prop-types";

export default function onMouseMove(props) {
    let drawn = undefined
    const draw = (index, color, point) => {
        props.drawChart(index)

        props.ctx.fillStyle = color
        const x = props.event.x - 50
        const y = props.event.y - 50
        props.ctx.roundRect(x, y, 100, 50, 5).fill()

        props.ctx.fillStyle = 'white'
        props.ctx.fillText(`Axis: ${point.axis}`, x + 6, y + 20)
        props.ctx.fillText(`Value: ${point.value}`, x + 6, y + 40)
    }
    props.points.forEach((p, i) => {

        if (props.event.x >= p.x && props.event.x <= (p.x + Math.abs(p.width)) && props.event.y >= p.y && props.event.y <= (p.y + Math.abs(p.height))) {
            drawn = true
            if (i === props.ctx.lastOnHover)
                draw(i, '#000', p)
            else
                props.ctx.opacityTransition(false, '#000', 250, (color) => {
                    draw(i, color, p)
                })

            CanvasRenderingContext2D.prototype.lastOnHover = i
        } else if (drawn === undefined)
            drawn = false
    })

    if (drawn === false) {
        CanvasRenderingContext2D.prototype.lastOnHover = undefined
        props.drawChart()
    }
}

onMouseMove.propTypes = {

    event: PropTypes.object.isRequired,
    points: PropTypes.array.isRequired,

    ctx: PropTypes.object.isRequired,
    drawChart: PropTypes.func.isRequired

}