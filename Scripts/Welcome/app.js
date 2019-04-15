//
//import {SendMessages} from '../../Util/constants.js';
var dots = window.setInterval( function() {
	var wait = document.getElementById("searching");
	if ( wait.innerHTML.length > 19 ) 
	wait.innerHTML = "Searching devices";
	else 
	wait.innerHTML += ".";
	}, 500);
	//alert(1)
	function found(){
		clearInterval(dots)
		//alert(1)
		let btnT = $('#btnTriangle')
		$('#searching').remove()
		btnT.append(`<div class="btnText">
		Start
		</div>`)
		btnT.addClass("triangleBtn")
	}


