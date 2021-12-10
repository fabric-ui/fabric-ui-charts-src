export default function polygon(sides, cx, cy, radius) {
    // const vector = [cx, cy]
    // const theta = ((sides - 2) / sides) * Math.PI
    //
    // // [[Math.cos(theta), Math.sin(theta)],[-Math.sin(theta), Math.cos(theta)]]
    //
    //
    // let startAngle = 0
    // for (let i = 0; i < sides; i++) {
    //     const rotationMatrix = [cx * Math.cos(theta) - cy * Math.sin(theta), cx * Math.sin(theta) + cy * Math.cos(theta)]
    //
    //     this.strokeStyle = 'red'
    //     this.beginPath()
    //     this.lineTo(rotationMatrix[0], rotationMatrix[1])
    //     this.stroke()
    //     this.closePath()
    // }

    let step  = 2 * Math.PI / sides, shift = (sides% 2 === 0 ? 2 : .5)*Math.PI/sides
    this.beginPath();

    for (let i = 0; i <= sides;i++) {
        let currentStep = i * step + shift;
        this.lineTo (cx + radius * Math.cos(currentStep), cy + radius * Math.sin(currentStep));
    }

    this.strokeStyle = "#000000";
    this.lineWidth = 1;
    this.stroke();
    this.closePath();

    console.log('HERE')
}