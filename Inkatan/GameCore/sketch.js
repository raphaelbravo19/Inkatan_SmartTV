var widthCanvas = $(window).width() * 1;
var heightCanvas = $(window).height();

var colorsPointer = ['rgba(0, 255, 0,0.7)', 'rgba(255, 223, 46,0.7)', 'rgba(208, 23, 255,0.7)', 'rgba(255, 104, 46,0.7)']

var mapDelimit = widthCanvas * 0.65
var paddingLeft = widthCanvas * 0.35 / 2
var centerMapH = heightCanvas / 2
var radio = mapDelimit/12
var paddingHeight= centerMapH-(radio*5)
var mapa= new Mapa()
var PlayersDetails = []
function preload(){
    mapa.resources.preload()
}
function setup() {
    var canvas = createCanvas(widthCanvas, heightCanvas);
    canvas.parent('#canvas')
    background(100,180,100)
    mapa.setup()
    setPlayer()
}
function draw() {
    background(100,180,100)
    mapa.printAll()
    showPointer()
}
function showPointer(){
    switch(mapa.select){
        case 'vertice':
                mapa.printPoint(PlayersDetails[turnIndex].indicators.vertice.fi,
                PlayersDetails[turnIndex].indicators.vertice.fj)
                break;
        case 'arista':
                mapa.printArista(PlayersDetails[turnIndex].indicators.arista.fi,
                PlayersDetails[turnIndex].indicators.arista.fj)
                break
        case 'rombo':
                mapa.printRombo(PlayersDetails[turnIndex].indicators.rombo.fi,
                PlayersDetails[turnIndex].indicators.rombo.fj)
                break
    }
}
function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        mapa.move(PlayersDetails[turnIndex],'down')
    } else if (keyCode === UP_ARROW) {
        mapa.move(PlayersDetails[turnIndex],'up')
    } else if (keyCode === RIGHT_ARROW) {
        mapa.move(PlayersDetails[turnIndex],'right')
    } else if (keyCode === LEFT_ARROW) {
        mapa.move(PlayersDetails[turnIndex],'left')
    }
}
function setPlayer(){
    var players=ActualParameters.namesPlayers.split(',')
    players.map(function(player,i){
        PlayersDetails.push(
            {
                name: player,
                color:colorsPointer[i],
                houses:[],
                resources:{
                    stone:0,
                    wool:0,
                    potatoes:0,
                    quinoa:0,
                    gold:0,
                    wood:0,
                },
                indicators : {
                    vertice:{
                        fi: 0,
                        fj: 0
                    },
                    arista:{
                        fi: 0,
                        fj: 0
                    },
                    rombo:{
                        fi: 0,
                        fj: 0
                    }
                }
            }
        )
    })
    
}