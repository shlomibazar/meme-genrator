let gElCanvas
let gCtx

let gCurrShape = 'line'
let gCurrColor = 'black'
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
// var isDrag = false

var gCurrImageId
var gCurrStickerId


function init() {
    renderImages()
}

function renderImages() {
    const strHTMLs = gImgs.map(image => `<img src="${image.url}" onclick="onImgClick(this)"  alt="" class="image">`)
    const elgridConteiner = document.querySelector('.grid-container')
    elgridConteiner.innerHTML = strHTMLs.join('')
    //console.log('elgridConteiner.innerHTML',elgridConteiner.innerHTML)
}

function renderStickers() {
    const strHTMLs = gStickers.map(sticker => `<img src="${sticker.url}" onclick="onStickerClick(this)" alt="" class="button"></img>`)
    const elgridConteiner = document.querySelector('.sticker-conteiner')
    elgridConteiner.innerHTML = strHTMLs.join('')

}

function renderMeme(imgSrc,width) {
    render()
    renderImg(imgSrc,width)
    // renderSticker(stickerSrc)
    //setTimeout(renderLine, 300)
}

function render() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    renderCanvas()
}

function renderCanvas() {
    gCtx.fillStyle = "#ff7f00"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onImgClick(ev) {

    var grid = document.querySelector('.grid-container')
    grid.classList.add('hidden');

    var editpage = document.querySelector('.controller-conteiner')
    editpage.classList.remove('hidden')
    gCurrImageId = +ev.src.charAt(ev.src.length - 5)

    renderMeme(gImgs[gCurrImageId - 1].url)
    renderStickers()
}

function onStickerClick(ev) {
    gCurrStickerId = +ev.src.charAt(ev.src.length - 5)
    renderSticker(gStickers[gCurrStickerId - 1].url)
}

function renderImg(imgSrc,width) {
    base_image = new Image()
    base_image.src = imgSrc
    base_image.onload = function () {
        gCtx.drawImage(base_image, 0, 0, base_image.width, base_image.height);
        renderLine()
        // console.log('width',width)
        // gCtx.strokeRect( 10,  10, width, 50)
    }

}
function renderSticker(stickerSrc) {
    base_sticker = new Image();
    base_sticker.src = stickerSrc
    base_sticker.onload = function () {
        gCtx.drawImage(base_sticker, 0, 0, 40, 40);
    }
}

function getInputValue() {
    // Selecting the input element and get its value 
    var inputVal = document.getElementById("myText").value
    console.log('inputVal', inputVal)

    return inputVal

}


function newLine(){
    var length = gLines.length
    console.log('length',length)
    const gCurrColor = document.getElementById('colorpicker').value
    text =''
    console.log('gLines[length ].pos.y',gLines[length-1 ].pos.y)
    var newPos = {
        x: gLines[length-1 ].pos.x,
        y: gLines[length-1 ].pos.y + 40,
    }
    createLine(newPos, text, gCurrColor)
    gCurrLine+=1
}

function changeLineText() {

    const top = { x: 50, y: 50 }
    const { pos, color, size } = getLine()
    const gCurrColor = document.getElementById('colorpicker').value

    // var text = document.querySelector('.text')
    // text.classList.add('outline');

    var text = document.getElementById("myText").value
    var length = gLines.length

    if (length > 0) {

        gLines[gCurrLine ].text = text

    } else {
        console.log('i here')
        createLine(top, text, gCurrColor)
    }
    let textwidth = gCtx.measureText(text);
     console.log(textwidth.width); 
     renderMeme(gImgs[gCurrImageId - 1].url,textwidth.width)
     
}

function renderLine() {

    gLines.map(line => {
        gCtx.font = `${line.size}px Arial`
        gCtx.strokeStyle = line.color;
        if (line.align === 'left') {
            line.pos.x = 20
        }
        if (line.align === 'mid') {
            line.pos.x = gElCanvas.width / 2 - 100
        }
        if (line.align === 'right') {
            line.pos.x = gElCanvas.width - 100
        }
        gCtx.strokeText(line.text, line.pos.x, line.pos.y);

    })

}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // Note: changing the canvas dimension this way clears the canvas

    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetWidth
    gElCanvas.width = 500
    gElCanvas.height = 500
}



//// didnt got to this part yet ///////////////////////
//// didnt got to this part yet ///////////////////////
//// didnt got to this part yet ///////////////////////
//// didnt got to this part yet ///////////////////////
//// didnt got to this part yet ///////////////////////
function onClear() {
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderCanvas()

}



function onDown(ev) {
    //console.log('Im from onDown')
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    setLineDrag(true)
    //Save the pos we start from 
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    //console.log('Im from onMove')
    const { isDrag } = getLine()
    if (!isDrag) return
    const pos = getEvPos(ev)
    //Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    //Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    //The canvas is render again after every move
    renderCanvas()

}

function onUp() {
    //console.log('Im from onUp')
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

//Handle the listeners
function addListeners() {
    addMouseListeners()
    // addTouchListeners()
    //Listen for resize ev 
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchend', onUp)
// }



function getEvPos(ev) {

    // console.log('ev', ev)
    //Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
        //  x:ev.clientX,
        //  y:ev.clientX,

    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

//   function setDrag(isDrag) {
//     gCircle.isDrag = isDrag
//   }





// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = onImageReady.bind(null, img)
        // Can also do it this way:
        // img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}








