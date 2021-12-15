import getAngle from "../utils/misc/getAngle";

export default function onHoverPieSlice({
                                            event,
                                            points,
                                            ctx,
                                            placement,
                                            variant,
                                            ratioRadius,
                                            drawChart
                                        }) {
    let drawn = undefined
    const calculatedEvent = (event.x - placement.cx) ** 2 + (event.y - placement.cy) ** 2

    points.forEach((p, i) => {
        const isInsideSlice = (calculatedEvent < p.radius ** 2) && (calculatedEvent > p.toRemoveRadius ** 2)

        if (isInsideSlice) {
            drawn = true

            let pointAngle = getAngle({
                x: event.x - placement.cx,
                y: event.y - placement.cy
            })

            if (pointAngle < 0)
                pointAngle += 6.28319

            if (pointAngle >= p.startAngle && pointAngle <= p.endAngle) {

                const placement = {
                    align: 'middle',
                    justify: 'end'
                }


                // if (i === ctx.lastOnHover)
                ctx.tooltip(
                    {...p, width: 0, height: 0, x: p.tooltipX, y: p.tooltipY},
                    'rgba(0,0,0,.75)',
                    event,
                    placement,
                    () => {
                        ctx.clearAll()
                        drawChart(p)
                    }
                )
                // else
                //     ctx.opacityTransition(
                //         false,
                //         '#000',
                //         300,
                //         (color) => {
                //             ctx.tooltip(
                //                 {...p, width: 0, height: 0, x: p.tooltipX, y: p.tooltipY},
                //                 color,
                //                 event,
                //                 placement,
                //                 () => drawChart(i)
                //             )
                //         }, .75)

                CanvasRenderingContext2D.prototype.lastOnHover = i
            }
        } else if (drawn === undefined)
            drawn = false

    })

    if (drawn === false) {
        CanvasRenderingContext2D.prototype.lastOnHover = undefined
        ctx.clearAll()
        drawChart()


    }
}


