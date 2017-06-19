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

//盤に駒がある場合の処理
// fucntion existPiece(i,j,color) {
// 	if (data[i][j] === black || data[i][j] === white) {
// 		//return true;
// 	}
// }


//盤をクリックした際の処理
function setMark(obj) {
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			//盤に駒がない場合の処理
			if(board_data[i][j] == empty){
				obj.textContent = "●";
			} else if (board_data[i][j] == black && board_data[i][j] == white ){

			}
		}
	}
	
}





