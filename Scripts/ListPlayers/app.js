var playersReady = 1
function loadData() {
	let numeroPlayers = getParameterByName("nplayer")
	console.log(numeroPlayers)
	let listOfPlayers
	console.log(listOfPlayers)
	for(let i=1;i<numeroPlayers;i++){
		listOfPlayers= $("#playersContainer")

		console.log(`<div id="player${i+1}" class="player">${i+1}. Waiting...</div>`)
		listOfPlayers.append(
		`<div id="player${i+1}" class="player">${i+1}. Waiting...</div>`
		)
		}
}
function returnContext(){
	return this;
}
function playerReady(name){
	document.getElementById(`player${playersReady+1}`).innerHTML = `${playersReady+1}. ${name.toUpperCase()}`;
	
	playersReady++

}
setTimeout(loadData,0)
