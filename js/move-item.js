var gCurrLine = 0
// var linesLength = gLines.length-1


//   function moveup(){

//     gLines[gLines.length-1].pos.y-=10
//     renderMeme(gImgs[gCurrImageId-1].url)
//   }

//   function movedown() {
//     gLines[gLines.length-1].pos.y+=10
//     renderMeme(gImgs[gCurrImageId-1].url)
//   }

//   function prevline() {
//     gLines[gLines.length-1].pos.y+=10
//     renderMeme(gImgs[gCurrImageId-1].url)
//   }

//   function nextline() {
//     gLines[gLines.length-1].pos.y+=10
//     renderMeme(gImgs[gCurrImageId-1].url)
//   }

function moveup() {
    console.log('gCurrLine', gCurrLine)
    gLines[gCurrLine].pos.y -= 10
    renderMeme(gImgs[gCurrImageId - 1].url)
}

function movedown() {
    console.log('gCurrLine in move down', gCurrLine)
    gLines[gCurrLine].pos.y += 10
    renderMeme(gImgs[gCurrImageId - 1].url)
}

function prevline() {
    // gCurrLine = linesLength
    gCurrLine === 0 ? gCurrLine =gLines.length -1 : gCurrLine -= 1

    //gCurrLine -= 1
    console.log('gCurrLine in prevline', gCurrLine)
    // gLines[gCurrLine].pos.y+=10
    // renderMeme(gImgs[gCurrImageId-1].url)
}

function nextline() {
    console.log('gCurrLine in nextline', gCurrLine)
    gCurrLine === gLines.length -1 ? gCurrLine = 0 : gCurrLine += 1
    //gCurrLine += 1
    gLines[gCurrLine].pos.y += 10
    renderMeme(gImgs[gCurrImageId - 1].url)
}
