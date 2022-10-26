let gElCanvas
let gCtx

let gCurrShape = 'line'
let gCurrColor = 'black'
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
// var isDrag = false

var gCurrImageId

var gImgs = [
    {
        id: 1,
        url: './meme-imgs/1.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 2,
        url: './meme-imgs/2.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 3,
        url: './meme-imgs/3.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 4,
        url: './meme-imgs/4.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 5,
        url: './meme-imgs/5.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 6,
        url: './meme-imgs/6.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 7,
        url: './meme-imgs/7.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 8,
        url: './meme-imgs/8.jpg',
        keywords: ['funny', 'cat']
    },
];

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}


function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    addListeners()
    renderCanvas()
    renderImages()
    //window.addEventListener('resize', resizeCanvas)
    // click on canvas
}

function renderImages() {
    const strHTMLs = gImgs.map(image => `<img src="${image.url}" onclick="onImgClick(this)" alt="">`)
    const elgridConteiner = document.querySelector('.grid-container')
    elgridConteiner.innerHTML = strHTMLs.join('')
    //console.log('elgridConteiner.innerHTML',elgridConteiner.innerHTML)

}

function renderCanvas() {
    //Set the backgournd color to grey 
    gCtx.fillStyle = "#ede5ff"
    //Clear the canvas,  fill it with grey background
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    //renderLine()
}

function onImgClick(ev) {

    var grid = document.querySelector('.grid-container')
    grid.classList.add('hidden');

    var editpage = document.querySelector('.controller-conteiner')
    editpage.classList.remove('hidden')
    gCurrImageId = +ev.src.charAt(ev.src.length-5)
    //console.log('gCurrImageId',gCurrImageId)
    //console.log('ev.value', ev.src)
    renderMeme(gImgs[gCurrImageId-1].url)
    //startGame()
}

function renderMeme(imgSrc) {
    renderCanvas()
    renderImg(imgSrc)
    setTimeout(renderLine, 300)
    
    
}



// window.onload = function(){
//     gElCanvas = document.getElementById('my-canvas')
//     gCtx = gElCanvas.getContext('2d')

//     var imageObj = new Image();
//     imageObj.onload = function(){
//         gCtx.drawImage(imageObj, 10, 10);
//         gCtx.font = "40pt Calibri";
//         gCtx.fillText("My TEXT!", 20, 20);
//     };
//     imageObj.src = "darth-vader.jpg"; 
// };

function renderImg(imgSrc) {
    // console.log('imgSrc',imgSrc)
    base_image = new Image();
    base_image.src = imgSrc;
    base_image.onload = function () {
        gCtx.drawImage(base_image, 0, 0, gElCanvas.width, gElCanvas.height); 
    }
}


function changeLineText() {
    const top = { x: 50, y: 50 }
    const { pos, color, size } = getLine()
    const gCurrColor = document.getElementById('colorpicker').value
    
    var text = document.getElementById("myText").value
    var length = gLines.length
  //  console.log('//////////////////////////')
  //  console.log('length', length)

    if (length > 0) {
//console.log('example', gLines[length - 1].pos)
        var newPos = {
            x: gLines[length - 1].pos.x,
            y: gLines[length - 1].pos.y + 40,
        }
       // console.log('gLines[length-1]', gLines[length - 1])
//console.log('newPos', newPos)
        createLine(newPos, text, gCurrColor)
    } else {
        createLine(top, text, gCurrColor)
    }

   // console.log('//////////////////////////')
    //renderLine()
     renderMeme(gImgs[gCurrImageId-1].url)


}


function renderLine() {
    
    gLines.map(line => {
        gCtx.font = "30px Arial";
        gCtx.strokeStyle = line.color;
        // console.log('gCtx.fillStyle',gCtx.fillStyle)
        if (line.align === 'left') {
            line.pos.x = 20
        //    console.log('left')
        }
        if (line.align === 'mid') {
            line.pos.x = 250
            console.log('mid')
        }
        if (line.align === 'right') {
            line.pos.x = 400
            console.log('right')
        }
        gCtx.strokeText(line.text, line.pos.x, line.pos.y);
        // gCurrLine+=1

    })
    //drawRect(50, 50)
    //renderComp()
}








function onChoseColor() {
    //const gCurrColor = document.querySelector('.shape-choose').value
    const gCurrColor = document.getElementById('colorpicker').value
    console.log('gCurrColor', gCurrColor)
    gCurrShape = gCurrColor

}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = elContainer.offsetWidth - 20
    // Unless needed, better keep height fixed.
    // gElCanvas.height = elContainer.offsetHeight
}
function setShape(shape) {
    console.log('shape', shape)
    gCurrShape = shape
}




function onClear() {
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderCanvas()

}
// this section for clicked

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
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


function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')// image/jpeg the default format
    elLink.href = imgContent
}


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





// function onImgClick(ev) {
//     var grid = document.querySelector('.grid-container')
//     grid.classList.add('hidden');

//     var editpage = document.querySelector('.controller-conteiner')
//     editpage.classList.remove('hidden')

//     //console.log('ev.value', ev.src)
//     renderImg(ev.src)
//     //startGame()
// }






function renderComp() {
    var myGamePiece = component(30, 30, "red", 10, 120);
    console.log('myGamePiece', myGamePiece)
    myGamePiece.newPos();
    console.log('myGamePiece.newPos()', myGamePiece.newPos())
    myGamePiece.update();
    renderComp()
    console.log('HEY')
}


function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.strokeStyle = gCurrColor
    gCtx.strokeRect(x - 20, y - 20, 20, 20)
    gCtx.fillStyle = 'BLUE'
    // gCtx.fillRect(x, y, 20, 20)
    gCtx.closePath()

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


