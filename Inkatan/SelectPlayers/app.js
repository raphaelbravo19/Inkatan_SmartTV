//import SendMessages from '../../Util/constants';
let playersIcons = [
	`<div id="player1" class="itemPlayer">
	<div class="playerNumber">1</div>
	<div class="avatar">
		<img class="user" src="../../Assets/icons/user.png" />

	</div>
	<div id="playerName1" class="playerName">Waiting...</div>
</div>
`, `<div id="player2" class="itemPlayer disabled">
<div class="playerNumber">2</div>
<div class="avatar" style="background: #ffdf2e">
	<img class="user" src="../../Assets/icons/user.png" />
</div>
<div id="playerName2" class="playerName">Waiting...</div>
</div>`, `
<div id="player3" class="itemPlayer disabled">
<div class="playerNumber">3</div>
<div class="avatar" style="background: #d017ff">
	<img class="user" src="../../Assets/icons/user.png" />
</div>
<div id="playerName3" class="playerName">Waiting...</div>
</div>
`, `<div id="player4" class="itemPlayer disabled">
<div class="playerNumber">4</div>
<div class="avatar" style="background: #ff682e">
	<img class="user" src="../../Assets/icons/user.png" />
</div>
<div id="playerName4" class="playerName">Waiting...</div>
</div>`
]

$(document).ready(function () {
	//getParametersFromUrl()
	//console.log(SendMessages)
	//elementTest(1)

	$('#token').append(`Token: INK-${ActualParameters.ipSelected}`);

});
let lenPlayers = 0
let numberPlayers = 0
//alert(location.href)
let ready = [];

function setPlayers(valueCursor) {
	$("#messageWaiting").remove();
	for (let i = 0; i < valueCursor; i++) {
		$("#playersContainer").append(playersIcons[i]);
		ready.push(false)
	}
	numberPlayers = valueCursor
}

let listNames = []

function changeName(name) {
	if (lenPlayers < numberPlayers) {
		lenPlayers++;
		$(`#playerName${lenPlayers}`).text(name)
		listNames.push(name)
		$(`#player${lenPlayers}`).removeClass("disabled")
		setReady(lenPlayers - 1)
	}
}
let gameStarting = false;
let readyIndex = 0;



function setReady(index) {
	let toChange = ready[index]
	ready[index] = !toChange
	//alert('55')
	if (toChange) {
		$(`#player${index+1} .avatar .readyContainer`).remove()
	} else {
		$(`#player${index+1} .avatar`).append(`<div class="readyContainer">
			Ready
		</div>`)
	}
	readyIndex++;
	if (!ready.includes(false)) {
		gameStarting = true
		//alert(1)
		let strNames = '';
		listNames.map(item => strNames += `,${item}`)
		setTimeout(() => {
			location.replace(parseUrl(location.href, "/GameMode",
				[{
						name: "namesPlayers",
						value: strNames.substr(1)
					},
					{
						name: "numberPlayers",
						value: numberPlayers
					}
				]))
			gameStarting = false
		}, 1000)
	}
}