var pointsValue=5

function modificarPuntos(mas){
	if(mas){
		if(pointsValue<15) pointsValue+=1
	}else{
		if(pointsValue>1) pointsValue-=1
	}
	document.getElementById(`pointsValue`).innerHTML = `${pointsValue}`;
}