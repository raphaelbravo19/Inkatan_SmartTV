var webSocket = {};
var obj;

function connect(url) {
    webSocket.ws = new WebSocket(url);

    webSocket.ws.onmessage = function (e) {
        obj = JSON.parse(e.data);

        divMessage = document.getElementById('listDisc');

        cursors = obj.body.message;
        //console.log(cursors)
        if (cursors) update(cursors);

    };

    webSocket.ws.onclose = function () {
    };

};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"); results = regex
        .exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(
        /\+/g, " "));
}


$(document).ready(function () {
    var url = getParameterByName('url');
    console.log(url);
    
    connect(url);
});
//GAME DEVELOPMENT

var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.spritesheet('player', '../Assets/sprites/PersonajeSpriteC.png', 192, 240, 22);
}

var cursors;
var player;
var left;
var right;

function create() {
    
    /*game.stage.backgroundColor = '#916961';
    
    player = game.add.sprite(0, 0, 'player');
    player.smoothed = false;
    player.scale.set(1);

    left = player.animations.add('left', [12, 13, 14, 15, 16, 17], 10, false);
    right = player.animations.add('right', [3, 4, 5, 6, 7], 10, false);
    player.animations.add('up', [5, 6, 7], 10, false);
    player.animations.add('down', [8, 9, 10], 10, false);
    // player.animations.add('stop', [0], 10, false)

    game.physics.enable(player, Phaser.Physics.ARCADE);*/

}
function addPlayer(){
    if(lenPlayers<4){
        let players = $('#playersContainer')
        
        players.append(addHtml[lenPlayers-2])
        lenPlayers++
    }
}
function removePlayer(){
    if(lenPlayers>2){
        let players = $('#playersContainer')
        
        $(`#player${lenPlayers}`).remove()
        lenPlayers--
    }
}
function update(cursor) {
    //console.log(1)
        if(typeof(cursor)=="string"){
            //$( ".messages" ).append(`<h3>${cursor}</h3>` );
            //alert(1)
            switch(cursor){
                case "start":$(location).attr('href', "./Inkatan/SelectPlayers/?url=" + ipConnected);
                case "up":addPlayer();
                case "down":removePlayer();
            }
            
            console.log(cursor)
        }
    /*player.body.velocity.set(0);
    if (cursor == "LEFT") {
        player.body.velocity.x = -384;
        player.play('left');
    }
    else if (cursor == "RIGHT") {
        player.body.velocity.x = 384;
        player.play('right');
    }
    // else if (cursor == "UP") {
    //     player.body.velocity.y = -200;
    //     player.play('up');
    // }
    // else if (cursor == "DOWN") {
    //     player.body.velocity.y = 200;
    //     player.play('down');
    // }
    else {
        // console.log("llega")
        // player.animations.stop();
        // player.body.velocity.x = 0;
        // player.play('stop');
    }*/


}

function render() {

    // game.debug.text(player.frame, 32, 32);

}

