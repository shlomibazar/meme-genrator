
let gLines = []
//let gComponent = []

function createLine(pos, text, color) {
    gLines.push({
        pos,
        text,
        size: 60,
        align: 'left',
        color,
        isDrag: false,
    })
}


function getLine() {
    return gLines
}


//Check if the click is inside the circle 
function isLineClicked(clickedPos) {
    const { pos } = gLines
    // Calc the distance between two dots
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    //If its smaller then the radius of the circle we are inside
    return distance <= gLines.size
}


function setLineDrag(isDrag) {
    gLines.isDrag = isDrag
}


//Move the circle in a delta, diff from the pervious pos
function moveLine(dx, dy) {
    gLines.pos.x += dx
    gLines.pos.y += dy

}
