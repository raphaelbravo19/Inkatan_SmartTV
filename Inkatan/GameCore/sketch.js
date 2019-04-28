var listTriangles = []
var ListPoints = [];
var widthCanvas = $(window).width() * 1;
var heightCanvas = $(window).height();
var colorsPointer = ['rgba(0, 255, 0,0.7)', 'rgba(255, 223, 46,0.7)', 'rgba(208, 23, 255,0.7)', 'rgba(255, 104, 46,0.7)']
var indicators = [{
    fi: 0,
    fj: 0
}, {
    fi: 0,
    fj: 0
}, {
    fi: 0,
    fj: 0
}, {
    fi: 0,
    fj: 0
}]

function setup() {
    var canvas = createCanvas(widthCanvas, heightCanvas);
    canvas.parent('#canvas')
    //strokeWeight(2)
    background(50)
    setPoints()

}

function draw() {
    background(50)
    stroke(0)
    strokeWeight(1)
    listTriangles.map(function (triangleItem) {
        renderTriangle(triangleItem)
    })
    drawPoint(ListPoints[indicators[turnIndex].fi][indicators[turnIndex].fj])
    //setPoints()
    //ellipse(10, 10, 2, 2)
    //point(x, y)
}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        indicators[turnIndex].fj = ListPoints[indicators[turnIndex].fi].length == indicators[turnIndex].fj + 1 ? 0 : indicators[turnIndex].fj + 1
    } else if (keyCode === UP_ARROW) {
        indicators[turnIndex].fj = 0 > indicators[turnIndex].fj - 1 ? ListPoints[indicators[turnIndex].fi].length - 1 : indicators[turnIndex].fj - 1
    } else if (keyCode === RIGHT_ARROW) {
        indicators[turnIndex].fj = ListPoints[indicators[turnIndex].fi + 1 > 8 ? 0 : indicators[turnIndex].fi + 1].length == indicators[turnIndex].fj ? indicators[turnIndex].fj - 1 : indicators[turnIndex].fj
        indicators[turnIndex].fi = indicators[turnIndex].fi + 1 > 8 ? 0 : indicators[turnIndex].fi + 1
    } else if (keyCode === LEFT_ARROW) {
        indicators[turnIndex].fj = ListPoints[indicators[turnIndex].fi - 1 < 0 ? 8 : indicators[turnIndex].fi - 1].length == indicators[turnIndex].fj ? indicators[turnIndex].fj - 1 : indicators[turnIndex].fj
        indicators[turnIndex].fi = indicators[turnIndex].fi - 1 < 0 ? 8 : indicators[turnIndex].fi - 1
    }

}



function MovePointer(val) {

    if (val === 'down') {
        indicators[turnIndex].fj = ListPoints[indicators[turnIndex].fi].length == indicators[turnIndex].fj + 1 ? 0 : indicators[turnIndex].fj + 1
    } else if (val === 'up') {
        indicators[turnIndex].fj = 0 > indicators[turnIndex].fj - 1 ? ListPoints[indicators[turnIndex].fi].length - 1 : indicators[turnIndex].fj - 1
    } else if (val === 'right') {

        indicators[turnIndex].fj = ListPoints[indicators[turnIndex].fi + 1 > 8 ? 0 : indicators[turnIndex].fi + 1].length == indicators[turnIndex].fj ? indicators[turnIndex].fj - 1 : indicators[turnIndex].fj
        indicators[turnIndex].fi = indicators[turnIndex].fi + 1 > 8 ? 0 : indicators[turnIndex].fi + 1
    } else if (val === 'left') {
        indicators[turnIndex].fj = ListPoints[indicators[turnIndex].fi - 1 < 0 ? 8 : indicators[turnIndex].fi - 1].length == indicators[turnIndex].fj ? indicators[turnIndex].fj - 1 : indicators[turnIndex].fj
        indicators[turnIndex].fi = indicators[turnIndex].fi - 1 < 0 ? 8 : indicators[turnIndex].fi - 1
    }
}
var resources = [{
    type: 'stone',
    color: 'gray',
    cant: 8
}, {
    type: 'wool',
    color: 'white',
    cant: 8
}, {
    type: 'potatoes',
    color: 'rgb(226,163,97)',
    cant: 8
}, {
    type: 'quinoa',
    color: 'rgb(252,236,177)',
    cant: 8
}, {
    type: 'gold',
    color: '#FFD700',
    cant: 8
}, {
    type: 'wood',
    color: 'rgb(102,51,0)',
    cant: 8
}]
var numberTags = [{
        tag: 1,
        cant: 4
    },
    {
        tag: 2,
        cant: 4
    },
    {
        tag: 3,
        cant: 4
    },
    {
        tag: 4,
        cant: 4
    },
    {
        tag: 5,
        cant: 4
    },
    {
        tag: 6,
        cant: 4
    },
    {
        tag: 7,
        cant: 4
    },
    {
        tag: 8,
        cant: 4
    },
    {
        tag: 9,
        cant: 4
    },
    {
        tag: 10,
        cant: 4
    },
    {
        tag: 11,
        cant: 4
    },
    {
        tag: 12,
        cant: 4
    }
]
var mapDelimit = widthCanvas * 0.7 * 0.9
var paddingLeft = widthCanvas * 0.37 / 2
var centerMapH = heightCanvas / 2
var hTriangle = mapDelimit / 8
var sideTriangle = hTriangle * 2 / Math.sqrt(3)

function setPoints() {

    for (var index = 0; index < 9; index++) {
        var delimitPoints = 6 - Math.abs(4 - index)
        var startPoint =
            centerMapH - ((delimitPoints - 1) * sideTriangle / 2)
        ListPoints.push([])
        for (var j = 0; j < delimitPoints; j++) {
            var fx = paddingLeft + (index * hTriangle);
            var fy = startPoint + (j * sideTriangle);
            /*var itemVertex = new verticeClass({
                x: fx,
                y: fy
            })*/
            ListPoints[index].push({
                posx: fx,
                posy: fy
            })
        }

    }
    var triangleTemp;
    var tempListPoints;
    var typeSuy;
    var resColor;
    var resCor;
    ListPoints.map(function (arrayPoints, i) {
        //console.log(i)
        arrayPoints.map(function (itemPoint, j) {
            //itemPoint.draw()
            //console.log(j)

            if (i > 0) {
                //do {

                //typeSuy = i <= 4 ? j < (arrayPoints.length / 2) - 1 ? 50 : 100 : j < (arrayPoints.length / 2) - 1 ? 250 : 150
                if (j < arrayPoints.length - 1) {
                    resColor = Math.floor(Math.random() * resources.length);
                    //} while (resources[resColor].cant == 0);
                    resources[resColor].cant = resources[resColor].cant - 1

                    resCor = resources[resColor].color
                    if (resources[resColor].cant == 0) {
                        resources = resources.filter(function (itemToDel, iDel) {
                            return iDel != resColor
                        })
                        // console.log(resources)
                    }
                    tempListPoints = [ListPoints[i - 1][(i <= 4 ? j : j + 1)], ListPoints[i][j], ListPoints[i][j + 1]]
                    //triangleTemp = new section(tempListPoints, resCor)
                    //triangleTemp.render()
                    var intTemp = Math.floor(Math.random() * numberTags.length);
                    numberTags[intTemp].cant = numberTags[intTemp].cant - 1
                    var tagSelected = numberTags[intTemp]
                    if (numberTags[intTemp].cant == 0) {
                        numberTags = numberTags.filter(function (iDel) {
                            return iDel != intTemp
                        })
                        // console.log(resources)
                    }
                    listTriangles.push({
                        vertex: tempListPoints,
                        background: resCor,
                        number: tagSelected.tag
                    })
                }

            }
            if (i < 8) {
                //do {

                //typeSuy = i < 4 ? j < (arrayPoints.length / 2) - 1 ? 50 : 100 : j < (arrayPoints.length / 2) - 1 ? 250 : 150
                if (j < arrayPoints.length - 1) {
                    resColor = Math.floor(Math.random() * resources.length);
                    //  console.log(resColor)
                    //} while (resources[resColor].cant == 0);
                    resources[resColor].cant = resources[resColor].cant - 1

                    resCor = resources[resColor].color
                    if (resources[resColor].cant == 0) {
                        resources = resources.filter(function (itemToDel, iDel) {
                            return iDel != resColor
                        })
                        //console.log(resources)
                    }
                    tempListPoints = [ListPoints[i][j], ListPoints[i + 1][(i <= 3 ? j + 1 : j)], ListPoints[i][j + 1]]
                    //triangleTemp = new section(tempListPoints, resCor)
                    //triangleTemp.render()
                    listTriangles.push({
                        vertex: tempListPoints,
                        background: resCor,
                        number: 6
                    })
                }

            }
        })
    })
}

function drawPoint(objPoint) {
    stroke('rgba(255,255,255,0.7)')
    strokeWeight(5)
    fill(colorsPointer[turnIndex])
    ellipse(objPoint.posx, objPoint.posy, 35, 35)
}

function renderTriangle(objTriangle) {
    fill(objTriangle.background)
    triangle(objTriangle.vertex[0].posx,
        objTriangle.vertex[0].posy,
        objTriangle.vertex[1].posx,
        objTriangle.vertex[1].posy,
        objTriangle.vertex[2].posx,
        objTriangle.vertex[2].posy)
    var posNumberx = objTriangle.vertex[0].posx + (objTriangle.vertex[1].posx - objTriangle.vertex[0].posx) / 2
    var posNumbery = objTriangle.vertex[2].posx == objTriangle.vertex[1].posx ? objTriangle.vertex[0].posy : objTriangle.vertex[1].posy
    textAlign(CENTER, CENTER);
    noStroke()
    fill('rgba(0,0,0,0.4)')
    ellipse(posNumberx + (hTriangle * 0.025), posNumbery + (hTriangle * 0.025), hTriangle * 0.35, hTriangle * 0.35)
    fill('lightgrey')
    stroke('rgba(0,0,0,0.7)')
    ellipse(posNumberx, posNumbery, hTriangle * 0.35, hTriangle * 0.35)
    fill('black')
    textSize((hTriangle * 0.2));
    text(objTriangle.number, posNumberx, posNumbery)
    //text(100, 0, 0)
}
/*class verticeClass {
    constructor(coord) {

        this.posx = coord.x;
        this.posy = coord.y;
    }
    draw() {

        stroke('rgba(255,255,255,0.7)')
        strokeWeight(5)
        fill('rgba(200,200,255,0.7)')
        ellipse(this.posx, this.posy, 35, 35)
    }
}
class artista {
    constructor(dots) {
        this.start = dots.start;
        this.end = dots.end;
    }
}
class section {
    constructor(pvertex, type) {
        this.vertex = pvertex
        this.background = type
    }
    render() {
        fill(this.background)
        triangle(this.vertex[0].posx,
            this.vertex[0].posy,
            this.vertex[1].posx,
            this.vertex[1].posy,
            this.vertex[2].posx,
            this.vertex[2].posy)
    }
}*/