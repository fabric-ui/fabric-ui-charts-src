import React from 'react'
export default function getAngle({x, y}) {
    return Math.atan2(y, x)
}
