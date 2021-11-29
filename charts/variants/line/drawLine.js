
export default function drawLine ({axis, value, position, context, labelSpacing})  {
    const pVariation = (value * 100) / biggest
    const height = ((pVariation * (ref.current.height - labelSpacing * 2 - 4)) / 100)
    let x = (position * ((ref.current.width - labelSpacing * 2 + 8) / (props.data.length - 1))) + labelSpacing - 4,
        y = (ref.current.height - labelSpacing) - height - 8

    if (points.length === 0)
        setPoints(prevState => {
            return [...prevState, {x: x, y: y, axis: axis, value: value}]
        })

    context.strokeStyle = props.color ? props.color : '#0095ff'
    context.fillStyle = props.color ? props.color : '#0095ff'

    context.beginPath();
    context.arc(x, y, 4, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    if (position > 0) {
        context.beginPath();
        context.moveTo(xBefore, yBefore);


        context.lineTo(x, y);
        context.stroke();
    }

    xBefore = x
    yBefore = y
}