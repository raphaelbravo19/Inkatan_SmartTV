var dots = window.setInterval( function() {
	var wait = document.getElementById("searching");
	if ( wait.innerHTML.length > 19 ) 
	wait.innerHTML = "Searching devices";
	else 
	wait.innerHTML += ".";
	}, 500);
	
	function found(){
		clearInterval(dots)
		let btnT = $('#btnTriangle')
		$('#searching').remove()
		btnT.append(`<div class="btnText">
		Start
		</div>`)
		btnT.addClass("triangleBtn")
	}