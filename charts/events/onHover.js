import PropTypes from "prop-types";

export default function onHover(props) {
    let drawn = undefined

    props.points.forEach((p, i) => {
        if (props.event.x >= p.x && props.event.x <= (p.x + Math.abs(p.width)) && props.event.y >= p.y && props.event.y <= (p.y + Math.abs(p.height))) {
            const placement = {
                align: props.variant === 'vertical' ? 'start' : 'middle',
                justify: props.variant === 'vertical' ? 'middle' : 'end',
                variant: 'rect'
            }
            drawn = true
            if (i === props.ctx.lastOnHover)
                props.ctx.tooltip(
                    p,
                    'rgba(0,0,0,.75)',
                    props.event,
                    placement,
                    () => props.drawChart(i)
                )
            else
                props.ctx.opacityTransition(
                    false,
                    '#000',
                    250,
                    (color) => {
                        props.ctx.tooltip(
                            p,
                            color,
                            props.event,
                            placement,
                            () => props.drawChart(i)
                        )
                    }, .75)

            CanvasRenderingContext2D.prototype.lastOnHover = i
        } else if (drawn === undefined)
            drawn = false
    })

    console.log(drawn)
    if (drawn === false) {
        CanvasRenderingContext2D.prototype.lastOnHover = undefined
        props.drawChart()
    }
}

onHover.propTypes = {
    variant: PropTypes.oneOf(['vertical', 'horizontal', 'line']),
    event: PropTypes.object.isRequired,
    points: PropTypes.array.isRequired,

    ctx: PropTypes.object.isRequired,
    drawChart: PropTypes.func.isRequired

}