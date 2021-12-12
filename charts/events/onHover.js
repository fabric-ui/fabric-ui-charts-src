import PropTypes from "prop-types";

export default function onHover({
                                    variant,
                                    event,
                                    points,
                                    ctx,
                                    drawChart
                                }) {
    let drawn = undefined

    points.forEach((p, i) => {
        if (event.x >= p.x && event.x <= (p.x + Math.abs(p.width)) && event.y >= p.y && event.y <= (p.y + Math.abs(p.height))) {
            const placement = {
                align: variant === 'vertical' ? 'start' : 'middle',
                justify: variant === 'vertical' ? 'middle' : 'end',
                variant: 'rect'
            }
            drawn = true
            // if (i === ctx.lastOnHover)
                ctx.tooltip(
                    p,
                    'rgba(0,0,0,.75)',
                    event,
                    placement,
                                    () => {
                                        ctx.clearAll()
                                        drawChart(i)
                                    }
                )
            // else
            //     ctx.opacityTransition(
            //         false,
            //         '#000',
            //         250,
            //         (color) => {
            //             ctx.tooltip(
            //                 p,
            //                 color,
            //                 event,
            //                 placement,
            //                 () => {
            //                     ctx.clearAll()
            //                     drawChart(i)
            //                 }
            //             )
            //         }, .75)

            CanvasRenderingContext2D.prototype.lastOnHover = i
        } else if (drawn === undefined)
            drawn = false
    })


    if (drawn === false) {
        CanvasRenderingContext2D.prototype.lastOnHover = undefined
        ctx.clearAll()
        drawChart()
    }
}

onHover.propTypes = {}