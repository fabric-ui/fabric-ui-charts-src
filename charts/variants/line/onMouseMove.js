import PropTypes from "prop-types";
import drawLineChart from "./drawLineChart";

export default function onMouseMove (props) {
    let drawn = undefined

    props.points.forEach((p) => {

        if ((props.event.x - 4) <= p.x && (props.event.x + 4) >= p.x && (props.event.y - 4) <= p.y && (props.event.y + 4) >= p.y) {
            drawn = true

            drawLineChart({...props, clear: true})
            props.ctx.fillStyle = '#333333'
            const x = (props.event.width - props.event.x) <= 100 ? props.event.x - 100 : props.event.x
            props.ctx.roundRect(x, props.event.y, 100, 50, 5).fill()

            props.ctx.fillStyle = 'white'
            props.ctx.fillText(`Axis: ${p.axis}`, x + 6, props.event.y + 20)
            props.ctx.fillText(`Value: ${p.value}`, x + 6, props.event.y + 40)
        } else if (drawn === undefined)
            drawn = false
    })

    if (drawn === false)
        drawLineChart({...props, clear: true})
}

onMouseMove.propTypes={
    event: PropTypes.object.isRequired,
    points: PropTypes.array.isRequired,

    valueKey: PropTypes.string.isRequired,
    axisKey: PropTypes.string.isRequired,
    drawLine: PropTypes.func.isRequired,
    clear:  PropTypes.bool.isRequired,
    ctx:  PropTypes.object.isRequired,
    data:  PropTypes.array.isRequired,
    drawGrid:  PropTypes.func.isRequired,
    clearCanvas: PropTypes.func.isRequired
}