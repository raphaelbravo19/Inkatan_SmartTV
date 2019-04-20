let width = 0;
const arrayElements = [
	`<div id="player1" class="itemPlayer">
	<div id="avatar1" class="avatar turnActive">
		<img class="user" src="../../Assets/icons/user.png" />
		
	</div>
	<div id="playerName1" class="playerName">Waiting...</div>
<div>
</div>`, `<div id="player2" class="itemPlayer">
<div id="playerName2" class="playerName Bottom">Waiting...</div>
<div id="avatar2" class="avatar">
	<img class="user" src="../../Assets/icons/user.png" />

</div>

</div>`, `<div id="player3" class="itemPlayer">
<div id="avatar3" class="avatar">
	<img class="user" src="../../Assets/icons/user.png" />

</div>
<div id="playerName3" class="playerName">Waiting...</div>
</div>`, `<div id="player4" class="itemPlayer">
<div id="playerName4" class="playerName Bottom">Waiting...</div>
<div id="avatar4" class="avatar">
	<img class="user" src="../../Assets/icons/user.png" />

</div>

</div>`
]
$(document).ready(function () {
	width = $(window).width()

	$("#canvas").css("width", width * 0.7);
	$(".avatar").css("width", width * 0.28 / 2);
	$(".avatar").css("height", width * 0.28 / 2);
	$(".avatar").css("border-radius", width * 0.14 / 2);
	$(".user").css("width", width * 0.26 / 2);
	$(".user").css("height", width * 0.26 / 2);
	let namesPlayers = ActualParameters.namesPlayers.split(',')
	for (let index = 0; index < ActualParameters.numberPlayers; index++) {
		$("#contain").append(arrayElements[index]);
		$(`#player${index+1}`).css(index == 0 || index == 2 ? "top" : 'bottom', width * 0.005);
		$(`#player${index+1}`).css(index == 0 || index == 1 ? "left" : 'right', width * 0.008);
		$(`#playerName${index+1}`).text(namesPlayers[index]);;
	}

});
let turnIndex = 0

function PaseTurno() {
	//alert(1)
	$(`#avatar${turnIndex+1}`).removeClass("turnActive");
	if (turnIndex + 1 == ActualParameters.numberPlayers) {
		turnIndex = 0;
	} else {
		turnIndex += 1
	}
	//alert(turnIndex)
	$(`#avatar${turnIndex+1}`).addClass("turnActive");
}