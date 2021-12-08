import PropTypes from "prop-types";
import getAngle from "../utils/getAngle";

export default function onHoverPieSlice(props) {
    let drawn = undefined
    const event = (props.event.x - props.placement.cx) ** 2 + (props.event.y - props.placement.cy) ** 2
    const isInside = (event < props.placement.radius ** 2)
    const ratioRadius = event > (props.ratio * props.placement.radius) ** 2
    console.log(ratioRadius)
    if (isInside && ((props.variant === 'donut' && ratioRadius) || true)) {
        props.points.forEach((p, i) => {
            let pointAngle = getAngle({x: props.event.x - props.placement.cx, y: props.event.y - props.placement.cy})

            if (pointAngle < 0)
                pointAngle += 6.28319

            if (pointAngle >= p.startAngle && pointAngle <= p.endAngle) {

                const placement = {
                    align: 'middle',
                    justify: 'end'
                }
                drawn = true


                if (i === props.ctx.lastOnHover)
                    props.ctx.tooltip(
                        {...p, width: 0, height: 0, x: p.tooltipX, y: p.tooltipY},
                        'rgba(0,0,0,.75)',
                        props.event,
                        placement,
                        () => props.drawChart(i)
                    )
                else
                    props.ctx.opacityTransition(
                        false,
                        '#000',
                        300,
                        (color) => {
                            props.ctx.tooltip(
                                {...p, width: 0, height: 0, x: p.tooltipX, y: p.tooltipY},
                                color,
                                props.event,
                                placement,
                                () => props.drawChart(i)
                            )
                        }, .75)

                CanvasRenderingContext2D.prototype.lastOnHover = i
            }
        })
    } else
        drawn = false
    if (drawn === false) {
        CanvasRenderingContext2D.prototype.lastOnHover = undefined
        props.drawChart()
    }
}

onHoverPieSlice.propTypes = {
    event: PropTypes.object.isRequired,
    points: PropTypes.array.isRequired,

    ctx: PropTypes.object.isRequired,
    drawChart: PropTypes.func.isRequired,

    placement: PropTypes.object,
    variant: PropTypes.oneOf(['pie', 'donut']),
    ratio: PropTypes.number

}