const addHtml=[`<div id="player3" class="itemPlayer">
				<div  class="avatar" style="background: #d017ff">

				</div>
				<div class="playerNumber">3</div>
			</div>`,`<div id="player4" class="itemPlayer">
				<div class="avatar" style="background: #ff682e">

				</div>
				<div class="playerNumber">4</div>
			</div>`]
		let lenPlayers=2
		//alert(location.href)
		
		function addPlayer(hola){
			if(lenPlayers<4){
				let players = $('#playersContainer')
				
				players.append(addHtml[lenPlayers-2])
				lenPlayers++
			}
		}
		function removePlayer(){
			if(lenPlayers>2){
				let players = $('#playersContainer')
				
				$(`#player${lenPlayers}`).remove()
				lenPlayers--
			}
		}