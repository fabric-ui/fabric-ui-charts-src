import React from 'react'

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
            ctx.tooltip(
                p,
                'rgba(0,0,0,.75)',
                event,
                placement,
                () => {
                    ctx.clearAll()
                    drawChart(p, true)
                }
            )
        } else if (drawn === undefined)
            drawn = false
    })


    if (drawn === false) {
        ctx.clearAll()
        drawChart(undefined, true)
    }
}

onHover.propTypes = {}
