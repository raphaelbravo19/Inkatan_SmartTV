let lenPlayers = 0
//alert(location.href)
let ready = [false, false, false, false];

function addPlayer() {
	if (lenPlayers < 4) {
		let players = $('#playersContainer')

		players.append(addHtml[lenPlayers - 2])
		lenPlayers++
	}
}

function removePlayer() {
	if (lenPlayers > 1) {
		//let players = $('#playersContainer')

		$(`#player${lenPlayers}`).remove()
		lenPlayers--
	}
}

function changeName(name) {
	if (lenPlayers < 4) {
		lenPlayers++;
		$(`#playerName${lenPlayers}`).text(name)
		$(`#player${lenPlayers}`).removeClass("disabled")

	}
}
let gameStarting = false;
let readyIndex = 0;

function setReady(index) {
	readyIndex++;
	let toChange = ready[index]
	ready[index] = !toChange
	if (toChange) {
		$(`#player${index+1} .avatar .readyContainer`).remove()
	} else {
		$(`#player${index+1} .avatar`).append(`<div class="readyContainer">
			Ready
		</div>`)
	}

	if (!ready.includes(false)) {
		gameStarting = true
		//alert(1)
		setTimeout(() => {
			location.replace(parseUrl(location.href, "GameMode",
				[]))
			gameStarting = false
		}, 1000)
	}
}