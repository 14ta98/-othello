var b = document.getElementById('board');
for (var i = 0; i < 8 ; i++) {
	var tr = document.createElement('tr');
	var data = [0,0,0,0,0,0,0,0];
	for (var j = 0; j < 8 ; j++) {
		var td = document.createElement('td');
		td.className = 'cell';
		td.id = 'cell' + i + j;
		var a = document.createElement('a');
		a.className ='piece';
		a.id = 'piece' + i + j;
		var piece = document.getElementById("piece");
		//piece.innerHTML = "○";
		//td.onclick = clicked;
		tr.appendChild(td);
		td.appendChild(a);
	}
	b.appendChild(tr);
}

