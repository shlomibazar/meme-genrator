var gCurrLine = 0

function moveup() {
    gLines[gCurrLine].pos.y -= 10
    renderMeme(gImgs[gCurrImageId - 1].url)
}

function movedown() {
    gLines[gCurrLine].pos.y += 10
    renderMeme(gImgs[gCurrImageId - 1].url)
}

function prevline() {
    gCurrLine === 0 ? gCurrLine =gLines.length -1 : gCurrLine -= 1
}

function nextline() {
    gCurrLine === gLines.length -1 ? gCurrLine = 0 : gCurrLine += 1
}


function alignLeft() {
    gLines[gLines.length-1].align = 'left'
    renderMeme(gImgs[gCurrImageId-1].url)
}
function alignMid() {
    console.log('gLines[gLines.length].align',gLines[gLines.length-1].align)
    gLines[gLines.length-1].align = 'mid'
    renderMeme(gImgs[gCurrImageId-1].url)
    
}
function alignRight() {
    gLines[gLines.length-1].align = 'right'
    renderMeme(gImgs[gCurrImageId-1].url)
}

function incFont(){
    gLines[gLines.length-1].size+=3
    renderMeme(gImgs[gCurrImageId-1].url)
}

function decFont(){
    gLines[gLines.length-1].size-=3
    renderMeme(gImgs[gCurrImageId-1].url)

}

function deleteLine(){
    gLines.splice(gLines.length-1, 1)
    renderMeme(gImgs[gCurrImageId-1].url)
}   