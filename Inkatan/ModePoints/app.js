var pointsValue = 5

function modificarPuntos(mas) {

	document.getElementById('pointsValue').innerHTML = mas;
	sendMessageServer({
		action:"CONNECTION",
		name: "Inicia el juego"
	})
	setTimeout(function () {
		sendMessageServer({
			action:"STARTGAME"
		})
		location.replace(parseUrl(location.href, "/GameCore",
		[
			{name:"gamemode", value: "points"},
			{name:"gamevalue", value: mas},
		]))
		gameStarting = false
	}, 1000)
}