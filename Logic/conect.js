var webSocket = {};
var obj;

function connect(url) {
    webSocket.ws = new WebSocket(url);

    webSocket.ws.onmessage = function (e) {
        obj = JSON.parse(e.data);

        //divMessage = document.getElementById('listDisc');

        cursors = obj.body.message;
        //console.log(cursors)
        if (cursors) update(cursors);

    };
    //setTimeout(()=>{
      //  webSocket.ws.send('{"body":{"message":"aqui"}}')
    //},2000)
    
    webSocket.ws.onclose = function () {};

};

function getParameterByName(name) {
    return location.search.substr(location.search.indexOf(name) + name.length + 1)
}
var ActualParameters;

function getParametersFromUrl() {
    var newStr = location.href.substr(location.href.indexOf('?') + 1)
    console.log(newStr)
    var objParameters = {};
    newStr.split('&').map(function (item) {
        var pairs = item.split('=')

        objParameters[pairs[0]] = pairs[1]
    })
    ActualParameters = objParameters
}
$(document).ready(function () {
    getParametersFromUrl()
    //console.log(SendMessages)
    //elementTest(1)

    console.log(ActualParameters.url);

    connect(ActualParameters.url);
});

var cursors;

function parseUrl(url, path, parameters) {
    var index = url.indexOf('?')
    var local = url.indexOf('Inkatan')
    var urlParam = '';
    if (parameters.length == 0) {
        urlParam = ''
    } else {
        parameters.map(function (item) {
            urlParam +=
                '&' + (item.name) + '=' + (item.value)

        })
    }
    //alert(urlParam)
    return url.substr(0, local + 7) + path + "/index.html" + url.substr(index) + urlParam
}

function goToScreen(path, parameters) {
    location.replace(parseUrl(location.href, path,
        parameters))
}

function update(cursor) {
    //alert(1)
    if (typeof (cursor) == "string") {
        var obj
        console.log(cursor)
        switch (true) {
            case cursor === 'one':
                setPlayers(1);
                break;
            case cursor === 'two':
                setPlayers(2);
                break;
            case cursor === 'three':
                setPlayers(3);
                break;
            case cursor === 'four':
                setPlayers(4);
                break;
            case cursor === 'add':
                setObjectPoint();
                break;
            case cursor === 'expand':
                location.replace(parseUrl(location.href, "/ModeExpansion",
                    []))
                break;
            case cursor === 'points':
                location.replace(parseUrl(location.href, "/ModePoints",
                    []))
                break;
            case cursor === 'dice':
                throwDice()
                break;
            case cursor.indexOf("PlayerName") != -1:
                obj = JSON.parse(cursor)
                changeName(obj.PlayerName)
                break;
            case cursor.indexOf("valueExpansion") != -1:
                obj = JSON.parse(cursor)
                try {
                    modificarPuntos(obj.valueExpansion)
                } catch (error) {

                }
                try {
                    modificarExpansion(obj.valueExpansion)
                } catch (error) {

                }

                break;
            case cursor == "pass":

                PaseTurno();
                break;
        }

        if (cursor == "start") {

        } else if (cursor == "up" || cursor == "down" || cursor == "left" || cursor == "right") {
            MovePointer(cursor)
        } else if (cursor == "next-list") {

            goToScreen(
                "/ListPlayers",
                [{
                    name: "nplayer",
                    value: lenPlayers.toString()
                }])

        } else if (cursor.indexOf("player") != -1) {

            var newName = cursor.substr(cursor.indexOf("player") + 7)
            console.log(newName)
            playerReady(newName).bind(returnContext())

        } else if (cursor == "next-game") {

            location.replace(parseUrl(location.href, "GameMode/",
                []))

        } else if (cursor.indexOf("ready")) {
            //setReady(parseInt(cursor[0]))
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

        //console.log(cursor)
    }

}