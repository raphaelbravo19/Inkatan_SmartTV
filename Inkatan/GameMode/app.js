var nPlayers = getParameterByName("nplayer")
var players = $('#playersContainer')

for (var i = 1; i < nPlayers; i++) {
	console.log('<div id="player' + (i + 1) + '" class="player">' + (i + 1) + '. Waiting...</div>')
	players.append(
		'<div id="player' + (i + 1) + '" class="player">' + (i + 1) + '. Waiting...</div>'
	)
}