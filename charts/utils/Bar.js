import React from "react";

export default class Bar {
    constructor({x, y, value, label, color, width, height}) {
        self.width = width
        self.height = height

        self.x = x
        self.y = y
        self.value = value
        self.label = label
        self.color = color
    }

    draw(context) {
        context.fillStyle = self.color
        context.fillRect(self.x, self.y, self.width, self.height)
    }


}
