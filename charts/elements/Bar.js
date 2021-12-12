import animatedBar from "../prototypes/animatedBar";

export default class Bar {
    animated = false
    animationStarted = false
    constructor(animationDirection, width, height, x, y, index, color) {

        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.initialWidth = animationDirection === 'width' ? 0 : width
        this.initialHeight = animationDirection === 'height' ? 0 : height
        this.index = index
        this.color = color
    }

    draw(ctx, onHover = false) {

        if(!this.animationStarted && !this.animated || this.animated && this.animationStarted) {
            this.animationStarted = true
            ctx.clearRect(this.x, this.y, this.width, this.height)
            ctx.newBar(this.initialWidth, this.initialHeight, this.width, this.height, this.x, this.y, this.animated ? 0 : 500, this.index, this.color, onHover, () => {
                this.animated = true
            })
        }
    }
}