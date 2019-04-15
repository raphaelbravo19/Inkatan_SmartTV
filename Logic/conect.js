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

    webSocket.ws.onclose = function () {};

};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    results = regex
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

//var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    //game.load.spritesheet('player', '../Assets/sprites/PersonajeSpriteC.png', 192, 240, 22);
}

var cursors;
var player;
var left;
var right;

function create() {

    /*game.stage.backgroundColor = '#916961';
    /*game.stage.backgroundColor = '#916961';
    /*game.stage.backgroundColor = '#916961';
    /*game.stage.backgroundColor = '#916961';
    /*game.stage.backgroundColor = '#916961';
    /*game.stage.backgroundColor = '#916961';
    /*game.stage.backgroundColor = '#916961';
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
    player = game.add.sprite(0, 0, 'player');
    player.smoothed = false;
    player.scale.set(1);

    left = player.animations.add('left', [12, 13, 14, 15, 16, 17], 10, false);
    right = player.animations.add('right', [3, 4, 5, 6, 7], 10, false);
    player.animations.add('up', [5, 6, 7], 10, false);
    player.animations.add('down', [8, 9, 10], 10, false);
    // player.animations.add('stop', [0], 10, false)

    game.physics.enable(player, Phaser.Physics.ARCADE);*/
    player = game.add.sprite(0, 0, 'player');
    player.smoothed = false;
    player.scale.set(1);

    left = player.animations.add('left', [12, 13, 14, 15, 16, 17], 10, false);
    right = player.animations.add('right', [3, 4, 5, 6, 7], 10, false);
    player.animations.add('up', [5, 6, 7], 10, false);
    player.animations.add('down', [8, 9, 10], 10, false);
    // player.animations.add('stop', [0], 10, false)

    game.physics.enable(player, Phaser.Physics.ARCADE);*/
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

function parseUrl(url, path, parameters) {
    let index = url.indexOf('?')
    let local = url.indexOf('Inkatan')
    let urlParam = parameters.length == 0 ? '' : parameters.map(item => {
        return (
            `&${item.name}=${item.value}`
        )
    })
    return url.substr(0, local + 8) + path + url.substr(index) + urlParam
}

function update(cursor) {
    //console.log(1)
    if (typeof (cursor) == "string") {
        //$( ".messages" ).append(`<h3>${cursor}</h3>` );
        //alert(1)
        if (cursor == "start") {
            $(location).attr('href', "./Inkatan/SelectPlayers/?url=" + ipConnected);
        } else if (cursor == "up") {
            addPlayer()
        } else if (cursor == "down") {
            removePlayer()
        } else if (cursor == "next-list") {
            location.replace(parseUrl(location.href, "ListPlayers/",
                [{
                    name: "nplayer",
                    value: lenPlayers.toString()
                }]))
        } else if (cursor.indexOf("player") != -1) {

            let newName = cursor.substr(cursor.indexOf("player") + 7)
            console.log(newName)
            playerReady(newName).bind(returnContext())

        } else if (cursor == "next-game") {

            location.replace(parseUrl(location.href, "GameMode/",
                []))

        } else if (cursor.indexOf("ready")) {
            setReady(parseInt(cursor[0]))
        } else if (cursor.indexOf("name")) {
            changeName(cursor.substr(5))
        } else if (cursor == "expansion") {

            location.replace(parseUrl(location.href, "ModeExpansion/",
                []))

        } else if (cursor == "puntos") {
            location.replace(parseUrl(location.href, "ModePoints/",
                []))
        } else if (cursor == "mas") {
            modificarExpansion(true)
        } else if (cursor == "menos") {
            modificarExpansion(false)
        } else if (cursor == "sumar") {
            modificarPuntos(true)
        } else if (cursor == "restar") {
            modificarPuntos(false)
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