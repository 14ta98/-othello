/* 初期設定 */

// 駒を定義する処理
var empty = 0;
var black = 1;
var white = 2;
var board_data = [];
var piece = "";
// 盤の中身を配列で初期化する処理
function InitialBoardData() {
	for (var i = 0; i < 8; i++) {
		board_data[i] = [];
		for (var j = 0; j < 8; j++) {
			board_data[i][j] = empty;
		}
	}
	// 初期配置
	board_data[4][4] = 1;
	board_data[3][3] = 1;
	board_data[4][3] = 2;
	board_data[3][4] = 2;
	//盤にidを設定する
	var table = document.getElementById("board");
	for(var i = 0; i < table.rows.length; i++){
		for(var j = 0; j < table.rows[i].cells.length; j++){
			table.rows[i].cells[j].id = "cell" + i + j;
		}
	}
	//idごとに値を設定する
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if(board_data[i][j] == empty){
				piece = "";
			}
			else if(board_data[i][j]
				 == black){
				piece = "●";
			}
			else if(board_data[i][j] == white){
				piece = "○";
			}
			else{
				piece = "エラー";
			}
			document.getElementById("cell" + i + j).textContent = piece;
		}
	};
}

//盤に駒を配置する処理
function put(i,j,color){
	//盤に駒が置けるかチェックする処理
  if(check(i,j,color) == false){
    return false;
  }
  //駒をひっくり返す処理
  board_data[i][j] = color;

}
//盤に駒があるかチェックする処理
function check(i,j,color){
  //すでに石がある場合
  if(board_data[i][j] != 0){
    return false;
  }
  return true;
}

//盤をクリックした際の処理
function setMark(obj,color) {
	var cellid = obj.id;
	var px = parseInt(cellid.slice(4,5));
	var py = parseInt(cellid.slice(5,6));
	var bx = -1
	var by = -1;
	var dx = +1;
	var dy = 0;
	var x = px + dx;
	var y = py + dy;
	console.log(x);
	console.log(y);
	var f = false;


	if(board_data[px][py] === empty){
	obj.textContent = "●";
	} 
}

	// 	if (board_data[x][y] === empty) {
	// 	break;
	// } else if (board_data[x][y] === white) {
	// 	f = true;
	// } else if (board_data[x][y]) === black {
	// 	bx = x;
	// 	by = y;
	// 	x = x+dx;
	// 	y = y+dy;
	// }

	// 

	// if (x < 0 || y < 0 || x > 7 || y > 7) {
	// 	board_data[x][y] === empty;
	// 	break;
	// } else if (board_data) {}

	//自分のおいた駒から、縦と横と斜めのセルを確認する処理を記述する
	// var dirs = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
	// var result = [];
	// for (var p = 0; i < dirs.length; p++) {
	// 	var flipped = getFlipCellsOneDir(i, j, dirs[p],[0], dirs[p][i], color);
	// 	result = result.concat(flipped);

// // i,jに駒を置いた時に、（dx,dy）方向で駒を挟めるかを確認する処理
// 	var x = i + dx;
// 	var y = j + dy;
// 	var flipped = [];

// if (x < 0 || y < 0 || x > 7 || y > 7 || 
// 	data[x][y] == color ||  data[x][y] === 0){
// 		return;
// 	}
// flipped.push([x,y]);

// while (true) {
// 	x += dx;
// 	y += dy;
// 	if (x < 0 || y < 0 || y > 7 || data[x][y] === 0) {
// 		return true;
// 	}
// 	if (data[x][y] === color) {
// 		return flipped
// 	}
// }












