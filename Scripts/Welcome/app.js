//ANIMATION DOTS
var dots = window.setInterval(function () {
	var wait = document.getElementById("searching");
	if (wait.innerHTML.length > 19)
		wait.innerHTML = "Searching devices";
	else
		wait.innerHTML += ".";
}, 500);
let indexServer = 0
$(document).keydown(function (e) {
	if (listAvaliableServers.length != 0) {
		//alert(e.key)
		switch (e.key) {
			case "ArrowUp":
				ChangeSelect(1);
				break;
			case "ArrowDown":
				ChangeSelect(-1)
				break;
			case "Enter":
				entablishConnection(indexServer)
				break;
		}
	}
});
//FOUND SERVER
let indexScroll = 0

function ChangeSelect(value) {
	//alert(1)
	if (value == 1) {
		if (indexServer > 0) {
			$(`#server${indexServer}`).removeClass("Selected")
			$(`#server${indexServer-1}`).addClass("Selected")
			indexServer = indexServer - 1
			if (indexServer < indexScroll) {
				//let top = $(`#server${indexServer-2}`).offset().top
				//alert(top)
				indexScroll -= 1
				$("#list").scrollTop($(`#server${indexServer}`).offset().top - $(`#server0`).offset().top);
			}

		}
	} else {
		if (indexServer < listAvaliableServers.length - 1) {
			$(`#server${indexServer}`).removeClass("Selected")
			$(`#server${indexServer+1}`).addClass("Selected")
			indexServer = indexServer + 1
			if (indexServer >= indexScroll + 3) {
				//alert($(`#server0`).offset().top)
				indexScroll += 1
				$("#list").scrollTop($(`#server${indexServer-2}`).offset().top - $(`#server0`).offset().top);
			}

		}

	}

}

function found(url, indexElement) {
	clearInterval(dots)

	//let btnT = $('#btnTriangle')
	let listContainer = $('#list')
	$('#searching').remove()
	listContainer.addClass("listServers")
	listContainer.append(`<div id="server${indexElement}" class="itemServer${indexElement==0?" Selected":''}">${url}</div>`)
	/*btnT.append(`<div class="btnText">
		Start
		</div>`)*/ //btnT.addClass("triangleBtn")
}