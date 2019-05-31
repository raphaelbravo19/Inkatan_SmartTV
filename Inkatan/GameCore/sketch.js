var widthCanvas = $(window).width() * 1;
var heightCanvas = $(window).height();

var colorsPointer = ['rgba(0, 255, 0,0.7)', 'rgba(255, 223, 46,0.7)', 'rgba(208, 23, 255,0.7)', 'rgba(255, 104, 46,0.7)']
var colorsPointerOpacity = ['rgba(0, 255, 0,0.4)', 'rgba(255, 223, 46,0.4)', 'rgba(208, 23, 255,0.4)', 'rgba(255, 104, 46,0.4)']

var mapDelimit = widthCanvas * 0.63
var paddingLeft = widthCanvas * 0.37 / 2
var centerMapH = heightCanvas / 2
var radio = mapDelimit / 12
var paddingHeight = centerMapH - (radio * 5)
var mapa = Mapa()
var game = Game()
var dice = Dice()
var PlayersDetails = []

// PRELOAD IMAGES
function preload() {
    mapa.preload()
    mapa.resources.preload()
}

//SETUP MAP AND PLAYERS
function setup() {
    var canvas = createCanvas(widthCanvas, heightCanvas);
    canvas.parent('#canvas')
    background(100, 180, 100)
    mapa.setup()
    setPlayer()
}

//DRAW
function draw() {
    background(100, 180, 100)
    mapa.printAll()
    mapa.printObjects(PlayersDetails)
    game.Game(mapa, PlayersDetails)
    showPointer()
}

//SHOW MAP POINTER
function showPointer() {
    switch (mapa.select) {
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

//TEST ACTIONS
function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        mapa.move(PlayersDetails[turnIndex], 'down')
    } else if (keyCode === UP_ARROW) {
        mapa.move(PlayersDetails[turnIndex], 'up')
    } else if (keyCode === RIGHT_ARROW) {
        mapa.move(PlayersDetails[turnIndex], 'right')
    } else if (keyCode === LEFT_ARROW) {
        mapa.move(PlayersDetails[turnIndex], 'left')
    } else if (keyCode === 32) {
        mapa.addObject(PlayersDetails[turnIndex])
    } else if (key === 'q') {
        mapa.changeSelect()
    } else if (key === 'd') {
        dice.throwDice()
    }
}

//CALL MOVE FUNCTIONS
function Move(val) {
    mapa.move(PlayersDetails[turnIndex], val)
}

//DICE ACTION
function ThrowDice() {
    dice.throwDice()
}

//ADD AN OBJECT
function Add() {
    mapa.addObject(PlayersDetails[turnIndex])
}

//CONFIGURE PLAYERS
function setPlayer() {
    var players = ActualParameters.namesPlayers.split(',')
    players.map(function (player, i) {
        PlayersDetails.push({
            name: player,
            color: colorsPointer[i],
            colorOpacity: colorsPointerOpacity[i],
            houses: [],
            ways: [],
            resources: {
                stone: 0,
                wool: 0,
                potato: 0,
                quinoa: 0,
                gold: 0,
                wood: 0,
            },
            indicators: {
                vertice: positionsVertice[i],
                arista: positionsAristas[i],
                rombo: {
                    fi: 0,
                    fj: 0
                }
            }
        })
    })

}