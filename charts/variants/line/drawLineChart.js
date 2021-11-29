import PropTypes from "prop-types";

export default function drawLineChart (props){
    if (props.clear)
        props.clearCanvas()
    props.drawGrid()
    props.data.forEach((el, index) => {
        props.drawLine({
            axis: el[props.axisKey],
            value: el[props.valueKey],
            context: props.ctx,
            position: index,
            labelSpacing: props.labelSpacing
        })
    })
}

drawLineChart.propTypes={
    valueKey: PropTypes.string.isRequired,
    axisKey: PropTypes.string.isRequired,
    drawLine: PropTypes.func.isRequired,
    clear:  PropTypes.bool.isRequired,
    ctx:  PropTypes.object.isRequired,
    data:  PropTypes.array.isRequired,
    drawGrid:  PropTypes.func.isRequired,
    clearCanvas: PropTypes.func.isRequired
}