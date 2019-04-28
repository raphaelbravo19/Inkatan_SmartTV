var pointsValue = 5

function modificarPuntos(mas) {

	document.getElementById('pointsValue').innerHTML = mas;
	setTimeout(function () {
		location.replace(parseUrl(location.href, "/GameCore",
			[]))
		gameStarting = false
	}, 1000)
}