import hexToRgba from "../utils/hexToRgba";
import getEase from "../utils/getEase";

export default class Slice {
    animated = false
    endedHover = true
    wasHovered = false

    constructor(radius, index, color, startAngle, endAngle, cx, cy, ctx, strokeStyle) {
        this.radius = radius
        this.startAngle = startAngle
        this.endAngle = endAngle
        this.cx = cx
        this.cy = cy

        this.ctx = ctx
        this.index = index
        this.color = color

        this.strokeStyle = strokeStyle
    }

    animationQueue = []

    animationListener(newAnimation) {
        // console.log('HERE')
        const before = this.getLastQueue()
        const isExit = newAnimation.type === 'hover' && !this.endedHover

        if (before === null || (before.type !== newAnimation.type && !isExit)) {
            console.log(before?.type, newAnimation.type)
            this.animationQueue.push({...newAnimation, isExecuting: false})
            const lastOnExecution = this.isExecutingAnimation()

            if (!lastOnExecution)
                this.execAnimation(this.getQueue())
        }
    }

    isExecutingAnimation() {
        const q = this.getQueue()

        return !!(q !== null && q.isExecuting);
    }

    getQueue() {
        return this.animationQueue.length > 0 ? {
            ...this.animationQueue[0], index: this.animationQueue.length - 1
        } : null
    }

    getLastQueue() {
        return this.animationQueue.length > 0 ? this.animationQueue[this.animationQueue.length - 1] : null
    }

    execAnimation({type, timestamp, index}) {

        let next = this.getQueue()
        if (next.index === index) {
            next = null
        }


        if (index > -1)
            this.animationQueue[index] = {...this.animationQueue[index], isExecuting: true}
        // EXEC
        switch (type) {
            case 'hover': {
                if (this.endedHover) {


                    this.draw(() => {
                            // console.log('Before', this.animationQueue.length)
                            this.animationQueue.splice(index, 1)
                            // console.log('After', this.animationQueue.length)
                            if (next !== null)
                                this.execAnimation(next)

                            this.endedHover = false
                        },
                        this.radius,
                        this.radius * .1, timestamp)
                } else
                    this.animationQueue.splice(index, 1)
                break
            }
            case 'hover-end': {
                console.log('EXIT')

                this.draw(() => {
                        this.animationQueue.splice(index, 1)
                        if (next !== null)
                            this.execAnimation(next)
                        this.endedHover = true

                    },
                    0,
                    this.radius, timestamp, true)

                break
            }
            case 'init': {

                this.draw(() => {

                    this.animationQueue.splice(index, 1)

                    if (next !== null)
                        this.execAnimation(next)
                }, 0, this.radius, timestamp)

                break
            }
            default: {
                break
            }
        }
        // EXEC
    }


    draw(onAnimationEnd, initialRadius, finalRadius, timestamp, isBackwards) {

        let start, previousTimeStamp,
            targetTimestamp = timestamp === 0 ? 0 : timestamp + this.index * 50,
            increment = isBackwards ? (finalRadius - initialRadius) / timestamp : null,
            currentRadius = isBackwards ? finalRadius : initialRadius

        const d = (elapsed) => {
            this.ctx.clearArc(this.cx, this.cy, this.radius * 100, this.startAngle, this.endAngle)
            this.ctx.lineWidth = 2
            this.ctx.strokeStyle = this.strokeStyle
            this.wasHovered = false
            this.ctx.beginPath()
            this.ctx.moveTo(this.cx, this.cy)
            this.ctx.arc(this.cx, this.cy, currentRadius, this.startAngle, this.endAngle, false)
            this.ctx.lineTo(this.cx, this.cy)

            this.ctx.fillStyle = this.color
            this.ctx.fill()
            this.ctx.stroke()
            this.ctx.closePath()


            currentRadius = isBackwards ? currentRadius + increment : getEase(elapsed, initialRadius, finalRadius, targetTimestamp, 5)
        }
        const step = (t) => {
            if (start === undefined)
                start = t;
            const elapsed = t - start;
            if (previousTimeStamp !== t) {
                d(elapsed)
            }
            if (targetTimestamp > elapsed) {
                previousTimeStamp = t
                requestAnimationFrame(step);
            } else {
                currentRadius = finalRadius
                d(-1)
                onAnimationEnd()
            }
        }
        if (targetTimestamp > 0)
            requestAnimationFrame(step)
        else {
            currentRadius = finalRadius
            d(-1)
            onAnimationEnd()
        }
    }
}