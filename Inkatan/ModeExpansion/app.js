var expansionPorcentaje = 50

function modificarExpansion(mas) {
	/*if(mas){
		if(expansionPorcentaje<95) expansionPorcentaje+=5
	}else{
		if(expansionPorcentaje>5) expansionPorcentaje-=5
	}*/
	document.getElementById('percentValue').innerHTML = mas + '%';
	sendMessageServer({
		action:"STARTGAME"
	})
	setTimeout(function () {
		location.replace(parseUrl(location.href, "/GameCore",
			[]))
		gameStarting = false
	}, 100)

}