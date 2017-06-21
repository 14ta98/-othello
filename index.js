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
			table.rows[i].cells[j].id = "cell" + j + i;
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


var cellid = '';
var myPut_x = -1;
var myPut_y = -1;
//　ひっくり返す最初の駒	
var end_x = -1
var end_y = -1;
// 盤を確認する方向
var dir_x = +1;
var dir_y = 0;
var target_x = myPut_x + dir_x;
var target_y = myPut_y + dir_y;

var changeFlag = false;
var changeCount = 0;

//　変数初期化
function init (obj) {
	 cellid = obj.id;
	 myPut_x = parseInt(cellid.slice(4,5));
	 myPut_y = parseInt(cellid.slice(5,6));
	//　ひっくり返す最初の駒	
	 end_x = -1
	 end_y = -1;
	// 盤を確認する方向
	 dir_x = +1;
	 dir_y = 0;
	 target_x = myPut_x + dir_x;
	 target_y = myPut_y + dir_y;

	 changeFlag = false;
	 changeCount = 0;
}



//盤をクリックした際の処理
function setMark(obj,color) {
	init(obj);
	if(board_data[myPut_x][myPut_y] === empty){
		obj.textContent = "●";
		//　右方向確認
		dir_x = +1;
		dir_y = 0;
		set();
		init(obj);
		// 左方向確認
		dir_x = -1;
		dir_y = 0;
		set();
		init(obj);
		// 上方向確認
		dir_x = 0;
		dir_y = +1;
		set();
		init(obj);
		// 下方向確認
		dir_x = 0;
		dir_y = -1;
		set();
		init(obj);
		//　斜め右横上
		dir_x = +1;
		dir_y = +1;
		set();
		init(obj);
		//  斜め左横下
		dir_x = -1;
		dir_y = -1;
		set();
		init(obj);
		// while((0 <= target_x <= 7) && (0 <= target_y <= 7 )) {
		// 	if (board_data[target_x][target_y] === empty) {
		// 		break;
		// 	} else if (board_data[target_x][target_y] === black) {
		// 		changeFlag = true;
		// 		break;
		// 	} else if (board_data[target_x][target_y] === white) {
		// 		end_x  = target_x;
		// 		end_y  = target_y;
		// 		target_x = target_x+dir_x;
		// 		target_y = target_y+dir_y;
				
		// 	}
		// } 
		// //ループ終了後に、f が true ならば（はさんだ相手ゴマがある）、盤面[px+dx][py+dy]～[bx][by]までを自分のコマにする
		// if (changeFlag) {
		// 	var x = myPut_x;
		// 	var y = myPut_y;
		// 	do {
		// 		x = x + dir_x;
		// 		y = y + dir_y;
		// 		board_data[x][y] = black;
		// 		document.getElementById('cell' + x + y).textContent = "●";
		// 	} while (x != end_x || y != end_y)

		// 	// for (var i = 0; i < changeCount; i++) {
		// 	// 	board_data[myPut_x + dir_x][myPut_y + dir_y] = black;
		// 	// }
		// }

	} else {
		alert('既に駒が配置されています。');
	}
}

function set () {

		while((0 <= target_x <= 7) && (0 <= target_y <= 7 )) {
			if (board_data[target_x][target_y] === empty) {
				break;
			} else if (board_data[target_x][target_y] === black) {
				changeFlag = true;
				break;
			} else if (board_data[target_x][target_y] === white) {
				end_x  = target_x;
				end_y  = target_y;
				target_x = target_x+dir_x;
				target_y = target_y+dir_y;
				
			}
		} 
		//ループ終了後に、f が true ならば（はさんだ相手ゴマがある）、盤面[px+dx][py+dy]～[bx][by]までを自分のコマにする
		if (changeFlag) {
			var x = myPut_x;
			var y = myPut_y;
			do {
				x = x + dir_x;
				y = y + dir_y;
				board_data[x][y] = black;
				document.getElementById('cell' + x + y).textContent = "●";
			} while (x != end_x || y != end_y)

			// for (var i = 0; i < changeCount; i++) {
			// 	board_data[myPut_x + dir_x][myPut_y + dir_y] = black;
			// }
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












