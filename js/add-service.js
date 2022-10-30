var gCurrLine = 0

let gLines = []
//let gComponent = []

var gStickers = [
    {
        id: 1,
        url: './imgs/stickers-imgs/1.png',
    },
    {
        id: 2,
        url: './imgs/stickers-imgs/2.png',
    },
    {
        id: 3,
        url: './imgs/stickers-imgs/3.png',
    },
    {
        id: 4,
        url: './imgs/stickers-imgs/4.png',
    },
    {
        id: 5,
        url: './imgs/stickers-imgs/5.png',
    },
]

var gImgs = [
    {
        id: 1,
        url: './imgs/meme-imgs/1.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 2,
        url: './imgs/meme-imgs/2.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 3,
        url: './imgs/meme-imgs/3.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 4,
        url: './imgs/meme-imgs/4.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 5,
        url: './imgs/meme-imgs/5.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 6,
        url: './imgs/meme-imgs/6.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 7,
        url: './imgs/meme-imgs/7.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 8,
        url: './imgs/meme-imgs/8.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 9,
        url: './imgs/meme-imgs/9.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 10,
        url: './imgs/meme-imgs/10.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 11,
        url: './imgs/meme-imgs/11.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 12,
        url: './imgs/meme-imgs/12.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 13,
        url: './imgs/meme-imgs/13.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 14,
        url: './imgs/meme-imgs/14.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 15,
        url: './imgs/meme-imgs/15.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 16,
        url: './imgs/meme-imgs/16.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 17,
        url: './imgs/meme-imgs/17.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 18,
        url: './imgs/meme-imgs/18.jpg',
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



function createLine(pos, text, color) {
    gLines.push({
        pos,
        text,
        size: 60,
        align: 'left',
        color,
        isDrag: false,
        isSelected: true,
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
