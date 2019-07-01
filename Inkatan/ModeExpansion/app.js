var expansionPorcentaje = 50

function modificarExpansion(mas) {
	/*if(mas){
		if(expansionPorcentaje<95) expansionPorcentaje+=5
	}else{
		if(expansionPorcentaje>5) expansionPorcentaje-=5
	}*/
	document.getElementById('percentValue').innerHTML = mas + '%';
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
				{name:"gamemode", value: "expansion"},
				{name:"gamevalue", value: mas},
			]))
		gameStarting = false
	}, 100)

}