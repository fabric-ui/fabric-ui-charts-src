import {useEffect} from "react";
import onHoverPieSlice from "../events/onHoverPieSlice";

export default function useHover(context, points,onHover, deps=[]){
    const handleMouseMove = (event) => {

        if (points.length > 0) {
            const bBox = context.canvas?.getBoundingClientRect()

            onHover({
                x: event.clientX - bBox.left,
                y: event.clientY - bBox.top,
                width: bBox.width,
                height: bBox.height
            })
        }
    }
    const handleMouseOut = () => {
        context.clearAll()
    }
    useEffect(() => {
        context?.canvas.parentNode.addEventListener('mousemove', handleMouseMove)
        context?.canvas.parentNode.addEventListener('mouseout', handleMouseOut)
        return () => {
            context?.canvas.parentNode.removeEventListener('mousemove', handleMouseMove)
            context?.canvas.parentNode.removeEventListener('mouseout', handleMouseOut)
        }
    }, [...deps, context, points])
}