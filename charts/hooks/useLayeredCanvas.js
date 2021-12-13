import {useEffect, useState} from "react";
import roundRect from "../prototypes/roundRect";

import transition from "../prototypes/transition";
import tooltip from "../prototypes/tooltip";
import arcEraser from "../prototypes/arcEraser";
import polygon from "../prototypes/polygon";


export default function useLayeredCanvas( fontColor) {
    const [layers, setLayers] = useState([])

    const layer = (index) => {
        if (layers[index] !== undefined)
            return layers[index]
        return undefined
    }
    const newLayer = (target) => {
        const element = document.createElement('canvas')
        target.appendChild(element)

        element.width = target.offsetWidth
        element.height = target.offsetHeight
        element.style.position = 'absolute'
        element.style.top = '0px'
        element.style.left = '0px'
        element.style.zIndex = `${layers.length}`

        setLayers(prevState => {
            return [...prevState, element.getContext('2d')]
        })
    }
    const updateDimensions = (target) => {
        layers.forEach(l => {
            l.canvas.width = target.offsetWidth
            l.canvas.height = target.offsetHeight
        })
    }

    useEffect(() => {
        CanvasRenderingContext2D.prototype.roundRect = roundRect
        CanvasRenderingContext2D.prototype.defaultFont = function (color = fontColor) {
            this.fillStyle = color
            this.font = "500 14px Roboto";
        }

        CanvasRenderingContext2D.prototype.opacityTransition = transition
        CanvasRenderingContext2D.prototype.tooltip = tooltip

        CanvasRenderingContext2D.prototype.animatedArc = arcEraser
        CanvasRenderingContext2D.prototype.polygon = polygon

        CanvasRenderingContext2D.prototype.clearAll = function () {
            this.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
        CanvasRenderingContext2D.prototype.clearArc = function (cx, cy, radius, startAngle, endAngle) {
            this.globalCompositeOperation = 'destination-out'

            this.beginPath()
            this.fillStyle = this.baseFontColor
            this.arc(cx, cy, radius, startAngle, endAngle, false)
            this.fill();
            this.closePath()

            this.globalCompositeOperation = 'source-over'
        }
    }, [])

    return {newLayer, layer, contextLayers: layers.length, updateDimensions}
}