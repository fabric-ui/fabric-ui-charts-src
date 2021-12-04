import PropTypes from "prop-types";

export default function onMouseMove(props) {
    let drawn = undefined

    props.points.forEach((p, i) => {

        if (props.event.x >= p.x && props.event.x <= (p.x + Math.abs(p.width)) && props.event.y >= p.y && props.event.y <= (p.y + Math.abs(p.height))) {
            drawn = true

            props.drawChart(i)
            props.ctx.fillStyle = 'rgba(0, 0, 0, 0.85)'
            const x = props.event.x - 50
            const y = props.event.y - 50
            props.ctx.roundRect(x, y, 100, 50, 5).fill()

            props.ctx.fillStyle = 'white'
            props.ctx.fillText(`Axis: ${p.axis}`, x + 6, y + 20)
            props.ctx.fillText(`Value: ${p.value}`, x + 6, y + 40)
        } else if (drawn === undefined)
            drawn = false
    })

    if (drawn === false)
        props.drawChart()
}

onMouseMove.propTypes = {
    event: PropTypes.object.isRequired,
    points: PropTypes.array.isRequired,

    ctx: PropTypes.object.isRequired,
    drawChart: PropTypes.func.isRequired

}