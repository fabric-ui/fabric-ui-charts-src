import hexToHsl from "./hexToHsl";

export default function randomColor() {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    const newHex = '#' + n.slice(0, 6);
    hexToHsl(newHex)
    return newHex
}
