var listTriangles = []
var ListPoints = [];
var ListAristas = [
    [null],
    [null, null, null, null],
    [null, null],
    [null, null, null, null, null, null],
    [null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null],
    [null, null, null, null, null, null],
    [null, null],
    [null, null, null, null],
    [null],
];
var widthCanvas = $(window).width() * 1;
var statusSelected = ''
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
var indicatorTriangle = [
    {
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
var indicatorArista = [
    {
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
    cant: 8,
    icon:{}
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
var numberTags = [
    {
        tag: 2,
        cant: 5
    },
    {
        tag: 3,
        cant: 5
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
        cant: 5
    },
    {
        tag: 12,
        cant: 5
    }
]
var mapDelimit = widthCanvas * 0.65
var paddingLeft = widthCanvas * 0.35 / 2
var centerMapH = heightCanvas / 2
var hTriangle = mapDelimit / 8
var sideTriangle = hTriangle * 2 / Math.sqrt(3)
var statusSelection = ['vertex','arista','section']
var statusSelectedIndex = -1
var statusSelected = statusSelection[statusSelectedIndex]
var PlayersDetails = []

var dice=[0,0]
var listHouse=[]
var listWays=[]
var listKnight=[]
var players;
var img;

/* INITIAL SELECTION = START

*/
var GAMESTATUS = "START"
function preload() {
  img = loadImage('grass_pattern.jpg');
  resources[2].icon.left = loadImage('potatoes_left.png');
  resources[2].icon.right = loadImage('potatoes.png');
  console.log(resources)
  
}
function setup() {
    var canvas = createCanvas(widthCanvas, heightCanvas);
    canvas.parent('#canvas')
    background(150,150,255)
    players=ActualParameters.namesPlayers.split(',')
    setPlayer()
    setPoints()
}
function setPlayer(){
    players.map(function(player){
        PlayersDetails.push(
            {
                name: player,
                houses:[],
                resources:{
                    stone:0,
                    wool:0,
                    potatoes:0,
                    quinoa:0,
                    gold:0,
                    wood:0,
                }
            }
        )
    })
    
}
function draw() {
    
    image(img, 0,0,widthCanvas/2,heightCanvas/2)
    image(img, widthCanvas/2,0,widthCanvas/2,heightCanvas/2)
    image(img, 0,heightCanvas/2,widthCanvas/2,heightCanvas/2)
    image(img, widthCanvas/2,heightCanvas/2,widthCanvas/2,heightCanvas/2)
    stroke(0)
    strokeWeight(1)
    listTriangles.map(function (triangleItem) {

        renderTriangle(triangleItem, ((statusSelected == "section" && triangleItem.index_i == indicatorTriangle[turnIndex].fi && triangleItem.index_j == indicatorTriangle[turnIndex].fj)))

    })
    listHouse.map(function(item){
        drawHouse(item)
    })
    listWays.map(function(item){
        drawWays(item)
    })
    if (statusSelected == "vertex") {
        //console.log(ListPoints[indicators[turnIndex].fi][indicators[turnIndex].fj].id)
        drawPoint(ListPoints[indicators[turnIndex].fi][indicators[turnIndex].fj])
    }
    if (statusSelected == "arista") {
        //console.log(indicatorArista[turnIndex])
        drawArista(ListAristas[indicatorArista[turnIndex].fi][indicatorArista[turnIndex].fj])
    }
    if(dice[0]!=0){
        drawDice()
    }
    STATUS_PROCESS(GAMESTATUS)
}

//10-|7-(i*2)|
//WITH KEYBOARD
function keyPressed() {
    console.log(keyCode)
    if (keyCode === DOWN_ARROW) {
        MovePointer("down")
    } else if (keyCode === UP_ARROW) {
        MovePointer("up")
    } else if (keyCode === RIGHT_ARROW) {
        MovePointer("right")
    } else if (keyCode === LEFT_ARROW) {
        MovePointer("left")
    }else if( key==='d'){
        throwDice()
    }else if( keyCode===32){
        setObjectPoint()
    }
    else if( keyCode===81){
        console.log(statusSelected)
        statusSelectedIndex=statusSelectedIndex==2?0:statusSelectedIndex+1
        statusSelected=statusSelection[statusSelectedIndex]
    }
    

}
//WITH PHONE
function MovePointer(val) {

    if (val === 'down') {
        if (statusSelected == "vertex") {
            indicators[turnIndex].fj = ListPoints[indicators[turnIndex].fi].length == indicators[turnIndex].fj + 1 ? 0 : indicators[turnIndex].fj + 1
        } else if (statusSelected == "section") {
            indicatorTriangle[turnIndex].fj = indicatorTriangle[turnIndex].fj == (9 - Math.abs(7 - (2 * indicatorTriangle[turnIndex].fi))) ? 0 : indicatorTriangle[turnIndex].fj + 1
        } else if (statusSelected == "arista") {
            indicatorArista[turnIndex].fj = indicatorArista[turnIndex].fj == ListAristas[indicatorArista[turnIndex].fi].length - 1 ? 0 : indicatorArista[turnIndex].fj + 1
        }
    } else if (val === 'up') {
        if (statusSelected == "vertex") {
            indicators[turnIndex].fj = 0 > indicators[turnIndex].fj - 1 ? ListPoints[indicators[turnIndex].fi].length - 1 : indicators[turnIndex].fj - 1
        } else if (statusSelected == "section") {
            indicatorTriangle[turnIndex].fj = indicatorTriangle[turnIndex].fj == 0 ? (9 - Math.abs(7 - (2 * indicatorTriangle[turnIndex].fi))) : indicatorTriangle[turnIndex].fj - 1
        } else if (statusSelected == "arista") {
            indicatorArista[turnIndex].fj = indicatorArista[turnIndex].fj == 0 ? ListAristas[indicatorArista[turnIndex].fi].length - 1 : indicatorArista[turnIndex].fj - 1
        }
    } else if (val === 'right') {

        if (statusSelected == "vertex") {
            indicators[turnIndex].fj = ListPoints[indicators[turnIndex].fi + 1 > 8 ? 0 : indicators[turnIndex].fi + 1].length == indicators[turnIndex].fj ? indicators[turnIndex].fj - 1 : indicators[turnIndex].fj
            indicators[turnIndex].fi = indicators[turnIndex].fi + 1 > 8 ? 0 : indicators[turnIndex].fi + 1
        } else if (statusSelected == "section") {
            var fiTemp = indicatorTriangle[turnIndex].fi
            var fjTemp = indicatorTriangle[turnIndex].fj

            indicatorTriangle[turnIndex].fj = fjTemp + (fiTemp == 7 ? 0 : fiTemp == 3 ? 0 : fiTemp > 3 ? -1 : 1)
            indicatorTriangle[turnIndex].fi = fiTemp == 7 ? 7 - fiTemp : fiTemp + 1
            var cantNext = 9 - Math.abs(7 - (2 * (indicatorTriangle[turnIndex].fi)))

            indicatorTriangle[turnIndex].fj = indicatorTriangle[turnIndex].fj < 0 ? 0 : indicatorTriangle[turnIndex].fj > cantNext ? cantNext : indicatorTriangle[turnIndex].fj
        } else if (statusSelected == "arista") {
            var fiTemp = indicatorArista[turnIndex].fi
            var fjTemp = indicatorArista[turnIndex].fj

            indicatorArista[turnIndex].fj = fiTemp == 16 ? 0 : fiTemp % 2 == 0 ? indicatorArista[turnIndex].fj * 2 + 1 : fjTemp == 0 ? 0 : fjTemp == ListAristas[fiTemp].length - 1 ? ListAristas[fiTemp + 1].length - 1 : fjTemp % 2 == 0 ? fjTemp / 2 - (fiTemp >= 8 ? 1 : 0) : ((fjTemp - 1) / 2)
            indicatorArista[turnIndex].fi = fiTemp == 16 ? 0 : fiTemp + 1
        }
    } else if (val === 'left') {
        if (statusSelected == "vertex") {
            indicators[turnIndex].fj = ListPoints[indicators[turnIndex].fi - 1 < 0 ? 8 : indicators[turnIndex].fi - 1].length == indicators[turnIndex].fj ? indicators[turnIndex].fj - 1 : indicators[turnIndex].fj
            indicators[turnIndex].fi = indicators[turnIndex].fi - 1 < 0 ? 8 : indicators[turnIndex].fi - 1
        } else if (statusSelected == "section") {
            var fiTemp = indicatorTriangle[turnIndex].fi
            var fjTemp = indicatorTriangle[turnIndex].fj

            indicatorTriangle[turnIndex].fj = fjTemp + (fiTemp == 0 ? 0 : fiTemp == 4 ? 0 : fiTemp < 4 ? -1 : 1)
            indicatorTriangle[turnIndex].fi = fiTemp == 0 ? 7 : fiTemp - 1
            var cantNext = 9 - Math.abs(7 - (2 * (indicatorTriangle[turnIndex].fi)))

            indicatorTriangle[turnIndex].fj = indicatorTriangle[turnIndex].fj < 0 ? 0 : indicatorTriangle[turnIndex].fj > cantNext ? cantNext : indicatorTriangle[turnIndex].fj
        } else if (statusSelected == "arista") {
            var fiTemp = indicatorArista[turnIndex].fi
            var fjTemp = indicatorArista[turnIndex].fj

            indicatorArista[turnIndex].fj = fiTemp == 0 ? 0 : fiTemp % 2 == 0 ? indicatorArista[turnIndex].fj * 2 + 1 : fjTemp == 0 ? 0 : fjTemp == ListAristas[fiTemp].length - 1 ? ListAristas[fiTemp - 1].length - 1 : fjTemp % 2 == 0 ? fjTemp / 2 - (fiTemp >= 8 ? 0 : 1) : ((fjTemp - 1) / 2) //(fiTemp < 8 ? 1 : 0)
            indicatorArista[turnIndex].fi = fiTemp == 0 ? 16 : fiTemp - 1
        }
    }
}
function setObjectPoint(){
    var addItem={}
    var listIt
    if(statusSelected==='vertex'){
        listIt=listHouse
        addItem.context=ListPoints[indicators[turnIndex].fi][indicators[turnIndex].fj]
        addItem.colorIndex=colorsPointer[turnIndex]
        addItem.player= players[turnIndex]
        addItem.type='house'
        var validate=true
        
        listIt.map(function(vertexElement,iter){
            console.log(vertexElement,'-',addItem)
            if(vertexElement.context==addItem.context){
                if(vertexElement.type=='house' && vertexElement.colorIndex==addItem.colorIndex){
                    validate=false
                    //listHouse[iter].type='bighouse'
                    //BIGHOUSE PENDING
                }else{
                    validate=false
                }
            }
        })
        if(validate){
            listHouse.push(addItem)
        
            PlayersDetails[turnIndex].houses.push(addItem)
            if(GAMESTATUS=="START" && PlayersDetails[turnIndex].houses.length==1) PaseTurno()
        }   

    }
    if(statusSelected==='arista'){
        listIt=listWays
        addItem.context=ListAristas[indicatorArista[turnIndex].fi][indicatorArista[turnIndex].fj]
        addItem.colorIndex=colorsPointer[turnIndex]
        var validate=true
        
        listIt.map(function(vertexElement,iter){
            //console.log(vertexElement,'-',addItem)
            if(vertexElement.context[0].id==addItem.context[0].id&&vertexElement.context[1].id==addItem.context[1].id){
                
                    validate=false
            }
        })
        if(validate){
        listWays.push(addItem)
        }
        //list.push(ListPoints[indicators[turnIndex].fi][indicators[turnIndex].fj])

    }
}
function drawHouse(house){
    var typeIs=house.type=='house'
    fill(house.colorIndex)
    rect(house.context.posx-(typeIs?15:20),house.context.posy-(typeIs?15:20),(typeIs?30:40),(typeIs?30:40))
}
function drawWays(way){
    fill(way.colorIndex)
    
    var angulo = Math.atan((way.context[1].posy - way.context[0].posy) / (way.context[1].posx - way.context[0].posx))
    push()
    translate((way.context[0].posx + way.context[1].posx) / 2, (way.context[0].posy + way.context[1].posy) / 2)
    rotate(angulo)
    //console.log(ind, ind2)
    //line(objLine[0].posx, objLine[0].posy, objLine[1].posx, objLine[1].posy)
    //text(angulo, (objLine[0].posx + objLine[1].posx) / 2, (objLine[0].posy + objLine[1].posy) / 2)
    rect(-sideTriangle*0.6/2, -7.5, sideTriangle*0.6, 15,3,3,3,3)
    //image(img,-sideTriangle*0.6/2, -15, sideTriangle*0.6, 30)
    pop()
}
// CONFIGURATE MAP
function setPoints() {

    for (var index = 0; index < 9; index++) {
        var delimitPoints = 6 - Math.abs(4 - index)
        var startPoint =
            centerMapH - ((delimitPoints - 1) * sideTriangle / 2)
        ListPoints.push([])
        for (var j = 0; j < delimitPoints; j++) {
            var fx = paddingLeft + (index * hTriangle);
            var fy = startPoint + (j * sideTriangle);

            ListPoints[index].push({
                id:'p'+index+'-'+j,
                posx: fx,
                posy: fy
            })
        }

    }
    var tempListPoints;
    var resColor;
    var resCor;
    var resType;
    var part;
    var resIcon;
    var intTemp;
    var tagSelected
    ListPoints.map(function (arrayPoints, i) {

        arrayPoints.map(function (itemPoint, j) {
            if (i > 0) {
                if (j < arrayPoints.length - 1) {
                    resColor = Math.floor(Math.random() * resources.length);
                    resources[resColor].cant = resources[resColor].cant - 1

                    resCor = resources[resColor].color
                    resType = resources[resColor].type
                    resIcon= resources[resColor].icon?resources[resColor].icon.left:null
                    if (resources[resColor].cant == 0) {
                        resources = resources.filter(function (itemToDel, iDel) {
                            return iDel != resColor
                        })
                    }
                    tempListPoints = [ListPoints[i - 1][(i <= 4 ? j : j + 1)], ListPoints[i][j], ListPoints[i][j + 1]]
                    
                    intTemp = Math.floor(Math.random() * numberTags.length);
                    numberTags[intTemp].cant = numberTags[intTemp].cant - 1
                    
                    console.log(numberTags[intTemp].tag,'-',numberTags[intTemp].cant)
                    tagSelected = numberTags[intTemp]
                    if (numberTags[intTemp].cant == 0) {
                        
                        numberTags = numberTags.filter(function (itemToDel,ind) {
                            return ind != intTemp
                        })
                    }
                    
                    listTriangles.push({
                        vertex: tempListPoints,
                        background: resCor,
                        number: tagSelected.tag,
                        resource:resType,
                        icon:resIcon,
                        orientation:'left',
                        index_i: i - 1,
                        index_j: i <= 4 ? j * 2 : (j * 2) + 1
                    })


                    part = (i) * 2
                    ListAristas[part][j] = [ListPoints[i][j], ListPoints[i][j + 1]]
                    if (i <= 4) {
                        ListAristas[part - 1][(2 * j) + 1] = [ListPoints[i - 1][(i <= 4 ? j : j + 1)], ListPoints[i][j + 1]]
                        ListAristas[part - 1][(2 * j)] = [ListPoints[i - 1][(i <= 4 ? j : j + 1)], ListPoints[i][j]]
                    }
                }

            }
            if (i < 8) {
                if (j < arrayPoints.length - 1) {
                    resColor = Math.floor(Math.random() * resources.length);
                    resources[resColor].cant = resources[resColor].cant - 1

                    resCor = resources[resColor].color
                    resType = resources[resColor].type
                    resIcon= resources[resColor].icon?resources[resColor].icon.right:null
                    if (resources[resColor].cant == 0) {
                        resources = resources.filter(function (itemToDel, iDel) {
                            return iDel != resColor
                        })
                    }
                    tempListPoints = [ListPoints[i][j], ListPoints[i + 1][(i <= 3 ? j + 1 : j)], ListPoints[i][j + 1]]
                    intTemp = Math.floor(Math.random() * numberTags.length);
                    numberTags[intTemp].cant = numberTags[intTemp].cant - 1
                    tagSelected = numberTags[intTemp]
                    if (numberTags[intTemp].cant == 0) {
                        numberTags = numberTags.filter(function (item2Del,ind) {
                            return ind != intTemp
                        })
                    }
                    listTriangles.push({
                        vertex: tempListPoints,
                        background: resCor,
                        resource:resType,
                        number: tagSelected.tag,
                        icon:resIcon,
                        orientation:'right',
                        index_i: i,
                        index_j: i < 4 ? (j * 2) + 1 : j * 2
                    })
                    part = (i) * 2
                    ListAristas[part][j] = [ListPoints[i][j], ListPoints[i][j + 1]]
                    if (i >= 4) {
                        ListAristas[part + 1][(2 * j) + 1] = [ListPoints[i + 1][(i <= 3 ? j + 1 : j)], ListPoints[i][j + 1]]
                        ListAristas[part + 1][(2 * j)] = [ListPoints[i + 1][(i <= 3 ? j + 1 : j)], ListPoints[i][j]]
                    }

                }

            }
        })
    })
}

function throwDice() {
    //fill('white')
    dice=[(Math.floor(Math.random() * 10000)%6)+1,(Math.floor(Math.random() * 10000)%6)+1]
    var trianglesSelected=listTriangles.filter(function(item){return item.number==dice[0]+dice[1]})
    var vertexCodes={}
    trianglesSelected.map(function(item){
        item.vertex.map(function(vertex){
            if(vertexCodes[vertex.id]){
                vertexCodes[vertex.id][item.resource]=vertexCodes[vertex.id][item.resource]?
                vertexCodes[vertex.id][item.resource]+1:1
            }else{
                vertexCodes[vertex.id]={}
                vertexCodes[vertex.id][item.resource]=1
            }
        })
    })
    console.log(vertexCodes)
    var giveResource={}
    listHouse.map(function(house){
        var include=vertexCodes[house.context.id]!=null
        if(include){
            if(!giveResource[house.player]){
                giveResource[house.player]={}
            }
            //Object.
            console.log(vertexCodes[house.context.id])
                var asignedResources= entries(vertexCodes[house.context.id])
                asignedResources.map(function(res){
                   giveResource[house.player][res[0]]=giveResource[house.player][res[0]]?giveResource[house.player][res[0]]+res[1]:res[1]
                })
            //}else{
                //giveResource[house.player]=[]
           // }
           // giveResource[house.player].push(vertexCodes[house.context.id])
        }
        
    })
    console.log(giveResource)
    var temStr=''
    
    entries(giveResource).map(function(item){
        temStr=temStr+item[0]+ ' '
        entries(item[1]).map(function(asign){
            if(asign[1]>0){
                temStr=temStr+asign[1].toString()+' '+asign[0]+' '
            }
        })
        temStr+="\n"
    })
    strDeal=temStr
    //rect(paddingLeft, heightCanvas - 100, 80, 80)
}
var diceSide=hTriangle*0.9
function entries(valueObject){
    var newObj=[]
    for(key in valueObject){
        newObj.push([key, valueObject[key]])

    }
    return newObj;

}
function drawDice() {
    fill('white')
    //dice=[5,5]

    rect(paddingLeft, heightCanvas - (diceSide*1.5), diceSide, diceSide,5,5,5,5)
    rect(paddingLeft+(diceSide*1.2), heightCanvas - (diceSide*1.5), diceSide, diceSide,5,5,5,5)
    //text(str, x, y, x2, y2)
    stroke(0)
    fill(0)
    drawPointDice(dice[0],0)
    drawPointDice(dice[1],1)
    //text(dice[0],paddingLeft+50,heightCanvas - 100 )
    //text(dice[1],paddingLeft+170,heightCanvas - 100 )
    
}
function drawPointDice(value,index){
    fill(0)
    var pointD=diceSide*0.2
    switch(value){
        case 1: ellipse(paddingLeft+(index==0?(diceSide*0.5):(diceSide*1.7)),heightCanvas - diceSide,pointD,pointD); break;
        case 2: ellipse(paddingLeft+(index==0?(diceSide*0.25):(diceSide*1.45)),heightCanvas - (diceSide*1.25),pointD,pointD); 
                ellipse(paddingLeft+(index==0?(diceSide*0.75):(diceSide*1.95)),heightCanvas - (diceSide*0.75),pointD,pointD); 
                break;
        case 3: ellipse(paddingLeft+(index==0?(diceSide*0.25):(diceSide*1.45)),heightCanvas - (diceSide*1.25),pointD,pointD); 
                ellipse(paddingLeft+(index==0?(diceSide*0.5):(diceSide*1.7)),heightCanvas - diceSide,pointD,pointD);
                ellipse(paddingLeft+(index==0?(diceSide*0.75):(diceSide*1.95)),heightCanvas - (diceSide*0.75),pointD,pointD); 
                break;
        case 4: ellipse(paddingLeft+(index==0?(diceSide*0.25):(diceSide*1.45)),heightCanvas - (diceSide*1.25),pointD,pointD); 
                ellipse(paddingLeft+(index==0?(diceSide*0.75):(diceSide*1.95)),heightCanvas - (diceSide*0.75),pointD,pointD);
                ellipse(paddingLeft+(index==0?(diceSide*0.25):(diceSide*1.45)),heightCanvas - (diceSide*0.75),pointD,pointD); 
                ellipse(paddingLeft+(index==0?(diceSide*0.75):(diceSide*1.95)),heightCanvas - (diceSide*1.25),pointD,pointD);  
                break;
        case 5: ellipse(paddingLeft+(index==0?(diceSide*0.25):(diceSide*1.45)),heightCanvas - (diceSide*1.25),pointD,pointD); 
                ellipse(paddingLeft+(index==0?(diceSide*0.75):(diceSide*1.95)),heightCanvas - (diceSide*0.75),pointD,pointD);
                ellipse(paddingLeft+(index==0?(diceSide*0.5):(diceSide*1.7)),heightCanvas - diceSide,pointD,pointD);
                ellipse(paddingLeft+(index==0?(diceSide*0.25):(diceSide*1.45)),heightCanvas - (diceSide*0.75),pointD,pointD); 
                ellipse(paddingLeft+(index==0?(diceSide*0.75):(diceSide*1.95)),heightCanvas - (diceSide*1.25),pointD,pointD);
                break;
        case 6: ellipse(paddingLeft+(index==0?(diceSide*0.25):(diceSide*1.45)),heightCanvas - (diceSide*1.30),pointD,pointD); 
                ellipse(paddingLeft+(index==0?(diceSide*0.75):(diceSide*1.95)),heightCanvas - (diceSide*0.70),pointD,pointD);
                ellipse(paddingLeft+(index==0?(diceSide*0.25):(diceSide*1.45)),heightCanvas - (diceSide*0.70),pointD,pointD); 
                ellipse(paddingLeft+(index==0?(diceSide*0.75):(diceSide*1.95)),heightCanvas - (diceSide*1.30),pointD,pointD);
                ellipse(paddingLeft+(index==0?(diceSide*0.25):(diceSide*1.45)),heightCanvas - diceSide,pointD,pointD); 
                ellipse(paddingLeft+(index==0?(diceSide*0.75):(diceSide*1.95)),heightCanvas - diceSide,pointD,pointD);
                break;
    }
}
function drawPoint(objPoint) {
    stroke('rgba(255,255,255,0.7)')
    strokeWeight(5)
    fill(colorsPointer[turnIndex])
    ellipse(objPoint.posx, objPoint.posy, 35, 35)
}

function drawArista(objLine, ind, ind2) {
    //stroke('red')
    //strokeWeight(5)
    stroke('rgba(255,255,255,0.7)')
    strokeWeight(3)
    fill(colorsPointer[turnIndex])
    //var angulo = Math.atan((objLine[1].posy - objLine[0].posy) / (objLine[1].posx - objLine[0].posx))
    //translate(0, 0)
    //console.log(ind, ind2)
    //line(objLine[0].posx, objLine[0].posy, objLine[1].posx, objLine[1].posy)
    //text(angulo, (objLine[0].posx + objLine[1].posx) / 2, (objLine[0].posy + objLine[1].posy) / 2)
    ellipse((objLine[0].posx + objLine[1].posx) / 2, (objLine[0].posy + objLine[1].posy) / 2, 20, 20)

    //text(angulo, (objLine[0].posx + objLine[1].posx) / 2, (objLine[0].posy + objLine[1].posy) / 2)
}

function renderTriangle(objTriangle, selected) {
    
    fill(selected ? colorsPointer[turnIndex] : objTriangle.background)
    triangle(objTriangle.vertex[0].posx,
        objTriangle.vertex[0].posy,
        objTriangle.vertex[1].posx,
        objTriangle.vertex[1].posy,
        objTriangle.vertex[2].posx,
        objTriangle.vertex[2].posy)
    var posNumberx = (objTriangle.vertex[2].posx == objTriangle.vertex[1].posx ?objTriangle.vertex[1].posx- (sideTriangle* Math.sqrt(3)/6):objTriangle.vertex[0].posx+ (sideTriangle* Math.sqrt(3)/6)) //(objTriangle.vertex[1].posx - objTriangle.vertex[0].posx) / 2
    var posNumbery = objTriangle.vertex[2].posx == objTriangle.vertex[1].posx ? objTriangle.vertex[0].posy : objTriangle.vertex[1].posy
    var menPosx=objTriangle.vertex[0].posx;
    var menPosy= objTriangle.vertex[0].posy<objTriangle.vertex[1].posy?
    objTriangle.vertex[0].posy<objTriangle.vertex[2].posy?objTriangle.vertex[0].posy:
    objTriangle.vertex[2].posy:objTriangle.vertex[1].posy<objTriangle.vertex[2].posy?objTriangle.vertex[1].posy:objTriangle.vertex[2].posy
    
    if(objTriangle.icon!=null){
        image(objTriangle.icon, menPosx, menPosy,hTriangle,sideTriangle)
    }
    textAlign(CENTER, CENTER);
   
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
function FIRST_ASIGN(turn){
    var player=PlayersDetails[turn]
    var houses= player.houses
        var houseId= houses[1].context.id
        listTriangles.filter(function(trl){
            return (
                trl.vertex[0].id==houseId||
                trl.vertex[1].id==houseId||
                trl.vertex[2].id==houseId)
        }).map(function(trl){
            PlayersDetails[turn].resources[trl.resource]=PlayersDetails[turn].resources[trl.resource]+1
        })
        
    
    
    console.log(PlayersDetails)
}
function STATUS_PROCESS(status){
    
    if(status==="START"){
        START_PROCESS()
    }else if(status==="ASIGN"){
        ASIGN_PROCESS()
    }else if(status==="DEAL"){
        DEAL_PROCESS()
    }else if(status==="ROUND"){
        ROUND_PROCESS()
    }
    
    
}


var pendingConfig =true

function START_PROCESS(){
    if(pendingConfig){
        statusSelectedIndex=0
        statusSelected = statusSelection[statusSelectedIndex]
        pendingConfig=false
    }
    if(PlayersDetails[turnIndex].houses.length==2){
        FIRST_ASIGN(turnIndex)
        
        if(turnIndex==PlayersDetails.length-1){
            alert(1)
            statusSelectedIndex=-1
            statusSelected = statusSelection[statusSelectedIndex]
            GAMESTATUS="ASIGN"
            pendingConfig=true
        }else{
            
            PaseTurno()
        }
        
    }
}
function ASIGN_PROCESS(){
    if(pendingConfig){
        FIRST_ASIGN()
        GAMESTATUS="DEAL"
    }
}
var strDeal=""
var detSize=0
var det=1
function DEAL_PROCESS(){
    if(pendingConfig){
        PlayersDetails.map(function(player){
            strDeal=strDeal+player.name+ ' '
            entries(player.resources).map(function(res){
                if(res[1]>0){
                    strDeal=strDeal+res[1].toString()+' '+res[0]+' '
                }
            })
            strDeal+="\n"
        })
        pendingConfig=false
        setTimeout(function(){
            PaseTurno()
            strDeal=''
            detSize=0
            det=1
            pendingConfig=true
            GAMESTATUS="ROUND"
        },2000)
    }
    
    detSize+=det;
    if(detSize>50) det=-1

    if(detSize==0) det=1
    stroke(255)
    strokeWeight(2)
    fill(0)
    textStyle(BOLD)
    textSize(heightCanvas*(0.06+(0.00005*detSize)))
    textAlign(CENTER, CENTER)
    text(strDeal, widthCanvas/2,heightCanvas/2)

}
var movement=false

function ROUND_PROCESS(){
    if(pendingConfig){
        if(strDeal!=''){
            pendingConfig=false
            movement=true
            setTimeout(function(){
                movement=false
                pendingConfig=true
                strDeal=''
                PaseTurno()
            },2000)
        }
    }
    if(movement){
        detSize+=det;
        if(detSize>50) det=-1

        if(detSize==0) det=1
        stroke(255)
        strokeWeight(2)
        fill(0)
        textStyle(BOLD)
        textSize(heightCanvas*(0.06+(0.00005*detSize)))
        textAlign(CENTER, CENTER)
        text(strDeal, widthCanvas/2,heightCanvas/2)
    }
}