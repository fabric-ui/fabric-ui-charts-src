
import React from 'react'
export default function polygon(strokeStyle, sides, cx, cy, radius, drawLines) {
    let placements = []

    let step = 2 * Math.PI / sides, shift = (sides % 2 ? -1 : 1) * (sides / 2) * Math.PI / sides

    this.beginPath();

    for (let i = 0; i <= sides; i++) {
        let currentStep = i * step + shift;
        const {x, y} = {x: cx + radius * Math.cos(currentStep), y: cy + radius * Math.sin(currentStep)}
        placements.push({x, y})
        this.lineTo(x, y);
    }

    this.strokeStyle = strokeStyle;
    this.stroke();
    this.closePath();

    if(drawLines) {
        this.beginPath()
        placements.forEach(p => {
            this.moveTo(cx, cy);
            this.lineTo(p.x, p.y);
        })
        this.stroke();
        this.closePath();
    }
    return placements
}
