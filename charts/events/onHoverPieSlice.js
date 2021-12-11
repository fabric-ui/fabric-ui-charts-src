import PropTypes from "prop-types";
import getAngle from "../utils/getAngle";

export default function onHoverPieSlice(props) {
    let drawn = undefined
    const event = (props.event.x - props.placement.cx) ** 2 + (props.event.y - props.placement.cy) ** 2
    console.log(props.ratioRadius)


        props.points.forEach((p, i) => {
            const isInsideSlice = (event < p.radius ** 2) &&( props.variant === 'donut' && event > props.ratioRadius ** 2 || props.variant !== 'donut')

            if (isInsideSlice) {
                drawn = true

                let pointAngle = getAngle({
                    x: props.event.x - props.placement.cx,
                    y: props.event.y - props.placement.cy
                })

                if (pointAngle < 0)
                    pointAngle += 6.28319

                if (pointAngle >= p.startAngle && pointAngle <= p.endAngle) {

                    const placement = {
                        align: 'middle',
                        justify: 'end'
                    }


                    // if (i === props.ctx.lastOnHover)
                        props.ctx.tooltip(
                            {...p, width: 0, height: 0, x: p.tooltipX, y: p.tooltipY},
                            'rgba(0,0,0,.75)',
                            props.event,
                            placement,
                            () => props.drawChart(i)
                        )
                    // else
                    //     props.ctx.opacityTransition(
                    //         false,
                    //         '#000',
                    //         300,
                    //         (color) => {
                    //             props.ctx.tooltip(
                    //                 {...p, width: 0, height: 0, x: p.tooltipX, y: p.tooltipY},
                    //                 color,
                    //                 props.event,
                    //                 placement,
                    //                 () => props.drawChart(i)
                    //             )
                    //         }, .75)

                    CanvasRenderingContext2D.prototype.lastOnHover = i
                }
            } else if (drawn === undefined)
                drawn = false

        })

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
    ratioRadius: PropTypes.number

}